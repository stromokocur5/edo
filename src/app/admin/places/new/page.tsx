'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, Coffee, Utensils, Trees, Drama, Upload, ImageIcon, X, Link as LinkIcon } from 'lucide-react';
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
    const [imageMode, setImageMode] = useState<'upload' | 'url'>('upload');
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [preview, setPreview] = useState('');
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const handleFileUpload = useCallback(async (file: File) => {
        setUploadError('');
        setUploading(true);

        // Local preview
        const localUrl = URL.createObjectURL(file);
        setPreview(localUrl);

        try {
            const formData = new FormData();
            formData.append('image', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json() as { url?: string; error?: string };

            if (res.ok && data.url) {
                setForm(f => ({ ...f, image: data.url! }));
            } else {
                setUploadError(data.error || 'Chyba pri nahrávaní');
                setPreview('');
            }
        } catch {
            setUploadError('Chyba pri nahrávaní obrázka');
            setPreview('');
        } finally {
            setUploading(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFileUpload(file);
        }
    }, [handleFileUpload]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFileUpload(file);
    };

    const clearImage = () => {
        setForm(f => ({ ...f, image: '' }));
        setPreview('');
        setUploadError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!form.lat || !form.lng) {
            setError('Vyber pozíciu na mape');
            return;
        }

        if (!form.image) {
            setError('Pridaj obrázok');
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

    const displayImage = preview || form.image;

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
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Médiá</h2>

                    {/* Image mode toggle */}
                    <div className="flex gap-2 mb-4">
                        <button
                            type="button"
                            onClick={() => setImageMode('upload')}
                            className={clsx(
                                'flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all border-2',
                                imageMode === 'upload'
                                    ? 'bg-blue-500 text-white border-transparent'
                                    : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                            )}
                        >
                            <Upload size={16} /> Nahrať obrázok
                        </button>
                        <button
                            type="button"
                            onClick={() => setImageMode('url')}
                            className={clsx(
                                'flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all border-2',
                                imageMode === 'url'
                                    ? 'bg-blue-500 text-white border-transparent'
                                    : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                            )}
                        >
                            <LinkIcon size={16} /> URL odkaz
                        </button>
                    </div>

                    {imageMode === 'upload' ? (
                        <div>
                            {displayImage ? (
                                <div className="relative rounded-xl overflow-hidden">
                                    <img
                                        src={displayImage}
                                        alt="Preview"
                                        className="w-full h-48 object-cover"
                                    />
                                    {uploading && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <Loader2 className="w-8 h-8 text-white animate-spin" />
                                        </div>
                                    )}
                                    {!uploading && (
                                        <button
                                            type="button"
                                            onClick={clearImage}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div
                                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                    onDragLeave={() => setDragOver(false)}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                    className={clsx(
                                        'h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all',
                                        dragOver
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                                            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                    )}
                                >
                                    <ImageIcon size={32} className="text-gray-400" />
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Klikni alebo pretiahni obrázok sem
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            JPEG, PNG, WebP, GIF • max 5 MB
                                        </p>
                                    </div>
                                </div>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                            {uploadError && (
                                <p className="text-sm text-red-500 mt-2">{uploadError}</p>
                            )}
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                URL obrázka *
                            </label>
                            <input
                                type="url"
                                value={form.image}
                                onChange={(e) => setForm({ ...form, image: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://images.unsplash.com/..."
                            />
                            {form.image && (
                                <div className="mt-3 rounded-xl overflow-hidden">
                                    <img src={form.image} alt="Preview" className="w-full h-48 object-cover" />
                                </div>
                            )}
                        </div>
                    )}

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
                        disabled={saving || uploading}
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
