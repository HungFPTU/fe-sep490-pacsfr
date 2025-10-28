import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PUBLIC_ROUTES } from './core/config';

/**
 * Optimized Middleware for handling authentication redirects
 * Prevents redirect loops and unnecessary processing
 */

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip middleware for static files, API routes, and auth pages
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.startsWith('/login') ||
        pathname.startsWith('/register') ||
        pathname.startsWith('/_vercel') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    // Get token from cookies
    const token = request.cookies.get('auth-token')?.value;

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
        // Prevent redirect loops by checking if already on login page
        if (pathname === '/login') {
            return NextResponse.next();
        }

        // Create login URL with encrypted params
        const loginUrl = new URL('/login', request.url);

        // Add role and return URL parameters
        if (pathname.startsWith('/manager')) {
            const roleParam = btoa(encodeURIComponent('MANAGER'));
            const urlParam = btoa(encodeURIComponent(pathname));
            loginUrl.searchParams.set('r', roleParam);
            loginUrl.searchParams.set('u', urlParam);
        } else if (pathname.startsWith('/staff')) {
            const roleParam = btoa(encodeURIComponent('STAFF'));
            const urlParam = btoa(encodeURIComponent(pathname));
            loginUrl.searchParams.set('r', roleParam);
            loginUrl.searchParams.set('u', urlParam);
        }

        return NextResponse.redirect(loginUrl);
    }

    // Add cache headers to prevent unnecessary re-processing
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - _vercel (Vercel internal)
         * - files with extensions (static assets)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|_vercel|.*\\..*).*)',
    ],
};
