import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { isAuthenticated, unauthorizedResponse } from '@/lib/auth';
import { DbPlace, dbPlaceToPlace } from '@/db/types';

// GET all places (public) or filtered by city
export async function GET(request: NextRequest) {
    try {
        const { env } = await getCloudflareContext();
        const { searchParams } = new URL(request.url);
        const cityId = searchParams.get('city');

        let query = 'SELECT * FROM places';
        const params: string[] = [];

        if (cityId) {
            query += ' WHERE city_id = ?';
            params.push(cityId);
        }

        query += ' ORDER BY name';

        const result = await env.DB.prepare(query).bind(...params).all<DbPlace>();
        const places = result.results.map(dbPlaceToPlace);

        return NextResponse.json({ places });
    } catch (error) {
        console.error('Error fetching places:', error);
        return NextResponse.json(
            { error: 'Chyba pri načítaní miest' },
            { status: 500 }
        );
    }
}

// POST create new place (auth required)
export async function POST(request: NextRequest) {
    if (!(await isAuthenticated())) {
        return unauthorizedResponse();
    }

    try {
        const { env } = await getCloudflareContext();
        const body = await request.json();

        const {
            id,
            cityId,
            name,
            category,
            description,
            lat,
            lng,
            tags,
            image,
            googleMapsLink,
        } = body;

        // Validate required fields
        if (!id || !cityId || !name || !category || !description || !lat || !lng || !tags || !image) {
            return NextResponse.json(
                { error: 'Chýbajú povinné polia' },
                { status: 400 }
            );
        }

        const tagsJson = JSON.stringify(tags);

        await env.DB.prepare(`
      INSERT INTO places (id, city_id, name, category, description, lat, lng, tags, image, google_maps_link)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
            id,
            cityId,
            name,
            category,
            description,
            lat,
            lng,
            tagsJson,
            image,
            googleMapsLink || null
        ).run();

        return NextResponse.json({ success: true, id });
    } catch (error) {
        console.error('Error creating place:', error);
        return NextResponse.json(
            { error: 'Chyba pri vytváraní miesta' },
            { status: 500 }
        );
    }
}
