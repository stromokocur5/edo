import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { isAuthenticated, unauthorizedResponse } from '@/lib/auth';
import { DbCity, dbCityToCity } from '@/db/types';

// GET all cities (public)
export async function GET() {
    try {
        const { env } = await getCloudflareContext();
        const result = await env.DB.prepare('SELECT * FROM cities ORDER BY name').all<DbCity>();
        const cities = result.results.map(dbCityToCity);

        return NextResponse.json({ cities });
    } catch (error) {
        console.error('Error fetching cities:', error);
        return NextResponse.json(
            { error: 'Chyba pri načítaní miest' },
            { status: 500 }
        );
    }
}

// POST create new city (auth required)
export async function POST(request: NextRequest) {
    if (!(await isAuthenticated())) {
        return unauthorizedResponse();
    }

    try {
        const { env } = await getCloudflareContext();
        const { id, name, lat, lng } = await request.json();

        if (!id || !name || !lat || !lng) {
            return NextResponse.json(
                { error: 'Chýbajú povinné polia' },
                { status: 400 }
            );
        }

        await env.DB.prepare(`
      INSERT INTO cities (id, name, lat, lng)
      VALUES (?, ?, ?, ?)
    `).bind(id, name, lat, lng).run();

        return NextResponse.json({ success: true, id });
    } catch (error) {
        console.error('Error creating city:', error);
        return NextResponse.json(
            { error: 'Chyba pri vytváraní mesta' },
            { status: 500 }
        );
    }
}
