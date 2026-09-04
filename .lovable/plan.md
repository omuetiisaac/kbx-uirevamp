# Finish KBX website review implementation

## Goal

Complete the approved KBX review pass so the homepage tells the intended story — partnership and community first, then capacity and kingdom funding, with the marketplace later — while preserving the existing editorial visual system, interactive map, authentication boundary, and deploy-safe local media.

## User-visible changes

1. **Finish the homepage narrative and copy**
   - Correct the mission statement to end with “serving in the marketplace.” and remove the internal explanatory line and “for kingdom return” language.
   - Use the approved hero stats: charities helped — “TBD”, “50+ countries”, “2 chapters”, and “8–10 subgroups”.
   - Use the approved London launch/global reach wording, remove founding-location references, and change the Values heading to “We hold ourselves to these values.”
   - Make Community prominent immediately after Mission; make “Connecting believers” lead to the industry subgroup directory.
   - Present the public four-C story as Character, Capacity, Community, and Connection while retaining capital/funding language in Giving.
   - Keep only two Story images on desktop and retain restrained scroll-reveal, hero, and reduced-motion behavior.

2. **Complete navigation and destinations**
   - Remove Join from the ordinary nav links while keeping the Join KBX CTA routed through the auth flow.
   - Add persistent Community navigation on desktop and mobile.
   - Add accessible Markets and Giving dropdowns with links to their overview and supported detail destinations.
   - Add individual public pages for all eight industry subgroups, plus an industry directory, with route-safe TanStack links and unique metadata.
   - Preserve existing public paths such as `/give`, `/auth`, and authenticated Giving detail.

3. **Complete member-aware Giving and auth flows**
   - Keep the public Giving summary, causes, and request flow available to visitors.
   - Keep transparency records and detailed transfer information behind the existing authenticated boundary and server-side authorization.
   - Ensure the admin sign-in path supports the requested simple admin email login and continues to enforce role checks server-side rather than through browser storage.

4. **Finish media and responsive presentation**
   - Use the supplied local mission footage with poster and reduced-motion fallback; remove obsolete hosted-only references.
   - Audit every image/video reference, alt text, lazy loading, and crop so media works on Vercel-style direct loads.
   - Fix the remaining spacing/overflow issues at narrow mobile widths, including headings, stats, cards, map, and the marketplace copy.
   - Preserve the existing palette, square corners, map interaction, and two-column Join layout.

## Technical implementation

- Finish the shared content and section changes in `src/components/kbx/sections.tsx`.
- Update `Nav.tsx`, `Footer.tsx`, and the relevant route files using the existing design primitives and semantic tokens.
- Add a browser-safe centralized industry data module and route files under `src/routes/industries/`; let TanStack Router regenerate the route tree.
- Keep media in `public/media` or existing verified asset imports; do not introduce Lovable-only runtime URLs.
- Keep protected data access in authenticated server functions and preserve the existing role model and auth middleware.
- Add route-specific `head()` metadata for every new or touched content route.

## Verification

- Build succeeds with no route-tree, type, or runtime errors.
- Desktop and 390px mobile checks show no horizontal overflow; screenshots confirm the intended hierarchy, two Story images on desktop, visible map, and working scroll reveals.
- Community navigation, Connecting believers, all eight industry pages, Markets/Giving dropdowns, Join-to-auth, Giving request, and authenticated detail flows work.
- Direct refreshes load for every public route, metadata is unique, all media loads from deploy-safe paths, and no app code references `/__l5e`.