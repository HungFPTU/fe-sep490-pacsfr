/**
 * Authentication Redirect Utilities
 * 
 * Handles post-login redirects based on user role and intended destination
 */

import { UserRole } from '../enums';
import { getDefaultRoute } from '../config/role-permissions.config';

/**
 * Get redirect URL after successful login
 */
export function getPostLoginRedirect(
    userRole: UserRole,
    returnUrl?: string | null,
    fallbackUrl?: string
): string {
    // If there's a returnUrl and user has access to it, use it
    if (returnUrl && isValidReturnUrl(returnUrl, userRole)) {
        return returnUrl;
    }

    // If fallback URL is provided and valid, use it
    if (fallbackUrl && isValidReturnUrl(fallbackUrl, userRole)) {
        return fallbackUrl;
    }

    // Default to role-specific default route
    return getDefaultRoute(userRole);
}

/**
 * Check if return URL is valid for the user role
 */
export function isValidReturnUrl(url: string, userRole: UserRole): boolean {
    try {
        const urlObj = new URL(url, window.location.origin);
        const pathname = urlObj.pathname;

        // Check if URL is accessible by role
        switch (userRole) {
            case UserRole.MANAGER:
                return (
                    pathname.startsWith('/manager') ||
                    pathname.startsWith('/queue') ||
                    pathname === '/' ||
                    pathname.startsWith('/thu-tuc-hanh-chinh') ||
                    pathname.startsWith('/tin-tuc')
                );

            case UserRole.STAFF:
                return (
                    pathname.startsWith('/staff') ||
                    pathname.startsWith('/queue') ||
                    pathname === '/' ||
                    pathname.startsWith('/thu-tuc-hanh-chinh') ||
                    pathname.startsWith('/tin-tuc')
                );

            case UserRole.GUEST:
                return (
                    pathname === '/' ||
                    pathname.startsWith('/thu-tuc-hanh-chinh') ||
                    pathname.startsWith('/tin-tuc') ||
                    pathname.startsWith('/about') ||
                    pathname.startsWith('/contact')
                );

            default:
                return false;
        }
    } catch {
        // Invalid URL
        return false;
    }
}

/**
 * Get login URL with return URL parameter
 */
export function getLoginUrlWithReturn(returnUrl: string): string {
    const encodedReturnUrl = encodeURIComponent(returnUrl);
    return `/login?returnUrl=${encodedReturnUrl}`;
}

/**
 * Get manager login URL with encrypted parameters
 */
export function getManagerLoginUrlWithReturn(returnUrl: string): string {
    const roleParam = btoa(encodeURIComponent('MANAGER'));
    const urlParam = btoa(encodeURIComponent(returnUrl));
    return `/login?r=${roleParam}&u=${urlParam}`;
}

/**
 * Get staff login URL with encrypted parameters
 */
export function getStaffLoginUrlWithReturn(returnUrl: string): string {
    const roleParam = btoa(encodeURIComponent('STAFF'));
    const urlParam = btoa(encodeURIComponent(returnUrl));
    return `/login?r=${roleParam}&u=${urlParam}`;
}

/**
 * Extract return URL from query parameters
 */
export function extractReturnUrl(searchParams: URLSearchParams): string | null {
    const returnUrl = searchParams.get('returnUrl');

    if (!returnUrl) return null;

    try {
        // Decode and validate URL
        const decodedUrl = decodeURIComponent(returnUrl);
        const urlObj = new URL(decodedUrl, window.location.origin);
        return urlObj.pathname + urlObj.search + urlObj.hash;
    } catch {
        // Invalid return URL
        return null;
    }
}

/**
 * Get appropriate login URL based on intended destination
 */
export function getAppropriateLoginUrl(intendedUrl: string): string {
    // If trying to access manager routes, redirect to manager login
    if (intendedUrl.startsWith('/manager')) {
        return getManagerLoginUrlWithReturn(intendedUrl);
    }

    // If trying to access staff routes, redirect to staff login
    if (intendedUrl.startsWith('/staff')) {
        return getStaffLoginUrlWithReturn(intendedUrl);
    }

    // For other routes, use general login
    return getLoginUrlWithReturn(intendedUrl);
}

/**
 * Role-specific login URLs (all use single login page with encrypted params)
 */
export const LOGIN_URLS = {
    [UserRole.MANAGER]: '/login',
    [UserRole.STAFF]: '/login',
    [UserRole.GUEST]: '/login',
} as const;

/**
 * Get login URL for specific role
 */
export function getLoginUrlForRole(role: UserRole): string {
    return LOGIN_URLS[role];
}
