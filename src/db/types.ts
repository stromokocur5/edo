// Database types for EDO

export interface DbCity {
    id: string;
    name: string;
    lat: number;
    lng: number;
    created_at: string;
    updated_at: string;
}

export interface DbPlace {
    id: string;
    city_id: string;
    name: string;
    category: 'coffee' | 'food' | 'nature' | 'culture';
    description: string;
    lat: number;
    lng: number;
    tags: string; // JSON string
    image: string;
    google_maps_link: string | null;
    created_at: string;
    updated_at: string;
}

// Parsed place with tags as array
export interface Place {
    id: string;
    cityId: string;
    name: string;
    category: 'coffee' | 'food' | 'nature' | 'culture';
    description: string;
    lat: number;
    lng: number;
    tags: string[];
    image: string;
    googleMapsLink?: string;
}

export interface City {
    id: string;
    name: string;
    lat: number;
    lng: number;
}

// Convert DB record to app format
export function dbPlaceToPlace(dbPlace: DbPlace): Place {
    return {
        id: dbPlace.id,
        cityId: dbPlace.city_id,
        name: dbPlace.name,
        category: dbPlace.category,
        description: dbPlace.description,
        lat: dbPlace.lat,
        lng: dbPlace.lng,
        tags: JSON.parse(dbPlace.tags),
        image: dbPlace.image,
        googleMapsLink: dbPlace.google_maps_link || undefined,
    };
}

export function dbCityToCity(dbCity: DbCity): City {
    return {
        id: dbCity.id,
        name: dbCity.name,
        lat: dbCity.lat,
        lng: dbCity.lng,
    };
}
