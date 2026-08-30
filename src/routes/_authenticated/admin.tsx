import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { supabase } from "@/integrations/supabase/client";

const title = "KBX Admin";
const description = "Membership applications, giving leads, reconciliation and site content.";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminPage,
});

const fieldClass =
  "w-full rounded-[2px] border border-hairline bg-paper px-3 py-2 text-[0.95rem] text-ink focus-visible:border-gold";

type Tab = "leads" | "applications" | "reconciliation" | "bank" | "content";

const tabs: { id: Tab; label: string }[] = [
  { id: "leads", label: "Giving leads" },
  { id: "applications", label: "Applications" },
  { id: "reconciliation", label: "Reconciliation" },
  { id: "bank", label: "Bank details" },
  { id: "content", label: "Site content" },
];

function downloadCsv(filename: string, rows: Record<string, unknown>[]) {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0]!);
  const escape = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const csv = [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => escape(row[header])).join(",")),
  ].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function AdminPage() {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<Tab>("leads");
  const [search, setSearch] = useState("");

  const roleQuery = useQuery({
    queryKey: ["kbx", "my-role"],
    queryFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.user?.id ?? "");
      if (error) throw error;
      return { email: user.user?.email ?? "", isAdmin: data.some((r) => r.role === "admin") };
    },
  });

  const claimAdmin = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.rpc("claim_first_admin");
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["kbx", "my-role"] }),
  });

  const isAdmin = roleQuery.data?.isAdmin === true;

  const dataQuery = useQuery({
    queryKey: ["kbx", "admin-data"],
    enabled: isAdmin,
    queryFn: async () => {
      const [applications, leads, payments, bank, content] = await Promise.all([
        supabase.from("applications").select("*").order("created_at", { ascending: false }),
        supabase.from("leads").select("*").order("created_at", { ascending: false }),
        supabase.from("payments").select("*").order("paid_on", { ascending: false }),
        supabase.from("bank_details").select("*").order("sort_order"),
        supabase.from("site_content").select("*").order("key"),
      ]);
      const failed = [applications, leads, payments, bank, content].find((r) => r.error);
      if (failed?.error) throw failed.error;
      return {
        applications: applications.data ?? [],
        leads: leads.data ?? [],
        payments: payments.data ?? [],
        bank: bank.data ?? [],
        content: content.data ?? [],
      };
    },
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["kbx", "admin-data"] });

  const setApplicationStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("applications").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const recordPayment = useMutation({
    mutationFn: async (payload: {
      lead_id: string | null;
      amount: number;
      currency: string;
      paid_on: string;
      transfer_reference: string | null;
      notes: string | null;
    }) => {
      const { error } = await supabase.from("payments").insert(payload);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const saveBank = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Record<string, unknown> }) => {
      const { error } = await supabase
        .from("bank_details")
        .update({ ...patch, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const saveContent = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { error } = await supabase
        .from("site_content")
        .update({ value, updated_at: new Date().toISOString() })
        .eq("key", key);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  if (roleQuery.isPending) {
    return <Shell>Checking your access…</Shell>;
  }

  if (!isAdmin) {
    return (
      <Shell>
        <p className="text-slate">
          Signed in as {roleQuery.data?.email}. This account is not an administrator.
        </p>
        <button
          type="button"
          onClick={() => claimAdmin.mutate()}
          className="mt-6 rounded-[2px] bg-ink px-6 py-3 text-[0.95rem] text-white hover:bg-ink-2"
        >
          {claimAdmin.isPending ? "Claiming…" : "Claim admin (first account only)"}
        </button>
        {claimAdmin.data === false && (
          <p className="mt-4 text-[0.85rem] text-slate-2">
            An administrator already exists — ask them to grant you access.
          </p>
        )}
        {claimAdmin.error && (
          <p className="mt-4 text-[0.85rem]" style={{ color: "var(--kbx-error)" }}>
            {claimAdmin.error instanceof Error ? claimAdmin.error.message : "Could not claim admin."}
          </p>
        )}
      </Shell>
    );
  }

  const d = dataQuery.data;
  const term = search.trim().toLowerCase();
  const match = (row: { name?: string; email?: string; reference?: string | null }) =>
    !term ||
    [row.name, row.email, row.reference].some((v) => (v ?? "").toLowerCase().includes(term));

  const totalReceived = (d?.payments ?? []).reduce((sum, p) => sum + Number(p.amount), 0);
  const pendingLeads = (d?.leads ?? []).filter(
    (lead) => !(d?.payments ?? []).some((p) => p.lead_id === lead.id),
  );

  return (
    <Shell wide>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="kbx-micro text-gold-deep">Admin</p>
          <h1 className="kbx-h3 mt-3">KBX operations</h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, reference"
            className={`${fieldClass} w-[280px]`}
          />
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/";
            }}
            className="text-[0.85rem] text-slate-2 underline decoration-hairline hover:text-ink"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-px bg-hairline min-[900px]:grid-cols-4">
        <Stat label="Applications" value={String(d?.applications.length ?? 0)} />
        <Stat label="Giving leads" value={String(d?.leads.length ?? 0)} />
        <Stat label="Awaiting transfer" value={String(pendingLeads.length)} />
        <Stat label="Received (all currencies)" value={totalReceived.toLocaleString()} />
      </div>

      <nav className="mt-10 flex flex-wrap gap-6 border-b border-hairline pb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`kbx-micro ${tab === t.id ? "text-ink" : "text-slate-2 hover:text-ink"}`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {dataQuery.isPending && <p className="mt-8 text-slate">Loading…</p>}
      {dataQuery.error && (
        <p className="mt-8 text-[0.9rem]" style={{ color: "var(--kbx-error)" }}>
          {dataQuery.error instanceof Error ? dataQuery.error.message : "Could not load data."}
        </p>
      )}

      {d && tab === "leads" && (
        <Panel
          title="Bank-transfer requests"
          action={
            <ExportButton
              onClick={() =>
                downloadCsv("kbx-leads.csv", d.leads as unknown as Record<string, unknown>[])
              }
            />
          }
        >
          <Table
            head={["Reference", "Name", "Email", "Purpose", "Amount", "Verified"]}
            rows={d.leads.filter(match).map((lead) => [
              <span className="font-mono tracking-[0.1em]">{lead.reference}</span>,
              lead.name,
              lead.email,
              lead.purpose ?? "—",
              lead.amount ? `${lead.currency} ${Number(lead.amount).toLocaleString()}` : "—",
              lead.verified_at ? "Yes" : "No",
            ])}
          />
        </Panel>
      )}

      {d && tab === "applications" && (
        <Panel
          title="Membership applications"
          action={
            <ExportButton
              onClick={() =>
                downloadCsv(
                  "kbx-applications.csv",
                  d.applications as unknown as Record<string, unknown>[],
                )
              }
            />
          }
        >
          <Table
            head={["Name", "Email", "Industry", "Status", ""]}
            rows={d.applications.filter(match).map((app) => [
              app.name,
              app.email,
              app.industry ?? "—",
              app.status,
              <select
                value={app.status}
                onChange={(e) =>
                  setApplicationStatus.mutate({ id: app.id, status: e.target.value })
                }
                className={fieldClass}
              >
                {["new", "reviewing", "accepted", "declined"].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>,
            ])}
          />
        </Panel>
      )}

      {d && tab === "reconciliation" && (
        <>
          <Panel title="Record a received transfer">
            <form
              className="grid gap-4 min-[900px]:grid-cols-6"
              onSubmit={(event) => {
                event.preventDefault();
                const form = new FormData(event.currentTarget);
                const leadId = String(form.get("lead_id") ?? "");
                recordPayment.mutate({
                  lead_id: leadId || null,
                  amount: Number(form.get("amount")),
                  currency: String(form.get("currency") || "NGN"),
                  paid_on: String(form.get("paid_on")),
                  transfer_reference: String(form.get("transfer_reference") || "") || null,
                  notes: String(form.get("notes") || "") || null,
                });
                event.currentTarget.reset();
              }}
            >
              <select name="lead_id" className={`${fieldClass} min-[900px]:col-span-2`}>
                <option value="">No linked lead</option>
                {d.leads.map((lead) => (
                  <option key={lead.id} value={lead.id}>
                    {lead.reference} — {lead.name}
                  </option>
                ))}
              </select>
              <input name="amount" type="number" step="any" required placeholder="Amount" className={fieldClass} />
              <input name="currency" defaultValue="NGN" className={fieldClass} />
              <input name="paid_on" type="date" required className={fieldClass} />
              <input name="transfer_reference" placeholder="Bank reference" className={fieldClass} />
              <input name="notes" placeholder="Notes" className={`${fieldClass} min-[900px]:col-span-5`} />
              <button
                type="submit"
                className="rounded-[2px] bg-ink px-5 py-2 text-[0.9rem] text-white hover:bg-ink-2"
              >
                {recordPayment.isPending ? "Saving…" : "Record"}
              </button>
            </form>
          </Panel>

          <Panel
            title="Received transfers"
            action={
              <ExportButton
                onClick={() =>
                  downloadCsv(
                    "kbx-payments.csv",
                    d.payments as unknown as Record<string, unknown>[],
                  )
                }
              />
            }
          >
            <Table
              head={["Date", "Amount", "Lead", "Bank reference", "Notes"]}
              rows={d.payments.map((payment) => [
                payment.paid_on,
                `${payment.currency} ${Number(payment.amount).toLocaleString()}`,
                d.leads.find((lead) => lead.id === payment.lead_id)?.reference ?? "—",
                payment.transfer_reference ?? "—",
                payment.notes ?? "—",
              ])}
            />
          </Panel>
        </>
      )}

      {d && tab === "bank" && (
        <Panel title="Bank details shown after verification">
          <div className="grid gap-6 min-[900px]:grid-cols-2">
            {d.bank.map((account) => (
              <form
                key={account.id}
                className="flex flex-col gap-3 border border-hairline bg-paper-2 p-6"
                onSubmit={(event) => {
                  event.preventDefault();
                  const form = new FormData(event.currentTarget);
                  saveBank.mutate({
                    id: account.id,
                    patch: {
                      label: String(form.get("label")),
                      bank_name: String(form.get("bank_name")),
                      account_name: String(form.get("account_name")),
                      account_number: String(form.get("account_number")),
                      swift_code: String(form.get("swift_code") || "") || null,
                      sort_code: String(form.get("sort_code") || "") || null,
                      currency: String(form.get("currency")),
                      instructions: String(form.get("instructions") || "") || null,
                      is_active: form.get("is_active") === "on",
                    },
                  });
                }}
              >
                <LabeledInput name="label" label="Label" defaultValue={account.label} />
                <LabeledInput name="bank_name" label="Bank" defaultValue={account.bank_name} />
                <LabeledInput name="account_name" label="Account name" defaultValue={account.account_name} />
                <LabeledInput name="account_number" label="Account number" defaultValue={account.account_number} />
                <LabeledInput name="swift_code" label="SWIFT" defaultValue={account.swift_code ?? ""} />
                <LabeledInput name="sort_code" label="Sort code" defaultValue={account.sort_code ?? ""} />
                <LabeledInput name="currency" label="Currency" defaultValue={account.currency} />
                <LabeledInput name="instructions" label="Instructions" defaultValue={account.instructions ?? ""} />
                <label className="flex items-center gap-2 text-[0.9rem] text-slate">
                  <input type="checkbox" name="is_active" defaultChecked={account.is_active} />
                  Shown to verified visitors
                </label>
                <button
                  type="submit"
                  className="mt-2 rounded-[2px] bg-ink px-5 py-2 text-[0.9rem] text-white hover:bg-ink-2"
                >
                  Save
                </button>
              </form>
            ))}
          </div>
        </Panel>
      )}

      {d && tab === "content" && (
        <Panel title="Editable site copy and stats">
          <div className="flex flex-col gap-4">
            {d.content.map((item) => (
              <form
                key={item.key}
                className="flex flex-wrap items-end gap-4 border-b border-hairline pb-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  const form = new FormData(event.currentTarget);
                  saveContent.mutate({ key: item.key, value: String(form.get("value")) });
                }}
              >
                <div className="min-w-[280px] flex-1">
                  <label className="kbx-micro block text-slate-2">{item.label}</label>
                  <input name="value" defaultValue={item.value} className={`${fieldClass} mt-2`} />
                </div>
                <button
                  type="submit"
                  className="rounded-[2px] bg-ink px-5 py-2 text-[0.9rem] text-white hover:bg-ink-2"
                >
                  Save
                </button>
              </form>
            ))}
          </div>
        </Panel>
      )}
    </Shell>
  );
}

function Shell({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="kbx-wrap py-20">
        <div className={wide ? "" : "mx-auto max-w-[560px]"}>{children}</div>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-paper p-6">
      <p className="kbx-micro text-slate-2">{label}</p>
      <p className="kbx-h3 mt-3">{value}</p>
    </div>
  );
}

function Panel({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between gap-4">
        <h2 className="kbx-h3-sm">{title}</h2>
        {action}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function ExportButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="kbx-micro text-slate-2 underline decoration-hairline hover:text-ink"
    >
      Export CSV
    </button>
  );
}

function LabeledInput({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue: string;
}) {
  return (
    <div>
      <label className="kbx-micro block text-slate-2">{label}</label>
      <input name={name} defaultValue={defaultValue} className={`${fieldClass} mt-2`} />
    </div>
  );
}

function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  if (rows.length === 0) return <p className="text-slate">Nothing here yet.</p>;
  return (
    <div className="overflow-x-auto border border-hairline">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="border-b border-hairline">
            {head.map((cell, index) => (
              <th key={index} className="kbx-micro p-4 text-slate-2">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-hairline last:border-b-0">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-4 align-middle text-[0.95rem] text-slate">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
