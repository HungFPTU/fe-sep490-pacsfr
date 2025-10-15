/**
 * Auth Provider - Global authentication context
 * Provides authentication state and methods throughout the app
 */

"use client";

import React, { createContext, useContext, useEffect } from 'react';
import { useAuth } from '@/modules/auth/hooks';
import { TokenStorage } from '@/core/utils/storage';
import { http } from '@/core/http/client';
import type { User, RegisterPayload } from '@/modules/auth/types';
import { UserRole } from '@/modules';

interface AuthContextValue {
    // State
    user: User | null;
    role?: UserRole | string;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: Error | null;

    // Actions
    login: (credentials: { username: string; password: string; rememberMe?: boolean }) => Promise<unknown>;
    register: (payload: RegisterPayload) => Promise<unknown>;
    logout: () => Promise<unknown>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const auth = useAuth();

    // Configure HTTP client with auth token on mount and auth changes
    useEffect(() => {
        const token = TokenStorage.getAuthToken();
        if (token && auth.isAuthenticated) {
            http.configureAuth({
                getToken: () => token,
            });
        } else {
            http.configureAuth({
                getToken: () => null,
            });
        }
    }, [auth.isAuthenticated, auth.token]);

    // Auto-logout on token expiration
    useEffect(() => {
        const handleUnauthorized = () => {
            if (auth.isAuthenticated) {
                auth.logout();
            }
        };

        const handleServerError = (event: Event) => {
            console.error('Server error:', (event as CustomEvent).detail);
        };

        // Listen for auth errors from HTTP client
        window.addEventListener('auth-error', handleUnauthorized);
        window.addEventListener('server-error', handleServerError);

        return () => {
            window.removeEventListener('auth-error', handleUnauthorized);
            window.removeEventListener('server-error', handleServerError);
        };
    }, [auth.isAuthenticated, auth.logout, auth]);

    const contextValue: AuthContextValue = {
        user: auth.user,
        role: auth.role != null ? String(auth.role) : undefined,
        isAuthenticated: auth.isAuthenticated,
        isLoading: auth.isLoading,
        error: auth.error as Error | null,
        login: async (credentials) => {
            return auth.login({
                ...credentials,
                phone: credentials.username // Map username to phone for API compatibility
            });
        },
        register: auth.register,
        logout: auth.logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use auth context
export function useAuthContext(): AuthContextValue {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}

// Re-export for convenience
export { useAuth as useAuthHook };
