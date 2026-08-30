import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const givingInput = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  purpose: z.string().trim().max(200).optional(),
  amount: z.number().positive().max(1_000_000_000).optional(),
  currency: z.string().trim().min(3).max(3).default("NGN"),
});

/**
 * Public: records a bank-transfer request and returns its reference code.
 * Bank details themselves are never returned here — the requester must
 * verify their email address by signing in first.
 */
export const requestBankTransfer = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => givingInput.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: lead, error } = await supabaseAdmin
      .from("leads")
      .insert({
        name: data.name,
        email: data.email.toLowerCase(),
        purpose: data.purpose ?? null,
        amount: data.amount ?? null,
        currency: data.currency,
      })
      .select("reference, email")
      .single();

    if (error) {
      console.error("[kbx] lead insert failed", error.message);
      throw new Error("We could not record your request. Please try again.");
    }

    return { reference: lead.reference, email: lead.email };
  });

/**
 * Authenticated: confirms the signed-in email owns its pending requests,
 * stamps them verified, and returns them alongside the bank details.
 */
export const getVerifiedTransferDetails = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = String(context.claims["email"] ?? "").toLowerCase();
    if (!email) throw new Error("No verified email on this account.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    await supabaseAdmin
      .from("leads")
      .update({ verified_at: new Date().toISOString(), user_id: context.userId })
      .ilike("email", email)
      .is("verified_at", null);

    const [{ data: leads }, { data: accounts }] = await Promise.all([
      supabaseAdmin
        .from("leads")
        .select("id, name, reference, purpose, amount, currency, verified_at, created_at")
        .ilike("email", email)
        .order("created_at", { ascending: false }),
      supabaseAdmin
        .from("bank_details")
        .select("id, label, bank_name, account_name, account_number, swift_code, sort_code, currency, instructions")
        .eq("is_active", true)
        .order("sort_order", { ascending: true }),
    ]);

    return { email, leads: leads ?? [], accounts: accounts ?? [] };
  });
