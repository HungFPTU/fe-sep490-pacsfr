/**
 * URL Encryption Utilities
 * 
 * Handles encryption/decryption of URL parameters for secure role-based redirects
 */

import { UserRole } from '../enums';

// Simple encryption/decryption for URL params
export const encrypt = (text: string): string => {
    return btoa(encodeURIComponent(text));
};

export const decrypt = (encrypted: string): string => {
    try {
        return decodeURIComponent(atob(encrypted));
    } catch {
        return '';
    }
};

/**
 * Generate encrypted login URL with role and return URL
 */
export const generateLoginUrl = (role: UserRole, returnUrl?: string): string => {
    const baseUrl = '/login';
    const params = new URLSearchParams();

    // Encrypt role
    params.set('r', encrypt(role));

    // Encrypt return URL if provided
    if (returnUrl) {
        params.set('u', encrypt(returnUrl));
    }

    return `${baseUrl}?${params.toString()}`;
};

/**
 * Generate manager login URL
 */
export const generateManagerLoginUrl = (returnUrl?: string): string => {
    return generateLoginUrl(UserRole.MANAGER, returnUrl);
};

/**
 * Generate staff login URL
 */
export const generateStaffLoginUrl = (returnUrl?: string): string => {
    return generateLoginUrl(UserRole.STAFF, returnUrl);
};

/**
 * Parse encrypted URL parameters
 */
export const parseLoginParams = (searchParams: URLSearchParams): {
    role: UserRole | null;
    returnUrl: string | null;
} => {
    const roleParam = searchParams.get('r');
    const urlParam = searchParams.get('u');

    let role: UserRole | null = null;
    let returnUrl: string | null = null;

    if (roleParam) {
        const decryptedRole = decrypt(roleParam);
        if (Object.values(UserRole).includes(decryptedRole as UserRole)) {
            role = decryptedRole as UserRole;
        }
    }

    if (urlParam) {
        returnUrl = decrypt(urlParam);
    }

    return { role, returnUrl };
};

/**
 * Get appropriate login URL based on intended destination
 */
export const getAppropriateLoginUrl = (intendedUrl: string): string => {
    // If trying to access manager routes, redirect to manager login
    if (intendedUrl.startsWith('/manager')) {
        return generateManagerLoginUrl(intendedUrl);
    }

    // If trying to access staff routes, redirect to staff login
    if (intendedUrl.startsWith('/staff')) {
        return generateStaffLoginUrl(intendedUrl);
    }

    // For other routes, use general login
    return generateLoginUrl(UserRole.GUEST, intendedUrl);
};
