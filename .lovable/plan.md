# KBX website review implementation plan

## Goal

Refine the KBX website so the narrative starts with community strength and partnership, moves through capacity and kingdom funding, and reaches the marketplace only after that foundation is clear. Preserve the existing navy, cream, teal, rust, gold, editorial typography, square corners, interactive map, and Vercel-safe local media approach.

## User-visible changes

1. **Reorder the homepage story**
   - Keep the hero focused on KBX identity and connection rather than leading with “marketplace.”
   - Place a clear Community / Communities action immediately after Mission.
   - Make “Connecting believers” an obvious clickable entry into the community/subgroups section.
   - Add the short intro/pitch treatment using the supplied Cloudinary footage, with the existing poster and reduced-motion fallback.
   - Keep the marketplace message later in the flow, after partnership, capacity, and funding kingdom work.

2. **Correct the content and proof points**
   - Update the mission sentence to end with “serving in the marketplace.” and remove “for kingdom return.”
   - Remove the internal mission-explanation placeholder copy.
   - Change the Values heading to “We hold ourselves to these values.”
   - Remove “Lagos” from founding references and show “2023” only.
   - Replace the current hero stats with: charities helped — “TBD”; “50+ countries”; “2 chapters”; and “8–10 subgroups.”
   - Replace the outdated global-reach statement with: “KBX launched in London, with members in the US, Canada, Lagos and Scotland, and is growing rapidly.”
   - Keep capital/funding language in the Giving narrative while presenting the public four-C brand story as Character, Capacity, Community, and Connection.

3. **Improve navigation and section access**
   - Add a persistent Community item to desktop and mobile navigation, centered with the existing primary links.
   - Remove duplicate Join navigation; keep Join KBX as the conversion CTA leading to the auth flow.
   - Keep Markets and Giving available as dedicated navigable destinations/dropdowns where the current route structure supports them.
   - Make the four-C/community relationship visible in the Goals or Community presentation and link Community directly to the subgroup content.
   - Ensure all primary destinations have route-safe navigation and unique metadata without breaking existing public URLs.

4. **Make Giving and media member-aware**
   - Add relevant supporting Giving imagery using the existing local media pipeline where suitable.
   - Keep a public summary and mission-level causes visible to visitors.
   - Move detailed imagery, transparency records, and other sensitive Giving detail behind the existing authenticated member boundary.
   - Replace the current mission background video with the supplied video source, stored/deployed in a Vercel-safe way rather than relying on a Lovable-only runtime URL.
   - Audit every image/video reference, alt text, lazy-loading behavior, crop, and direct-route load.

5. **Finish responsive and motion refinement**
   - Fix the remaining contributor spacing issue and test color/contrast at mobile breakpoints.
   - Keep the map, “marketplace” copy, headings, stats, and cards inside the viewport at mobile widths.
   - Retain restrained scroll reveals, staggered card entrances, map node motion, and reduced-motion fallbacks.
   - Preserve the two-image Story treatment on desktop and verify all image crops remain intentional on mobile.

## Technical implementation

- Update shared copy/data arrays and section composition in `src/components/kbx/sections.tsx`.
- Update shared navigation and footer behavior in `src/components/kbx/Nav.tsx` and `src/components/kbx/Footer.tsx`.
- Reuse the existing `Reveal`, `VideoBackdrop`, `MarketsMap`, asset registry, and semantic KBX tokens rather than introducing a second visual system.
- Add or adjust public route files only where a section needs a shareable destination; let TanStack Router regenerate the route tree.
- Keep authenticated Giving detail behind the existing `_authenticated` route boundary and use server-side authorization for any data access.
- Import the supplied video into the project media flow, remove obsolete placeholder references, and verify direct Vercel-style route loads.
- Update leaf route metadata for every public page touched.

## Verification

- Desktop and mobile screenshots at the current preview size plus a narrow phone width show no horizontal overflow.
- Community is reachable from the persistent nav and from the Connecting believers block.
- Mission, Values, founding, reach, and stats copy match the approved wording, with charity count shown as “TBD.”
- The replacement video plays when motion is allowed and falls back to the poster when motion is reduced.
- Public Giving does not expose member-only imagery or detailed records; authenticated members can still reach the protected detail view.
- Story shows two desktop images, all images load from deploy-safe project media, and no app reference depends on a Lovable-only asset URL.
- Build, direct route refreshes, map interaction, auth redirects, and metadata checks complete without errors.
