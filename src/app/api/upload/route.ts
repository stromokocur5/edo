import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { isAuthenticated, unauthorizedResponse } from '@/lib/auth';

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function POST(request: NextRequest) {
    if (!(await isAuthenticated())) {
        return unauthorizedResponse();
    }

    try {
        const formData = await request.formData();
        const file = formData.get('image') as File | null;

        if (!file) {
            return NextResponse.json(
                { error: 'Žiadny súbor nebol nahratý' },
                { status: 400 }
            );
        }

        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json(
                { error: 'Povolené formáty: JPEG, PNG, WebP, GIF' },
                { status: 400 }
            );
        }

        if (file.size > MAX_SIZE) {
            return NextResponse.json(
                { error: 'Maximálna veľkosť súboru je 5 MB' },
                { status: 400 }
            );
        }

        const ext = file.name.split('.').pop() || 'jpg';
        const key = `places/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

        const { env } = await getCloudflareContext();
        const bucket = (env as any).IMAGES_BUCKET;

        await bucket.put(key, await file.arrayBuffer(), {
            httpMetadata: {
                contentType: file.type,
            },
        });

        const url = `/api/images/${key}`;

        return NextResponse.json({ url });
    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json(
            { error: 'Chyba pri nahrávaní obrázka' },
            { status: 500 }
        );
    }
}
