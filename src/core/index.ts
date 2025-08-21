// Core exports - centralized access to core functionality
export * from "./env";
export * from "./logger";
export { http } from "./http/client";
export type { HttpMethod, HttpRequestOptions, HttpResponse } from "./http/client";

// Patterns
export * from "./patterns/SingletonHook";
