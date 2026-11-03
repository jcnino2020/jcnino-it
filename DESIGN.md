---
name: "JC Niñonuevo IT Portfolio"
description: "The implemented midnight navy, ice blue, and off-white portfolio system."
colors:
  ink: "#17263c"
  deep: "#0b162b"
  paper: "#f7f8fc"
  mist: "#e9eff7"
  line: "#c9d3e1"
  muted: "#4a5d76"
  ice: "#b8deff"
  ice-hover: "#d4ebff"
  on-dark: "#f6f9ff"
  heading-accent: "#456b92"
  research-accent: "#41678f"
  focus: "#337dbd"
  contact: "#142640"
  field: "#0d1d35"
  form-help: "#ccd8e8"
  field-border: "#91acca"
  field-error: "#ffd1c3"
  invalid-border: "#ffbcaa"
typography:
  display:
    fontFamily: "HN, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(56px, 5.2vw, 84px)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "HN, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(43px, 4.8vw, 75px)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "HN, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(27px, 2.6vw, 38px)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  body:
    fontFamily: "HN, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  reading:
    fontFamily: "HN, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "HN, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.5
rounded:
  square: "0"
spacing:
  field: "12px"
  control-gap: "20px"
  grid-gap: "24px"
  section: "clamp(86px, 9vw, 140px)"
components:
  button-primary:
    backgroundColor: "{colors.ice}"
    textColor: "{colors.deep}"
    rounded: "{rounded.square}"
    padding: "15px 20px"
  button-primary-hover:
    backgroundColor: "{colors.ice-hover}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.square}"
    padding: "10px 16px"
  filter:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "11px 16px"
  filter-selected:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.on-dark}"
  input-contact:
    backgroundColor: "{colors.field}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.square}"
    padding: "12px"
  navigation:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.on-dark}"
  work-card:
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
---

# Design System: JC Niñonuevo IT Portfolio

## Overview

**Creative North Star: "Midnight navy + ice blue + off-white"**

The owner's chosen midnight navy, ice blue, and off-white palette frames a portfolio of real technical and creative work. Broad dark sections and light reading surfaces establish hierarchy; restrained blue accents connect actions, emphasis, and diagrams.

This record describes the current build in assets/home.css. Preserve its Helvetica Neue typography, page composition, and original media when extending the palette. The retained web-systems archive also uses assets/portfolio.css and assets/2026.css; its older rounded and elevated patterns are a compatibility boundary, not defaults for new surfaces.

**Key Characteristics:**
- Midnight navy anchors with ice blue emphasis.
- Off-white and soft blue reading surfaces.
- Bold Helvetica Neue headings, generous spacing, and thin dividers.
- Flat, square-cornered controls in the main site.
- Real screenshots and photographs retain their original content.

## Colors

The palette pairs a deep navy frame with cool, light reading surfaces and pale blue emphasis. The frontmatter records exact values; CSS custom properties in `assets/home.css` remain the implementation source.

### Primary

- **Midnight Navy** (`deep`): header, hero, capabilities, footer, and selected filters.
- **Ice Blue** (`ice`): primary actions, dark-section emphasis, brand details, and selection; `ice-hover` lightens the action on hover.
- **Heading Blue** (`heading-accent`) and **Research Blue** (`research-accent`): large emphasized words on light section backgrounds.

### Neutral

- **Ink** (`ink`): primary reading text on light surfaces.
- **Off-white** (`paper`): default page and reading background.
- **Soft Blue** (`mist`): work, education, and next-case surfaces.
- **Blue-gray Line** (`line`): light-surface separators.
- **Muted Blue-gray** (`muted`): secondary reading text and captions.
- **Light Text** (`on-dark`): foreground on dark surfaces.
- **Contact Navy** (`contact`), **Field Navy** (`field`), **Form Help** (`form-help`), and **Field Border** (`field-border`): the dark contact area and its controls.

### Interaction and feedback

**Focus Blue** (`focus`) marks keyboard focus. **Error Peach** (`field-error`) and **Invalid Border** (`invalid-border`) distinguish validation feedback from the brand accent.

**The Palette Continuity Rule.** Use the approved navy, ice blue, and off-white roles for new brand surfaces; preserve the meaning of error and focus states.

## Typography

**Display and Body Font:** the bundled Helvetica Neue family, exposed as HN in the main stylesheet, with Helvetica Neue, Arial, and sans-serif fallbacks. Roman (400), medium (500), and bold (700) are shipped for the main site.

**Character:** bold, tightly spaced headings contrast with calm, open body copy. There is no separate display or mono family in the main site.

### Hierarchy

- **Display:** hero headline; see the display token. On mobile it becomes `clamp(39px, 9vw, 56px)`.
- **Headline:** major section titles; see the headline token. On mobile the standard section ramp becomes `clamp(40px, 9vw, 56px)`.
- **Title:** project titles; see the title token. Other article and timeline titles use contextual fluid ramps in the same family.
- **Body:** browser-default base size (16px) with inherited line height (1.5); descriptions commonly expand to 17–20px.
- **Reading:** case-study copy (18px, line height 1.75), reduced to 17px on mobile. Article content uses 65–75ch limits where present; case content is capped at 850px.
- **Label:** field labels (15px, bold); action labels use 14px bold. Existing tracked metadata and section eyebrows are compatibility artifacts, not a recommended label system.

**The Existing Type Rule.** Keep the bundled Helvetica Neue family and the observed bold-heading/body relationship when extending the current site.

## Layout

The main centered container is `min(100% - 64px, 1360px)`. Desktop side gutters are 32px; at 640px and below they become 18px. General section padding is the fluid section token, becoming 80px on mobile. Reused gaps include 20px for field rows and 24px for project columns.

Desktop layouts combine two-column work grids, split copy/image sections, and ruled lists. At 980px and below the main navigation switches to the menu control, hero and split explanatory sections stack, and contact becomes one column. At 640px and below work grids, form rows, resource details, timelines, and most collections stack. The header contracts from a minimum height of 78px to 66px. Preserve these behaviors and each page's existing composition.

## Elevation & Depth

The main site is flat at rest: full-width tonal sections, thin separators, and image cropping provide depth without card shadows. Hero imagery uses a dark gradient overlay for its caption. Hover feedback is small and local: the primary action rises 2px, screenshots scale to 1.025, and directional affordances shift. Reduced-motion preferences collapse transition and animation duration and disable smooth scrolling.

The retained web-systems archive carries older shadows, rounded galleries, and overlay treatments. Keep them scoped to that existing implementation rather than treating them as main-site defaults.

**The Main Surface Rule.** Use tonal section changes and thin rules for depth on the main site; preserve archive-specific treatments only within the existing archive.

## Shapes

Main-site buttons, search controls, contact fields, screenshots, and content panels have square corners. One-pixel borders and horizontal rules define controls and lists. The small circular availability/status dot is an exception. Archive-specific radii remain local compatibility details.

## Components

### Buttons

The primary action is a compact ice blue rectangle with deep navy text (14px, bold), padding (15px 20px), and a 26px internal gap. Hover uses the lighter ice color and a small upward translation over 0.2s. The outlined header action has a light border, transparent background, padding (10px 16px), and switches to ice fill with navy text on hover. All controls retain the shared visible focus outline (3px, offset 4px). Submit buttons have a minimum height of 49px and dim while disabled.

### Filters

Square outlined category controls have a minimum height of 44px, medium text (15px), and padding (11px 16px). Selected controls use the deep navy surface with light text. Hover fills unselected controls with soft blue and selected controls with a brighter navy. These are interactive filters, not decorative pills.

### Cards / Containers

Work entries are open compositions rather than raised boxes: an interface preview where supplied, a thin divider above title/details, and supporting copy. The screenshot frame uses a 1.6 aspect ratio and a subtle blue-gray border. Hover zoom belongs to the image; retain the original screenshot. Collection notes use soft blue fill and generous inset padding without elevation.

### Inputs / Fields

Contact fields have dark navy fill, light text, square corners, a one-pixel pale blue border, and padding (12px). Single-line fields have a minimum height of 49px; the textarea starts at 145px and resizes vertically. Labels are visible and bold. Hints remain light and readable. Invalid fields use a two-pixel peach border with explicit peach error text. The search input instead uses the off-white reading surface with dark text and a minimum height of 46px. Keyboard focus uses the shared outline. Do not rely on color alone for validation.

### Navigation

The main sticky header has three desktop grid tracks, a compact wordmark, centered text links, and an outlined contact action. Text links turn ice blue on hover. Below 980px, the menu control exposes stacked navigation links with dividers. Preserve actual link semantics and the current menu behavior. Resource navigation uses underlined links with 44px minimum targets and a stronger underline for the current page.

## Do's and Don'ts

### Do:

- **Do** use ice blue for primary actions and emphasis on navy.
- **Do** retain off-white and soft blue surfaces with dark text for long reading.
- **Do** preserve the current typography, responsive composition, real photographs, and interface screenshots.
- **Do** keep visible focus, form hints, errors, and reduced-motion support.

### Don't:

- **Don't** reintroduce the former green brand palette on new public surfaces.
- **Don't** treat ice blue as small text on the off-white reading surface.
- **Don't** inherit the archive's radius and shadow vocabulary into new main-site components by default.
- **Don't** recolor real media or document contents merely to match the site palette.


Evidence: extracted from `assets/home.css`, sampled `assets/portfolio.css` and `assets/2026.css`, page stylesheet links, and `PRODUCT.md`; visually checked the desktop and mobile navy hero and the desktop web-systems archive captures in `.impeccable/review/`. Parent review supplied passing contrast checks for body, muted text, large accents, actions, dark copy, form help, and focus. Contact styling was checked in source; no settled form capture was used for this record.

Not canonized: existing uppercase section eyebrows, glyph arrows/menu marks, and legacy archive radii/shadows. They remain outside this approved palette-only change; do not turn them into new system requirements.
