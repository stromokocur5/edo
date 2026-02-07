import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { isAuthenticated, unauthorizedResponse } from '@/lib/auth';
import { DbPlace, dbPlaceToPlace } from '@/db/types';

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET single place
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const { env } = await getCloudflareContext();

        const result = await env.DB.prepare(
            'SELECT * FROM places WHERE id = ?'
        ).bind(id).first<DbPlace>();

        if (!result) {
            return NextResponse.json(
                { error: 'Miesto nenájdené' },
                { status: 404 }
            );
        }

        return NextResponse.json({ place: dbPlaceToPlace(result) });
    } catch (error) {
        console.error('Error fetching place:', error);
        return NextResponse.json(
            { error: 'Chyba pri načítaní miesta' },
            { status: 500 }
        );
    }
}

// PUT update place (auth required)
export async function PUT(request: NextRequest, { params }: RouteParams) {
    if (!(await isAuthenticated())) {
        return unauthorizedResponse();
    }

    try {
        const { id } = await params;
        const { env } = await getCloudflareContext();
        const body = await request.json();

        const {
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

        const tagsJson = JSON.stringify(tags);

        await env.DB.prepare(`
      UPDATE places 
      SET city_id = ?, name = ?, category = ?, description = ?, 
          lat = ?, lng = ?, tags = ?, image = ?, google_maps_link = ?,
          updated_at = datetime('now')
      WHERE id = ?
    `).bind(
            cityId,
            name,
            category,
            description,
            lat,
            lng,
            tagsJson,
            image,
            googleMapsLink || null,
            id
        ).run();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating place:', error);
        return NextResponse.json(
            { error: 'Chyba pri aktualizácii miesta' },
            { status: 500 }
        );
    }
}

// DELETE place (auth required)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    if (!(await isAuthenticated())) {
        return unauthorizedResponse();
    }

    try {
        const { id } = await params;
        const { env } = await getCloudflareContext();

        await env.DB.prepare('DELETE FROM places WHERE id = ?').bind(id).run();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting place:', error);
        return NextResponse.json(
            { error: 'Chyba pri mazaní miesta' },
            { status: 500 }
        );
    }
}
