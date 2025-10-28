/**
 * Environment configuration utilities
 * Centralized environment variable management with type safety
 * Fixed for CommonJS/ESM compatibility
 */

export type PublicEnvKeys =
    | "NEXT_PUBLIC_API_BASE_URL"
    | "NEXT_PUBLIC_APP_NAME"
    | "NEXT_PUBLIC_LOG_LEVEL";

export type ServerEnvKeys =
    | "API_BASE_URL"
    | "DATABASE_URL"
    | "JWT_SECRET";

// Safe environment access functions
export function getPublicEnv(key: PublicEnvKeys, defaultValue: string = ""): string {
    try {
        if (typeof window === "undefined") {
            // Server-side
            return process.env[key] ?? defaultValue;
        }
        // Client-side
        return process.env[key] ?? defaultValue;
    } catch (error) {
        console.warn(`[ENV] Failed to access ${key}:`, error);
        return defaultValue;
    }
}

// Client-side only env access for debugging hydration issues
export function getClientEnv(key: PublicEnvKeys, defaultValue: string = ""): string {
    try {
        if (typeof window === "undefined") return defaultValue;
        return process.env[key] ?? defaultValue;
    } catch (error) {
        console.warn(`[ENV] Failed to access client ${key}:`, error);
        return defaultValue;
    }
}

export function getServerEnv(key: ServerEnvKeys, defaultValue: string = ""): string {
    try {
        if (typeof window !== "undefined") {
            throw new Error("getServerEnv can only be used on the server side.");
        }
        return process.env[key] ?? defaultValue;
    } catch (error) {
        console.warn(`[ENV] Failed to access server ${key}:`, error);
        return defaultValue;
    }
}

// Safe ENV object with proper error handling
export const ENV = {
    // Dynamic getters to ensure fresh environment variable access
    get API_BASE_URL() {
        try {
            const value = process.env.NEXT_PUBLIC_API_BASE_URL;
            if (!value) {
                if (process.env.NODE_ENV === "production") {
                    console.error("Missing NEXT_PUBLIC_API_BASE_URL in production environment.");
                    return "https://api.pascs.com"; // Fallback for production
                }
                return "http://localhost:3000/api";
            }
            return value;
        } catch (error) {
            console.warn("[ENV] Failed to access API_BASE_URL:", error);
            return "http://localhost:3000/api";
        }
    },
    get APP_NAME() {
        try {
            return process.env.NEXT_PUBLIC_APP_NAME || "PASCS";
        } catch (error) {
            console.warn("[ENV] Failed to access APP_NAME:", error);
            return "PASCS";
        }
    },
    get LOG_LEVEL() {
        try {
            return process.env.NEXT_PUBLIC_LOG_LEVEL || "info";
        } catch (error) {
            console.warn("[ENV] Failed to access LOG_LEVEL:", error);
            return "info";
        }
    },

    // Runtime checks with error handling
    get IS_DEV() {
        try {
            return process.env.NODE_ENV === "development";
        } catch {
            return false;
        }
    },
    get IS_PROD() {
        try {
            return process.env.NODE_ENV === "production";
        } catch {
            return false;
        }
    },
    get IS_CLIENT() {
        return typeof window !== "undefined";
    },
    get IS_SERVER() {
        return typeof window === "undefined";
    },
} as const;
