# KBX — Hierarchy and proportion refinement

## Goal

Refine the existing KBX homepage around the identified issue: the composition, palette, and photography are strong, but the type, controls, cards, data, and image moments are too small for the space they occupy. Preserve the current navy/cream/teal/rust visual system, existing photography, square editorial character, and overall section order.

## What will change

1. **Establish a stronger type and spacing scale**
   - Increase the hero display to approximately 64–80px on desktop, major section headings to 44–56px, card headings to 20–24px, body copy to 17–19px, navigation to 14–15px, and buttons to 14–16px.
   - Keep the existing Unbounded / Instrument Sans / JetBrains Mono pairing and light display weight.
   - Replace the current one-size-fits-most spacing with responsive section, content, card, and image spacing tokens: generous on desktop, controlled on mobile, with less empty space between content blocks.
   - Keep the existing focus ring, square corners, hairlines, single form shadow, and reduced-motion behavior.

2. **Give the hero more authority**
   - Rebalance the hero so the headline, lede, and CTA group occupy the available desktop width rather than reading as a small floating text block.
   - Use the clearer two-line hierarchy: “A global kingdom network” / “in the marketplace.”
   - Rename and strengthen the conversion actions to a dominant “Join the KBX Network” CTA and a quieter “Discover KBX” secondary action while keeping the existing anchor destinations.
   - Increase the logo, nav, CTA, and mobile menu scale.
   - Turn the existing hero image transition into a meaningful narrative band with a restrained overlay message about building differently.
   - Add a subtle, non-dominant global network line/node anchor in the hero treatment; no new stock or generated photography.

3. **Make proof and cards readable at a glance**
   - Convert the current hero stats into a clear credibility strip with large values, compact labels, stronger separators, and the existing real/live values rather than invented figures.
   - Rework the mission card area into three larger, more spacious “Connect / Grow / Impact” pillars while retaining the mission’s core message and accountability emphasis.
   - Increase card padding, icon presence, title size, and body line-height across Mission, Vision, Values, Markets, Giving, and Goals.
   - Preserve the neutral hairline grid behavior and the separate color-section card treatment.

4. **Strengthen the cream editorial sections**
   - Update the Vision heading to “Four sides of the KBX ecosystem.” and give its four cards more visual weight.
   - Make the Vision image pair larger and more editorially asymmetric instead of two similarly sized small blocks.
   - Reframe Story as a clearer four-step visual journey with larger timeline titles, readable descriptions, and a more substantial supporting image column.
   - Simplify Values into four primary, high-salience values—Faith, Integrity, Excellence, and Impact—with the remaining value language retained as supporting detail rather than eight equally weighted tiny cards.
   - Enlarge the values image into a visual punctuation band with a concise overlay statement.
   - Apply the same scale and hierarchy treatment to Goals without changing its existing pillar and industry information.

5. **Make Markets and Giving feel like major chapters**
   - Recast Markets around “A network without borders.” with explanatory copy that clearly states the cross-market benefit.
   - Increase the network graphic footprint and add restrained node reveal, line-draw, pulse, and label timing; respect `prefers-reduced-motion`.
   - Keep all current named market data and make the market cards more substantial.
   - Recast Giving as a larger marketplace manifesto, increase the cause cards, simplify the transparency block into readable rows/labels, and make the community image nearly full width with a purposeful overlay.

6. **Turn Join into a real conversion moment**
   - Change the section framing to “Let’s build something meaningful together.” with supporting copy for membership, partnerships, opportunities, events, and general enquiries.
   - Keep the existing two-column composition but give both columns more authority and reduce dead space.
   - Expand the front-end form to First Name, Last Name, Email Address, Company / Organization, reason dropdown, message, and consent.
   - Use “Start the Conversation” as the primary submit action, with inline validation and the existing restrained success state preserved.
   - Do not add persistence or backend behavior in this refinement pass.

7. **Finish the page rhythm**
   - Increase footer logo, navigation, contact/social controls, and copyright scale without making the footer oversized.
   - Add consistent staggered reveal timing for headings, paragraphs, cards, statistics, and image bands; retain subtle image hover zoom and count-up behavior.
   - Verify no text wraps awkwardly, grids overflow, or controls become undersized at the 900px and 600px breakpoints.

## Technical implementation

- Update the shared tokens and type utilities in `src/styles.css` first so the proportion changes remain consistent.
- Update the shared button, image-band, reveal, count-up, and network-motion primitives in `src/components/kbx/primitives.tsx` as needed.
- Apply the new hierarchy and content grouping in `src/components/kbx/sections.tsx`.
- Expand the controlled form fields and validation in `src/components/kbx/JoinForm.tsx`.
- Scale the desktop/mobile navigation and footer in `src/components/kbx/Nav.tsx` and `src/components/kbx/Footer.tsx`.
- Keep route structure, assets, colors, typography families, and backend flows unchanged.

## Acceptance checks

- At a 1280px desktop viewport, every major section reads as intentional content rather than a large empty field around small UI.
- Hero H1, section H2s, card titles, body copy, stats, CTAs, nav, and footer visibly meet the new hierarchy.
- Photography occupies meaningful visual area and the hero, values, and giving bands carry narrative overlays without obscuring subjects.
- Markets communicates a global network immediately and its animation is subtle, legible, and disabled/reduced for motion-sensitive users.
- The Join form is easy to scan, validates every required field, and remains usable on mobile.
- Existing square-corner, hairline, token, focus, accessibility, and responsive rules remain intact.
