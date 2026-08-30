import { useState } from "react";
import { InkButton } from "./primitives";

type Errors = { name?: string; email?: string; industry?: string; consent?: string };

const fieldClass =
  "w-full rounded-[2px] border border-hairline bg-paper px-4 py-3 text-base text-ink transition-[box-shadow,border-color] duration-[120ms] ease-out focus-visible:border-gold";

export function JoinForm() {
  const [values, setValues] = useState({ name: "", email: "", industry: "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function set(key: keyof typeof values, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!values.industry.trim()) next.industry = "Please tell us your industry.";
    if (!consent) next.consent = "Please confirm you understand the review process.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  }

  return (
    <div
      className="border border-hairline bg-paper-2 p-8 min-[600px]:p-10"
      style={{ borderRadius: 0, boxShadow: "var(--kbx-shadow)" }}
    >
      {submitted ? (
        <div>
          <p className="kbx-micro text-gold-deep">Application received</p>
          <h3 className="kbx-h3 mt-4">Thank you, {values.name.split(" ")[0]}.</h3>
          <p className="mt-4 text-slate">
            Your application is now with the membership team. We review every application by hand,
            and someone will be in touch at {values.email} about the next step.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <p className="kbx-micro text-gold-deep">Membership application</p>

          <div className="mt-8 flex flex-col gap-6">
            <div>
              <label htmlFor="kbx-name" className="kbx-micro block text-slate-2">
                Full name
              </label>
              <input
                id="kbx-name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(e) => set("name", e.target.value)}
                aria-invalid={Boolean(errors.name)}
                className={`${fieldClass} mt-2`}
                style={errors.name ? { borderColor: "var(--kbx-error)" } : undefined}
              />
              {errors.name && (
                <p className="mt-2 text-[0.85rem]" style={{ color: "var(--kbx-error)" }}>
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="kbx-email" className="kbx-micro block text-slate-2">
                Email
              </label>
              <input
                id="kbx-email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                aria-invalid={Boolean(errors.email)}
                className={`${fieldClass} mt-2`}
                style={errors.email ? { borderColor: "var(--kbx-error)" } : undefined}
              />
              {errors.email && (
                <p className="mt-2 text-[0.85rem]" style={{ color: "var(--kbx-error)" }}>
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="kbx-industry" className="kbx-micro block text-slate-2">
                Industry
              </label>
              <input
                id="kbx-industry"
                name="industry"
                type="text"
                value={values.industry}
                onChange={(e) => set("industry", e.target.value)}
                aria-invalid={Boolean(errors.industry)}
                className={`${fieldClass} mt-2`}
                style={errors.industry ? { borderColor: "var(--kbx-error)" } : undefined}
              />
              {errors.industry && (
                <p className="mt-2 text-[0.85rem]" style={{ color: "var(--kbx-error)" }}>
                  {errors.industry}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="kbx-consent" className="flex cursor-pointer items-start gap-3">
                <input
                  id="kbx-consent"
                  name="consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center border border-hairline bg-paper transition-colors duration-150 peer-checked:border-gold peer-checked:bg-gold peer-focus-visible:shadow-[0_0_0_2px_var(--kbx-gold)]"
                >
                  {consent && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6.4 4.6 9 10 3.2"
                        stroke="#FFFFFF"
                        strokeWidth="1.4"
                        strokeLinecap="square"
                        className="kbx-check-draw"
                      />
                    </svg>
                  )}
                </span>
                <span className="text-[0.9rem] text-slate">
                  I understand membership is reviewed before joining, and I am happy to be contacted
                  about next steps.
                </span>
              </label>
              {errors.consent && (
                <p className="mt-2 text-[0.85rem]" style={{ color: "var(--kbx-error)" }}>
                  {errors.consent}
                </p>
              )}
            </div>

            <InkButton className="w-full">Submit application</InkButton>
          </div>
        </form>
      )}
    </div>
  );
}
