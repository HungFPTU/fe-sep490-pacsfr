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