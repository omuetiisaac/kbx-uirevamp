import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import { getVerifiedTransferDetails } from "@/lib/kbx.functions";

const title = "Your KBX transfer details";
const description = "Verified KBX bank transfer details and your personal reference code.";

export const Route = createFileRoute("/_authenticated/give-details")({
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
  component: GiveDetails,
});

function GiveDetails() {
  const fetchDetails = useServerFn(getVerifiedTransferDetails);
  const { data, isPending, error } = useQuery({
    queryKey: ["kbx", "transfer-details"],
    queryFn: () => fetchDetails({ data: undefined }),
  });

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="kbx-wrap py-24 min-[900px]:py-32">
        <div className="mx-auto max-w-[820px]">
          <p className="kbx-micro text-gold-deep">Verified</p>
          <h1 className="kbx-h2 mt-5">Transfer details</h1>

          {isPending && <p className="mt-8 text-slate">Loading your details…</p>}
          {error && (
            <p className="mt-8 text-[0.9rem]" style={{ color: "var(--kbx-error)" }}>
              {error instanceof Error ? error.message : "Could not load your details."}
            </p>
          )}

          {data && (
            <>
              <p className="kbx-lede mt-5 text-slate">
                Verified as {data.email}. Quote your reference code on the transfer.
              </p>

              {data.leads.length > 0 && (
                <div className="mt-10 border border-hairline">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b border-hairline">
                        <th className="kbx-micro p-4 text-slate-2">Reference</th>
                        <th className="kbx-micro p-4 text-slate-2">Purpose</th>
                        <th className="kbx-micro p-4 text-slate-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.leads.map((lead) => (
                        <tr key={lead.id} className="border-b border-hairline last:border-b-0">
                          <td className="p-4 font-mono text-[0.95rem] tracking-[0.12em]">
                            {lead.reference}
                          </td>
                          <td className="p-4 text-slate">{lead.purpose ?? "General"}</td>
                          <td className="p-4 text-slate">
                            {lead.amount ? `${lead.currency} ${Number(lead.amount).toLocaleString()}` : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mt-10 grid gap-6 min-[900px]:grid-cols-2">
                {data.accounts.map((account) => (
                  <div key={account.id} className="border border-hairline bg-paper-2 p-8">
                    <p className="kbx-micro text-gold-deep">{account.label}</p>
                    <dl className="mt-6 flex flex-col gap-4 text-[0.95rem]">
                      <div>
                        <dt className="kbx-micro text-slate-2">Bank</dt>
                        <dd className="mt-1">{account.bank_name}</dd>
                      </div>
                      <div>
                        <dt className="kbx-micro text-slate-2">Account name</dt>
                        <dd className="mt-1">{account.account_name}</dd>
                      </div>
                      <div>
                        <dt className="kbx-micro text-slate-2">Account number</dt>
                        <dd className="mt-1 font-mono tracking-[0.12em]">{account.account_number}</dd>
                      </div>
                      {account.swift_code && (
                        <div>
                          <dt className="kbx-micro text-slate-2">SWIFT</dt>
                          <dd className="mt-1 font-mono tracking-[0.12em]">{account.swift_code}</dd>
                        </div>
                      )}
                      {account.sort_code && (
                        <div>
                          <dt className="kbx-micro text-slate-2">Sort code</dt>
                          <dd className="mt-1 font-mono tracking-[0.12em]">{account.sort_code}</dd>
                        </div>
                      )}
                      <div>
                        <dt className="kbx-micro text-slate-2">Currency</dt>
                        <dd className="mt-1">{account.currency}</dd>
                      </div>
                    </dl>
                    {account.instructions && (
                      <p className="mt-6 border-t border-hairline pt-5 text-[0.9rem] text-slate">
                        {account.instructions}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="mt-12 flex flex-wrap gap-6 border-t border-hairline pt-6 text-[0.85rem] text-slate-2">
            <a href="/" className="underline decoration-hairline hover:text-ink">
              Back to the KBX site
            </a>
            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "/";
              }}
              className="underline decoration-hairline hover:text-ink"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
