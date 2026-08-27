

---

# KITS One — Inception Design System + Dieter Rams Visual Overhaul

**REPO:** `E:\Web Dev\URR24 Calc`
**STACK:** HTML + Vanilla JavaScript + Tailwind CSS
**NO component library.**

You are redesigning the **visual design system** of KITS One, not rebuilding the application.

The current application is functionally mature and its information architecture should be preserved. The objective is to replace its current generic "Indigo SaaS / AI dashboard" aesthetic with a **restrained, editorial, engineering-tool aesthetic inspired by the Inception color palette and Dieter Rams' principles of good design.**

Do not remove or alter existing functionality.

---

## 1. Core Design Philosophy

The redesign should follow these principles:

### Less, but better.

Do not decorate the interface simply because space is available.

Every:

* card
* border
* shadow
* background
* gradient
* rounded container
* badge
* icon
* accent
* animation

must have a functional or hierarchical reason to exist.

### Do not treat every section as a card.

This is the most important change.

The current UI relies heavily on nested rounded containers:

> page → card → sub-card → highlighted card → pill → button

This makes the interface feel like a generic AI-generated SaaS dashboard.

Instead, use:

* whitespace
* typography
* alignment
* subtle dividers
* restrained borders
* grouping
* hierarchy

to communicate structure.

**If a section can be understood without a surrounding box, remove the box.**

Do not simply replace `rounded-2xl` with `rounded-lg` everywhere. Reconsider whether the container needs to exist in the first place.

---

# 2. Locked "Inception" Color Palette

Replace the existing Indigo/Slate visual identity with this palette.

**Do not invent replacement brand colors.**

### Brand palette

| Token        | Hex       | Intended role                                     |
| ------------ | --------- | ------------------------------------------------- |
| `primary`    | `#173541` | Primary structural color, headings, major actions |
| `secondary`  | `#557C86` | Secondary text, supporting UI                     |
| `tertiary`   | `#7299A8` | Supporting accents and subtle emphasis            |
| `light-teal` | `#85ADBB` | Light surfaces, subtle tints, backgrounds         |
| `accent`     | `#B49796` | Rare highlight / special accent                   |
| `background` | `#FAFAF8` | Main application background                       |

### Typography colors

Primary text should use:

`#173541`

Secondary text should use:

`#557C86`

Muted text may use opacity variations of the palette rather than introducing arbitrary gray colors.

### Important

**Do not distribute the five colors equally.**

The interface should remain predominantly warm-neutral and deep slate.

Suggested visual hierarchy:

* Background / neutral surfaces: dominant
* `#173541`: primary structural color
* `#557C86` / `#7299A8`: secondary hierarchy
* `#85ADBB`: subtle surface tint
* `#B49796`: rare accent

The dusty rose must feel **special**.

Do not turn every button, badge, border, and heading dusty rose.

---

# 3. Functional Colors Stay Semantic

Do not force the Inception palette onto functional status.

Keep semantic colors separate.

### Success

Use a restrained emerald/green.

### Warning

Use amber/yellow.

### Error / danger

Use a clear red.

Do not use `#B49796` as an error color because the dusty rose is already part of the brand palette.

Functional states must remain immediately distinguishable from brand styling.

---

# 4. Remove the Generic Indigo Identity Completely

Search the entire codebase.

Remove/replace:

* `indigo-*`
* `brand-*`
* `from-indigo-*`
* `to-indigo-*`
* Indigo gradients
* Indigo glow effects
* Indigo focus rings
* Indigo button treatments
* Indigo active states
* Indigo decorative backgrounds

Do not simply recolor a few visible components.

Audit the **entire application**.

Pay particular attention to:

* `app.js`
* `attendance.js`
* `ese-calculator.js`
* `help.js`
* all HTML
* `css/input.css`
* `tailwind.config.js`

If an old Indigo value is used for a legitimate functional reason, evaluate it individually rather than blindly replacing it.

---

# 5. Border Radius System

Establish a strict radius hierarchy.

### Controls

Buttons, inputs, selects, tabs:

**8px (`rounded-lg`)**

### Listing / feature surfaces

Use:

**8–12px (`rounded-lg` / `rounded-xl`)**

### Major containers

Maximum:

**16px (`rounded-2xl`)**

### Pills

`rounded-full` is allowed only where the shape is semantically appropriate:

* status indicators
* compact badges
* tags
* genuinely pill-shaped controls

### Absolute rule

**Nothing should exceed 16px radius.**

But more importantly:

> Do not add a radius merely because a container exists.

A section may simply have:

* no background
* no border
* whitespace
* a divider

and therefore require **zero radius**.

Search the entire codebase for every `rounded-*` occurrence and manually evaluate whether its usage follows the design system.

---

# 6. Cards and Containers

This is a major redesign area.

The current application uses card-based hierarchy extensively.

Do not eliminate cards completely. Instead, establish three levels:

### Level 1 — Structural

Used only when an actual surface boundary is necessary.

Example:

* major calculator workspace
* modal
* important result region

Use:

* subtle border
* restrained radius
* minimal/no shadow

### Level 2 — Informational

Prefer:

* whitespace
* typography
* divider
* subtle background tint

instead of a floating card.

### Level 3 — Content

Tables, subject rows, controls, etc. should generally live directly within their parent section rather than becoming individually floating cards.

**Avoid nested cards.**

Bad:

```text
Card
 └── Card
      └── Card
           └── Button
```

Preferred:

```text
Section
 ├── heading
 ├── controls
 ├── divider
 └── content
```

---

# 7. Shadows

Remove the current "floating SaaS" feeling.

The current system uses:

* card drop shadows
* Indigo glow shadows
* button glow
* large modal shadows

Replace these with a much more restrained elevation model.

### Default

Prefer:

**no shadow**

Use borders and whitespace for separation.

### Major interactive surfaces

A very subtle shadow may be used where elevation is necessary.

### Primary buttons

**No glow.**

Do not use:

```text
shadow-indigo-*
box-shadow: 0 0 28px ...
```

Buttons should look like physical controls, not glowing SaaS components.

---

# 8. Typography

Keep **Inter** as the primary typeface unless there is a compelling technical reason not to.

However, change how it is used.

The goal is **typographic hierarchy rather than decorative hierarchy.**

### Page title

Strong, large, restrained.

### Section titles

Clear and confident.

### Labels

Use uppercase tracking sparingly.

Do not make every piece of text an uppercase overline.

### Numbers

The calculator outputs are the most important information on the page.

Large numbers such as:

* attendance percentage
* SGPA
* CGPA
* target values

should receive strong typographic hierarchy.

Let typography create emphasis rather than putting every important number inside a colorful rounded rectangle.

---

# 9. KITS One Header

Current:

```text
KITS One
Academic Companion • URR24-R25 Regulations
```

Keep the basic information architecture.

Redesign the visual treatment to feel more like a **serious academic utility** than a SaaS dashboard.

Use:

* `#173541`
* warm background
* strong typography
* subtle divider

Avoid:

* excessive rounded containers
* gradient logos
* glowing buttons
* unnecessary pills

The regulation selector and theme toggle remain functional controls and should follow the 8px control radius.

---

# 10. Navigation / Tabs

The existing tab navigation should become much lighter.

Avoid a giant rounded segmented-control appearance.

Use something closer to an editorial navigation system:

```text
Bunk Buffer    ESE Planner    SGPA Calculator    Target Planner    CGPA Converter
──────────
```

Active state can use:

* `#173541`
* subtle `#B49796` accent
* underline
* weight change

Do not surround every tab with its own rounded pill.

The active state should be obvious without looking like a button.

---

# 11. Bunk Buffer

This is the most important screen to redesign carefully.

Preserve all existing functionality.

### Branch / Semester controls

Use clean form controls.

8px radius.

No excessive card wrapping.

### Overall Attendance

This is the primary visual metric.

Instead of relying on a large Indigo-filled card, make the percentage itself the hero.

For example:

```text
OVERALL ATTENDANCE

        0.00%

       0 / 0 classes
```

The surrounding container should be visually restrained.

The number should do most of the work.

### Buffer Status

Use typography and semantic color when appropriate.

Do not make it another giant colorful card competing with the attendance percentage.

### Quick Mode

Keep the functionality and explanation.

Reduce nested container styling.

The "Auto Fill From UMS" action should be a strong, clear button without glow effects.

### "If next X classes are held?"

Treat it as an interactive utility row rather than a floating card.

---

# 12. Attendance Table

The attendance table should feel like a **tool**, not a collection of cards.

Prioritize:

* alignment
* readable columns
* clear row hierarchy
* subtle separators
* strong numerical typography

Avoid excessive:

* rounded row containers
* shadows
* badges
* decorative backgrounds

Attendance states may still use semantic colors where necessary.

---

# 13. ESE Planner / SGPA / Target Planner / CGPA Converter

Apply the same system consistently.

Do not redesign each calculator independently.

They should feel like **different tools belonging to the same product**.

Use a shared visual language:

* same typography
* same control radius
* same spacing rhythm
* same borders
* same palette
* same button treatment
* same result hierarchy

Results should receive emphasis through:

**scale + typography + spacing**

before:

**color + containers.**

---

# 14. Buttons

Primary buttons:

* `#173541`
* white/light text
* `rounded-lg`
* no glow
* subtle hover state

Secondary buttons:

* warm neutral / subtle border
* `rounded-lg`

Do not use multiple visually competing button styles.

A button should look like a button.

---

# 15. Inputs and Selects

Inputs:

* 8px radius
* restrained border
* warm neutral background where appropriate
* clear focus state

Focus rings should use the Inception palette rather than Indigo.

Do not make inputs excessively rounded.

They should feel like **tools**, not mobile banking widgets.

---

# 16. Quick Links

The current footer links use pill-like Indigo treatments.

Reconsider whether they need pills at all.

Prefer:

```text
Courseweb    UMS Login    Exam Results    URR-24 Rules
```

with restrained text/link styling or small 8px controls.

Do not turn every link into a capsule.

---

# 17. Help FAB

Keep the floating help button functional.

It may remain circular because a floating action button is semantically appropriate.

However:

* remove unnecessary glow
* use `#173541`
* use restrained shadow
* keep it visually secondary to the actual application

---

# 18. Dark Mode

Preserve dark mode functionality.

Do not simply invert the light palette.

Create a dark interpretation of the Inception system while maintaining the same identity.

Use deep slate/navy rather than generic Zinc + Indigo.

The same hierarchy should remain:

* primary structure
* secondary teal
* restrained accent
* semantic states

Dark mode should feel like **the same product at night**, not a completely different theme.

---

# 19. Animation and Motion

Preserve useful existing transitions.

Remove decorative motion whose only purpose is visual excitement.

Animations should communicate:

* navigation changes
* state changes
* feedback
* loading

Do not add:

* bouncing elements
* floating cards
* glowing transitions
* unnecessary scale effects

Motion should be quick and nearly invisible when not needed.

---

# 20. Dieter Rams Checklist

Before considering the redesign complete, evaluate the interface against these principles:

### Good design is innovative

Do not imitate generic SaaS dashboards.

### Good design makes a product useful

Visual changes must improve comprehension rather than merely look different.

### Good design is aesthetic

The interface should feel considered and coherent.

### Good design makes a product understandable

Hierarchy should be immediately obvious.

### Good design is unobtrusive

The interface should disappear behind the tool.

### Good design is honest

Do not use visual effects to imply functionality that doesn't exist.

### Good design is long-lasting

Avoid trendy gradients, excessive glassmorphism, oversized pills, and decorative UI patterns.

### Good design is thorough

Small details such as spacing, focus states, tables, and empty states must belong to the same system.

### Good design is environmentally friendly

Avoid unnecessary visual complexity and unnecessary rendering effects.

### Good design is as little design as possible

**This is the guiding principle for this redesign.**

---

# 21. Critical Constraint: Do Not Break Functionality

This is a **visual design-system overhaul**.

Do NOT:

* remove calculators
* change calculation logic
* change attendance calculations
* change regulation logic
* change local storage behavior
* change navigation behavior
* remove dark mode
* change URLs
* change external links
* remove existing features

Unless a change is absolutely necessary for the visual system, leave the underlying functionality untouched.

---

# 22. Code Quality

Do not solve this by scattering arbitrary inline styles throughout the project.

Create/update centralized design tokens where practical.

Prefer:

* CSS variables
* Tailwind theme configuration
* reusable utility classes
* existing theme bridge architecture

The existing CSS variable system should be reused rather than creating a second competing theme architecture.

Avoid duplicating color values across dozens of files.

---

# 23. Verification

After implementation:

### Search

Verify there are no unintended remaining:

```text
indigo-*
brand-*
from-indigo-*
to-indigo-*
```

Search for all:

```text
rounded-*
shadow-*
```

and manually verify they follow the new system.

### Colors

Verify the old Indigo brand is completely removed from the visual design.

Verify the locked Inception palette is being used consistently:

```text
#173541
#557C86
#7299A8
#85ADBB
#B49796
#FAFAF8
```

No new brand colors should be introduced.
No emojis should be used. No em dashes should be used. remove if any.
### Visual verification

Run the application and inspect:

1. Bunk Buffer
2. ESE Planner
3. SGPA Calculator
4. Target Planner
5. CGPA Converter
6. Attendance table with populated data
7. Empty/default states
8. Dark mode
9. Help FAB
10. Footer / quick links

Check both desktop and mobile layouts.

### Build

Run the project's normal build process and ensure there are no errors.

---

# 24. Final Report

Before finishing, report:

### Files changed

List every modified file.

### Design-system changes

Briefly summarize:

* palette
* typography
* radius
* shadows
* cards
* navigation
* buttons
* forms
* dark mode

### Removed

List:

* old Indigo references
* gradients
* glow effects
* unnecessary rounded containers
* other generic SaaS patterns removed

### Preserved

Confirm that:

* calculation logic
* attendance logic
* regulation logic
* navigation
* dark mode
* existing features

remain intact.

**Do not commit or push to Git. Stop after implementation and verification so I can review the result first.**

---

### One final instruction to Claude

**Do not interpret "Inception theme" as making the interface dark, cinematic, or movie-themed.**

The reference is the **color palette and its restrained atmosphere**, not literal movie aesthetics.

The final product should feel like:

> **a beautifully designed academic engineering utility**

not:

> **a movie-themed website.**

---

That's the prompt I'd use.

And honestly, **this is the right moment to do it**. Your current KITS One screenshot already has good information architecture; the biggest problem is that the visual system makes everything compete for attention. The redesign should make the *information* feel premium rather than making the *containers* feel premium.

One thing I'd be especially strict about with Claude: **don't let it turn the Inception palette into another five-color SaaS theme.** The magic is that `#B49796` appears *rarely*. When that dusty rose shows up, your eye should notice it.
