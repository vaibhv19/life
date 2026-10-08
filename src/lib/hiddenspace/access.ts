import 'server-only';
import crypto from 'crypto';
import { cookies } from 'next/headers';

export type PersonId = 'zoya' | 'vaibhav';

export interface PersonProfile {
  id: PersonId;
  displayName: string;
}

// Server-only birthday mapping (NEVER exposed to the client bundle)
const REGISTERED_BIRTHDAYS: Record<string, PersonProfile> = {
  '12-08-2004': { id: 'zoya', displayName: 'Zoya' },
  '19-08-2004': { id: 'vaibhav', displayName: 'Vaibhav' },
};

const SESSION_COOKIE_NAME = 'life_hs_session';
const SESSION_SECRET =
  process.env.HIDDEN_SPACE_SECRET ||
  'life-editorial-archive-secret-key-2026-restraint-over-decoration';
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

/**
 * Normalizes input date string by trimming and standardizing delimiters to dashes (DD-MM-YYYY)
 */
export function normalizeBirthdayInput(input: string): string {
  if (!input) return '';
  return input.trim().replace(/[\/\.\s]/g, '-');
}

/**
 * Validates whether the given birthday is registered.
 * Returns the person profile if valid, or null if invalid.
 */
export function verifyBirthday(inputBirthday: string): PersonProfile | null {
  const normalized = normalizeBirthdayInput(inputBirthday);
  return REGISTERED_BIRTHDAYS[normalized] || null;
}

/**
 * Creates a signed HMAC-SHA256 session token.
 */
function createSignedToken(personId: PersonId): string {
  const payload = {
    sub: personId,
    iat: Date.now(),
    exp: Date.now() + SESSION_DURATION_MS,
  };

  const payloadString = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payloadString)
    .digest('base64url');

  return `${payloadString}.${signature}`;
}

/**
 * Verifies a signed HMAC-SHA256 session token.
 * Returns the PersonId if valid and non-expired, or null otherwise.
 */
function verifySignedToken(token: string): PersonId | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [payloadString, signature] = parts;
    const expectedSignature = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(payloadString)
      .digest('base64url');

    // Constant-time comparison to prevent timing attacks
    if (
      signature.length !== expectedSignature.length ||
      !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
    ) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(payloadString, 'base64url').toString('utf-8'));
    if (!payload.sub || !payload.exp || Date.now() > payload.exp) {
      return null;
    }

    if (payload.sub === 'zoya' || payload.sub === 'vaibhav') {
      return payload.sub as PersonId;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Sets an HttpOnly cookie establishing a valid Hidden Space session.
 */
export async function setHiddenSpaceSession(personId: PersonId): Promise<void> {
  const token = createSignedToken(personId);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

/**
 * Clears the session cookie to lock Hidden Space.
 */
export async function clearHiddenSpaceSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Retrieves the currently authenticated person from server-side cookies.
 * Returns the PersonProfile if valid, or null if unauthenticated or expired.
 */
export async function getAuthenticatedPerson(): Promise<PersonProfile | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie || !sessionCookie.value) {
      return null;
    }

    const personId = verifySignedToken(sessionCookie.value);
    if (!personId) {
      return null;
    }

    if (personId === 'zoya') {
      return { id: 'zoya', displayName: 'Zoya' };
    }
    if (personId === 'vaibhav') {
      return { id: 'vaibhav', displayName: 'Vaibhav' };
    }

    return null;
  } catch {
    return null;
  }
}
