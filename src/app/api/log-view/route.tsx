// app/api/log-view/route.ts
import { NextResponse } from 'next/server';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const vaultId = url.searchParams.get('vaultId') || 'unknown';

  // Get IP address from headers or fallback
  const ip =
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const userAgent = request.headers.get('user-agent') || 'unknown';

  try {
    await addDoc(collection(db, 'vaults', vaultId, 'views'), {
      ip,
      userAgent,
      timestamp: serverTimestamp(),
      // location: locationData, // optional enrichment
    });
  } catch (error) {
    console.error('Failed to log vault view:', error);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }

  return NextResponse.json({ status: 'logged' });
}
