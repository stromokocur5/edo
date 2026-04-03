'use client';

import { useState, useMemo, useEffect, Suspense, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Category, Place } from '@/lib/data';
import { MapPin, Coffee, Utensils, Trees, Drama, ChevronRight, X, Search, Navigation, List, Map as MapIcon, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';


// Dynamický import mapy
const MapComponent = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">Načítavam mapu...</div>
});

const CATEGORIES: { id: Category | 'all'; label: string; icon: any }[] = [
  { id: 'all', label: 'Všetko', icon: MapPin },
  { id: 'coffee', label: 'Káva', icon: Coffee },
  { id: 'food', label: 'Jedlo', icon: Utensils },
  { id: 'culture', label: 'Kultúra', icon: Drama },
  { id: 'nature', label: 'Príroda', icon: Trees },
];

interface CityWithPlaces {
  id: string;
  name: string;
  lat: number;
  lng: number;
  places: Place[];
}

function KamApp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const listRef = useRef<HTMLDivElement>(null);

  // Data fetching state
  const [citiesData, setCitiesData] = useState<CityWithPlaces[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    Promise.all([
      fetch('/api/cities').then(r => r.json()) as Promise<{ cities?: { id: string; name: string; lat: number; lng: number }[] }>,
      fetch('/api/places').then(r => r.json()) as Promise<{ places?: (Place & { cityId: string })[] }>,
    ])
      .then(([citiesRes, placesRes]) => {
        const cities = citiesRes.cities || [];
        const places = placesRes.places || [];

        // Group places by city
        const citiesWithPlaces: CityWithPlaces[] = cities.map(city => ({
          ...city,
          places: places
            .filter(p => p.cityId === city.id)
            .map(({ cityId, ...rest }) => rest),
        }));

        setCitiesData(citiesWithPlaces);
      })
      .catch(console.error)
      .finally(() => setDataLoading(false));
  }, []);

  // URL State Initialization
  const initialCityId = searchParams.get('city') || citiesData[0]?.id || '';
  const initialCategory = (searchParams.get('cat') as Category | 'all') || 'all';

  const [activeCityId, setActiveCityId] = useState(initialCityId);
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>(initialCategory);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mobile View State
  const [mobileView, setMobileView] = useState<'map' | 'list'>('list');

  // Once data loads, set the initial city if not already set
  useEffect(() => {
    if (citiesData.length > 0 && !activeCityId) {
      setActiveCityId(searchParams.get('city') || citiesData[0].id);
    }
  }, [citiesData, activeCityId, searchParams]);

  // Sync state to URL
  useEffect(() => {
    if (!activeCityId) return;
    const params = new URLSearchParams();
    if (activeCityId) params.set('city', activeCityId);
    if (activeCategory && activeCategory !== 'all') params.set('cat', activeCategory);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [activeCityId, activeCategory, router]);

  const activeCity = citiesData.find(c => c.id === activeCityId) || citiesData[0];

  const filteredPlaces = useMemo(() => {
    if (!activeCity) return [];
    let places = activeCity.places;
    if (activeCategory !== 'all') places = places.filter(p => p.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      places = places.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return places;
  }, [activeCity, activeCategory, searchQuery]);

  // Handle Selection
  const handlePlaceSelect = (place: Place, source: 'list' | 'map') => {
    setSelectedPlace(place);
    // RESTORED: Auto-switch to map on mobile (User: "Mobile was good before")
    if (window.innerWidth < 768) {
      setMobileView('map');
    }
  };

  // RESTORED: Auto-Scroll BUT -> MOBILE ONLY
  // User: "On desktop... not interfering in list"
  useEffect(() => {
    if (selectedPlace && listRef.current) {
      // Only scroll on mobile to avoid jumping on desktop
      if (window.innerWidth < 768) {
        const el = document.getElementById(`place-${selectedPlace.id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [selectedPlace]);

  const handleNavigation = (place: Place) => {
    if (place.googleMapsLink) {
      window.open(place.googleMapsLink, '_blank');
    } else {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`, '_blank');
    }
  };

  if (dataLoading || !activeCity) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-brand-light dark:bg-gray-900">
        <Loader2 className="w-8 h-8 text-accent-primary animate-spin" />
      </div>
    );
  }

  return (
    <main className="h-screen w-screen relative md:flex bg-brand-light font-sans overflow-hidden text-brand-dark dark:bg-gray-900 dark:text-gray-100 transition-colors">

      {/* MOBILE TABS (Bottom Bar) */}
      {/* RESTORED: Hide buttons if selectedPlace is active (to prevent overlap with Sheet) */}
      {!selectedPlace && (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[40] bg-white dark:bg-gray-800 shadow-2xl rounded-full p-1.5 flex gap-1 border border-gray-100 dark:border-gray-700">
          <button
            onClick={() => setMobileView('list')}
            className={clsx("px-6 py-3 rounded-full flex items-center gap-2 font-bold transition-all",
              mobileView === 'list' ? "bg-brand-dark text-white dark:bg-white dark:text-black" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700")}
          >
            <List size={18} /> Zoznam
          </button>
          <button
            onClick={() => setMobileView('map')}
            className={clsx("px-6 py-3 rounded-full flex items-center gap-2 font-bold transition-all",
              mobileView === 'map' ? "bg-brand-dark text-white dark:bg-white dark:text-black" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700")}
          >
            <MapIcon size={18} /> Mapa
          </button>
        </div>
      )}

      {/* 1. SIDEBAR / LIST PANEL */}
      <div className={clsx(
        "flex flex-col h-full bg-surface dark:bg-gray-800 shadow-2xl z-20 transition-transform duration-300 md:translate-x-0 md:relative md:w-[450px] md:z-10",
        mobileView === 'list'
          ? "absolute inset-0 translate-x-0"
          : "absolute inset-0 -translate-x-full md:translate-x-0"
      )}>

        {/* Header */}
        <div className="p-8 pb-4">
          <h1 className="font-display text-4xl font-bold tracking-tight mb-2 dark:text-white">
            Kam v tvojom <br /> <span className="text-accent-primary">meste?</span>
          </h1>
        </div>

        {/* City Selector */}
        <div className="px-8 flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {citiesData.map(city => (
            <button
              key={city.id}
              onClick={() => { setActiveCityId(city.id); setSelectedPlace(null); }}
              className={clsx(
                "px-6 py-3 font-display font-semibold transition-all duration-300 whitespace-nowrap squircle border-2",
                activeCityId === city.id
                  ? "bg-brand-dark text-white border-brand-dark shadow-lg scale-105 dark:bg-white dark:text-brand-dark dark:border-white"
                  : "bg-transparent text-gray-400 border-gray-200 hover:border-brand-dark hover:text-brand-dark dark:border-gray-700 dark:hover:border-white dark:hover:text-white"
              )}
            >
              {city.name}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="px-8 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Hľadaj kávu, park, divadlo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="px-8 py-2 flex gap-2 overflow-x-auto pb-6 border-b border-gray-100 dark:border-gray-700">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={clsx(
                  "p-3 rounded-2xl flex items-center gap-2 transition-all duration-200",
                  activeCategory === cat.id
                    ? "bg-accent-pop text-brand-dark font-bold shadow-md transform -translate-y-1 ring-2 ring-brand-dark dark:ring-white"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                )}
                title={cat.label}
              >
                <Icon size={18} />
                <span className="text-sm">{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Places List */}
        <div className="flex-1 overflow-y-auto p-8 space-y-4 pb-32 md:pb-8" ref={listRef}>
          {filteredPlaces.length === 0 ? (
            <div className="text-center text-gray-400 py-10">V tejto kategórii zatiaľ nič nemáme.</div>
          ) : (
            filteredPlaces.map(place => (
              <div
                key={place.id}
                id={`place-${place.id}`}
                onClick={() => handlePlaceSelect(place, 'list')}
                className={clsx(
                  "group p-3 border rounded-3xl bg-white hover:border-accent-primary/50 transition-all cursor-pointer relative overflow-hidden flex gap-4 dark:bg-gray-800 dark:border-gray-700",
                  selectedPlace?.id === place.id ? "ring-2 ring-accent-primary shadow-xl bg-gray-50 dark:bg-gray-700/50" : "shadow-sm hover:shadow-md"
                )}
              >
                <div className="relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-200">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="flex flex-col justify-center py-1 flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-display font-bold text-lg leading-tight dark:text-white">{place.name}</h3>
                  </div>
                  <p className="text-gray-500 text-xs font-medium mb-2 line-clamp-2 dark:text-gray-400">{place.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {place.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold text-accent-primary bg-accent-primary/10 px-2 py-0.5 rounded-full">#{tag}</span>
                    ))}
                  </div>
                </div>
                {selectedPlace?.id === place.id && (
                  <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-accent-primary" />
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* 2. MAPA */}
      <div className={clsx(
        "absolute inset-0 z-10 bg-gray-200 dark:bg-gray-900 md:relative md:flex-1 md:block",
      )}>
        <MapComponent
          center={[activeCity.lat, activeCity.lng]}
          places={filteredPlaces}
          selectedPlaceId={selectedPlace?.id}
          onMarkerClick={(p) => handlePlaceSelect(p, 'map')}
        />

        {/* Floating Detail Card (Mobile Bottom Sheet / Desktop Card) */}
        {selectedPlace && (
          // Adjusted visibility:
          // Desktop (md:flex): Always show.
          // Mobile: Show ONLY if mobileView === 'map' (Standard bottom sheet behavior).
          // And we keep compact style.
          <div className={clsx(
            "absolute bottom-0 left-0 right-0 md:left-8 md:right-auto md:bottom-8 z-[50] animate-in slide-in-from-bottom-10 pointer-events-none flex justify-center md:items-end",
            mobileView === 'list' && "hidden md:flex"
          )}>

            {/* The Card/Sheet Container */}
            <div className="pointer-events-auto w-full md:w-96 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-2xl rounded-t-3xl md:rounded-3xl border-t md:border border-white/50 dark:border-gray-700 overflow-hidden flex flex-col h-auto max-h-[60vh] md:h-auto">

              {/* Cover Image */}
              <div className="relative h-40 w-full shrink-0">
                <img
                  src={selectedPlace.image}
                  alt={selectedPlace.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="absolute top-4 right-4 bg-white/50 hover:bg-white text-brand-dark p-2 rounded-full backdrop-blur-sm transition-all shadow-sm z-10"
                >
                  <X size={18} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-white bg-accent-primary px-2 py-1 rounded-lg shadow-sm">
                    {selectedPlace.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-4 overflow-y-auto">
                <h2 className="font-display text-2xl font-bold mb-2 dark:text-white leading-tight">{selectedPlace.name}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedPlace.tags.map(tag => (
                    <span key={tag} className="text-xs font-bold text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-lg">#{tag}</span>
                  ))}
                </div>

                <p className="text-gray-600 text-sm mb-6 dark:text-gray-300 leading-relaxed">
                  {selectedPlace.description}
                </p>

                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => handleNavigation(selectedPlace)}
                    className="flex-1 py-3.5 bg-brand-dark text-white rounded-2xl font-bold hover:bg-accent-primary transition-all flex items-center justify-center gap-2 transform active:scale-95 dark:bg-white dark:text-brand-dark dark:hover:bg-gray-200"
                  >
                    <Navigation size={18} /> Navigovať
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// Suspense wrap for useSearchParams
export default function Page() {
  return (
    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center">Načítavam...</div>}>
      <KamApp />
    </Suspense>
  )
}
