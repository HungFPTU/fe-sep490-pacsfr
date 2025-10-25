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
    fullName?: string;
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

// Staff login payload - API requires "Username" field (capitalized)
export interface StaffLoginPayload {
    Username: string;
    Password: string;
}

export interface RegisterPayload {
    fullName: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword?: string; // Frontend validation only
    role: UserRole;
    isActive: boolean;
    dayOfBirth: string;
    priorityGroup: boolean;
    idCardNumber: string;
    description: string;
}

// API payload (without confirmPassword)
export type RegisterApiPayload = Omit<RegisterPayload, 'confirmPassword'>;

// API responses - based on actual backend response structure
export interface AuthTokens {
    accessToken: string;
    refreshToken?: string;
    expiresIn: number;
}

// Actual API response structure (old format - keeping for reference)
export interface ApiAuthData {
    token: string;
    expiration: string;
    userId: string;
    fullName: string;
    phone: string;
    role: string;
}

// New API login response structure (actual)
export interface ApiLoginData {
    $id?: string;
    username: string;
    fullName: string;
    role: string;
    token: string;
}

export interface LoginResponse {
    user: User;
    tokens: AuthTokens;
    role: UserRole;
    message: string;
}

export interface RegisterResponse {
    user: User;
    role: UserRole;
    tokens: AuthTokens;
    message: string;
}

// Type aliases for actual API responses
export type ApiLoginResponse = ApiLoginData; // Direct response, no wrapper
export type ApiRegisterResponse = ApiResponse<ApiAuthData>;

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