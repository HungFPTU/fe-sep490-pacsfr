/**
 * Authentication feature constants
 */

import { UserRole } from './enums';

// Role configurations
export const ROLE_LABELS = {
    [UserRole.ADMIN]: "Quản trị viên",
    [UserRole.STAFF]: "Nhân viên",
    [UserRole.CITIZEN]: "Công dân",
} as const;

export const ROLE_HIERARCHY = {
    [UserRole.ADMIN]: 3,
    [UserRole.STAFF]: 2,
    [UserRole.CITIZEN]: 1,
} as const;

export const DEFAULT_ROLE = UserRole.CITIZEN;

// Available roles for registration
export const REGISTRATION_ROLES = [UserRole.CITIZEN] as const;

// Auth routes
export const AUTH_ROUTES = {
    LOGIN: '/login',
    REGISTER: '/register',
    LOGOUT: '/logout',
    PROFILE: '/profile',
} as const;

// Note: API endpoints moved to src/core/config/api.path.ts for centralization

// Storage keys for auth
export const AUTH_STORAGE_KEYS = {
    TOKEN: 'auth_token',
    REFRESH_TOKEN: 'refresh_token',
    USER: 'auth_user',
} as const;

// Validation constants
export const AUTH_VALIDATION = {
    PASSWORD_MIN_LENGTH: 6,
    USERNAME_MIN_LENGTH: 3,
    MAX_LOGIN_ATTEMPTS: 5,
    TOKEN_REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutes
} as const;
