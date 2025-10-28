import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// TEMPORARILY DISABLED: Route classification imports
// TODO: Re-enable after fixing login redirect issues
// import { classifyRoute, requiresAuthentication } from './core/utils/route-classifier';

/**
 * Optimized Middleware for handling authentication redirects
 * Prevents redirect loops and unnecessary processing
 */

export function middleware(request: NextRequest) {
    // TEMPORARILY DISABLED: Route authorization logic
    // TODO: Re-enable after fixing login redirect issues
    // const { pathname } = request.nextUrl;

    // Debug logging
    // console.log(`[Middleware] Processing: ${pathname}`);

    // Classify the route automatically
    // const routeClassification = classifyRoute(pathname);
    // console.log(`[Middleware] Route classification:`, routeClassification);

    // Skip middleware for static files and Next.js internals
    // if (routeClassification.folderType === 'static') {
    //     console.log(`[Middleware] Skipping static route: ${pathname}`);
    //     return NextResponse.next();
    // }

    // Get token from cookies
    // const token = request.cookies.get('auth-token')?.value;
    // console.log(`[Middleware] Token exists: ${!!token}`);

    // Check if route requires authentication
    // const needsAuth = requiresAuthentication(pathname);
    // console.log(`[Middleware] Requires authentication: ${needsAuth}`);

    // Allow public routes without authentication
    // if (!needsAuth) {
    //     console.log(`[Middleware] Allowing public route: ${pathname}`);
    //     return NextResponse.next();
    // }

    // Protected routes - require authentication
    // if (!token) {
    //     console.log(`[Middleware] No token, redirecting to login for: ${pathname}`);
    //     // Prevent redirect loops by checking if already on login page
    //     if (pathname === '/login') {
    //         return NextResponse.next();
    //     }

    //     // Create login URL with encrypted params
    //     const loginUrl = new URL('/login', request.url);

    //     // Add role and return URL parameters
    //     if (pathname.startsWith('/manager')) {
    //         const roleParam = btoa(encodeURIComponent('MANAGER'));
    //         const urlParam = btoa(encodeURIComponent(pathname));
    //         loginUrl.searchParams.set('r', roleParam);
    //         loginUrl.searchParams.set('u', urlParam);
    //     } else if (pathname.startsWith('/staff')) {
    //         const roleParam = btoa(encodeURIComponent('STAFF'));
    //         const urlParam = btoa(encodeURIComponent(pathname));
    //         loginUrl.searchParams.set('r', roleParam);
    //         loginUrl.searchParams.set('u', urlParam);
    //     }

    //     return NextResponse.redirect(loginUrl);
    // }

    // Add cache headers to prevent unnecessary re-processing
    const response = NextResponse.next();
    // response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');

    // console.log(`[Middleware] Allowing authenticated access to: ${pathname}`);
    return response;
}

export const config = {
    // Minimal matcher - only match pages that need middleware
    // This allows Bun to auto-reload properly while keeping middleware lightweight
    matcher: [
        /*
         * Match only specific routes that need middleware processing
         * This reduces middleware overhead and improves auto-reload
         */
        '/manager/:path*',
        '/staff/:path*',
        '/login',
        '/register',
    ],
};
