import { NextRequest, NextResponse } from 'next/server';
import { verifyExtraaPassword, setExtraaSession } from '@/lib/extraa/access';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 400 }
      );
    }

    const isValid = verifyExtraaPassword(password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 401 }
      );
    }

    await setExtraaSession();

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Access denied' },
      { status: 500 }
    );
  }
}
