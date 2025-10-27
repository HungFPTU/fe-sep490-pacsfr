import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PUBLIC_ROUTES } from './core/config';
/**
 * Middleware for handling authentication redirects
 * 
 * This middleware runs before every request and handles:
 * - Redirecting unauthenticated users to appropriate login pages
 * - Preserving return URLs for post-login redirects
 * - Role-based access control
 */

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip middleware for static files, API routes, and auth pages
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.startsWith('/login') ||
        pathname.startsWith('/register')
    ) {
        return NextResponse.next();
    }

    // Get token from cookies
    const token = request.cookies.get('auth-token')?.value;

    // Debug logging for middleware
    console.log('[Middleware] Path:', pathname, 'Token:', token ? 'Present' : 'Missing');

    // Public routes that don't require authentication
    const isPublicRoute = PUBLIC_ROUTES.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    );

    // Check if route is public
    if (isPublicRoute) {
        return NextResponse.next();
    }

    // Protected routes - require authentication
    if (!token) {
        // No token, redirect to single login page with encrypted params
        if (pathname.startsWith('/manager')) {
            // Encrypt role and return URL
            const roleParam = btoa(encodeURIComponent('MANAGER'));
            const urlParam = btoa(encodeURIComponent(pathname));
            return NextResponse.redirect(
                new URL(`/login?r=${roleParam}&u=${urlParam}`, request.url)
            );
        }

        if (pathname.startsWith('/staff')) {
            // Encrypt role and return URL
            const roleParam = btoa(encodeURIComponent('STAFF'));
            const urlParam = btoa(encodeURIComponent(pathname));
            return NextResponse.redirect(
                new URL(`/login?r=${roleParam}&u=${urlParam}`, request.url)
            );
        }

        // Default to general login for other protected routes
        return NextResponse.redirect(
            new URL(`/login`, request.url)
        );
    }

    // TODO: Add role-based access control here
    // For now, just allow authenticated users to proceed
    return NextResponse.next();
}

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
