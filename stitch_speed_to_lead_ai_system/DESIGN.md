---
name: Anders & Vale
colors:
  surface: '#fcf9f6'
  surface-dim: '#dcdad7'
  surface-bright: '#fcf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f0'
  surface-container: '#f0edea'
  surface-container-high: '#eae8e5'
  surface-container-highest: '#e5e2df'
  on-surface: '#1c1c1a'
  on-surface-variant: '#404944'
  inverse-surface: '#31302f'
  inverse-on-surface: '#f3f0ed'
  outline: '#707974'
  outline-variant: '#bfc9c3'
  surface-tint: '#2b6954'
  primary: '#003527'
  on-primary: '#ffffff'
  primary-container: '#064e3b'
  on-primary-container: '#80bea6'
  inverse-primary: '#95d3ba'
  secondary: '#9b4500'
  on-secondary: '#ffffff'
  secondary-container: '#fd8a42'
  on-secondary-container: '#682c00'
  tertiary: '#212f41'
  on-tertiary: '#ffffff'
  tertiary-container: '#374558'
  on-tertiary-container: '#a4b2c9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f0d6'
  primary-fixed-dim: '#95d3ba'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#0b513d'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb68e'
  on-secondary-fixed: '#331200'
  on-secondary-fixed-variant: '#763300'
  tertiary-fixed: '#d5e3fc'
  tertiary-fixed-dim: '#b9c7df'
  on-tertiary-fixed: '#0d1c2e'
  on-tertiary-fixed-variant: '#3a485b'
  background: '#fcf9f6'
  on-background: '#1c1c1a'
  surface-variant: '#e5e2df'
  status-hot: '#E11D48'
  status-warm: '#D97706'
  status-cold: '#64748B'
  surface-card: '#FFFFFF'
  ink-bold: '#0F172A'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: IBM Plex Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.08em
  data-mono:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system for Anders & Vale embodies a "New Heritage" aesthetic—blending the prestige of traditional Austin real estate with the cutting-edge efficiency of its internal AI systems. The visual language moves away from generic tech aesthetics in favor of a **Corporate Modern** style with **Minimalist** execution. 

Key attributes include:
- **Trustworthy & Premium:** High-contrast layouts and generous whitespace convey exclusivity.
- **Local & Grounded:** A deep, nature-inspired palette reflects the Central Texas landscape.
- **Efficient & Intelligent:** The "Speed-to-Lead" internal dashboard uses high-density data visualization and crisp structural grids to signal technical sophistication.

The interface should feel like a high-end concierge service: seamless, authoritative, and impeccably organized.

## Colors
The palette is anchored by **Deep Emerald**, used for primary brand moments and navigation. **Sophisticated Gold** is applied sparingly as an "action" accent—reserved for CTAs and premium highlights.

**Admin Dashboard Status Logic:**
- **Hot (Rose):** Urgent leads requiring immediate AI or human intervention.
- **Warm (Amber):** Active leads in the nurturing sequence.
- **Cold (Slate):** Archived or low-priority leads.

Use the `neutral` color (#F8F5F2) for large background surfaces to maintain a "paper-like" warmth that distinguishes the brand from sterile, pure-white competitors.

## Typography
The typographic hierarchy relies on the contrast between the authoritative **Playfair Display** and the functional **Inter**. 

For the "Speed-to-Lead" dashboard, use **IBM Plex Sans** for data points and labels to ensure maximum legibility at small sizes. All labels in the dashboard should use `label-caps` for a professional, structured feel. Display headings should use tight letter-spacing to maintain a modern, editorial look.

## Layout & Spacing
This design system utilizes a **12-column fixed grid** for the public site and a **fluid sidebar-based layout** for the internal admin dashboard.

- **Public Site:** Employs generous vertical padding (80px-120px) to create an airy, premium feel. Content is centered with a max-width of 1280px.
- **Admin Dashboard:** Switches to a high-density grid. Sidebars are fixed at 260px. Data tables should utilize a "Compact" vertical rhythm with 12px cell padding to maximize information density.
- **Breakpoints:** Mobile (under 768px), Tablet (768px-1024px), Desktop (1024px+).

## Elevation & Depth
Depth is created through **Tonal Layers** and **Low-contrast Outlines** rather than heavy shadows.

- **Level 0 (Background):** #F8F5F2.
- **Level 1 (Cards/Sheets):** Pure white (#FFFFFF) with a 1px border (#E2E8F0).
- **Level 2 (Dropdowns/Modals):** Pure white with a soft ambient shadow (0px 4px 20px rgba(6, 78, 59, 0.08)).
- **Glassmorphism:** Reserved exclusively for the "Floating Chat Widget" to distinguish it as an overlaying AI utility. Use a 12px backdrop blur with 80% opacity on a white surface.

## Shapes
The design system uses **Soft (0.25rem)** roundedness to maintain a disciplined, architectural feel. 

- **Standard Buttons & Inputs:** 4px radius.
- **Status Badges:** 2px radius (near-sharp) to emphasize the utilitarian nature of the dashboard.
- **Chat Widget & Response Signature:** Full pill-shape (999px) for the "response-time" element to make it feel approachable and distinct from the structural UI.

## Components
### Navigation & Footer
- **Nav:** Desktop nav features a transparent background that transitions to Deep Emerald on scroll. Links use `label-caps`.
- **Footer:** Deep Emerald background with Gold accents. Includes a "Local Office" signature with Austin coordinates.

### Real Estate Listing Cards
- High-resolution imagery with a subtle 1px inner overlay. 
- Price is displayed in `headline-md` using Playfair Display. 
- Details (Beds/Baths) use `data-mono`.

### Floating Chat Widget
- Positioned bottom-right. Features a "Response Time Signature" element—a small pill-shaped badge above the bubble saying "AI Lead-Bot: < 30s response."
- Uses the Gold (#B45309) for the trigger icon to signify high value.

### Data Tables & Status Badges
- **Tables:** No vertical borders; horizontal borders only. Header row uses a light Slate background.
- **Status Badges:** Small, caps-only text. "Hot" leads use a subtle Rose background with dark Rose text. "Warm" leads use Amber.