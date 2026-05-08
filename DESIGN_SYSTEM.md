# yur cooked — Design System & Implementation

## Overview

Complete redesign of the website to match the "yur cooked" editorial aesthetic. The design is handcrafted, minimal, and focused on the quality of content.

## Design System

### Colors

- **Cream**: `#efe9dd` (primary background)
- **Ink**: `#1a1814` (primary text)
- **Ink-2**: `#2a2620` (secondary text)
- **Muted**: `#6b6358` (tertiary text)
- **Rule**: `#d8cfbe` (dividers/borders)
- **Accent (Ember)**: `#b8442a` (accent color)

### Typography

- **Display/Sans**: Archivo (headings, UI)
- **Serif**: Bodoni Moda (body text, emphasis)
- **Handwriting**: Caveat (logo, wordmark)
- **Mono**: Space Mono (code, labels)

### Key Features

1. **Caveat Script Logo**: Hand-drawn aesthetic applied via SVG filter
2. **No Border Radius**: Sharp, editorial aesthetic
3. **CSS Variables**: Complete color/spacing system using CSS custom properties
4. **Responsive Design**: Mobile-first with clamp() for fluid typography
5. **Dark Mode Support**: Built-in via `[data-theme="dark"]` selector

## Component Library

### Core Components

#### Navigation
- Sticky header with Caveat logo
- Responsive burger menu on mobile
- Active link indicators with underlines
- Mobile menu with social links

#### Footer
- Grid layout with 4 columns (brand + 3 sections)
- Social links with custom SVG icons
- Footer mark in Caveat script
- Dark background with lighter text

#### Hero Section
- Full-screen with background image (image-slot)
- Caveat wordmark overlay
- Italicized "cooked" in title
- Ember-colored accent dot
- Gradient overlay for text readability

### Home Page Components

1. **Ticker**: Scrolling marquee with curated items
2. **Intro**: Editorial split layout (quote + body text)
3. **PreviewGrid**: 3-column card grid (Recipes/Shop/About)
4. **WatchSection**: YouTube video grid with RSS integration
5. **PromoBar**: Dismissible promotional banner

### Page Layouts

#### Home
- Promo bar
- Hero section
- Ticker
- Intro section
- Preview grid
- Watch section

#### Recipes
- Book hero (image + info side-by-side)
- Ticker
- Recipe grid (2 columns mobile, 3 desktop)
- Recipe cards with tags

#### Shop
- Book hero
- Category filters (pills)
- Product grid with quick-view buttons
- Product tags (Essential, New, Limited)

#### About
- Book hero
- Story section with drop cap
- Stats strip (3 columns)
- Gallery with complex grid spans
- Social links section

#### Contact
- Contact info (left column)
- Form with field groups
- Topic selector (pills)
- Mode listing

## Implementation Details

### File Structure

```
app/
  globals.css          # Complete design system (1442 lines)
  layout.tsx           # Root layout with SVG filters & image-slot script
  page.tsx             # Home page
  about/
    page.tsx           # About page
  contact/
    page.tsx           # Contact page
  recipes/
    page.tsx           # Recipes grid page
  shop/
    page.tsx           # Shop grid page

components/
  layout/
    Navbar.tsx         # Navigation header
    Footer.tsx         # Footer with social links
  home/
    Hero.tsx           # Full-screen hero section
    Ticker.tsx         # Scrolling marquee
    Intro.tsx          # Editorial split layout
    PreviewGrid.tsx    # 3-column preview cards
    WatchSection.tsx   # YouTube video grid
    PromoBar.tsx       # Promo banner

public/
  image-slot.js        # Web component for image uploads/management
```

### CSS Classes Used

Core sections:
- `.nav`, `.nav-row`, `.logo`, `.nav-links`, `.nav-link`
- `.footer`, `.footer-grid`, `.footer-mark`, `.footer-tag`

Hero:
- `.hero`, `.hero-img`, `.hero-content`, `.hero-wordmark`, `.hero-meta`

Sections:
- `.section`, `.section-head`, `.section-title`, `.section-lede`
- `.container` - max-width wrapper with gutter padding

Cards:
- `.preview`, `.preview-img`, `.preview-name`, `.preview-meta`
- `.recipe`, `.recipe-grid`, `.recipe-tags`, `.recipe-tag`
- `.product`, `.product-img`, `.product-meta`, `.product-price`

Buttons & Forms:
- `.btn`, `.btn.ghost`, `.link-arrow`
- `.form`, `.form .field`, `.form .pill`, `.form .pill-row`

Modals:
- `.modal-bg`, `.modal`, `.modal-close`, `.modal-img`, `.modal-info`

## Features

### Image Slots (`<image-slot>`)

Custom web component for:
- Drag-drop image upload
- Image downscaling & WebP encoding
- Persistent state via sidecar .json file
- Reframing mode (double-click for pan/zoom)
- Aspect ratio preservation

### SVG Filters

Hand-drawn effect filter applied to Caveat font:
```xml
<filter id="hand">
  <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" />
  <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
</filter>
```

### YouTube Integration

- RSS feed integration via `api.rss2json.com`
- Channel ID: `UCk87vy9lWNcu-vng4vF2WQA` (@ClintYur)
- Fetches 4 latest videos
- Fallback videos if API unavailable
- Video modal with autoplay

## Metadata

- **Site Name**: yur cooked
- **Description**: Recipes, goods, and the art of eating well — from a kitchen in New York
- **Theme Color**: #1a1814 (ink)
- **OG Image**: /og-image.jpg (1200x630px)

## Next Steps

1. **Replace Mock Data**: Connect to real recipe/product database
2. **Stripe Integration**: Complete payment flow for shop & memberships
3. **Authentication**: NextAuth setup for user accounts
4. **Comments/Ratings**: Recipe comments and user ratings
5. **Image Management**: Photo uploads and gallery management
6. **Email**: Newsletter subscription integration
7. **Analytics**: Implement tracking for user behavior

## Notes for Development

- Tailwind CSS is still in the project but globals.css takes precedence
- All components use semantic HTML and CSS classes (no Tailwind utility classes)
- Mobile breakpoint: 720px (via media queries)
- Tablet breakpoint: 800px
- Desktop breakpoint: 880px
- Responsive units use clamp() for fluid scaling

## Brand Voice

- Editorial, handcrafted aesthetic
- Minimal but intentional design
- Focus on quality content over decoration
- Serif typography for body text
- Caveat script for personal, human touch
- Ember accent color for subtle emphasis
