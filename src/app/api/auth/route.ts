import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE = 'kam_admin_session';
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours

export async function POST(request: NextRequest) {
    try {
        const { password } = await request.json();

        // Get admin password from environment
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminPassword) {
            return NextResponse.json(
                { error: 'Admin password not configured' },
                { status: 500 }
            );
        }

        if (password !== adminPassword) {
            return NextResponse.json(
                { error: 'Nesprávne heslo' },
                { status: 401 }
            );
        }

        // Create simple session token
        const sessionToken = Buffer.from(`admin:${Date.now()}`).toString('base64');

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set(SESSION_COOKIE, sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: SESSION_MAX_AGE,
            path: '/',
        });

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: 'Chyba pri prihlásení' },
            { status: 500 }
        );
    }
}

export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
    return NextResponse.json({ success: true });
}

// Check if authenticated
export async function GET() {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE);

    if (!session?.value) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true });
}
