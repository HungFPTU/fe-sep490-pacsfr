/**
 * @deprecated Use src/core/config/env.ts instead
 * This file is kept for backward compatibility
 */

export type PublicEnvKeys =
    | "NEXT_PUBLIC_API_BASE_URL";

export type ServerEnvKeys =
    | "API_BASE_URL";

export function getPublicEnv(key: PublicEnvKeys, defaultValue: string = ""): string {
    const value = process.env[key];
    return value ?? defaultValue;
}

export function getServerEnv(key: ServerEnvKeys, defaultValue: string = ""): string {
    if (typeof window !== "undefined") {
        throw new Error("getServerEnv can only be used on the server side.");
    }
    const value = process.env[key];
    return value ?? defaultValue;
}

// Re-export from new location
export { ENV } from './config/env'; 