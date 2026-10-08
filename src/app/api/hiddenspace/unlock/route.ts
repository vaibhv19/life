import { NextRequest, NextResponse } from 'next/server';
import { verifyBirthday, setHiddenSpaceSession } from '@/lib/hiddenspace/access';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { birthday } = body;

    if (!birthday || typeof birthday !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 400 }
      );
    }

    const matchedPerson = verifyBirthday(birthday);

    if (!matchedPerson) {
      // Understated generic access denial without revealing registered data
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 401 }
      );
    }

    // Set HttpOnly signed session cookie
    await setHiddenSpaceSession(matchedPerson.id);

    return NextResponse.json({
      success: true,
      person: matchedPerson.id,
      displayName: matchedPerson.displayName,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Access denied' },
      { status: 500 }
    );
  }
}
