<div align="center">

# 🌍 ExplorAhead — Travel Agency Website

### A production-ready, fully deployed marketing website showcasing modern web development practices

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-explorahead.com-blue?style=for-the-badge)](https://explorahead.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?style=for-the-badge&logo=vercel)](https://vercel.com/)

</div>

---

## 👋 About This Project

This is a **real, production website** that I designed and developed from scratch for a travel agency business. It demonstrates my ability to deliver complete, production-grade web applications—from concept to deployment—even outside my primary domain of AI/ML engineering.

> **Why this matters:** As an AI Engineer, I believe in being a **versatile developer** who can tackle any technical challenge. This project showcases full-stack web development skills, production deployment workflows, observability integration, and modern frontend practices.

### ✨ Live Website

**[Visit ExplorAhead →](https://explorahead.com)**

---

## 🎯 Key Highlights

| Category | What It Demonstrates |
|----------|---------------------|
| **Production Deployment** | Full CI/CD pipeline with Vercel, automated deployments from GitHub Actions |
| **Observability & Monitoring** | Sentry integration for error tracking, performance monitoring, and session replay |
| **Database & Email** | Serverless Postgres (Neon) with transactional emails (Resend) |
| **Analytics** | GDPR-compliant Google Analytics with cookie consent management |
| **Internationalization** | Multi-language support (EN/PL) with `next-intl`, automatic locale detection |
| **Testing** | Comprehensive test suite with Vitest (unit) + Playwright (E2E) |
| **Modern Stack** | Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, Turbopack |
| **Developer Experience** | Husky + lint-staged pre-commit hooks, ESLint, Prettier, strict TypeScript |

---

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 16](https://nextjs.org/)** — React framework with App Router, RSC, and Turbopack
- **[React 19](https://react.dev/)** — Latest React with Server Components
- **[TypeScript 5](https://www.typescriptlang.org/)** — Strict type checking throughout

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Utility-first CSS with custom design system
- **[Framer Motion](https://www.framer.com/motion/)** — Fluid animations and page transitions
- **[Lucide React](https://lucide.dev/)** — Modern icon library

### Observability & Analytics
- **[Sentry](https://sentry.io/)** — Error tracking, performance monitoring, session replay
- **[Google Analytics 4](https://analytics.google.com/)** — User analytics with GDPR consent handling

### Internationalization
- **[next-intl](https://next-intl-docs.vercel.app/)** — Type-safe i18n with automatic locale routing

### Testing
- **[Vitest](https://vitest.dev/)** — Fast unit testing with React Testing Library
- **[Playwright](https://playwright.dev/)** — Cross-browser E2E testing (Chrome, Firefox, Safari, Mobile)

### Database & Backend
- **[Neon](https://neon.tech/)** — Serverless Postgres with branching, autoscaling
- **[Resend](https://resend.com/)** — Modern email API for transactional emails

### Infrastructure
- **[Vercel](https://vercel.com/)** — Deployment, edge functions, image optimization
- **[GitHub Actions](https://github.com/features/actions)** — CI/CD pipeline for automated deployments

---

## 📊 Observability Architecture

One of the project's standout features is its **production-grade observability stack**:

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT SIDE                          │
├─────────────────────────────────────────────────────────────┤
│  Sentry Browser SDK                                         │
│  ├── Error Tracking (automatic + manual capture)           │
│  ├── Performance Monitoring (Web Vitals, transactions)     │
│  ├── Session Replay (100% on error, 10% sampling)          │
│  └── Console Logging Integration                           │
│                                                             │
│  Google Analytics 4 (GDPR-compliant)                       │
│  └── Cookie consent banner with granular preferences       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        SERVER SIDE                          │
├─────────────────────────────────────────────────────────────┤
│  Sentry Node SDK                                            │
│  ├── API Route error tracking                              │
│  ├── Server-side performance tracing                       │
│  └── Source map uploads for readable stack traces          │
│                                                             │
│  Edge Runtime Support                                       │
│  └── Sentry Edge SDK for middleware monitoring             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🌐 Features

### User Experience
- **Interactive Hero Carousel** — Multi-destination slideshow with swipe gestures, dynamic messaging per destination, and smooth slide transitions
- **Smart WhatsApp Integration** — Floating CTA with heartbeat animation, destination-specific pre-filled messages, and journey completion celebration when all slides are visited
- **Responsive Design** — Optimized for mobile (horizontal scroll carousel), tablet (2-column grid), and desktop (full grid) viewports
- **Smooth Animations** — GPU-accelerated transitions with Framer Motion, animated particles, and CSS keyframe animations
- **Accessibility** — Semantic HTML, proper ARIA labels, keyboard navigation, live regions for dynamic content

### Pages & Content
- **Home** — Hero carousel, services preview, how it works, call-to-action sections
- **About** — Company story and team information
- **Contact** — Contact information display with social media links (form temporarily disabled pending corporate email setup)
- **Pricing** — Mobile-first carousel with scroll-snap, responsive grid on desktop
- **Legal** — Privacy policy, terms of service, cookie policy (GDPR-compliant)

### Technical Features
- **Centralized Media Config** — Single source of truth for all images, videos, and campaign assets (`config/media.ts`)
- **Hero Slides System** — Configurable slides with destination, message, tagline, icon color, focal point, and WhatsApp message
- **Feature Flags** — Toggle features on/off without code changes
- **SEO Optimized** — JSON-LD structured data, OpenGraph, sitemap, robots.txt
- **Image Optimization** — Next.js Image with AVIF/WebP, responsive sizes, configurable focal points
- **Error Boundaries** — Graceful error handling with custom error pages

---

## 🏗️ Project Structure

```
explorahead-travel-agency-website/
├── app/
│   ├── [locale]/              # Internationalized routes
│   │   ├── (marketing)/       # Marketing pages (home, about, contact)
│   │   ├── layout.tsx         # Locale layout with providers
│   │   └── not-found.tsx      # Custom 404 page
│   ├── error.tsx              # Global error boundary
│   ├── global-error.tsx       # Root error boundary
│   ├── robots.ts              # Dynamic robots.txt
│   └── sitemap.ts             # Dynamic sitemap
├── components/
│   ├── analytics/             # Google Analytics with consent
│   ├── marketing/             # Marketing components (Hero, WhatsAppHeroCTA, CTASection, etc.)
│   └── ui/                    # Reusable UI components (Button, Footer, Navigation, etc.)
├── config/
│   ├── contact.ts             # Contact information (phone, email)
│   ├── features.ts            # Feature flags
│   ├── media.ts               # Hero slides, media assets, campaigns
│   ├── pages.ts               # Page metadata
│   └── social.ts              # Social media links
├── lib/
│   ├── db.ts                  # Neon database client
│   ├── email.ts               # Resend email service
│   ├── whatsapp.ts            # WhatsApp link utilities
│   └── i18n/                  # Internationalization setup
├── scripts/
│   ├── setup-database.ts      # Database schema setup
│   ├── check-contacts.ts      # View recent contacts
│   ├── test-resend.ts         # Test email functionality
│   └── test-contact-api.sh    # Test contact API endpoint
├── messages/
│   ├── en.json                # English translations
│   └── pl.json                # Polish translations
├── __tests__/
│   ├── components/            # Unit tests (Vitest)
│   └── e2e/                   # E2E tests (Playwright)
├── public/
│   └── images/
│       ├── flags/             # Language switcher flag SVGs (gb.svg, pl.svg)
│       └── hero/banners/      # Hero carousel destination banners
├── instrumentation-client.ts  # Sentry client initialization
├── sentry.server.config.ts    # Sentry server initialization
└── sentry.edge.config.ts      # Sentry edge initialization
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended: 24.x)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Tirso0882/explorahead-travel-agency-website.git
cd explorahead-travel-agency-website

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Start development server
npm run dev
```

### Environment Variables

```env
# Application
NEXT_PUBLIC_APP_NAME=ExplorAhead

# Database (Neon Postgres)
DATABASE_URL=postgresql://user:password@host/database

# Email Service (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@explorahead.com
ADMIN_EMAIL=explorahead@gmail.com

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Sentry (optional but recommended)
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
SENTRY_DSN=your_sentry_dsn
SENTRY_ORG=your_org
SENTRY_PROJECT=your_project
```

### Database Setup

The project uses **Neon Serverless Postgres** for the contact form database:

```bash
# Run database setup script (creates contacts table)
npx tsx scripts/setup-database.ts

# Check recent contacts
npx tsx scripts/check-contacts.ts

# Test email functionality
npx tsx scripts/test-resend.ts

# Test contact API endpoint
./scripts/test-contact-api.sh
```

**Note:** The contact form is currently disabled on the live site. To reactivate:
1. Open `app/[locale]/(marketing)/contact/page.tsx`
2. Uncomment the form section (look for `========== CONTACT FORM - TEMPORARILY HIDDEN ==========`)
3. Change grid from `lg:grid-cols-1` to `lg:grid-cols-2`

### Available Scripts

```bash
npm run dev          # Start development server (Turbopack)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run typecheck    # Run TypeScript type checking
npm run test         # Run unit tests
npm run test:ui      # Run tests with UI
npm run test:e2e     # Run E2E tests
npm run test:e2e:ui  # Run E2E tests with UI
```

---

## 🧪 Testing Strategy

### Unit Tests (Vitest + React Testing Library)
- Component rendering and behavior
- Hook testing
- Utility function testing
- Coverage reporting

### E2E Tests (Playwright)
- Cross-browser testing (Chrome, Firefox, Safari)
- Mobile viewport testing (Pixel 5, iPhone 12)
- User journey validation
- Visual regression prevention

```bash
# Run all tests
npm run test && npm run test:e2e

# With coverage
npm run test:coverage
```

---

## 📦 Deployment

The project is deployed on **Vercel** with automatic deployments triggered by pushes to the `main` branch.

### Deployment Pipeline
1. **Push to GitHub** → GitHub Actions triggered
2. **Vercel Build** → Next.js build with optimizations
3. **Sentry Source Maps** → Uploaded for error tracking
4. **Production Deploy** → Edge network distribution

### Branch Strategy
- `main` → Production (explorahead.com)
- `feature/*` → Preview deployments with unique URLs

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment documentation.

---

## 🎨 Design System

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Sand | `#F5E6D3` | Warm backgrounds |
| Ocean | `#1A365D` | Primary text, accents |
| Gold | `#D4A574` | CTAs, highlights |
| Terracotta | `#C4785A` | Secondary accents |
| Forest | `#2D5A45` | Success states |

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: DM Sans (sans-serif)
- **Standardized Classes**: `.card-title`, `.card-description`, `.section-subtitle` for consistent sizing
- **Body Text**: Minimum 16px with 1.625 line-height for optimal readability
- **Responsive**: Scales from mobile (16px) to desktop (20px) automatically

### CSS Animations
- **Heartbeat Pulse** — WhatsApp button attention-grabbing animation
- **Compass Spin** — Slow rotation for interactive elements
- **Swipe Hint** — Mobile carousel scroll indicator
- **Gradient Overlays** — Hero section cinematic gradients
- **Particle Float** — Ambient floating particles on hero

---

## 🔧 Configuration

### Feature Flags
Toggle features without code changes:

```typescript
// config/features.ts
export const featureFlags = {
  destinations: false,  // Coming soon
  testimonials: false,  // Coming soon
};
```

### Hero Slides Configuration
Add or modify hero carousel slides in `config/media.ts`:

```typescript
export const heroSlides: HeroSlide[] = [
  {
    id: "madagascar",           // Unique ID (matches translation key)
    image: "/images/hero/banners/madagascar-banner.jpg",
    alt: "Baobab, Madagascar",
    destination: "Madagascar", // Displayed destination name
    message: "Seek the places where wonder still grows wild.",
    tagline: "Wonder Grows Wild",
    iconColor: "#FFB347",       // Accent color for slide
    whatsappMessage: "Madagascar's baobabs are calling me!",
    focalPoint: "center center", // CSS object-position for image cropping
  },
  // Add more slides...
];
```

**Note:** Add corresponding translations in `messages/[locale].json` under `hero.slides.[id]`.

### WhatsApp Integration
Configure WhatsApp messaging in `lib/whatsapp.ts`:

```typescript
import { getWhatsAppLinkForDestination } from "@/lib/whatsapp";
import { heroSlides } from "@/config/media";

// Get destination-specific WhatsApp link
const link = getWhatsAppLinkForDestination("+48690946046", heroSlides[0]);

// Get journey completion WhatsApp link
const journeyLink = getWhatsAppLinkJourneyComplete("+48690946046");
```

The WhatsApp CTA button:
- Appears after user interaction (dwell time, slide navigation)
- Shows heartbeat pulse animation to draw attention
- Pre-fills message based on current destination slide
- Celebrates when user has viewed all destination slides

### Adding a New Language
1. Create `messages/[locale].json` with translations
2. Add locale to `lib/i18n/routing.ts`
3. Add flag SVG to `public/images/flags/[locale].svg`
4. Deploy — automatic locale detection handles the rest

---

## 👨‍💻 About the Developer

I'm an **AI Engineer** with a passion for building intelligent systems. This project demonstrates that my skills extend beyond ML/AI into full-stack web development:

- **Primary Focus**: AI/ML Engineering, LLMs, RAG systems, MLOps
- **This Project Shows**: Frontend development, modern React, DevOps, observability

> I believe the best AI engineers are versatile developers who can integrate AI capabilities into real products—from model to deployment.

### Let's Connect
- **GitHub**: [@Tirso0882](https://github.com/Tirso0882)
   **Email**: [tirso.gomez@RedKraken.tech](tirso.gomez@redkraken.tech)
- **Project**: [explorahead-travel-agency-website](https://github.com/Tirso0882/explorahead-travel-agency-website)

---

## 📄 License

This project is **proprietary software** owned by ExplorAhead. All rights reserved.

While this repository is publicly visible on GitHub for portfolio and demonstration purposes, **no license is granted** to use, copy, modify, or distribute the code beyond what is permitted by [GitHub's Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) (viewing and forking).

See the [LICENSE](LICENSE) file for full terms.

### Third-Party Software

This project uses open source libraries that are subject to their own licenses (primarily MIT, ISC, Apache-2.0, and BSD-2-Clause). See the [NOTICE](NOTICE) file for the complete list of third-party components and their licenses.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Vercel](https://vercel.com/) for seamless deployment
- [Sentry](https://sentry.io/) for production-grade observability
- [Tailwind CSS](https://tailwindcss.com/) for rapid UI development

---

<div align="center">

**Built with ❤️ by RedKraken 🐙**

</div>
