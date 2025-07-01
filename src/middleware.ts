import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('__session')?.value;

  if (!sessionCookie) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth';
    return NextResponse.redirect(url);
  }

  // optionally verify sessionCookie here with Firebase Admin SDK if you want more security

  return NextResponse.next();
}

export const config = {
  matcher: ['/vaults/:path*'],
};
