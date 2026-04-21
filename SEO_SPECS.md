# SEO Product Specifications – Rose Winarouz

Comprehensive roadmap for Technical and Content SEO optimization to ensure maximum visibility and institutional credibility.

## 1. Technical SEO Requirements

### 1.1 Metadata Standard
Each page must implement the following metadata object:
- **Title**: `[Page Name] | Rose Winarouz` (Max 60 chars)
- **Description**: Compelling summary of page content (150-160 chars)
- **Canonical**: Self-referencing canonical URL to prevent duplicate content issues.
- **Robots**: `index, follow` (default) or `noindex, nofollow` for private routes.

### 1.2 Social Graph (Open Graph & Twitter)
- **OG Type**: `website` or `article`
- **OG Image**: Unique, high-quality image per page (1200x630px).
- **Twitter Card**: `summary_large_image`
- **Site Name**: Rose Winarouz

### 1.3 Automatic Indexing (Sitemap & Robots)
- **Sitemap**: Dynamic `sitemap.xml` generated via Next.js `sitemap.ts` including all static routes and dynamic project slugs.
- **Robots.txt**: Standard `robots.txt` allowing all bots and pointing to the sitemap.

### 1.4 Structured Data (JSON-LD)
Implement the following schemas on every page to enhance Google Knowledge Graph presence:
- **Organization**: Global NGO details (Name, Logo, Social links).
- **NonProfit**: Specific NGO identification.
- **Breadcrumbs**: Navigation path for better snippets.
- **Project/Article**: For detail pages, including status and impact metrics.

---

## 2. Content & Architecture

### 2.1 URL Structure
- All URLs must be lowercase and hyphen-separated.
- No query parameters for primary content access.
- **Example**: `/projects/reconstruction-durable-al-haouz`

### 2.2 Heading Hierarchy
- **H1**: Single, clear title per page.
- **H2-H4**: Logical nesting for sections.
- **Alt Text**: Descriptive alt text for all images, specifically highlighting project names and locations.

### 2.3 Internal Linking
- Footer must link to active project categories.
- Cross-linking between project details and the general projects list.

---

## 3. Speed & Performance Benchmarks

Optimization targets for Core Web Vitals:
| Metric | Target | Current Status |
| :--- | :--- | :--- |
| **LCP** | < 2.5s | ⚠️ Needs optimization (Hero images) |
| **CLS** | < 0.1 | ✅ Passing |
| **INP** | < 200ms | ✅ Passing |
| **Lighthouse SEO** | 100/100 | ⚠️ Current: ~80/100 |

### 3.1 Optimization Checklist
- [ ] Implement `font-display: swap` for Clash Display.
- [ ] Preload hero images on Home and Radio pages.
- [ ] Ensure all images are served as WebP/AVIF.
- [ ] Minify and compress JSON-LD payloads.

---

## 5. JavaScript & Next.js SEO Optimizations

### 5.1 Server-Side Rendering (SSR) & Server Components
- **Default to Server Components**: Ensure all primary content (headings, text, navigation) is rendered on the server to be immediately available in the initial HTML for crawlers.
- **Data Fetching**: Use Next.js `fetch` with appropriate revalidation tags for high indexing freshness.

### 5.2 Next.js Metadata API
- **Dynamic Routes**: Implement `generateMetadata()` for all dynamic routes (e.g., `/projects/[slug]`) to ensure unique titles and descriptions per item.
- **Static Metadata**: Defined in `layout.tsx` or `page.tsx` for static pages.

### 5.3 Link & Image Optimization
- **Next/Link**: Use `<Link>` for all internal navigation to enable background prefetching and client-side transitions.
- **Next/Image**: Mandatory usage for all images to handle lazy loading, resizing, and WebP conversion automatically.

### 5.4 Third-Party Scripts
- **next/script**: Use the `next/script` component with `strategy="afterInteractive"` or `lazyOnload` to prevent blocking the main thread and damaging LCP/INP scores.

---

## 6. UX & Accessibility Optimizations

### 6.1 Custom Tap Highlight (Chrome & Mobile)
To prevent the "generic" blue rectangle appearing on tap/focus while maintaining high usability:
- **CSS Rule**: Set `-webkit-tap-highlight-color: transparent;` globally.
- **Requirement**: MUST replace the transparent highlight with a branded visual state using `:active` or `:focus-visible`.
- **Accessibility**: Ensure `:focus-visible` remains highly visible for keyboard users (WCAG compliance), which directly impacts SEO rankings.

---

## 7. Implementation Status Trace

- **Global Metadata**: 🟢 Implemented (metadataBase, title template, OG, Twitter).
- **Per-page Metadata**: 🟢 Implemented (All 6 pages + dynamic [slug]).
- **Structured Data**: 🟢 Implemented (Organization + NonProfit JSON-LD).
- **Sitemap/Robots**: 🟢 Implemented (Dynamic sitemap.ts + robots.ts).
- **Semantic HTML**: 🟢 Mostly correct (H1/H2 usage validated).
- **Social Tags**: 🟢 Implemented (OG + Twitter cards on all pages).
- **JS SEO (SSR/Metadata)**: 🟢 Implemented (Using Next.js App Router).
- **UX Tap Optimization**: 🟢 Implemented (tap-highlight + focus-visible).
