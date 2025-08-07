# Mahavatar Narsimha - Visual Style Guide
## 4-Hour Minimal Version Design System

### 🎨 Brand Identity

#### Core Concept
The visual design for Mahavatar Narsimha combines divine mythology with modern animation aesthetics. The design language emphasizes power, divinity, and epic storytelling through bold colors, dramatic typography, and cosmic visual effects.

---

### 🎨 Color Palette

#### Primary Colors
- **Divine Gold** `#D4AF37` - Main brand color, representing divinity and power
- **Sacred Red** `#C41E3A` - Accent color for passion and warrior spirit
- **Cosmic Blue** `#1E3A5F` - Supporting color for depth and mystery
- **Royal Purple** `#6B46C1` - Spiritual and mystical elements

#### Color Usage
```css
/* Gradients */
--gradient-divine: linear-gradient(135deg, #D4AF37 0%, #C41E3A 100%);
--gradient-cosmic: linear-gradient(135deg, #1E3A5F 0%, #6B46C1 100%);

/* Text Colors */
--text-primary: #111827;
--text-secondary: #6B7280;
--text-accent: #D4AF37;

/* Background Colors */
--bg-primary: #FFFFFF;
--bg-secondary: #FFF8E7;
--bg-dark: #111827;
```

---

### ✏️ Typography

#### Font Families
1. **Display Font**: Cinzel - For titles and hero text
2. **Body Font**: Inter - For general content
3. **Accent Font**: Noto Sans Devanagari - For Sanskrit/Hindi text

#### Type Scale
```
Hero Title: 72px / 80px (desktop) | 48px / 56px (mobile)
H1: 48px / 56px
H2: 36px / 44px
H3: 28px / 36px
Body Large: 18px / 28px
Body Regular: 16px / 24px
Body Small: 14px / 20px
Caption: 12px / 16px
```

---

### 📐 Layout & Spacing

#### Grid System
- **Container Max Width**: 1280px
- **Column Grid**: 12 columns
- **Gutter**: 24px (desktop) | 16px (mobile)

#### Spacing Scale
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
```

---

### 🎭 Visual Elements

#### Hero Section Design
- Full-screen height (100vh)
- Background image with gradient overlay
- Animated particle effects
- Centered content with max-width 1024px
- CTA buttons with hover effects

#### Card Components
```css
.divine-card {
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}
```

#### Button Styles
1. **Primary Button**
   - Gradient background (Divine Gold to Sacred Red)
   - Uppercase text, 600 weight
   - Box shadow with glow effect on hover
   
2. **Secondary Button**
   - Transparent with border
   - Gold border and text
   - Fill on hover

---

### 🎬 Animation Guidelines

#### Micro-animations
- **Hover Effects**: 250ms ease-in-out
- **Page Transitions**: 350ms ease-in-out
- **Loading States**: Skeleton screens with shimmer effect
- **Scroll Animations**: Fade-in and slide-up on viewport entry

#### Hero Animations
```css
/* Floating particles */
animation: float-up 15s linear infinite;

/* Title entrance */
animation: slide-in-up 0.6s ease-out;

/* Glow pulse */
animation: pulse-glow 2s ease-in-out infinite;
```

---

### 📱 Responsive Design

#### Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1279px
- **Large Desktop**: 1280px+

#### Mobile-First Approach
- Stack elements vertically on mobile
- Reduce font sizes by 20-30%
- Simplify animations for performance
- Touch-friendly button sizes (min 44x44px)

---

### 🖼️ Image Guidelines

#### Hero Images
- **Format**: WebP with JPEG fallback
- **Desktop**: 1920x1080px @ 90 quality
- **Mobile**: 768x1024px @ 85 quality
- **Loading**: Progressive with blur-up effect

#### Character Images
- **Format**: WebP with transparent background
- **Size**: 600x800px for cards
- **Thumbnails**: 150x200px @ 75 quality

#### Optimization
- Use `next/image` for automatic optimization
- Implement lazy loading for below-fold images
- Provide low-quality placeholders (LQIP)
- Enable responsive images with srcset

---

### 🎯 Design Principles

1. **Epic & Cinematic**: Every element should feel grand and movie-worthy
2. **Divine Aesthetics**: Use gold accents and glowing effects
3. **Performance First**: Optimize for fast loading (< 2s)
4. **Accessibility**: WCAG 2.1 AA compliance
5. **Mobile-Optimized**: 60% of traffic expected from mobile

---

### 🚀 Quick Implementation Checklist

#### First Hour (Design Setup)
- [ ] Create color variables in CSS
- [ ] Set up typography scale
- [ ] Design hero banner layout
- [ ] Create button components
- [ ] Define responsive breakpoints

#### Second Hour (Asset Creation)
- [ ] Generate hero background placeholder
- [ ] Create gradient overlays
- [ ] Design loading states
- [ ] Prepare social media cards

#### Third Hour (Component Library)
- [ ] Build reusable card components
- [ ] Create animation classes
- [ ] Design form elements
- [ ] Implement skeleton screens

#### Fourth Hour (Polish & Optimization)
- [ ] Mobile responsive testing
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Final visual polish

---

### 📦 Design Assets Delivery

```
/design
├── /figma-files
│   └── mahavatar-ui-kit.fig
├── /assets
│   ├── /heroes
│   │   └── hero-bg-placeholder.svg
│   ├── /icons
│   │   └── icon-set.svg
│   └── /logos
│       └── mahavatar-logo.svg
├── /style-guide
│   ├── style-guide.md
│   └── component-library.html
└── /exports
    ├── /images
    └── /vectors
```

---

### 🎨 CSS Custom Properties

```css
/* Add to global CSS */
:root {
  /* Colors */
  --color-gold: #D4AF37;
  --color-red: #C41E3A;
  --color-blue: #1E3A5F;
  --color-purple: #6B46C1;
  
  /* Shadows */
  --shadow-divine: 0 0 30px rgba(212, 175, 55, 0.4);
  --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition-base: 250ms ease-in-out;
  
  /* Borders */
  --border-divine: 1px solid rgba(212, 175, 55, 0.3);
}
```

---

## 🏁 Quick Start for Developers

1. Import the theme CSS: `/styles/mahavatar-theme.css`
2. Use the HeroSection component: `/components/HeroSection.tsx`
3. Apply color classes: `text-gold-400`, `bg-gradient-divine`
4. Use animation classes: `animate-float`, `animate-slide-up`
5. Implement responsive utilities: `md:text-6xl`, `lg:px-8`

---

**Created by**: UI/UX Designer (戊)
**Date**: 2025-08-07
**Version**: 1.0.0 (4-Hour Minimal)