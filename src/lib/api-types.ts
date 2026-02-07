// API response types

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

export interface PlacesResponse {
    places: Place[];
    error?: string;
}

export interface PlaceResponse {
    place: Place;
    error?: string;
}

export interface CitiesResponse {
    cities: City[];
    error?: string;
}
