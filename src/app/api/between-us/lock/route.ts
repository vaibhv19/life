import { NextResponse } from 'next/server';
import { clearBetweenUsSession } from '@/lib/between-us/access';

export async function POST() {
  try {
    await clearBetweenUsSession();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
