# Ranga Mokshagna Jayavaram — Portfolio

A personal portfolio website built with Next.js 16, TypeScript, Tailwind CSS v4, and Framer Motion.

## Features

- **Liquid glass design** — subtle glass surfaces on navbar, project cards, and skill chips with backdrop blur and mouse-following sheen
- **Liquid lens** — floating SVG refraction lens that follows the cursor (Chromium) with graceful blur fallback (Safari/Firefox)
- **Dark mode** — warm ivory light / deep ink dark with seamless toggle
- **Smooth animations** — fade-up on scroll, card tilt on hover, navbar glass morphing
- **Fully accessible** — semantic HTML, keyboard navigation, focus rings, `prefers-reduced-motion` support
- **Responsive** — tested at 360px, 768px, and 1440px breakpoints
- **SEO ready** — proper metadata, Open Graph tags, semantic structure

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Vercel auto-detects Next.js — click **Deploy**
5. Your site will be live at `your-project.vercel.app`

No environment variables or special configuration needed.

## Project Structure

```
src/
├── app/
│   ├── fonts.ts          # Instrument Serif + Inter font config
│   ├── globals.css       # Tailwind v4 theme tokens + animations
│   ├── layout.tsx        # Root layout with SEO metadata
│   └── page.tsx          # Single page assembling all sections
├── components/
│   ├── Navbar.tsx        # Glass pill navbar with scroll transition
│   ├── Hero.tsx          # Name, tagline, CTAs, social links
│   ├── About.tsx         # Bio + education card
│   ├── Projects.tsx      # Project cards + detail modal
│   ├── Skills.tsx        # Grouped glass skill chips
│   ├── Certifications.tsx
│   ├── Contact.tsx       # Contact card with email + socials
│   ├── Footer.tsx
│   ├── GlassCard.tsx     # Reusable glass surface component
│   ├── LiquidLens.tsx    # Cursor-following refraction lens
│   ├── BackgroundBlobs.tsx
│   ├── ScrollReveal.tsx  # Fade-up animation wrapper
│   ├── ThemeProvider.tsx
│   └── ThemeToggle.tsx
├── data/
│   └── projects.ts       # ← Edit this file to update content
├── hooks/
│   ├── useMousePosition.ts
│   ├── useReducedMotion.ts
│   └── useScrollPosition.ts
└── lib/
    └── utils.ts          # cn() class merge helper
```

## Editing Content

All project, skills, and certification data lives in [`src/data/projects.ts`](src/data/projects.ts). Edit that single file to update your portfolio content.

## License

MIT
