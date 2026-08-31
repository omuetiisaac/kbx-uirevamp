# KBX navigation, responsive markets, and member access

## Goal
Turn the current single-scroll KBX presentation into a routed, responsive site while preserving the approved visual direction, photography, typography, and square-corner design language.

## Changes

1. **Responsive layout and hierarchy**
   - Fix the mobile Markets/“Marketplace” overflow so every heading, map, card, and control stays inside the viewport.
   - Make the Mission A–F breakdown materially more prominent with larger markers, stronger headings, and clearer spacing while keeping the six-part structure.
   - Remove the “Kingdom Business Connections” text beside the mark in the desktop navigation and footer; keep the mark and accessible alt text.
   - Center the desktop navigation links between the logo and CTA, and remove the duplicate Join navigation item.
   - Add a real hero image treatment so the first viewport communicates both the KBX identity and its people; preserve the existing hero image as a visible, responsive asset.
   - Keep only two Story images in desktop view and ensure all image crops remain visible and intentional on mobile and desktop.

2. **Routed navigation and dropdowns**
   - Replace the current hash-only primary navigation with top-level, shareable routes for the main content groups: Mission, Story, Values, and Goals.
   - Make Markets and Giving parent navigation items with accessible dropdown menus and dedicated child pages for their overview/content views.
   - Keep the home page as a concise overview with clear links into the routed sections rather than duplicating every full section indefinitely.
   - Remove Join from the nav; all membership entry points use the existing “Join KBX” / membership CTA.
   - Add route-specific metadata for every new public page and preserve the existing public URLs where possible.

3. **Markets map and industry groups**
   - Port the uploaded `kbx_interactive_world_map.html` into a React-safe Markets experience using its baked world SVG, marker positions, tooltip behavior, active/next chapter legend, and chapter cards.
   - Remove runtime dependence on external GSAP animation and REST Countries flag fetching; use local chapter data and CSS motion with reduced-motion support so the map works reliably on Vercel and in restricted previews.
   - Make the SVG frame responsive with stable aspect-ratio sizing, touch-friendly marker targets, and a non-hover fallback for mobile.
   - Give each of the eight industry subgroups its own distinct icon illustration and dedicated content treatment:
     Financial services, Technology, Real estate & construction, Energy, Healthcare, Trade & logistics, Agriculture, and Professional services.
   - Use the industry group pages/cards as real navigable destinations rather than plain text-only list items.

4. **Vercel-safe image delivery**
   - Move the currently referenced photography, logo, poster, and video away from `/__l5e` asset-pointer URLs into build-local static assets that are included in the deployed app.
   - Update the media registry and all image/video references so no visual depends on a Lovable-only CDN path.
   - Verify each asset loads on direct route visits and at responsive breakpoints, with dimensions, alt text, lazy loading, and hero priority applied appropriately.

5. **Authentication and member dashboard**
   - Change the auth surface to support email/password sign-in for the supplied administrator account while keeping ordinary member access available for users who sign up.
   - Provision the administrator account and grant its role through the separate roles table; do not use client storage, hardcoded client credentials, or a role field on the user record.
   - Route “Join KBX” to the public auth page, then send signed-in members to a protected `/dashboard` route.
   - Build a simple member dashboard with the signed-in member’s email, membership/application status where available, links to relevant KBX actions, and a reliable sign-out path.
   - Keep `/admin` protected by the existing authenticated layout plus a server-enforced admin-role check, and remove the first-account self-claim path in favor of the explicit admin account.
   - Configure auth so password sign-in and member sign-up work without enabling automatic email confirmation unless required by the current project settings.

## Technical implementation

- Add focused route files under `src/routes/` and use TanStack Router `Link` navigation; do not edit the generated route tree.
- Split reusable section content into page components so the home overview and routed pages share one source of truth.
- Add a reusable dropdown navigation component with keyboard focus, Escape handling, outside-click dismissal, and a mobile accordion equivalent.
- Keep all new colors, borders, typography, and states on the existing KBX semantic tokens; avoid introducing a second visual system.
- Keep private admin/member operations behind authenticated server functions and role checks; use the existing backend tables and RLS model.
- Validate the supplied admin credentials through the managed auth configuration rather than placing them in source code.

## Verification

- Check desktop and mobile layouts for overflow, especially the Marketplace/Markets map, dropdowns, hero media, industry cards, and Story image count.
- Test direct navigation and refreshes for every new route, including Vercel-style deep links.
- Test map marker interaction by mouse, keyboard, and touch-sized controls; confirm reduced-motion behavior.
- Test Join KBX → auth → dashboard, admin sign-in → `/admin`, non-admin denial, and sign-out cache cleanup.
- Confirm there are no remaining app references to `/__l5e` image/video URLs and that the build completes cleanly.
