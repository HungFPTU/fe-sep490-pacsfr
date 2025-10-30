/**
 * Core module exports
 * Central export point for core functionality
 */

// Configuration
export * from "./config";
export * from "./config/env";
export * from "./config/aws.config";

// HTTP Client
export * from "./http/client";

// Services
export * from "./services/upload.service";
export * from "./services/file-upload.service";
export * from "./services/image-upload.service";

// Hooks
export * from "./hooks/useFileUpload";
export * from "./hooks/useImageUpload";

// Logger
export * from "./logger";

// Patterns
export * from "./patterns/SingletonHook";

// Utils
export * from "./utils";

// Re-export commonly used items for convenience
export { APP_CONFIG, ROUTES, STORAGE_KEYS } from "./config/constants";
export { ENV } from "./config/env";