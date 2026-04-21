# Rose Winarouz - Product Specifications

## Executive Summary

Rose Winarouz is a next-generation web platform for a Moroccan NGO focused on sustainable territorial development, territorial intelligence, and community solidarity. The platform showcases the organization's mission, projects, impact, and provides mechanisms for donations, engagement, and community connection.

---

## Product Overview

**Project Name:** Rose Winarouz Web Platform  
**Version:** 0.1.0  
**Organization:** Rose Winarouz Association  
**Location:** Al Haouz, Morocco  
**Technology Stack:** Next.js 16, React 19, TypeScript, Framer Motion, Lucide React

### Mission Statement
Engage in sustainable territorial development, territorial intelligence, and community solidarity in Morocco, with a focus on rural and mountainous regions, particularly in Al Haouz.

---

## Core Features

### 1. Homepage Experience
- **Featured Hero Section** - Eye-catching introduction to Rose Winarouz's mission
- **Partner Showcase** - Display of partner organizations and supporters
- **Domain Areas** - Highlight key organizational focus areas with statistics
- **Project Gallery** - Featured projects with visual cards
- **Donation Call-to-Action** - Prominent donation module for fundraising
- **Instagram Feed Integration** - Real-time social media feed embedded
- **Testimonials Section** - Community impact stories and beneficiary testimonials

### 2. Organization Information
- **About Page** - Detailed mission, vision, values, and organizational history
- **Impact Statistics** - Key metrics:
  - 8+ Projects completed/in-progress
  - 230+ Active volunteers
  - 5+ Fundraising campaigns
  - 30,000+ Beneficiaries reached

### 3. Project Management & Showcase
- **Projects Page** - Comprehensive portfolio of all initiatives
- **Project Categories:**
  - Reconstruction (Post-earthquake relief & recovery)
  - Entrepreneurship (Economic empowerment initiatives)
  - Healthcare (Health access & services)
  - Education (Pre-school & educational programs)
  - Emergency Response (Crisis intervention)
  - Community Orientation (Local guidance & support)
  - Territorial Development (Infrastructure & planning)

- **Project Details** - Individual project pages with:
  - Project title and description
  - Objectives and goals
  - Target audience
  - Impact measurements
  - Partnership information
  - Status tracking (active, completed, phase-based)
  - Progress indicators
  - Photo galleries

### 4. Radio & Podcast Section
- **Media Hub** - Dedicated space for audio content
- **Player Functionality** - Built-in media player for podcast playback
- **Featured Content** - Highlighted episodes and series
- **Parallax Hero** - Engaging visual header with scroll effects
- **Media Grid** - Organized collection of available podcasts
- **Footer Integration** - Additional resources and navigation

### 5. Contact & Communication
- **Contact Page** - Multiple ways to reach the organization
- **Contact Form** - Direct messaging capability
- **Location Information** - Physical office and service areas
- **Engagement Opportunities** - Call-to-action for volunteers and partners

### 6. Donation System
- **Donation Modal** - Quick-access donation interface
- **Campaign Support** - Fund specific projects or campaigns
- **Giving Options** - Flexible donation mechanisms

### 7. Navigation & User Interface
- **Dashboard Layout** - Main application wrapper with consistent navigation
- **Sidebar Navigation** - Organized menu structure
- **Top Navigation Bar** - Quick access to key sections
- **Mobile Navigation** - Responsive design for mobile devices
- **Footer** - Consistent footer with links and information

---

## Technical Architecture

### Frontend Framework
- **Next.js 16.1.6** - React meta-framework with App Router
- **React 19.2.3** - Component library and state management
- **TypeScript 5** - Type-safe JavaScript

### Styling & Animation
- **CSS Modules** - Component-scoped styling
- **Framer Motion 12.34.4** - Advanced animations and transitions
- **Global CSS** - Shared styles and design tokens

### UI Components & Icons
- **Lucide React 0.576.0** - Modern icon library
- **Custom Components** - Reusable, modular React components

### Project Structure
```
src/
├── app/
│   ├── (main)/              # Main application routes
│   │   ├── about/           # About page
│   │   ├── contact/         # Contact page
│   │   ├── projects/        # Projects listing and details
│   │   └── components/      # Home page components
│   ├── radio/               # Radio/podcast section
│   └── api/                 # API routes (Instagram integration)
├── components/              # Shared components
│   ├── dashboard/           # Layout components
│   └── ui/                  # Reusable UI components
└── context/                 # React context (theming, etc.)
```

---

## Content & Data Management

### Projects Database
- **Data Structure:** TypeScript interfaces defining project metadata
- **Project Attributes:**
  - Slug (URL identifier)
  - Title & short title
  - Detailed description
  - Objectives & goals
  - Target audience
  - Impact metrics
  - Partnership details
  - Status & progress tracking
  - Color coding
  - Photo galleries (multiple images per project)

### Media Content
- **Podcasts & Radio Shows** - Stored in `/public/podcasts/`
- **Project Images** - Organized by category in `/public/project images/`
- **Animations** - Reusable animation assets in `/public/animation/`
- **Fonts** - Custom typography in `/public/fonts/`

### External Integrations
- **Instagram API Integration** - Real-time feed display via `/api/instagram/route.ts`

---

## Design & User Experience

### Visual Identity
- **Typography** - Geist font family optimized by Next.js
- **Color System** - Dynamic theming via ThemeProvider context
- **Animations** - Smooth transitions powered by Framer Motion
- **Responsive Design** - Mobile-first approach with breakpoints

### Key Sections
1. **Hero Sections** - Parallax effects and engaging visuals
2. **Feature Cards** - Project and initiative showcases
3. **Statistics** - Impact metrics with animated counters
4. **Testimonials** - Community stories and feedback
5. **Call-to-Actions** - Strategic donation and engagement prompts

### Accessibility Considerations
- Semantic HTML structure
- Type-safe components
- Keyboard navigation support
- Mobile-responsive layouts

---

## Key Pages & Routes

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Main landing page with all key sections |
| About | `/about` | Organization background and mission |
| Contact | `/contact` | Contact form and communication |
| Projects | `/projects` | Full project portfolio |
| Project Detail | `/projects/[slug]` | Individual project showcase |
| Radio/Podcast | `/radio` | Audio content hub |

---

## Performance Optimizations

- **Image Optimization** - Next.js Image component
- **Font Optimization** - `next/font` for Geist
- **Code Splitting** - Automatic by Next.js
- **CSS Modules** - Component-scoped styling preventing conflicts

---

## Development Workflow

### Available Scripts
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm start       # Start production server
npm run lint    # Run ESLint
```

### Build Configuration
- **ESLint Config** - Modern JavaScript linting
- **TypeScript** - Strict type checking
- **Next.js Config** - Customizable server behavior

---

## Deployment

- **Target Platform:** Vercel (recommended)
- **Environment:** Production-ready
- **Scalability:** Built on serverless architecture
- **CDN:** Global content delivery via Vercel Edge Network

---

## Future Enhancements

Potential features for future versions:
- [ ] Multi-language support (French/Arabic)
- [ ] Event calendar system
- [ ] Volunteer registration portal
- [ ] Fundraising campaign management dashboard
- [ ] Analytics and reporting
- [ ] CMS integration for dynamic content
- [ ] Email newsletter subscription
- [ ] Payment integration for donations
- [ ] Blog/news section
- [ ] Photo gallery lightbox improvements

---

## Success Metrics

- **Engagement:** Track user interactions with projects and donation CTAs
- **Reach:** Monitor visitor analytics and geographic distribution
- **Conversions:** Measure donation completion rates
- **Social:** Track Instagram feed engagement and shares
- **Performance:** Monitor page load times and Core Web Vitals

---

## Support & Maintenance

- **Framework Updates:** Next.js and React updates quarterly
- **Security:** Regular dependency updates and vulnerability scanning
- **Content Updates:** Regular project and news updates
- **Monitoring:** Error tracking and performance monitoring recommended

---

## Compliance & Legal

- **Language:** French (fr_FR)
- **Data Privacy:** Compliant with Moroccan and EU data protection standards
- **Accessibility:** WCAG 2.1 compliance target

---

**Document Version:** 1.0  
**Last Updated:** March 2026  
**Status:** Active Development
