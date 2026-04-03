import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

interface RouteParams {
    params: Promise<{ key: string[] }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { key } = await params;
        const objectKey = key.join('/');

        const { env } = await getCloudflareContext();
        const bucket = (env as any).IMAGES_BUCKET;

        const object = await bucket.get(objectKey);

        if (!object) {
            return NextResponse.json(
                { error: 'Obrázok nenájdený' },
                { status: 404 }
            );
        }

        const headers = new Headers();
        headers.set('Content-Type', object.httpMetadata?.contentType || 'image/jpeg');
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        headers.set('ETag', object.httpEtag || '');

        return new NextResponse(object.body, {
            status: 200,
            headers,
        });
    } catch (error) {
        console.error('Error serving image:', error);
        return NextResponse.json(
            { error: 'Chyba pri načítaní obrázka' },
            { status: 500 }
        );
    }
}
