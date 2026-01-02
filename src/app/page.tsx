'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { CITIES_DATA, Category, Place } from '@/lib/data';
import { MapPin, Coffee, Utensils, Trees, Drama, ChevronRight, X } from 'lucide-react';
import { clsx } from 'clsx';

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

export default function Page() {
  const [activeCityId, setActiveCityId] = useState(CITIES_DATA[0].id);
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const activeCity = CITIES_DATA.find(c => c.id === activeCityId) || CITIES_DATA[0];

  const filteredPlaces = useMemo(() => {
    if (activeCategory === 'all') return activeCity.places;
    return activeCity.places.filter(p => p.category === activeCategory);
  }, [activeCity, activeCategory]);

  return (
    <main className="h-screen w-screen flex flex-col md:flex-row bg-brand-light font-sans overflow-hidden text-brand-dark">
      
      {/* 1. SIDEBAR / OVLÁDACÍ PANEL */}
      <div className="w-full md:w-[450px] flex flex-col h-[50vh] md:h-full z-10 shadow-2xl bg-surface relative">
        
        {/* Header */}
        <div className="p-8 pb-4">
          <h1 className="font-display text-4xl font-bold tracking-tight mb-2">
            Kam v tvojom <br/> <span className="text-accent-primary">meste?</span>
          </h1>
          <p className="text-gray-500 font-medium text-sm">Kurátorský výber tých najlepších spotov.</p>
        </div>

        {/* City Selector (Squircle Tabs) */}
        <div className="px-8 flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {CITIES_DATA.map(city => (
            <button
              key={city.id}
              onClick={() => { setActiveCityId(city.id); setSelectedPlace(null); }}
              className={clsx(
                "px-6 py-3 font-display font-semibold transition-all duration-300 whitespace-nowrap squircle border-2",
                activeCityId === city.id 
                  ? "bg-brand-dark text-white border-brand-dark shadow-lg scale-105" 
                  : "bg-transparent text-gray-400 border-gray-200 hover:border-brand-dark hover:text-brand-dark"
              )}
            >
              {city.name}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="px-8 py-2 flex gap-2 overflow-x-auto pb-6 border-b border-gray-100">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={clsx(
                  "p-3 rounded-2xl flex items-center gap-2 transition-all duration-200",
                  activeCategory === cat.id
                    ? "bg-accent-pop text-brand-dark font-bold shadow-md transform -translate-y-1"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
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
                  "group p-5 border border-gray-100 bg-white hover:border-accent-primary/30 transition-all cursor-pointer squircle relative overflow-hidden",
                  selectedPlace?.id === place.id ? "ring-2 ring-accent-primary shadow-xl" : "shadow-sm hover:shadow-md"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display font-bold text-xl">{place.name}</h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                    {place.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{place.description}</p>
                <div className="flex gap-2">
                  {place.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium text-accent-primary">#{tag}</span>
                  ))}
                </div>
                {/* Hover Effect Decoration */}
                <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-accent-pop/20 rounded-full blur-xl group-hover:bg-accent-pop/40 transition-all" />
              </div>
            ))
          )}
        </div>
      </div>

      {/* 2. MAPA */}
      <div className="flex-1 relative h-[50vh] md:h-full bg-gray-200">
        <MapComponent 
          center={[activeCity.lat, activeCity.lng]} 
          places={filteredPlaces}
          onMarkerClick={setSelectedPlace}
        />
        
        {/* Floating Detail Card (Mobile/Desktop Overlay) */}
        {selectedPlace && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-8 md:bottom-8 w-[90%] md:w-80 bg-white/90 backdrop-blur-md p-6 shadow-2xl squircle z-[9999] animate-in slide-in-from-bottom-5 border border-white/50">
            <button 
              onClick={() => setSelectedPlace(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-brand-dark"
            >
              <X size={20} />
            </button>
            <h2 className="font-display text-2xl font-bold mb-1">{selectedPlace.name}</h2>
            <p className="text-accent-primary text-sm font-medium mb-3 capitalize">{selectedPlace.category}</p>
            <p className="text-gray-600 text-sm mb-4">{selectedPlace.description}</p>
            <button className="w-full py-3 bg-brand-dark text-white rounded-2xl font-semibold hover:bg-accent-primary transition-colors flex items-center justify-center gap-2">
              Navigovať <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
