import { auth } from '@/lib/firebase-server'; // firebase-admin auth
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { idToken } = await req.json();

  if (!idToken) {
    return NextResponse.json({ error: 'Missing ID token' }, { status: 400 });
  }

  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  try {
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });
    const cookieStore = await cookies(); // ✅ await this in App Router

    const isProd = process.env.NODE_ENV === 'production';

    cookieStore.set('__session', sessionCookie, {
      httpOnly: true,
      secure: isProd,
      maxAge: expiresIn / 1000,
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to create session cookie:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
