/**
 * Automatic Route Classification System
 * Routes in (private) folders are protected, everything else is public
 *
 * TEMPORARILY DISABLED: Route classification system
 * TODO: Re-enable after fixing login redirect issues
 */

// TEMPORARILY DISABLED: Route classification interface
// export interface RouteClassification {
//     isPublic: boolean;
//     isProtected: boolean;
//     requiresAuth: boolean;
//     folderType: 'public' | 'private' | 'auth' | 'api' | 'static';
// }

// TEMPORARILY DISABLED: Route classification functions
// TODO: Re-enable after fixing login redirect issues

/**
 * Classify a route based on its pathname
 * @param pathname - The route pathname to classify
 * @returns RouteClassification object
 */
// export function classifyRoute(pathname: string): RouteClassification {
//     // Normalize pathname
//     const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;

//     // API routes (check first before static)
//     if (normalizedPath.startsWith('/api')) {
//         return {
//             isPublic: false,
//             isProtected: true,
//             requiresAuth: true,
//             folderType: 'api'
//         };
//     }

//     // Static files and Next.js internals
//     if (
//         normalizedPath.startsWith('/_next') ||
//         normalizedPath.startsWith('/favicon.ico') ||
//         normalizedPath.startsWith('/_vercel') ||
//         normalizedPath.startsWith('/_not-found') ||
//         normalizedPath.includes('.') ||
//         normalizedPath.includes('[') // Dynamic routes
//     ) {
//         return {
//             isPublic: true,
//             isProtected: false,
//             requiresAuth: false,
//             folderType: 'static'
//         };
//     }

//     // Auth routes (login, register, etc.)
//     if (
//         normalizedPath.startsWith('/login') ||
//         normalizedPath.startsWith('/register') ||
//         normalizedPath.startsWith('/auth') ||
//         normalizedPath.startsWith('/chatBot')
//     ) {
//         return {
//             isPublic: true,
//             isProtected: false,
//             requiresAuth: false,
//             folderType: 'auth'
//         };
//     }

//     // Private routes - anything in (private) folder structure
//     if (
//         normalizedPath.startsWith('/manager') ||
//         normalizedPath.startsWith('/staff') ||
//         normalizedPath.startsWith('/admin') ||
//         normalizedPath.startsWith('/dashboard') ||
//         normalizedPath.startsWith('/profile') ||
//         normalizedPath.startsWith('/settings') ||
//         normalizedPath.startsWith('/queue') ||
//         // Add more private route patterns as needed
//         normalizedPath.match(/^\/(private|protected|secure)/)
//     ) {
//         return {
//             isPublic: false,
//             isProtected: true,
//             requiresAuth: true,
//             folderType: 'private'
//         };
//     }

//     // Everything else is public
//     return {
//         isPublic: true,
//         isProtected: false,
//         requiresAuth: false,
//         folderType: 'public'
//     };
// }

/**
 * Check if a route requires authentication
 * @param pathname - The route pathname to check
 * @returns boolean indicating if authentication is required
 */
// export function requiresAuthentication(pathname: string): boolean {
//     return classifyRoute(pathname).requiresAuth;
// }

/**
 * Check if a route is public (no authentication required)
 * @param pathname - The route pathname to check
 * @returns boolean indicating if route is public
 */
// export function isPublicRoute(pathname: string): boolean {
//     return classifyRoute(pathname).isPublic;
// }

/**
 * Get all public routes (for debugging/logging purposes)
 * @returns Array of public route patterns
 */
// export function getPublicRoutePatterns(): string[] {
//     return [
//         '/',
//         '/about',
//         '/contact',
//         '/faq',
//         '/guide',
//         '/lookup',
//         '/news',
//         '/search',
//         '/search-questions',
//         '/survey',
//         '/thu-tuc-hanh-chinh',
//         '/tin-tuc',
//         '/chatBot',
//         '/login',
//         '/register',
//         // Add more patterns as needed
//     ];
// }

/**
 * Get all protected route patterns (for debugging/logging purposes)
 * @returns Array of protected route patterns
 */
// export function getProtectedRoutePatterns(): string[] {
//     return [
//         '/manager',
//         '/staff',
//         '/admin',
//         '/dashboard',
//         '/profile',
//         '/settings',
//         '/queue',
//         // Add more patterns as needed
//     ];
// }
