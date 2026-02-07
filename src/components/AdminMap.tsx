'use client';

import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Custom draggable marker icon
const createMarkerIcon = () => {
    return L.divIcon({
        html: `
      <div style="
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: grab;
      ">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
    `,
        className: 'admin-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    });
};

interface MapClickHandlerProps {
    onLocationSelect: (lat: number, lng: number) => void;
}

function MapClickHandler({ onLocationSelect }: MapClickHandlerProps) {
    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

interface MapCenterProps {
    center: [number, number];
}

function MapCenter({ center }: MapCenterProps) {
    const map = useMap();

    useEffect(() => {
        map.flyTo(center, map.getZoom(), { duration: 0.5 });
    }, [center, map]);

    return null;
}

interface AdminMapProps {
    lat: number | null;
    lng: number | null;
    onLocationSelect: (lat: number, lng: number) => void;
    defaultCenter?: [number, number];
}

export default function AdminMap({
    lat,
    lng,
    onLocationSelect,
    defaultCenter = [48.7209, 21.2581] // Košice default
}: AdminMapProps) {
    const hasPosition = lat !== null && lng !== null;
    const center: [number, number] = hasPosition ? [lat, lng] : defaultCenter;

    return (
        <div className="relative h-full w-full rounded-xl overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600">
            <MapContainer
                center={center}
                zoom={hasPosition ? 15 : 13}
                scrollWheelZoom={true}
                className="h-full w-full z-0"
                style={{ background: '#f4f4f5', minHeight: '300px' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                <MapClickHandler onLocationSelect={onLocationSelect} />
                <MapCenter center={center} />

                {hasPosition && (
                    <Marker
                        position={[lat, lng]}
                        icon={createMarkerIcon()}
                        draggable={true}
                        eventHandlers={{
                            dragend: (e) => {
                                const marker = e.target;
                                const position = marker.getLatLng();
                                onLocationSelect(position.lat, position.lng);
                            },
                        }}
                    />
                )}
            </MapContainer>

            {/* Instructions overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 text-sm text-center shadow-lg z-[1000]">
                {hasPosition ? (
                    <span className="text-green-600 dark:text-green-400 font-medium">
                        ✓ Pozícia nastavená • Presuň marker alebo klikni pre novú pozíciu
                    </span>
                ) : (
                    <span className="text-gray-600 dark:text-gray-300">
                        👆 Klikni na mapu pre nastavenie pozície
                    </span>
                )}
            </div>
        </div>
    );
}
