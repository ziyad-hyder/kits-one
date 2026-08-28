# KITS One — Design System Rework

Rework the UI to match the design system below. Do not deviate, do not "improve" with extra decoration, and do not reintroduce indigo, gradients, or the previous rounded-everything look anywhere in the codebase — including states you didn't see in the reference screenshots (hover, focus, disabled, error, loading, empty states).

## Philosophy (read first, apply throughout)

Dieter Rams' "less, but better" as a functional constraint, not a vibe:
- Every container must have a reason to exist — it groups related information or is an interactive surface. If removing a card/box loses no information or interactivity, remove it.
- Do not interpret minimalism as removing all containers. Preserve grouping where it improves information architecture.
- Establish hierarchy with typography, spacing, alignment, contrast, and borders — not shadows, gradients, or visual effects.
- The user should notice their attendance, their SGPA, their target — not the UI. Design disappears behind the data.

**Explicitly forbidden, everywhere in the app:**
- Gradients (backgrounds, buttons, cards — none)
- Large/soft box-shadows (a 1px border does the job a shadow was doing)
- Excessive rounded corners on every element ("everything is a rounded pill" look)
- Indigo/blue-violet as a UI color, anywhere
- Decorative icons that don't carry information (no icon-for-the-sake-of-icon)
- "Everything is a floating card" pattern — flat sections with borders/dividers are often correct

## Color system

One accent does UI signaling. One accent, used rarely, marks a computed result. Everything else is neutral.

**Roles:**
- Neutral (navy/slate) — ~80% of the UI: backgrounds, text, borders, default surfaces, primary buttons.
- Teal — ~15%: active tab indicator, focus rings, small functional icons, links. UI-state signal only. Teal must never fill a button or a large surface.
- Coral/rose — ~5%: reserved *exclusively* for a computed result the user came to see (attendance %, estimated SGPA, converted CGPA, required SGPA). Never on buttons, inputs, tabs, nav, or as a static "theme" color. It only appears once a real result exists — not on empty/placeholder states.

**Dark mode**
| Role | Hex |
|---|---|
| Background | `#10202A` |
| Card / input fill | `#17303B` |
| Border | `#244552` |
| Primary text | `#EAEFF1` |
| Secondary text | `#5F8695` |
| Input text | `#C4D5DA` |
| Teal (accent) | `#5CA3A6` |
| Coral (result only) | `#C9827D` |
| Text on coral fill | `#3A1F1D` / `#4A2A28` |
| Primary button fill | `#EAEFF1` (light-on-dark, not teal, not coral) |
| Primary button text | `#10202A` |

**Light mode**
| Role | Hex |
|---|---|
| Background | `#F4F6F6` |
| Card fill | `#FFFFFF` |
| Border | `#D6DCDD` / `#E0E5E6` |
| Primary text | `#152730` |
| Secondary text | `#6D8993` |
| Input text | `#374C53` |
| Teal (accent) | `#4C8C90` |
| Coral (result only) | `#C9827D` (identical in both modes — the one constant) |
| Text on coral fill | `#3A1F1D` / `#4A2A28` |
| Primary button fill | `#152730` |
| Primary button text | `#FFFFFF` |

Kill the amber "URR-24 Rules" pill's off-palette yellow — make it a plain neutral pill identical to the other quick-link pills. If an "external reference" distinction is genuinely needed later, that's a separate decision, not a leftover accent color.

## Where coral goes — one rule, five tabs

Coral marks the *hero computed result* on each tab, and nothing else on that tab:

| Tab | Coral | Stays neutral |
|---|---|---|
| Bunk Buffer | Overall Attendance % card | Auto Fill button, Buffer status card |
| ESE Planner | Estimated SGPA (once calculated) | Calculate button, subject input cards |
| SGPA Calculator | the computed result | input fields, Calculate button |
| Target Planner | Required SGPA (once populated — not the "Enter details to calculate" placeholder state) | Calculate button |
| CGPA Converter | the converted result (once populated) | input field, Convert button |

If a screen doesn't have exactly one hero result, it doesn't get coral — leave it fully neutral rather than inventing a place to put the accent.

## Radius system — flatten the silhouette

Replace the current "everything is heavily rounded" look with an architectural, boxier scale:

- App/page shell: `16px`
- Cards / input fields: `8–12px`
- Buttons / tabs: `8px`
- Pills (quick-link chips only): `9999px` — pills are the *only* fully-rounded element left; their pill shape is now meaningful contrast, not decoration
- No other element should use a radius above 12px. Audit every container in the codebase against this — if something is using a large/default rounded-xl or similar, bring it down.

## Typography

Swap the current font to **Inter** or **Manrope** (pick one, apply consistently — don't mix). Do not use any Anthropic-branded or proprietary font. Keep weight usage restrained: one weight for headings/results (500–600), one for body/labels (400), no more than that.

## Buttons

Primary action buttons are solid neutral fills (see table above) — never teal, never coral, never gradient. Secondary/quick-link buttons are neutral outline or muted fill. Coral and teal are never button colors.

## Execution notes for Claude Code

1. Locate the existing theme/token file(s) (Tailwind config, CSS variables, or theme object) and replace the color tokens wholesale rather than patching individual components — this is a token-level change, not a per-component paint job.
2. Audit every `rounded-*` / border-radius usage across components and reconcile against the radius scale above.
3. Search the codebase for any remaining indigo/violet hex values or gradient declarations (`bg-gradient-*`, `box-shadow` with large blur/spread) and remove them.
4. Apply the coral-only-on-result rule as a conditional style (e.g., a `hasResult` state), not a static class, so empty/placeholder states never show coral.
5. Do this for both light and dark themes, keeping the coral value identical across both as specified.
6. After the change, do a self-check: on each of the 5 tabs, coral should appear in exactly one place (or zero, if no result is computed yet), teal should appear only on active-tab/focus/small icons, and nothing should be indigo, gradient, or heavily rounded.
