'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, Plus, Loader2, Coffee, Utensils, Trees, Drama } from 'lucide-react';
import { clsx } from 'clsx';

interface Place {
    id: string;
    cityId: string;
    name: string;
    category: 'coffee' | 'food' | 'nature' | 'culture';
    description: string;
    lat: number;
    lng: number;
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

export default function AdminDashboard() {
    const [places, setPlaces] = useState<Place[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCity, setSelectedCity] = useState<string>('all');

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

    const filteredPlaces = selectedCity === 'all'
        ? places
        : places.filter(p => p.cityId === selectedCity);

    const stats = {
        total: places.length,
        coffee: places.filter(p => p.category === 'coffee').length,
        food: places.filter(p => p.category === 'food').length,
        nature: places.filter(p => p.category === 'nature').length,
        culture: places.filter(p => p.category === 'culture').length,
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <p className="text-gray-500">Prehľad všetkých miest</p>
                </div>
                <Link
                    href="/admin/places/new"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
                >
                    <Plus size={20} />
                    Nové miesto
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
                    <div className="text-gray-500 text-sm">Celkom</div>
                </div>
                {(['coffee', 'food', 'nature', 'culture'] as const).map((cat) => {
                    const Icon = categoryIcons[cat];
                    return (
                        <div key={cat} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                            <div className="flex items-center gap-2">
                                <div className={clsx('p-2 rounded-lg text-white', categoryColors[cat])}>
                                    <Icon size={16} />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats[cat]}</div>
                                    <div className="text-gray-500 text-xs capitalize">{cat}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                <button
                    onClick={() => setSelectedCity('all')}
                    className={clsx(
                        'px-4 py-2 rounded-xl font-medium transition-colors whitespace-nowrap',
                        selectedCity === 'all'
                            ? 'bg-blue-500 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    )}
                >
                    Všetky mestá
                </button>
                {cities.map((city) => (
                    <button
                        key={city.id}
                        onClick={() => setSelectedCity(city.id)}
                        className={clsx(
                            'px-4 py-2 rounded-xl font-medium transition-colors whitespace-nowrap',
                            selectedCity === city.id
                                ? 'bg-blue-500 text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        )}
                    >
                        {city.name}
                    </button>
                ))}
            </div>

            {/* Places list */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <MapPin size={18} />
                        Miesta ({filteredPlaces.length})
                    </h2>
                </div>

                {filteredPlaces.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        Žiadne miesta. <Link href="/admin/places/new" className="text-blue-500 hover:underline">Pridaj prvé!</Link>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredPlaces.map((place) => {
                            const Icon = categoryIcons[place.category];
                            return (
                                <Link
                                    key={place.id}
                                    href={`/admin/places/${place.id}`}
                                    className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                >
                                    <div className={clsx('p-3 rounded-xl text-white', categoryColors[place.category])}>
                                        <Icon size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-gray-900 dark:text-white truncate">
                                            {place.name}
                                        </div>
                                        <div className="text-sm text-gray-500 truncate">
                                            {place.description}
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {place.lat.toFixed(4)}, {place.lng.toFixed(4)}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
