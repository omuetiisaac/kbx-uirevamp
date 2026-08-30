# KBX — Media, Motion, Bank-Transfer Access & Admin

## 1. Logo
- Background removed from the uploaded KBX mark, kept exactly as-is otherwise.
- Used in the nav, footer, and as the favicon/OG image.

## 2. Imagery (all 8 slots filled with generated documentary-style photography)
Generated in the brief's editorial style — natural light, candid, muted grading, no gold cast, square corners:
- `kbx-hero-band` — quarterly in-person meeting, people around a table (wide)
- `kbx-vision-1` — two members talking after a session (4:3)
- `kbx-vision-2` — hands open in prayer at a meeting (4:3), gold mono caption "Prayer opens every meeting"
- `kbx-story-1/2/3` — member at work; the tenth meeting; KBX Lagos first meeting (3:4)
- `kbx-values-band` — members eating together, food and fellowship (wide)
- `kbx-giving-band` — a funded initiative, outreach/food distribution (wide)

The striped `.kbx-image-slot` component stays in the codebase so any slot can be swapped back to a placeholder or to real photography later.

## 3. Video
- One generated b-roll clip for the Mission section: silent, muted, looping, full-bleed at opacity 0.5 behind the dark gradient overlay.
- Poster frame extracted from the clip; `prefers-reduced-motion` users see the poster only.

## 4. Animation & glassmorphism
- Scroll-reveal (fade + subtle rise) on section headers, cards, stat strip, and image bands; staggered per grid.
- Hover motion: hairline-to-gold border transitions, image band slow zoom, nav underline sweep, stat counter count-up.
- Glass panels: translucent blurred surfaces with hairline borders over the ink/video sections (Mission, Markets, Giving) and on the nav bar once scrolled. Corners stay square, gold stays the only accent.

## 5. Bank-transfer access flow (Phase 1)
1. Visitor clicks "Give" / "Pay membership" → form asks name + email (+ optional amount and purpose).
2. Lead is stored, and a verification email with a magic link is sent.
3. Clicking the link returns them to a page that reveals the bank details (account name, number, bank, reference code).
4. Each lead gets a unique reference code shown alongside the details — they quote it on the transfer so payments reconcile to a person.
5. Details page stays accessible while their session is valid; the link can be re-sent.

No card processing yet; Flutterwave/Stripe come in phase two, and the schema leaves room for it.

## 6. Admin
Sign-in protected area at `/admin`, restricted by an admin role (roles kept in a separate table, never on the user record):
- **Leads & applications** — searchable table of membership applications and bank-detail requests, with status, verified/unverified, and CSV export.
- **Reconciliation** — mark a lead as paid: amount, date, transfer reference, notes; dashboard totals for pending vs received.
- **Bank details editor** — edit the account details shown on the reveal page without a code change.
- **Content editor** — edit key site copy and the headline stats (members, chapters, markets).

## Technical notes
- Lovable Cloud is enabled for the database, auth, and email verification.
- Tables: `leads` (name, email, verified_at, reference_code, purpose, amount), `payments` (lead_id, amount, paid_at, reference, notes), `bank_details`, `site_content`, `user_roles` + `has_role()` security-definer function. RLS: public can insert a lead only; bank details readable only through a verified server function; everything else admin-only.
- Bank details are never shipped in the client bundle — they're fetched server-side after the verification token is validated.
- Generated media is stored as CDN assets; the video is served as MP4 with a poster image.
- First admin account: I'll wire the role grant so you can promote your own email after signing up.
