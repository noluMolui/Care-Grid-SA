---
name: CareGrid Mobile System
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#3e4946'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#6e7a76'
  outline-variant: '#bdc9c5'
  surface-tint: '#006b5d'
  primary: '#005f53'
  on-primary: '#ffffff'
  primary-container: '#0b7a6b'
  on-primary-container: '#aaffed'
  inverse-primary: '#7cd7c5'
  secondary: '#556158'
  on-secondary: '#ffffff'
  secondary-container: '#d9e6da'
  on-secondary-container: '#5b675e'
  tertiary: '#ad0010'
  on-tertiary: '#ffffff'
  tertiary-container: '#d41f21'
  on-tertiary-container: '#ffebe8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#98f3e0'
  primary-fixed-dim: '#7cd7c5'
  on-primary-fixed: '#00201b'
  on-primary-fixed-variant: '#005046'
  secondary-fixed: '#d9e6da'
  secondary-fixed-dim: '#bdcabe'
  on-secondary-fixed: '#131e17'
  on-secondary-fixed-variant: '#3e4a41'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#ffb4ab'
  on-tertiary-fixed: '#410002'
  on-tertiary-fixed-variant: '#93000b'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  title:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
  subheading:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-semibold:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  caption-medium:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.5rem
  space-sm: 1rem
  space-md: 1.5rem
  space-lg: 2rem
  space-xl: 3rem
---

## Brand & Style
The design system establishes a calming, clinical-yet-warm digital environment built for mobile care coordination, health monitoring, and rapid support. The audience includes home caregivers, field practitioners, and patients who require high legibility, reassurance, and unambiguous interactive feedback under cognitive load or physical stress.

The visual style blends modern corporate clarity with tactile, soft-edged ergonomics:
- **Calm & Grounded:** Clean off-white canvases remove visual noise, while deep mineral teals anchor authority without the cold sterility of institutional blue.
- **Empathetic Utility:** Touch surfaces provide generous tap targets (minimum 48px), high contrast ratios exceeding WCAG AA standards, and gentle surface contrasts that convey quiet order.
- **Urgent Clarity:** Critical actions (alerts, medication lapses, SOS triggers) sit strictly apart from routine interactions, using pure, unambiguous emergency signaling.

## Colors
The color palette focuses on visual ergonomics and strict accessibility against the off-white canvas.

### Core Roles
- **Primary (`#0B7A6B` Deep Teal):** The functional anchor for interactive elements, top-level navigation states, selected states, and confirmed actions. Achieves > 4.5:1 contrast against `#F8FAFC` and pure white.
- **Secondary / Accent (`#E8F5E9` Soft Sage):** Low-saturation background tint for interactive containers, selected pill states, success banners, and tonal chips. Provides soft contrast without eye fatigue.
- **Tertiary / Destructive (`#DC2626` Emergency Red):** Dedicated exclusively to SOS functions, health anomaly warnings, critical alerts, and destructive actions.
- **Neutral / Text (`#1E293B` Dark Slate):** Used for primary typography, icons, and high-emphasis labels. Secondary text shifts to a muted slate tint (`#64748B`), maintaining readable hierarchy.
- **Background (`#F8FAFC` Clean Off-White):** Canvas background preventing screen glare while separating cleanly from `#FFFFFF` card surfaces.
- **Surface (`#FFFFFF` Pure White):** Used for elevation cards, actionable sheets, and inputs to create foreground separation.

## Typography
Typographic scale and rhythm rely entirely on **Inter** to ensure maximum legibility at small viewport scales and varying screen densities.

- **Title (22px / 28px Line Height / Bold):** Used for view headers, bottom sheet titles, and high-level card section anchors.
- **Subheading (18px / 24px Line Height / Semi-Bold):** Applied to list groups, modal headers, module titles, and critical patient metrics.
- **Body (16px / 24px Line Height / Regular & Semi-Bold):** Primary text size for all descriptions, instructional steps, list entries, and input fields.
- **Caption (12px / 16px Line Height / Regular & Medium):** Reserved for timestamps, status metadata, badge text, and secondary helper hints under form controls.

## Layout & Spacing
The layout adheres strictly to an **8px base grid** optimized for mobile Progressive Web Apps (PWAs).

- **Screen Margins:** Fixed at `16px` (`space-sm`) on left and right borders to maximize screen real estate on compact viewports while preserving edge padding.
- **Grid Structure:** Single-column flow with contextual two-column splits for metric summaries or quick-action pairs.
- **Vertical Rhythm:** 
  - `8px` (`space-xs`) between tightly coupled elements (icon to label, title to caption).
  - `16px` (`space-sm`) for intra-card component padding and standard stack gaps.
  - `24px` (`space-md`) between distinct card sections, grouped lists, and form groupings.
  - `32px` (`space-lg`) for major semantic divisions.
- **PWA Safe Areas:** Top margins must respect mobile status bar safe-area insets (`env(safe-area-inset-top)`), and fixed bottom bars must reserve an additional offset for home indicator overlays (`env(safe-area-inset-bottom)`).

## Elevation & Depth
Depth is constructed through subtle tonal layering and soft ambient light rather than harsh structural borders:

- **Base Layer (Level 0):** Background surface in `#F8FAFC`.
- **Card Layer (Level 1):** Foreground cards in pure white (`#FFFFFF`) layered on Level 0. Supported by a diffused, low-opacity shadow: `0px 2px 8px rgba(30, 41, 59, 0.04)`.
- **Floating Overlays & Sheets (Level 2):** Bottom sheets, sticky navigation bars, and persistent action strips: `0px 4px 16px rgba(30, 41, 59, 0.08)`.
- **Modals & Critical Action Dialogs (Level 3):** Centered alerts and emergency prompts: `0px 12px 32px rgba(30, 41, 59, 0.16)`.
- **Borders as Structure:** When borders are needed for contrast inside white surfaces (e.g., input fields), use a subtle `#E2E8F0` border line (1px solid).

## Shapes
Geometry is balanced between soft, humanizing curves and clean structural lines:

- **Buttons & Inputs:** Fixed corner radius of **8px** (`0.5rem`). Keeps interactive controls identifiable, compact, and aligned with standard touch ergonomics.
- **Cards & Modals:** Corner radius of **12px** (`0.75rem`). Creates distinct surface containment for grouping patient information, vitals, and updates.
- **Chips & Pills:** Fully rounded / pill-shaped (`9999px`) to distinguish categorical tags and filters from actionable structural buttons.

## Components

### Buttons
- **Primary:** Background `#0B7A6B`, text `#FFFFFF`, radius `8px`, height `48px`, font size `16px` semi-bold. Padding horizontal `24px`.
- **Secondary:** Background `#E8F5E9`, text `#0B7A6B`, radius `8px`, height `48px`.
- **Emergency / SOS:** Background `#DC2626`, text `#FFFFFF`, radius `8px`, height `56px` for maximum touch confidence. Often paired with Lucide `AlertCircle` or `PhoneCall`.
- **Ghost / Tertiary:** Transparent background, text `#0B7A6B`, minimum tap container `48px`.

### Cards
- Pure white background (`#FFFFFF`), corner radius `12px`, padding `16px`, soft ambient shadow (`Level 1`).
- Card headers feature an optional status badge or Lucide icon aligned to the top-right.

### Chips & Badges
- **Status / Accent Chip:** Height `28px`, padding `4px 12px`, pill radius (`9999px`). Background `#E8F5E9`, text `#0B7A6B` in `12px` caption medium.
- **Critical Chip:** Background `#FEE2E2`, text `#DC2626` in `12px` caption medium.

### Input Fields
- Height `48px`, background `#FFFFFF`, border `1px solid #CBD5E1`, radius `8px`, text `#1E293B`, placeholder `#94A3B8`.
- Focus state applies a `2px` ring in `#0B7A6B` with zero layout shift.

### Checkboxes & Radios
- Size `24px` target box, radius `4px` (checkbox) or circular (radio).
- Active fill in `#0B7A6B` with white checkmark/dot. Unchecked border `1.5px solid #94A3B8`.

### Lists
- Separator borders: `1px solid #F1F5F9`.
- Item container height min `56px` with leading icon/avatar, middle title/caption stack, and trailing navigation chevron (Lucide `ChevronRight` in `#94A3B8`).

### Iconography (Lucide Icons)
- Stroke width: `2px`.
- Default sizing: `20px` inside buttons and chips; `24px` for navigation tabs, action lists, and form inputs.
- Color aligns strictly to parent text or functional context (e.g., `#0B7A6B` for primary actions, `#DC2626` for urgent items).