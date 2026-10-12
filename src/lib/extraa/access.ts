import 'server-only';
import crypto from 'crypto';
import { cookies } from 'next/headers';

/**
 * TEMPORARY DEVELOPMENT CREDENTIAL:
 * For development only. In production, this can be overridden via EXTRAA_PASSWORD environment variable.
 * NEVER expose this credential to the client bundle or UI.
 */
const DEV_EXTRAA_PASSWORD = process.env.EXTRAA_PASSWORD || 'asdfghjkl';

const EXTRAA_COOKIE = 'life_extraa_session';
const EXTRAA_SECRET =
  process.env.EXTRAA_SECRET ||
  'life-extraa-vault-secret-key-2026-private-and-sovereign';
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

/**
 * Validates the submitted password against the server-side secret.
 */
export function verifyExtraaPassword(inputPassword: string): boolean {
  if (!inputPassword || typeof inputPassword !== 'string') return false;

  const trimmed = inputPassword.trim();
  const inputBuffer = Buffer.from(trimmed);
  const targetBuffer = Buffer.from(DEV_EXTRAA_PASSWORD);

  if (inputBuffer.length !== targetBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(inputBuffer, targetBuffer);
}

/**
 * Creates a signed HMAC-SHA256 session token for Extraa.
 */
function createSignedExtraaToken(): string {
  const payload = {
    sub: 'vaibhav_extraa',
    scope: 'extraa',
    iat: Date.now(),
    exp: Date.now() + SESSION_DURATION_MS,
  };

  const payloadString = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', EXTRAA_SECRET)
    .update(payloadString)
    .digest('base64url');

  return `${payloadString}.${signature}`;
}

/**
 * Verifies a signed HMAC-SHA256 session token for Extraa.
 */
function verifySignedExtraaToken(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return false;

    const [payloadString, signature] = parts;
    const expectedSignature = crypto
      .createHmac('sha256', EXTRAA_SECRET)
      .update(payloadString)
      .digest('base64url');

    if (
      signature.length !== expectedSignature.length ||
      !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
    ) {
      return false;
    }

    const payload = JSON.parse(Buffer.from(payloadString, 'base64url').toString('utf-8'));
    if (!payload.sub || payload.scope !== 'extraa' || !payload.exp || Date.now() > payload.exp) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Sets an HttpOnly cookie establishing a valid Extraa session.
 */
export async function setExtraaSession(): Promise<void> {
  const token = createSignedExtraaToken();
  const cookieStore = await cookies();

  cookieStore.set(EXTRAA_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

/**
 * Clears the Extraa session cookie.
 */
export async function clearExtraaSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(EXTRAA_COOKIE);
}

/**
 * Checks whether the current request has an authenticated Extraa session.
 */
export async function isExtraaAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(EXTRAA_COOKIE);

    if (!sessionCookie || !sessionCookie.value) {
      return false;
    }

    return verifySignedExtraaToken(sessionCookie.value);
  } catch {
    return false;
  }
}
