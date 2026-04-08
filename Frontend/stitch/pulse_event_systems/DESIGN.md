# Design System Strategy: The Kinetic Curator

## 1. Overview & Creative North Star
The "Kinetic Curator" is our creative North Star. In the world of event management, chaos is the default state; this design system acts as the sophisticated lens that brings order to that energy. We are moving away from the "SaaS-dashboard-template" look—characterized by rigid boxes and endless grey dividers—and moving toward a **High-End Editorial** experience.

The system utilizes **intentional asymmetry** and **tonal depth** to guide the user’s eye. We treat the interface not as a flat screen, but as a physical space with layered surfaces. By leveraging wide margins (generous whitespace), dramatic typographic scales, and overlapping elements, we create a sense of momentum and "vibrant organization."

## 2. Colors & Surface Philosophy
Our palette balances the authority of Deep Indigo (`primary`) with the refreshing vitality of Energetic Teal (`secondary`). 

### The "No-Line" Rule
To achieve a premium, custom feel, **1px solid borders are strictly prohibited for sectioning.** We define boundaries through background color shifts.
*   **Contrasting Sections:** Use a `surface-container-low` (`#f4f2fc`) section sitting on a `surface` (`#fbf8ff`) background to define content blocks.
*   **Nesting Depth:** Treat the UI as stacked sheets of fine paper. An inner card (`surface-container-lowest`: `#ffffff`) should sit on a wrapper (`surface-container`: `#efedf6`). This creates organic hierarchy without visual clutter.

### The "Glass & Gradient" Rule
Flat colors can feel static. To inject "soul":
*   **Signature Textures:** Use subtle linear gradients for primary CTAs, transitioning from `primary` (`#24389c`) to `primary_container` (`#3f51b5`) at a 135-degree angle.
*   **Glassmorphism:** For floating navigation bars or overlay modals, use a semi-transparent `surface` color with a `backdrop-blur` of 20px. This allows the vibrant teal and indigo accents to bleed through the UI, softening the experience.

## 3. Typography: The Editorial Voice
We use a dual-font strategy to balance character with readability.

*   **Display & Headlines (Manrope):** This is our "Editorial" voice. Manrope’s geometric yet warm curves provide a modern, high-end feel. Use `display-lg` (3.5rem) for hero sections to create a bold, confident entry point.
*   **Body & Labels (Inter):** Inter is our "Functional" voice. It provides maximum legibility for dense event data, schedules, and attendee lists.
*   **Hierarchy as Identity:** Use tight tracking (letter-spacing: -0.02em) on headlines to feel "designed" and professional. Increase line-height on `body-lg` (1.6) to lean into the high-end editorial aesthetic.

## 4. Elevation & Depth
In this system, depth is earned through **Tonal Layering**, not structural lines.

*   **The Layering Principle:** 
    *   Base Layer: `surface` (#fbf8ff)
    *   Content Grouping: `surface-container-low` (#f4f2fc)
    *   Interactive Cards: `surface-container-lowest` (#ffffff)
*   **Ambient Shadows:** If a card must "float" (e.g., a draggable event tile), use an extra-diffused shadow: `offset-y: 12px, blur: 40px, spread: -4px`. The shadow color must be a tinted `on-surface` at 6% opacity, never pure black.
*   **The "Ghost Border" Fallback:** If a layout requires a boundary for accessibility, use a "Ghost Border": the `outline-variant` (`#c5c5d4`) at **15% opacity**. It should be felt, not seen.

## 5. Components

### Buttons
*   **Primary:** A gradient of `primary` to `primary_container`. Corner radius: `md` (0.75rem). This "soft-square" look feels more custom than standard rounded pills.
*   **Secondary:** Solid `secondary_fixed` (`#68fadd`) with `on_secondary_fixed` (`#00201a`) text. Use this for high-energy "Create" actions.
*   **Tertiary:** No background. Use `primary` text with a subtle `surface-container-high` background on hover.

### Cards & Event Tiles
*   **Strict Rule:** No dividers. Separate the header from the body using a vertical spacing of `1.5rem` (`xl`) or a subtle shift from `surface-container-lowest` to `surface-container-low` for the card footer.
*   **Radius:** Use `lg` (1rem) for main containers to maintain a soft, approachable vibe.

### Input Fields
*   **Style:** Minimalist. No bottom border or full box. Use a subtle `surface-container-high` background with a `sm` (0.25rem) radius.
*   **Focus State:** Transition the background to `surface-container-lowest` and add a 2px `primary` "Ghost Border" (20% opacity).

### Specialized Event Components
*   **Status Chips:** Use `secondary_container` for "Live" events and `tertiary_fixed` for "Urgent/Cancelled." Chips should use the `full` (9999px) radius for maximum contrast against rectangular cards.
*   **Timeline Trackers:** Instead of a line, use a series of staggered `surface-container-highest` blocks to show progress, creating a rhythmic, asymmetrical flow.

## 6. Do’s and Don’ts

### Do
*   **Do** use extreme whitespace. If a section feels "busy," double the padding.
*   **Do** lean into the "Vibrant Teal" (`secondary`) for micro-interactions, like checkbox fill-ins or loading bars, to keep the energy high.
*   **Do** use `manrope` for numbers. Large, bold numbers in Manrope create a sophisticated data-viz look.

### Don’t
*   **Don’t** use pure black (#000000) for text. Use `on_surface` (#1a1b22) to maintain a soft, premium feel.
*   **Don’t** use 1px dividers to separate list items. Use vertical padding and `surface-variant` tonal shifts.
*   **Don’t** center-align everything. Use left-aligned "Editorial" layouts with generous left-hand margins to create an organized, intentional asymmetry.