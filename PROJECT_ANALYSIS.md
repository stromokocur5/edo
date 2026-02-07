# Project Analysis: EDO - Interactive City Guide

## Overview

This is a **Next.js 15** web application serving as an interactive city guide ("Kam v tvojom meste?" - "Where in your city?"). It displays points of interest on an interactive map, allowing users to explore cafes, restaurants, cultural sites, and nature spots in Slovak cities.

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 15.5.9 with App Router |
| **Language** | TypeScript |
| **UI Library** | React 19.1.4 |
| **Styling** | Tailwind CSS 4 |
| **Maps** | Leaflet + react-leaflet (OpenStreetMap tiles) |
| **Icons** | lucide-react |
| **Deployment** | Cloudflare Workers via OpenNext adapter |

---

## Project Structure

```
edo/
├── src/
│   ├── app/
│   │   ├── page.tsx      # Main SPA component
│   │   ├── layout.tsx    # Root layout with fonts
│   │   ├── app.css       # Tailwind theme & custom styles
│   │   └── globals.css
│   ├── components/
│   │   └── Map.tsx       # Leaflet map component
│   └── lib/
│       └── data.ts       # City and place data (hardcoded)
├── public/               # Static assets (favicons, etc.)
├── main.typ              # Typst documentation (Slovak thesis)
└── zdroje.bib            # Bibliography
```

---

## Key Features

1. **Multi-city support** - Currently covers **Košice** (26 places) and **Sečovce** (16 places)
2. **Category filtering** - Coffee, Food, Culture, Nature
3. **Search functionality** - Searches by name, description, and tags
4. **URL state sync** - City and category persist in URL parameters
5. **Responsive design** - Split layout (sidebar + map) with mobile adaptation
6. **Dark mode support** - CSS variables with dark theme variants
7. **Geolocation** - "My location" button on the map
8. **Navigation integration** - Opens Google Maps for directions

---

## Architecture Highlights

- **Client-side rendering (CSR)** for the main app with `'use client'`
- **Dynamic map import** - SSR disabled for Leaflet compatibility
- **Custom map markers** - Category-specific colored icons with lucide icons
- **Typography** - Fontshare fonts (Clash Display + Satoshi)
- **Smooth animations** - Map fly-to transitions, hover effects

---

## Data Model

### City Interface
```typescript
interface City {
  id: string;
  name: string;
  lat: number;
  lng: number;
  places: Place[];
}
```

### Place Interface
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

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run preview` | Preview on Cloudflare runtime |
| `npm run deploy` | Deploy to Cloudflare |

---

## Observations & Suggestions

| Area | Status | Notes |
|------|--------|-------|
| **Code Quality** | Good | Clean component structure, proper TypeScript types |
| **Data Layer** | Static | All data hardcoded - consider CMS/database for scalability |
| **SEO** | Basic | Only title/description - could add more meta tags |
| **Images** | External | Uses Unsplash URLs - consider local assets for reliability |
| **Accessibility** | Partial | Some ARIA labels missing |
| **Testing** | None | No test files present |

---

## Documentation

The project includes `main.typ` - a Typst document serving as thesis documentation for a high school project ("Stredná odborná škola techniky a služieb, Sečovce"). It covers technical explanations of the stack and implementation approach.

---

*Generated: 2026-02-07*
