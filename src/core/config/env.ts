/**
 * Environment configuration utilities
 * Centralized environment variable management with type safety
 */

export type PublicEnvKeys =
    | "NEXT_PUBLIC_API_BASE_URL"
    | "NEXT_PUBLIC_APP_NAME"
    | "NEXT_PUBLIC_LOG_LEVEL";

export type ServerEnvKeys =
    | "API_BASE_URL"
    | "DATABASE_URL"
    | "JWT_SECRET";

export function getPublicEnv(key: PublicEnvKeys, defaultValue: string = ""): string {
    const value = process.env[key];
    return value ?? defaultValue;
}

// Client-side only env access for debugging hydration issues
export function getClientEnv(key: PublicEnvKeys, defaultValue: string = ""): string {
    if (typeof window === "undefined") return defaultValue;
    return process.env[key] ?? defaultValue;
}

export function getServerEnv(key: ServerEnvKeys, defaultValue: string = ""): string {
    if (typeof window !== "undefined") {
        throw new Error("getServerEnv can only be used on the server side.");
    }
    const value = process.env[key];
    return value ?? defaultValue;
}

// Dynamic ENV object with getter functions for fresh values
export const ENV = {
    // Dynamic getters to ensure fresh environment variable access
    get API_BASE_URL() {
        // Direct access to avoid any wrapper issues
        return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";
    },
    get APP_NAME() {
        return process.env.NEXT_PUBLIC_APP_NAME || "PASCS";
    },
    get LOG_LEVEL() {
        return process.env.NEXT_PUBLIC_LOG_LEVEL || "info";
    },

    // Runtime checks
    get IS_DEV() {
        return process.env.NODE_ENV === "development";
    },
    get IS_PROD() {
        return process.env.NODE_ENV === "production";
    },
    get IS_CLIENT() {
        return typeof window !== "undefined";
    },
    get IS_SERVER() {
        return typeof window === "undefined";
    },
} as const;
