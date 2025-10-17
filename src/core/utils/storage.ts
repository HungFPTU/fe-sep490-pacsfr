/**
 * Storage utilities
 * Centralized local storage and session storage management
 */

import { STORAGE_KEYS } from '../config/constants';

/**
 * Safe localStorage wrapper with SSR support
 */
export class LocalStorage {
    private static isAvailable(): boolean {
        // Check if we're in browser environment
        if (typeof window === 'undefined') {
            return false;
        }

        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch {
            return false;
        }
    }

    static set<T>(key: string, value: T): boolean {
        if (!this.isAvailable()) return false;

        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }

    static get<T>(key: string, defaultValue?: T): T | null {
        if (!this.isAvailable()) return defaultValue || null;

        try {
            const item = localStorage.getItem(key);
            if (item === null) return defaultValue || null;

            return JSON.parse(item);
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue || null;
        }
    }

    static remove(key: string): boolean {
        if (!this.isAvailable()) return false;

        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    }

    static clear(): boolean {
        if (!this.isAvailable()) return false;

        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
}

/**
 * Safe sessionStorage wrapper with SSR support
 */
export class SessionStorage {
    private static isAvailable(): boolean {
        // Check if we're in browser environment
        if (typeof window === 'undefined') {
            return false;
        }

        try {
            const test = '__sessionStorage_test__';
            sessionStorage.setItem(test, test);
            sessionStorage.removeItem(test);
            return true;
        } catch {
            return false;
        }
    }

    static set<T>(key: string, value: T): boolean {
        if (!this.isAvailable()) return false;

        try {
            const serializedValue = JSON.stringify(value);
            sessionStorage.setItem(key, serializedValue);
            return true;
        } catch (error) {
            console.error('Error saving to sessionStorage:', error);
            return false;
        }
    }

    static get<T>(key: string, defaultValue?: T): T | null {
        if (!this.isAvailable()) return defaultValue || null;

        try {
            const item = sessionStorage.getItem(key);
            if (item === null) return defaultValue || null;

            return JSON.parse(item);
        } catch (error) {
            console.error('Error reading from sessionStorage:', error);
            return defaultValue || null;
        }
    }

    static remove(key: string): boolean {
        if (!this.isAvailable()) return false;

        try {
            sessionStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from sessionStorage:', error);
            return false;
        }
    }

    static clear(): boolean {
        if (!this.isAvailable()) return false;

        try {
            sessionStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing sessionStorage:', error);
            return false;
        }
    }
}

/**
 * Token management utilities (LocalStorage)
 */
export const TokenStorage = {
    setAuthToken: (token: string): boolean => {
        return LocalStorage.set(STORAGE_KEYS.AUTH_TOKEN, token);
    },

    getAuthToken: (): string | null => {
        return LocalStorage.get<string>(STORAGE_KEYS.AUTH_TOKEN);
    },

    removeAuthToken: (): boolean => {
        return LocalStorage.remove(STORAGE_KEYS.AUTH_TOKEN);
    },

    setRefreshToken: (token: string): boolean => {
        return LocalStorage.set(STORAGE_KEYS.REFRESH_TOKEN, token);
    },

    getRefreshToken: (): string | null => {
        return LocalStorage.get<string>(STORAGE_KEYS.REFRESH_TOKEN);
    },

    removeRefreshToken: (): boolean => {
        return LocalStorage.remove(STORAGE_KEYS.REFRESH_TOKEN);
    },

    clearAllTokens: (): boolean => {
        const authRemoved = LocalStorage.remove(STORAGE_KEYS.AUTH_TOKEN);
        const refreshRemoved = LocalStorage.remove(STORAGE_KEYS.REFRESH_TOKEN);
        return authRemoved && refreshRemoved;
    },
};

