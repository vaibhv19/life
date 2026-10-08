import { NextRequest, NextResponse } from 'next/server';
import { verifyBirthday, setBetweenUsSession } from '@/lib/between-us/access';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { birthday } = body;

    if (!birthday || typeof birthday !== 'string') {
      return NextResponse.json(
        { success: false },
        { status: 400 }
      );
    }

    const matchedPerson = verifyBirthday(birthday);

    if (matchedPerson) {
      // 1. Configured Person -> Establish HttpOnly session and open person's space
      await setBetweenUsSession(matchedPerson.id);

      return NextResponse.json({
        success: true,
        status: 'configured',
        person: matchedPerson.id,
        displayName: matchedPerson.displayName,
      });
    }

    // 2. Unconfigured Birthday -> Open Universal Between Us page (no session, warm graceful fallback)
    return NextResponse.json({
      success: true,
      status: 'universal',
    });
  } catch {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
