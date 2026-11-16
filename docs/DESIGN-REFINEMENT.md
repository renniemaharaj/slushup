# Typography and scroll refinement

The existing SlushUp photography remains the focal point. Preserve the approved hospitality composition while making menus, descriptions and controls readable at normal viewing distance.

## Compact design plan

Palette: Forest #082e22, deep forest #041e17, brand green #2d7f4f, lime #c1ed77, ivory #f5f1e8, ink #17251d. These are the supplied brand direction, rather than a new palette.

Type: local Manrope for headings, reading and controls. A restrained Georgia accent stays in the hero and the closing brand statement. Body copy is 16px, lead copy 16–18px, secondary copy and controls at least 14px. Section headings retain their fluid scale. Reading lines stay under 70 characters.

Layout: retain the left-aligned split services introduction and centered occasion introduction; adjacent photographs carry the transition between sections.

```text
Chosen: existing split composition, clearer reading scale
[ Services heading             Supporting copy ]
[ Mobile bar ][ Cocktails ][ Mocktails ][ Frozen ]
               Occasion heading
[ preview photograph ][ active photograph ][ preview ]

Considered: stacked introduction
[ Heading ]
[ Supporting copy ]
[ Four service cards                         ]
```

The split composition retains the current rhythm and avoids adding vertical space on desktop. It stacks naturally on mobile.

Principles: photography first; legibility over miniature decoration; visible controls; stable scrolling regardless of pointer location. Motion answers interaction, with only the hero introduction and gentle image parallax orchestrated on scroll.

## Review against the supplied guidance

Remove decorative service and mobile-navigation numbering: neither is a sequence. Replace repeated tracked uppercase eyebrows with plain sentence-case section labels, removing redundant labels. Remove italic phrase accents from each section heading, keeping the hero as the single expressive typographic moment. Remove blanket section rise animations. Keep the brand palette and organic section edges because the original brief explicitly specifies them.

## Scroll diagnosis

Before the fix, vertical wheel input was excluded from Lenis over the services and occasions viewports. A native wheel step could interrupt a pending Lenis target; the next animation frame pulled the page back toward that older target. A browser recording reproduced a 243px reversal while scrolling down, and 176–177px reversals while scrolling up. This explains why the issue depended on pointer position and timing.

Both carousels now participate in the same vertical wheel handling as the rest of the page, with only dialogs excluded. Embla still owns horizontal dragging. Lenis anchor handling is disabled so it cannot compete with SvelteKit/browser navigation or apply a second header offset. A scoped anchor handler cancels pending wheel inertia through Lenis's public immediate-scroll API before navigation. The official Lenis stylesheet is loaded, and blanket section reveal transforms were removed in accordance with the supplied design guidance.

Regression tests record actual animation-frame scroll positions while moving the pointer between cards and section space in both directions. They also verify that clicking an anchor during wheel inertia settles below the fixed header without later movement.

## Supplied media integration

Eight new photographs and the Premium Drinks Bar logo were imported from the user's `newimages` folder. The originals are retained with descriptive names under `src/lib/assets/originals`; the temporary root folder was removed after import. Optimized display sources feed the existing responsive AVIF/WebP/JPEG build pipeline. The gallery now contains 28 photos: four bars, seventeen drinks and seven moments, preserving all twenty original gallery entries.

The garden mocktail preparation image anchors the experience composition, paired with a fresh mint drink. The supplied drinks wall appears in Weddings and the blue frozen treat in Birthday Parties. The new strawberry drink display, wall, layered frozen treat, bartender preparation, mint drink and frozen pair lead the gallery; the remaining two new images follow them. The original photographic hero is retained because its landscape composition leaves the headline readable. Header/footer branding, structured data, favicon and touch icon use the supplied logo.
