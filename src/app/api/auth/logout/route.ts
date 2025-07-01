import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies(); // ✅ await here too
  cookieStore.delete('__session');
  return NextResponse.json({ success: true });
}
