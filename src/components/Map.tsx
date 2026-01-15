'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Place, Category } from '@/lib/data';
import { useEffect, useState } from 'react';
import { Locate, Navigation } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Coffee, Utensils, Trees, Drama } from 'lucide-react';

// Funkcia na generovanie ikony podľa kategórie
const createCustomIcon = (category: Category) => {
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

  const iconMarkup = renderToStaticMarkup(
    <div style={{
      backgroundColor: color,
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      color: 'white'
    }}>
      <IconComponent size={18} />
    </div>
  );

  return L.divIcon({
    html: iconMarkup,
    className: 'custom-marker', // Prázdna trieda, aby sme nemali default štvorček
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

// Komponent na posun mapy pri zmene mesta
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13, { duration: 1.5 });
  }, [center, map]);
  return null;
}

// Komponent pre "Moja poloha"
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
            e.stopPropagation(); // Zabrániť kliku na mapu
            handleLocate();
          }}
          className="bg-white p-2 hover:bg-gray-100 cursor-pointer flex items-center justify-center text-gray-700 w-[34px] h-[34px]"
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
  onMarkerClick: (place: Place) => void;
}

export default function Map({ center, places, onMarkerClick }: MapProps) {
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
      <MapUpdater center={center} />
      <LocationMarker />

      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          icon={createCustomIcon(place.category)}
          eventHandlers={{
            click: () => onMarkerClick(place),
          }}
        >
        </Marker>
      ))}
    </MapContainer>
  );
}
