/**
 * Application-wide constants
 * Centralized constant definitions for the application
 */

export const APP_CONFIG = {
    NAME: "PASCS - Hệ thống dịch vụ công",
    DESCRIPTION: "Dịch vụ hành chính công trực tuyến",
    VERSION: "1.0.0",
    LOGO: "/logo.png",
} as const;

export const ROUTES = {
    HOME: "/",
    // Auth
    LOGIN: "/login",
    REGISTER: "/register",
    // Test
    TEST_ENV: "/test-env",
    // Dashboard
    DASHBOARD: "/dashboard",
    // Queue
    QUEUE: "/queue",
    STAFF_QUEUE: "/staff/queue",
    // Manager
    MANAGER: "/manager",
    // Profile
    PROFILE: "/profile",
    ABOUT: "/about",
} as const;

export const STORAGE_KEYS = {
    AUTH_TOKEN: "auth_token",
    REFRESH_TOKEN: "refresh_token",
    USER_DATA: "user_data",
    THEME: "theme",
    LANGUAGE: "language",
} as const;

export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
} as const;

export const VALIDATION_RULES = {
    PASSWORD_MIN_LENGTH: 5,
    USERNAME_MIN_LENGTH: 3,
    PHONE_PATTERN: /^[0-9]{10,11}$/,
    EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    ID_CARD_PATTERN: /^[0-9]{12}$/,
} as const;
