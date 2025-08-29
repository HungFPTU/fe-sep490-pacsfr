// Core exports - centralized access to core functionality
export * from "./logger";
export { http } from "./http/client";
export type { HttpMethod, HttpRequestOptions, HttpResponse } from "./http/client";

// Patterns
export * from "./patterns/SingletonHook";

// New organized exports
export * from "./config";
export * from "./utils";

// Backward compatibility - re-export from new locations
export { getPublicEnv, getServerEnv } from "./env";
export type { PublicEnvKeys, ServerEnvKeys } from "./env";
