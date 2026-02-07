'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Loader2, Coffee, Utensils, Trees, Drama, Edit, Trash2 } from 'lucide-react';
import { clsx } from 'clsx';

interface Place {
    id: string;
    cityId: string;
    name: string;
    category: 'coffee' | 'food' | 'nature' | 'culture';
    description: string;
    tags: string[];
    image: string;
}

interface City {
    id: string;
    name: string;
}

const categoryIcons = {
    coffee: Coffee,
    food: Utensils,
    nature: Trees,
    culture: Drama,
};

const categoryColors = {
    coffee: 'bg-amber-500',
    food: 'bg-orange-500',
    nature: 'bg-green-500',
    culture: 'bg-purple-500',
};

export default function PlacesListPage() {
    const [places, setPlaces] = useState<Place[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCity, setSelectedCity] = useState<string>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    useEffect(() => {
        Promise.all([
            fetch('/api/places').then(r => r.json()) as Promise<{ places?: Place[] }>,
            fetch('/api/cities').then(r => r.json()) as Promise<{ cities?: City[] }>,
        ])
            .then(([placesData, citiesData]) => {
                setPlaces(placesData.places || []);
                setCities(citiesData.cities || []);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const filteredPlaces = places.filter(p => {
        if (selectedCity !== 'all' && p.cityId !== selectedCity) return false;
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        if (search) {
            const q = search.toLowerCase();
            return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
        }
        return true;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Miesta</h1>
                <Link
                    href="/admin/places/new"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
                >
                    <Plus size={20} />
                    Nové miesto
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm mb-6 space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Hľadať..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                    >
                        <option value="all">Všetky mestá</option>
                        {cities.map(city => (
                            <option key={city.id} value={city.id}>{city.name}</option>
                        ))}
                    </select>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                    >
                        <option value="all">Všetky kategórie</option>
                        <option value="coffee">Káva</option>
                        <option value="food">Jedlo</option>
                        <option value="nature">Príroda</option>
                        <option value="culture">Kultúra</option>
                    </select>
                </div>
            </div>

            {/* Places grid */}
            {filteredPlaces.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center text-gray-500">
                    Žiadne miesta nenájdené.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPlaces.map((place) => {
                        const Icon = categoryIcons[place.category];
                        const cityName = cities.find(c => c.id === place.cityId)?.name || place.cityId;
                        return (
                            <div
                                key={place.id}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden group"
                            >
                                <div className="relative h-40 bg-gray-100 dark:bg-gray-700">
                                    <img
                                        src={place.image}
                                        alt={place.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className={clsx('absolute top-3 left-3 p-2 rounded-lg text-white', categoryColors[place.category])}>
                                        <Icon size={16} />
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="text-xs text-gray-400 mb-1">{cityName}</div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">
                                        {place.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                                        {place.description}
                                    </p>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/admin/places/${place.id}`}
                                            className="flex-1 py-2 text-center rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                                        >
                                            <Edit size={14} />
                                            Upraviť
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
