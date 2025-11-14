import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the access token from cookies
  const accessToken = request.cookies.get('accessToken')?.value;
  
  // Define protected paths that require authentication
  const protectedPaths = ['/dashboard', '/superadmin'];
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  // Define auth pages that should redirect if already logged in
  const authPaths = ['/login', '/forgot-password', '/reset-password'];
  const isAuthPath = authPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (isAuthPath && accessToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If it's a protected path and no access token exists, redirect to login
  if (isProtectedPath && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
