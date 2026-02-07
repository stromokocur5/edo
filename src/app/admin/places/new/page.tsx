'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, Coffee, Utensils, Trees, Drama } from 'lucide-react';
import { clsx } from 'clsx';

// Dynamic import for map
const AdminMap = dynamic(() => import('@/components/AdminMap'), {
    ssr: false,
    loading: () => (
        <div className="h-[400px] bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
    ),
});

interface City {
    id: string;
    name: string;
    lat: number;
    lng: number;
}

const categories = [
    { id: 'coffee', label: 'Káva', icon: Coffee, color: 'bg-amber-500' },
    { id: 'food', label: 'Jedlo', icon: Utensils, color: 'bg-orange-500' },
    { id: 'nature', label: 'Príroda', icon: Trees, color: 'bg-green-500' },
    { id: 'culture', label: 'Kultúra', icon: Drama, color: 'bg-purple-500' },
] as const;

function NewPlaceForm() {
    const router = useRouter();
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        name: '',
        cityId: '',
        category: 'coffee' as 'coffee' | 'food' | 'nature' | 'culture',
        description: '',
        lat: null as number | null,
        lng: null as number | null,
        tags: '',
        image: '',
        googleMapsLink: '',
    });

    useEffect(() => {
        setLoading(true);
        fetch('/api/cities')
            .then(r => r.json() as Promise<{ cities?: City[] }>)
            .then(data => {
                setCities(data.cities || []);
                if (data.cities?.length && data.cities.length > 0) {
                    setForm(f => ({ ...f, cityId: data.cities![0].id }));
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const selectedCity = cities.find(c => c.id === form.cityId);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!form.lat || !form.lng) {
            setError('Vyber pozíciu na mape');
            return;
        }

        setSaving(true);

        try {
            const res = await fetch('/api/places', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: `place-${Date.now()}`,
                    cityId: form.cityId,
                    name: form.name,
                    category: form.category,
                    description: form.description,
                    lat: form.lat,
                    lng: form.lng,
                    tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
                    image: form.image,
                    googleMapsLink: form.googleMapsLink || undefined,
                }),
            });

            if (res.ok) {
                router.push('/admin');
            } else {
                const data = await res.json() as { error?: string };
                setError(data.error || 'Chyba pri ukladaní');
            }
        } catch {
            setError('Chyba pri ukladaní');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin"
                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nové miesto</h1>
                    <p className="text-gray-500">Pridaj nové miesto na mapu</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic info */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm space-y-4">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Základné info</h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Názov *
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Názov miesta"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Mesto *
                            </label>
                            <select
                                value={form.cityId}
                                onChange={(e) => setForm({ ...form, cityId: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                {cities.map(city => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Kategória *
                            </label>
                            <div className="flex gap-2">
                                {categories.map((cat) => {
                                    const Icon = cat.icon;
                                    return (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => setForm({ ...form, category: cat.id })}
                                            className={clsx(
                                                'flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all border-2',
                                                form.category === cat.id
                                                    ? `${cat.color} text-white border-transparent`
                                                    : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300'
                                            )}
                                            title={cat.label}
                                        >
                                            <Icon size={18} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Popis *
                        </label>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={3}
                            placeholder="Krátky popis miesta"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Tagy (oddelené čiarkou)
                        </label>
                        <input
                            type="text"
                            value={form.tags}
                            onChange={(e) => setForm({ ...form, tags: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Káva, Raňajky, Wifi"
                        />
                    </div>
                </div>

                {/* Map */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Pozícia na mape *</h2>
                    <div className="h-[400px]">
                        <AdminMap
                            lat={form.lat}
                            lng={form.lng}
                            onLocationSelect={(lat, lng) => setForm({ ...form, lat, lng })}
                            defaultCenter={selectedCity ? [selectedCity.lat, selectedCity.lng] : undefined}
                        />
                    </div>
                    {form.lat && form.lng && (
                        <div className="mt-3 text-sm text-gray-500">
                            Súradnice: {form.lat.toFixed(6)}, {form.lng.toFixed(6)}
                        </div>
                    )}
                </div>

                {/* Image & Link */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm space-y-4">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Média</h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            URL obrázka (Unsplash) *
                        </label>
                        <input
                            type="url"
                            value={form.image}
                            onChange={(e) => setForm({ ...form, image: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://images.unsplash.com/..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Google Maps link (voliteľné)
                        </label>
                        <input
                            type="url"
                            value={form.googleMapsLink}
                            onChange={(e) => setForm({ ...form, googleMapsLink: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://goo.gl/maps/..."
                        />
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-4 text-red-600 dark:text-red-400">
                        {error}
                    </div>
                )}

                <div className="flex gap-4">
                    <Link
                        href="/admin"
                        className="flex-1 py-4 text-center rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                    >
                        Zrušiť
                    </Link>
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Ukladám...
                            </>
                        ) : (
                            <>
                                <Save size={20} />
                                Uložiť miesto
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function NewPlacePage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        }>
            <NewPlaceForm />
        </Suspense>
    );
}
