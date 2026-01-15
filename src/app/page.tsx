'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { CITIES_DATA, Category, Place } from '@/lib/data';
import { MapPin, Coffee, Utensils, Trees, Drama, ChevronRight, X, Search, Navigation } from 'lucide-react';
import { clsx } from 'clsx';
import Image from 'next/image';

// Dynamický import mapy (vypnuté SSR)
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

function EdoApp() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL State Initialization
  const initialCityId = searchParams.get('city') || CITIES_DATA[0].id;
  const initialCategory = (searchParams.get('cat') as Category | 'all') || 'all';

  const [activeCityId, setActiveCityId] = useState(initialCityId);
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>(initialCategory);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeCityId) params.set('city', activeCityId);
    if (activeCategory && activeCategory !== 'all') params.set('cat', activeCategory);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [activeCityId, activeCategory, router]);

  const activeCity = CITIES_DATA.find(c => c.id === activeCityId) || CITIES_DATA[0];

  const filteredPlaces = useMemo(() => {
    let places = activeCity.places;

    // Category Filter
    if (activeCategory !== 'all') {
      places = places.filter(p => p.category === activeCategory);
    }

    // Search Filter
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

  const handleNavigation = (place: Place) => {
    if (place.googleMapsLink) {
      window.open(place.googleMapsLink, '_blank');
    } else {
      // Fallback na súradnice
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`, '_blank');
    }
  };

  return (
    <main className="h-screen w-screen flex flex-col md:flex-row bg-brand-light font-sans overflow-hidden text-brand-dark dark:bg-gray-900 dark:text-gray-100 transition-colors">

      {/* 1. SIDEBAR / OVLÁDACÍ PANEL */}
      <div className="w-full md:w-[450px] flex flex-col h-[50vh] md:h-full z-10 shadow-2xl bg-surface dark:bg-gray-800 relative z-sidebar">

        {/* Header */}
        <div className="p-8 pb-4">
          <h1 className="font-display text-4xl font-bold tracking-tight mb-2 dark:text-white">
            Kam v tvojom <br /> <span className="text-accent-primary">meste?</span>
          </h1>
          <p className="text-gray-500 font-medium text-sm dark:text-gray-400">Kurátorský výber tých najlepších spotov.</p>
        </div>

        {/* City Selector */}
        <div className="px-8 flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {CITIES_DATA.map(city => (
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
        <div className="flex-1 overflow-y-auto p-8 space-y-4">
          {filteredPlaces.length === 0 ? (
            <div className="text-center text-gray-400 py-10">V tejto kategórii zatiaľ nič nemáme.</div>
          ) : (
            filteredPlaces.map(place => (
              <div
                key={place.id}
                onClick={() => setSelectedPlace(place)}
                className={clsx(
                  "group p-3 border rounded-3xl bg-white hover:border-accent-primary/50 transition-all cursor-pointer relative overflow-hidden flex gap-4 dark:bg-gray-800 dark:border-gray-700",
                  selectedPlace?.id === place.id ? "ring-2 ring-accent-primary shadow-xl bg-gray-50 dark:bg-gray-700/50" : "shadow-sm hover:shadow-md"
                )}
              >
                {/* Image Thumbnail */}
                <div className="relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-200">
                  <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
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

                {/* Selected Indicator */}
                {selectedPlace?.id === place.id && (
                  <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-accent-primary" />
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* 2. MAPA */}
      <div className="flex-1 relative h-[50vh] md:h-full bg-gray-200 dark:bg-gray-900 border-t-4 md:border-t-0 md:border-l-4 border-white dark:border-gray-800 box-border z-0">
        <MapComponent
          center={[activeCity.lat, activeCity.lng]}
          places={filteredPlaces}
          onMarkerClick={setSelectedPlace}
        />

        {/* Floating Detail Card */}
        {selectedPlace && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-8 md:bottom-8 w-[90%] md:w-96 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-0 shadow-2xl rounded-3xl z-[1000] animate-in slide-in-from-bottom-5 border border-white/50 dark:border-gray-700 overflow-hidden">

            {/* Cover Image */}
            <div className="relative h-40 w-full">
              <Image
                src={selectedPlace.image}
                alt={selectedPlace.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute top-4 right-4 bg-white/50 hover:bg-white text-brand-dark p-2 rounded-full backdrop-blur-sm transition-all shadow-sm"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="text-xs font-bold uppercase tracking-wider text-white bg-accent-primary px-2 py-1 rounded-lg shadow-sm">
                  {selectedPlace.category}
                </span>
              </div>
            </div>

            <div className="p-6 pt-4">
              <h2 className="font-display text-2xl font-bold mb-2 dark:text-white leading-tight">{selectedPlace.name}</h2>
              <p className="text-gray-600 text-sm mb-6 dark:text-gray-300 leading-relaxed">{selectedPlace.description}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => handleNavigation(selectedPlace)}
                  className="flex-1 py-3.5 bg-brand-dark text-white rounded-2xl font-bold hover:bg-accent-primary transition-all flex items-center justify-center gap-2 transform active:scale-95 dark:bg-white dark:text-brand-dark dark:hover:bg-gray-200"
                >
                  <Navigation size={18} /> Navigovať
                </button>
                {/* Close Button for mobile mostly */}
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="px-4 py-3.5 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Zavrieť
                </button>
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
      <EdoApp />
    </Suspense>
  )
}
