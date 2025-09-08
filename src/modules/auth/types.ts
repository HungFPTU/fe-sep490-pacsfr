import { ApiResponse } from "@/core/config";

/**
 * Authentication feature types
 * Consolidated type definitions for auth domain
 */

import { UserRole } from "./enums";

export interface User {
    id: string;
    username: string;
    email: string;
    name: string;
    phone?: string;
    avatar?: string;
    role: UserRole;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// Authentication payloads
export interface LoginPayload {
    phone: string;
    password: string;
    rememberMe?: boolean;
}

export interface RegisterPayload {
    fullName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword?: string; // Frontend validation only
    dayOfBirth: string; // ISO string
    priorityGroup: boolean;
    idCardNumber: string;
}

// API payload (without confirmPassword)
export type RegisterApiPayload = Omit<RegisterPayload, 'confirmPassword'>;

// API responses - based on actual backend response structure
export interface AuthTokens {
    accessToken: string;
    refreshToken?: string;
    expiresIn: number;
}

// Actual API response structure
export interface ApiAuthData {
    token: string;
    expiration: string;
    userId: string;
    fullName: string;
    phone: string;
    role: string;
}

export interface LoginResponse {
    user: User;
    tokens: AuthTokens;
    message: string;
}

// Citizen entity returned by POST /Citizen
export interface Citizen {
    citizenId: string;
    fullName: string;
    dayOfBirth: string; // ISO
    priorityGroup: boolean;
    idCardNumber: string;
}

export interface RegisterResponse {
    citizen: Citizen;
    message: string;
}

// Type aliases for actual API responses
export type ApiLoginResponse = ApiResponse<ApiAuthData>;
export type ApiRegisterResponse = ApiResponse<Citizen>;

// Auth state
export interface AuthState {
    user: User | null;
    tokens: AuthTokens | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

// Permission and role types
export interface Permission {
    id: string;
    name: string;
    resource: string;
    action: string;
}

export interface RolePermissions {
    role: UserRole;
    permissions: Permission[];
}
