# KBX — Kingdom Business Connections website

Build the single-page KBX marketing site exactly to the uploaded design specification: restrained, institutional, editorial. Square corners, hairlines instead of shadows, one accent colour.

## Design system (from the spec, no substitutions)

- Colours: ink #0E1622, ink-2 #1B2735, paper #F4F2ED, paper-2 #EDEAE3, white, teal #2C5A6B (one section only), rust #8C4A32 (one section only), hairline #DED9CF, slate #4A5260, slate-2 #7A8290, gold #CBA135, gold-deep #8A6A1F.
- Type: Unbounded 400 for all headings (never bold), Instrument Sans for body, JetBrains Mono for uppercase eyebrow/micro-labels. Exact clamp scale, line-heights and tracking from the spec.
- Radius: 0 on cards/images, 2px on buttons and fields. Nothing above 2px anywhere.
- Spacing: section padding clamp(80px, 11vw, 152px), gutter clamp(20px, 5vw, 64px), 1240px centred content.
- Card gaps are binary: neutral cards butt on a shared 1px hairline; colour cards on teal/rust sit 24px apart with no border.
- Exactly one box-shadow on the page — the Join form panel. One radial gold vignette in the hero, no other gradient.
- Focus: identical 2px gold ring on every interactive element via :focus-visible.
- Icons: Lucide at size 24, strokeWidth 1.4, ink or white, no fills.
- Motion: cubic-bezier(0.4,0,0.2,1) panels 240–320ms, ease hovers 120–200ms, scroll-reveal fade-up 16px at 480ms triggered at 20% visibility, hero staggered entrance on load. prefers-reduced-motion disables entrance motion.
- Breakpoints 1240 / 900 / 600 with the exact collapse rules; grids never scroll horizontally.

## Sections (in order, one page with anchor navigation)

1. Sticky ink header — wordmark + mono tagline, nav links with gold underline wipe, gold CTA; hamburger + right-sliding full-height overlay below 900px.
2. `#top` hero — eyebrow, left-aligned H1 mission headline, sub-lede, gold + outline CTAs, hairline-separated stat strip.
3. `#mission` — mission statement large, then numbered hairline-joined breakdown cards, one per clause.
4. `#vision` — 2×2 hairline-joined cards for the four bodies of work, each with a line icon.
5. `#story` — timeline with mono date labels, gold dot nodes on a hairline line, one striped image slot; vertical stack on mobile.
6. `#values` — 4-up hairline-joined value cards (eight values) on white.
7. `#markets` — teal section: colour cards for current/upcoming chapters plus a flat SVG node-and-line network graphic.
8. `#giving` — rust section: colour cards per cause plus a mono ledger-style transparency table with hairline rows.
9. `#goals` — pillars grid (character, capacity, community, capital) plus a mono sub-block for the eight industry subgroups.
10. `#join` — two-column: copy + numbered next steps, and the application form panel carrying the page's one shadow. Fields: full name, email, industry, custom square consent checkbox with animated check draw, ink-filled full-width submit.
11. Footer — wordmark, nav recap, accessible social line icons, mono copyright, hairline divider above.

Copy is written from the brand context in the spec (faith-led global network, est. 2023, founded in Lagos). All image slots use the striped `.kbx-image-slot` placeholder component — no stock or AI photography.

## Form behaviour

The application form is front-end only in this build: labelled fields, inline validation, and a restrained success state after submit. It does not persist anywhere yet. Say the word and I'll add Lovable Cloud so applications are stored and viewable.

## Technical notes

- Tokens defined in `src/styles.css` as CSS custom properties mapped into the Tailwind theme; fonts loaded via a `<link>` in `src/routes/__root.tsx`.
- Single route rewritten at `src/routes/index.tsx` with per-section components under `src/components/kbx/`, plus shared `Button`, `Field`, `Card`, `ImageSlot`, `Eyebrow`, `Reveal` (IntersectionObserver) primitives.
- Favicon and the KBX wordmark treatment follow the uploaded logo; the logo image is registered as a Lovable asset rather than committed as a binary.
- Route `head()` gets a KBX-specific title, description, og and twitter tags.
- Final pass against the spec's QA checklist: radius, single shadow, single teal/rust section, no bold display type, uniform focus ring, grid collapse behaviour, reduced motion.
