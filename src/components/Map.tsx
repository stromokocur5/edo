'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Place } from '@/lib/data';
import { useEffect } from 'react';

// Fix pre defaultné ikony v Leaflete s Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Komponent na posun mapy pri zmene mesta
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13, { duration: 1.5 });
  }, [center, map]);
  return null;
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
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" // Pekný čistý "Voyager" štýl mapy
      />
      <MapUpdater center={center} />
      
      {places.map((place) => (
        <Marker 
          key={place.id} 
          position={[place.lat, place.lng]} 
          icon={icon}
          eventHandlers={{
            click: () => onMarkerClick(place),
          }}
        >
        </Marker>
      ))}
    </MapContainer>
  );
}
