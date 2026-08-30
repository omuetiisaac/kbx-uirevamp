-- Roles ---------------------------------------------------------------
CREATE TYPE public.app_role AS ENUM ('admin', 'member');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own roles readable" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

-- Giving leads --------------------------------------------------------
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  purpose text,
  amount numeric(14,2),
  currency text NOT NULL DEFAULT 'NGN',
  reference text NOT NULL UNIQUE DEFAULT ('KBX-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6))),
  verified_at timestamptz,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX leads_email_key ON public.leads (lower(email));
GRANT SELECT ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own lead readable" ON public.leads FOR SELECT TO authenticated
  USING (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')) OR public.has_role(auth.uid(), 'admin'));

-- Reconciled payments -------------------------------------------------
CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  reference text,
  amount numeric(14,2) NOT NULL,
  currency text NOT NULL DEFAULT 'NGN',
  paid_on date NOT NULL DEFAULT current_date,
  transfer_reference text,
  cause text,
  notes text,
  status text NOT NULL DEFAULT 'confirmed',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins read payments" ON public.payments FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Membership applications ---------------------------------------------
CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  industry text,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.applications TO authenticated;
GRANT ALL ON public.applications TO service_role;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins read applications" ON public.applications FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Bank details --------------------------------------------------------
CREATE TABLE public.bank_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  bank_name text NOT NULL,
  account_name text NOT NULL,
  account_number text NOT NULL,
  swift_code text,
  sort_code text,
  currency text NOT NULL DEFAULT 'NGN',
  instructions text,
  is_active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.bank_details TO authenticated;
GRANT ALL ON public.bank_details TO service_role;
ALTER TABLE public.bank_details ENABLE ROW LEVEL SECURITY;
CREATE POLICY "verified users read active bank details" ON public.bank_details FOR SELECT TO authenticated USING (is_active);

INSERT INTO public.bank_details (label, bank_name, account_name, account_number, currency, instructions, sort_order) VALUES
  ('Naira transfers', 'Guaranty Trust Bank', 'Kingdom Business Connections Ltd', '0123456789', 'NGN', 'Use your KBX reference as the transfer narration so we can reconcile your gift.', 1),
  ('USD transfers', 'Guaranty Trust Bank', 'Kingdom Business Connections Ltd', '0987654321', 'USD', 'SWIFT transfers may take 2-3 working days to appear on our record.', 2);

-- Editable site content ------------------------------------------------
CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  value text NOT NULL,
  label text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon, authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "site content is public" ON public.site_content FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.site_content (key, value, label) VALUES
  ('stat_members', '400+', 'Hero stat — members'),
  ('stat_countries', '11', 'Hero stat — countries'),
  ('stat_chapters', '3', 'Hero stat — chapters'),
  ('stat_founded', 'Lagos, 2023', 'Hero stat — founded'),
  ('hero_heading', 'A global kingdom network in the marketplace.', 'Hero heading'),
  ('hero_lede', 'KBX connects Christian business professionals and entrepreneurs across continents — to disciple the marketplace, fund kingdom work, and build enterprises that hold their integrity under pressure.', 'Hero lede'),
  ('giving_note', 'Giving through KBX is recorded on a transparent record. Members can see what was given, when, and what it paid for.', 'Giving section note');