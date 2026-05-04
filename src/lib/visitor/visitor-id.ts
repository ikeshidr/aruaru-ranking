import { cookies } from 'next/headers';
import { randomUUID } from 'node:crypto';

const VISITOR_ID_COOKIE_NAME = 'aruaru_visitor_id';
const VISITOR_ID_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

function isValidVisitorId(value: string | undefined) {
  return typeof value === 'string' && value.trim().length >= 16 && value.length <= 128;
}

export async function getVisitorId() {
  const cookieStore = await cookies();
  const visitorId = cookieStore.get(VISITOR_ID_COOKIE_NAME)?.value;

  return isValidVisitorId(visitorId) ? visitorId : null;
}

export async function getOrCreateVisitorId() {
  const cookieStore = await cookies();
  const existingVisitorId = cookieStore.get(VISITOR_ID_COOKIE_NAME)?.value;

  if (isValidVisitorId(existingVisitorId)) {
    return existingVisitorId;
  }

  const visitorId = randomUUID();

  cookieStore.set(VISITOR_ID_COOKIE_NAME, visitorId, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: VISITOR_ID_MAX_AGE_SECONDS,
    path: '/',
  });

  return visitorId;
}
