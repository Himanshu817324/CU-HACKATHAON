# SustainAI — Eco + AI Dashboard

> **Analyze. Optimize. Decarbonize.**

A premium, hackathon-ready frontend for SustainAI — an AI-driven web product that analyzes and optimizes digital carbon emissions for websites and GitHub repositories.

## 🎨 Design Philosophy

- **Credible & Modern**: Data-first approach with low visual noise
- **Sustainable Design**: Custom SVGs, system fonts, lightweight animations
- **Accessible**: WCAG compliant with prefers-reduced-motion support
- **Performance**: SSR-friendly, lazy-loaded components, optimized assets

## 🎨 Brand Tokens

```css
Primary (Eco-Teal): #00B87C
Deep Background: #071428
Accent (Solar Amber): #FFD166
Surface Light: #F7FAFC
Text Primary: #E6E8EB
Text Secondary: #9CA3AF
Success: #12B76A
Error: #E85A4F
Glass: rgba(255,255,255,0.04)
```

## 🧩 Component Library

### Core Components

- **HeroInput**: URL/GitHub input with toggle and examples
- **ImpactBadge**: Grade badge with numeric value and sparkline
- **BeforeAfterSlider**: Interactive emission comparison with animated counters
- **ProjectCard**: Project overview with scores and trends
- **RecommendationChat**: LLM-style recommendation bubbles with actions
- **KPIStrip**: Dashboard metrics grid
- **ReportPDFPreview**: Report download with preview

### Layout Components

- **Navbar**: Fixed glassmorphism nav with mobile menu
- **Footer**: Links, socials, carbon savings indicator
- **Hero**: Animated particle background + CTA

## 📁 Project Structure

```
client/
├── app/
│   ├── layout.tsx         # Root layout with brand tokens
│   ├── page.tsx           # Landing page
│   ├── dashboard/         # Dashboard page
│   ├── analyze/           # Analysis page
│   ├── report/            # Report page
│   └── api/               # Mock API endpoints
│       ├── analyze/route.ts
│       ├── dashboard/route.ts
│       └── projects/route.ts
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── HeroInput.tsx
│   ├── FeatureCard.tsx
│   ├── ImpactBadge.tsx
│   ├── BeforeAfterSlider.tsx
│   ├── ProjectCard.tsx
│   ├── KPIStrip.tsx
│   ├── RecommendationChat.tsx
│   ├── ReportPDFPreview.tsx
│   └── index.ts
├── lib/
│   └── mockData.ts        # Mock data for demos
└── app/
    └── globals.css        # Design system & tokens
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd client
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Features

### Pages

1. **Landing** (`/`)
   - Hero with animated particle network
   - Feature showcase
   - How it works flow
   - Interactive before/after demo
   - CTA section

2. **Dashboard** (`/dashboard`)
   - Welcome header
   - KPI metrics grid
   - Project cards with trends
   - AI recommendations

3. **Analyze** (`/analyze`)
   - URL/Repo input
   - Loading states
   - Results with breakdowns
   - Recommendations

4. **Report** (`/report`)
   - PDF preview
   - Before/after slider
   - Statistics grid
   - Methodology

### Mock API Endpoints

- `POST /api/analyze` - Analyze website/repo
- `GET /api/dashboard` - Dashboard data
- `GET /api/projects` - Project list

All endpoints return realistic mock data for demos.

## 🎨 Design System

### Typography

```css
H1: 48–56px
H2: 28–36px  
H3: 18–22px
Body: 16px
UI: 12–14px

Fonts: Inter (system stack fallback)
Monospace: IBM Plex Mono
```

### Motion

- Card hover: `translateY -6px, scale 1.01` (220ms ease-out)
- Button press: `scale 0.98` with pulse
- Particle background: Low FPS, pauses on `prefers-reduced-motion`
- Drag interactions: Smooth transitions on counters

### Glassmorphism

```css
.glass {
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.1);
}
```

### Accessibility

- ✅ WCAG AA contrast ratios
- ✅ Keyboard navigation
- ✅ Focus states
- ✅ ARIA labels
- ✅ Prefers-reduced-motion support
- ✅ Screen reader friendly

## 📊 Performance

### Optimizations

- System fonts (no external font loading)
- SVG illustrations (no raster images in UI)
- Lazy loading for heavy components
- Dynamic imports for charts/3D
- SSR for above-the-fold content
- Optimized Framer Motion (transform-only)

### Performance Budget

- LCP: < 1.5s
- FCP: < 1.0s
- TBT: < 300ms
- Bundle size: < 150KB (compressed)

## 🏗️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: (Ready for Recharts integration)
- **TypeScript**: Strict mode

## 📝 Development Notes

### SSR vs Client Components

- **Server**: Layout, metadata, static content
- **Client**: Interactive components (animated, stateful)
- All pages are client-side by default (Next.js App Router)

### Component Patterns

- Use `motion` from Framer Motion for animations
- Glassmorphism via `.glass` utility class
- Responsive with Tailwind breakpoints
- Accessible with proper ARIA and keyboard support

### Performance Checklist

- [x] System fonts only
- [x] SVGs only (no raster images in UI)
- [x] Lazy load heavy modules
- [x] Dynamic imports for 3D/charts
- [x] SSR for hero content
- [x] Optimize Framer Motion
- [x] Minimal dependencies
- [ ] Lighthouse 90+ all scores

## 🎓 Hackathon Pitch Points

1. **Real Impact**: Shows actual carbon metrics, not just buzzwords
2. **AI-Powered**: Smart recommendations with code-level fixes
3. **Developer-First**: Integrates with GitHub, actionable insights
4. **Beautiful UX**: Modern, accessible, performant
5. **Sustainable**: Built with sustainability in mind (lightweight, efficient)

## 🐛 Known Limitations

- Mock API only (needs backend integration)
- Static demos (no real analysis yet)
- PDF generation placeholder
- Limited charting (ready for Recharts)

## 📄 License

Built for CU Hackathon 2024

## 🙏 Credits

Design inspired by modern sustainability dashboards and minimal AI tools. Icons by [Lucide](https://lucide.dev).

---

**Built with 💚 for a greener digital future**
