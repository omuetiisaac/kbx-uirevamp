import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { GoldButton } from "@/components/kbx/primitives";

const title = "Sign in — KBX";
const description =
  "Verify your email to see KBX transfer details or to reach the membership admin area.";

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>) => ({
    next: typeof search["next"] === "string" ? search["next"] : "/give-details",
  }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

const fieldClass =
  "w-full rounded-[2px] border border-hairline bg-paper px-4 py-3 text-base text-ink focus-visible:border-gold";

function AuthPage() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) navigate({ to: next, replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) navigate({ to: next, replace: true });
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate, next]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const redirect = `${window.location.origin}/auth?next=${encodeURIComponent(next)}`;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: redirect },
    });
    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }
    setStatus("sent");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-6 py-24 text-ink">
      <div className="w-full max-w-[440px] border border-hairline bg-paper-2 p-8 min-[600px]:p-10">
        <p className="kbx-micro text-gold-deep">Verify your email</p>
        <h1 className="kbx-h3 mt-4">Sign in to KBX</h1>

        {status === "sent" ? (
          <p className="mt-6 text-slate">
            We've sent a secure sign-in link to <span className="text-ink">{email}</span>. Open it on
            this device to continue.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5" noValidate>
            <p className="text-[0.95rem] text-slate">
              We use a one-time email link — no password to remember.
            </p>
            <div>
              <label htmlFor="auth-email" className="kbx-micro block text-slate-2">
                Email
              </label>
              <input
                id="auth-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${fieldClass} mt-2`}
              />
            </div>
            {status === "error" && (
              <p className="text-[0.85rem]" style={{ color: "var(--kbx-error)" }}>
                {message}
              </p>
            )}
            <GoldButton type="submit" className="w-full">
              {status === "sending" ? "Sending link…" : "Email me a sign-in link"}
            </GoldButton>
          </form>
        )}

        <p className="mt-8 border-t border-hairline pt-6 text-[0.85rem] text-slate-2">
          <a href="/" className="underline decoration-hairline hover:text-ink">
            Back to kingdombusinessconnections
          </a>
        </p>
      </div>
    </main>
  );
}
