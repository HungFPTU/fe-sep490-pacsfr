/**
 * Login Redirect Utilities
 * Centralized logic for handling post-login redirects
 */

import { UserRole } from '@/modules/auth/enums';

export interface RedirectOptions {
    intendedRole?: UserRole | null;
    returnUrl?: string | null;
    userRole?: UserRole | null;
}

/**
 * Determine the correct redirect URL after login
 * @param options - Redirect options including role and return URL
 * @returns The URL to redirect to
 */
export function getPostLoginRedirectUrl(options: RedirectOptions): string {
    const { intendedRole, returnUrl, userRole } = options;

    console.log('[Redirect] Determining redirect URL:', {
        intendedRole,
        returnUrl,
        userRole,
        'intendedRole type': typeof intendedRole,
        'userRole type': typeof userRole,
        'returnUrl type': typeof returnUrl
    });

    // Priority 1: Use returnUrl if available (from middleware redirect)
    if (returnUrl) {
        console.log('[Redirect] ✅ Using returnUrl:', returnUrl);
        return returnUrl;
    }

    // Priority 2: Use intendedRole if available (from URL params)
    if (intendedRole) {
        console.log('[Redirect] ✅ Using intendedRole:', intendedRole);
        switch (intendedRole) {
            case UserRole.MANAGER:
                console.log('[Redirect] → Manager redirect to /manager');
                return '/manager';
            case UserRole.STAFF:
                console.log('[Redirect] → Staff redirect to /staff/dashboard');
                return '/staff/dashboard';
            default:
                console.log('[Redirect] ⚠️ Unknown intended role:', intendedRole);
                break;
        }
    }

    // Priority 3: Use actual userRole (from login response)
    if (userRole) {
        console.log('[Redirect] ✅ Using userRole:', userRole);
        switch (userRole) {
            case UserRole.MANAGER:
                console.log('[Redirect] → Manager redirect to /manager (from userRole)');
                return '/manager';
            case UserRole.STAFF:
                console.log('[Redirect] → Staff redirect to /staff/dashboard (from userRole)');
                return '/staff/dashboard';
            default:
                console.log('[Redirect] ⚠️ Unknown user role:', userRole);
                break;
        }
    }

    // Fallback: Home page
    console.log('[Redirect] ❌ Fallback to home page - no valid role found');
  return '/';
}

// function performRedirect(url: string, delay: number = 1500): void {
//   console.log(`[Redirect] Performing redirect to ${url} in ${delay}ms`);

//     setTimeout(() => {
//         if (typeof window !== 'undefined' && window.location) {
//             console.log(`[Redirect] Executing redirect to: ${url}`);
//             console.log(`[Redirect] Current URL: ${window.location.href}`);

//             // Force redirect using multiple methods
//             try {
//                 // Method 1: window.location.href
//                 window.location.href = url;
//                 console.log(`[Redirect] ✅ Redirected using window.location.href`);
//             } catch (error) {
//                 console.error(`[Redirect] ❌ window.location.href failed:`, error);

//                 try {
//                     // Method 2: window.location.replace
//                     window.location.replace(url);
//                     console.log(`[Redirect] ✅ Redirected using window.location.replace`);
//                 } catch (error2) {
//                     console.error(`[Redirect] ❌ window.location.replace failed:`, error2);

//                     try {
//                         // Method 3: window.location.assign
//                         window.location.assign(url);
//                         console.log(`[Redirect] ✅ Redirected using window.location.assign`);
//                     } catch (error3) {
//                         console.error(`[Redirect] ❌ All redirect methods failed:`, error3);
//                     }
//                 }
//             }
//         } else {
//             console.error(`[Redirect] ❌ Window not available for redirect`);
//         }
//     }, delay);
// }

/**
 * Check if user has permission to access a route
 * @param userRole - User's role
 * @param routePath - Route path to check
 * @returns boolean indicating if user can access the route
 */
export function canAccessRoute(userRole: UserRole | null, routePath: string): boolean {
    if (!userRole) return false;

    // Manager can access all routes
    if (userRole === UserRole.MANAGER) {
        return true;
    }

    // Staff can access staff routes
    if (userRole === UserRole.STAFF) {
        return routePath.startsWith('/staff') || routePath.startsWith('/queue');
    }

    // Guest can only access public routes
    return !routePath.startsWith('/manager') && !routePath.startsWith('/staff') && !routePath.startsWith('/admin');
}
