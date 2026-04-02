# KAM - Interactive City Guide

> **Kam v tvojom meste?** — An interactive map application for exploring points of interest in Slovak cities.

---

## Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Framework** | Next.js with App Router | 15.5.9 |
| **Language** | TypeScript | 5.x |
| **UI Library** | React | 19.1.4 |
| **Styling** | Tailwind CSS | 4.x |
| **Maps** | Leaflet + react-leaflet | 1.9.4 / 5.0.0 |
| **Icons** | lucide-react | 0.562.0 |
| **Utilities** | clsx, tailwind-merge | Latest |
| **Deployment** | Cloudflare Workers (OpenNext) | 1.14.4 |

---

## Project Structure

```
edo/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Main SPA (320 lines)
│   │   ├── layout.tsx         # Root layout with Fontshare fonts
│   │   ├── app.css            # Tailwind entry point
│   │   ├── globals.css        # CSS variables & theme
│   │   ├── admin/             # Admin dashboard
│   │   │   ├── page.tsx       # Dashboard with stats
│   │   │   ├── layout.tsx     # Admin layout with sidebar
│   │   │   ├── login/         # Authentication
│   │   │   └── places/        # CRUD for places
│   │   └── api/               # REST API routes
│   │       ├── auth/          # Auth endpoints
│   │       ├── cities/        # Cities endpoint
│   │       └── places/        # Places CRUD
│   ├── components/
│   │   ├── Map.tsx            # Leaflet map (155 lines)
│   │   └── AdminMap.tsx       # Admin map variant
│   ├── lib/
│   │   ├── data.ts            # City/Place data (462 lines)
│   │   ├── api-types.ts       # API type definitions
│   │   └── auth.ts            # Auth utilities
│   └── db/                    # Database layer (empty/WIP)
├── public/                    # Static assets
├── main.typ                   # Typst thesis documentation
└── wrangler.jsonc             # Cloudflare Worker config
```

---

## Data Model

### City
```typescript
interface City {
  id: string;       // 'kosice', 'secovce'
  name: string;     // Display name
  lat: number;      // Center latitude
  lng: number;      // Center longitude
  places: Place[];  // Points of interest
}
```

### Place
```typescript
interface Place {
  id: string;
  name: string;
  category: 'coffee' | 'food' | 'nature' | 'culture';
  description: string;
  lat: number;
  lng: number;
  tags: string[];
  image: string;
  googleMapsLink?: string;
}
```

---

## Current Data

| City | Places | Categories |
|------|--------|------------|
| **Košice** | 26 | 6 coffee, 4 food, 5 nature, 11 culture |
| **Sečovce** | 16 | 2 coffee, 5 food, 1 nature, 8 culture |
| **Total** | 42 | — |

---

## Key Features

### Public Interface (`/`)
- **Multi-city support** — Switch between Košice and Sečovce
- **Category filtering** — Coffee, Food, Culture, Nature
- **Search** — By name, description, or tags
- **URL state sync** — City and category persist in `?city=&cat=`
- **Responsive design** — Split layout (sidebar + map) with mobile bottom sheet
- **Dark mode** — CSS variables with `prefers-color-scheme`
- **Geolocation** — "My location" button on map
- **Google Maps navigation** — Opens directions in new tab

### Admin Interface (`/admin`)
- **Dashboard** — Statistics by category
- **Places management** — View/filter all places
- **CRUD operations** — Create, edit, delete places via API
- **Map picker** — Click-to-select coordinates
- **Auth-protected** — Login required

---

## Architecture Highlights

| Concept | Implementation |
|---------|----------------|
| **Rendering** | Client-side (`'use client'`) for interactivity |
| **Map SSR** | Disabled via `dynamic(() => import(), { ssr: false })` |
| **Custom markers** | Lucide icons rendered to `L.divIcon` |
| **Typography** | Fontshare (Clash Display + Satoshi) |
| **Animations** | CSS transitions + Leaflet `flyTo()` |
| **State** | React `useState` + URL search params |

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server with Turbopack |
| `npm run build` | Production build |
| `npm run preview` | Local Cloudflare runtime preview |
| `npm run deploy` | Deploy to Cloudflare Workers |
| `npm run lint` | ESLint check |

---

## File Statistics

| File | Lines | Purpose |
|------|-------|---------|
| `page.tsx` | 320 | Main application UI |
| `data.ts` | 462 | Hardcoded city/place data |
| `Map.tsx` | 155 | Leaflet map component |
| `admin/page.tsx` | 193 | Admin dashboard |
| `globals.css` | 52 | Theme variables |

---

## Observations & Recommendations

| Area | Status | Notes |
|------|--------|-------|
| **Code Quality** | Good | Clean components, proper TypeScript |
| **Data Layer** | Static | All data hardcoded — consider DB migration |
| **API Routes** | Present | Ready for database integration |
| **Admin Panel** | Complete | Full CRUD UI implemented |
| **Images** | External | Unsplash URLs — consider local assets |
| **SEO** | Basic | Only title/description — add more meta |
| **Accessibility** | Partial | Some ARIA labels missing |
| **Testing** | None | No test files present |
| **i18n** | Slovak only | Hardcoded Slovak strings |

---

## Documentation

The project includes `main.typ` — a Typst document serving as thesis documentation for a high school project at "Stredná odborná škola techniky a služieb, Sečovce".

---

*Generated: 2026-02-07*
