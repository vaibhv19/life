import { NextResponse } from 'next/server';
import { clearHiddenSpaceSession } from '@/lib/hiddenspace/access';

export async function POST() {
  try {
    await clearHiddenSpaceSession();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
