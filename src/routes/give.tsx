import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

import { GoldButton, InkButton } from "@/components/kbx/primitives";
import { requestBankTransfer } from "@/lib/kbx.functions";

const title = "Give to KBX — Bank transfer details";
const description =
  "Request KBX bank transfer details. Every gift is issued a unique reference code so it can be reconciled to you.";

export const Route = createFileRoute("/give")({
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
  component: GivePage,
});

const fieldClass =
  "w-full rounded-[2px] border border-hairline bg-paper px-4 py-3 text-base text-ink focus-visible:border-gold";

function GivePage() {
  const navigate = useNavigate();
  const submit = useServerFn(requestBankTransfer);
  const [values, setValues] = useState({ name: "", email: "", purpose: "", amount: "" });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");

  function set(key: keyof typeof values, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError("");
    try {
      const amount = values.amount.trim() ? Number(values.amount) : undefined;
      const result = await submit({
        data: {
          name: values.name,
          email: values.email,
          purpose: values.purpose.trim() || undefined,
          ...(amount && Number.isFinite(amount) ? { amount } : {}),
          currency: "NGN",
        },
      });
      setReference(result.reference);
      setState("done");
    } catch (submitError) {
      setState("error");
      setError(
        submitError instanceof Error ? submitError.message : "Something went wrong. Please retry.",
      );
    }
  }

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="kbx-wrap py-24 min-[900px]:py-32">
        <div className="mx-auto max-w-[720px]">
          <p className="kbx-micro text-gold-deep">Giving</p>
          <h1 className="kbx-h2 mt-5">Give by bank transfer</h1>
          <p className="kbx-lede mt-5 text-slate">
            Tell us who you are and we will issue a reference code, then verify your email so the
            account details can be released to you.
          </p>

          {state === "done" ? (
            <div className="mt-12 border border-hairline bg-paper-2 p-8 min-[600px]:p-10">
              <p className="kbx-micro text-gold-deep">Your reference code</p>
              <p className="mt-4 font-mono text-2xl tracking-[0.16em] text-ink">{reference}</p>
              <p className="mt-6 text-slate">
                Quote this code on your transfer so we can reconcile the gift to you. Next, verify
                your email address — the account details are released only after verification.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <GoldButton
                  onClick={() =>
                    navigate({ to: "/auth", search: { next: "/give-details" } })
                  }
                >
                  Verify email and see details
                </GoldButton>
              </div>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              className="mt-12 border border-hairline bg-paper-2 p-8 min-[600px]:p-10"
            >
              <div className="flex flex-col gap-6">
                <div>
                  <label htmlFor="give-name" className="kbx-micro block text-slate-2">
                    Full name
                  </label>
                  <input
                    id="give-name"
                    required
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => set("name", e.target.value)}
                    className={`${fieldClass} mt-2`}
                  />
                </div>
                <div>
                  <label htmlFor="give-email" className="kbx-micro block text-slate-2">
                    Email
                  </label>
                  <input
                    id="give-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={`${fieldClass} mt-2`}
                  />
                </div>
                <div className="grid gap-6 min-[600px]:grid-cols-2">
                  <div>
                    <label htmlFor="give-purpose" className="kbx-micro block text-slate-2">
                      Purpose (optional)
                    </label>
                    <input
                      id="give-purpose"
                      value={values.purpose}
                      onChange={(e) => set("purpose", e.target.value)}
                      placeholder="Membership, outreach, general"
                      className={`${fieldClass} mt-2`}
                    />
                  </div>
                  <div>
                    <label htmlFor="give-amount" className="kbx-micro block text-slate-2">
                      Amount (optional)
                    </label>
                    <input
                      id="give-amount"
                      type="number"
                      min="0"
                      step="any"
                      value={values.amount}
                      onChange={(e) => set("amount", e.target.value)}
                      className={`${fieldClass} mt-2`}
                    />
                  </div>
                </div>
                {state === "error" && (
                  <p className="text-[0.85rem]" style={{ color: "var(--kbx-error)" }}>
                    {error}
                  </p>
                )}
                <InkButton className="w-full">
                  {state === "sending" ? "Submitting…" : "Request transfer details"}
                </InkButton>
              </div>
            </form>
          )}

          <p className="mt-10 text-[0.85rem] text-slate-2">
            <a href="/" className="underline decoration-hairline hover:text-ink">
              Back to the KBX site
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
