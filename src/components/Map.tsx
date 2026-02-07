'use client';

import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Place, Category } from '@/lib/data';
import { useEffect, useState } from 'react';
import { Locate, Navigation, Coffee, Utensils, Trees, Drama } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';

// Funkcia na generovanie ikony podľa kategórie
const createCustomIcon = (category: Category, isSelected: boolean = false) => {
  let color = '#3b82f6'; // Default modrá
  let IconComponent = Navigation;

  switch (category) {
    case 'coffee':
      color = '#8E5E3D'; // Hnedá
      IconComponent = Coffee;
      break;
    case 'food':
      color = '#F97316'; // Oranžová
      IconComponent = Utensils;
      break;
    case 'nature':
      color = '#10B981'; // Zelená
      IconComponent = Trees;
      break;
    case 'culture':
      color = '#8B5CF6'; // Fialová
      IconComponent = Drama;
      break;
  }

  const size = isSelected ? 48 : 32;
  const iconSize = isSelected ? 24 : 18;
  const border = isSelected ? '3px solid white' : '2px solid white';

  const iconMarkup = renderToStaticMarkup(
    <div style={{
      backgroundColor: color,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: border,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
      color: 'white',
      transform: isSelected ? 'scale(1.1)' : 'scale(1)',
      transition: 'all 0.3s ease'
    }}>
      <IconComponent size={iconSize} />
    </div>
  );

  return L.divIcon({
    html: iconMarkup,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size]
  });
};

// Internal component to handle Map logic that needs useMap context
function MapController({ center, selectedPlaceId, places }: { center: [number, number], selectedPlaceId?: string | null, places: Place[] }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, 13, { duration: 1.5 });
  }, [center, map]);

  useEffect(() => {
    if (selectedPlaceId) {
      const place = places.find(p => p.id === selectedPlaceId);
      if (place) {
        map.flyTo([place.lat, place.lng], 15, { duration: 1 });
      }
    }
  }, [selectedPlaceId, places, map]);

  return null;
}

function LocationMarker() {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const map = useMap();

  const handleLocate = () => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  };

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control leaflet-bar">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleLocate();
          }}
          className="bg-white p-2 hover:bg-gray-100 cursor-pointer flex items-center justify-center text-gray-700 w-[34px] h-[34px] rounded-sm border-2 border-rgba(0,0,0,0.2)"
          title="Moja poloha"
        >
          <Locate size={18} />
        </button>
      </div>
    </div>
  );
}

interface MapProps {
  center: [number, number];
  places: Place[];
  selectedPlaceId?: string | null;
  onMarkerClick: (place: Place) => void;
}

export default function Map({ center, places, selectedPlaceId, onMarkerClick }: MapProps) {
  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full w-full z-0"
      style={{ background: '#f4f4f5' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      <MapController center={center} selectedPlaceId={selectedPlaceId} places={places} />
      <LocationMarker />

      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          icon={createCustomIcon(place.category, selectedPlaceId === place.id)}
          zIndexOffset={selectedPlaceId === place.id ? 1000 : 0}
          eventHandlers={{
            click: () => onMarkerClick(place),
          }}
        >
        </Marker>
      ))}
    </MapContainer>
  );
}
