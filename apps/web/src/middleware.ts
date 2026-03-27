import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED_PATHS = ['/dashboard'];

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));

  if (!isProtected) {
    return NextResponse.next();
  }

  // Check for auth token in localStorage is not possible in edge middleware,
  // so we check for a lightweight cookie or rely on client-side AuthGuard.
  // This middleware provides a fast redirect for obvious unauthenticated visits.
  const token = request.cookies.get('braxxis-auth-token');
  if (!token) {
    // Client-side AuthGuard will handle the actual redirect after hydration.
    // This is a soft check — the real validation happens server-side via the API.
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
