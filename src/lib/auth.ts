import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const SESSION_COOKIE = 'kam_admin_session';

export async function isAuthenticated(): Promise<boolean> {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get(SESSION_COOKIE);
        return !!session?.value;
    } catch {
        return false;
    }
}

export function unauthorizedResponse() {
    return NextResponse.json(
        { error: 'Neautorizovaný prístup' },
        { status: 401 }
    );
}
