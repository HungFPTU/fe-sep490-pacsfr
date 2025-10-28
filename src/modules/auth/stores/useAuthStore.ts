import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { http } from "@core/http/client";
import { TokenStorage } from "@core/utils/storage";
import type { User } from "../types";
import { UserRole } from "../enums";

interface AuthState {
    // State
    user: User | null;
    role?: UserRole | null;
    token: string | null;
    isAuthenticated: boolean;
    rememberMe: boolean;
    isHydrated: boolean; // Track hydration state

    // Actions
    setCredentials: (user: User, token: string, role: UserRole, rememberMe?: boolean) => void;
    clearCredentials: () => void;
    updateUser: (user: Partial<User>) => void;
    setHydrated: (hydrated: boolean) => void;
}

// Create store with optimized configuration
const createAuthStore = () => create<AuthState>()(
    devtools(
        persist(
            (set, get) => ({
                // Initial state
                user: null,
                token: null,
                role: null,
                isAuthenticated: false,
                rememberMe: false,
                isHydrated: false,

                // Actions
                setCredentials: (user, token, role, rememberMe = false) => {
                    console.log('[Auth Store] setCredentials called');

                    set({
                        user,
                        token,
                        role,
                        isAuthenticated: true,
                        rememberMe,
                    });

                    // Lưu token vào localStorage
                    TokenStorage.setAuthToken(token);

                    // Set cookie for middleware
                    if (typeof document !== 'undefined') {
                        const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60;
                        document.cookie = `auth-token=${token}; path=/; max-age=${maxAge}; secure; samesite=strict`;
                    }

                    // Configure HTTP client
                    http.configureAuth({
                        getToken: () => TokenStorage.getAuthToken(),
                    });
                },

                clearCredentials: () => {
                    // Clear localStorage
                    TokenStorage.removeAuthToken();

                    // Clear cookies
                    if (typeof document !== 'undefined') {
                        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                    }

                    set({
                        user: null,
                        token: null,
                        role: null,
                        isAuthenticated: false,
                        rememberMe: false,
                    });

                    // Clear persist storage
                    if (typeof window !== 'undefined') {
                        try {
                            localStorage.removeItem("auth-storage");
                        } catch (err) {
                            console.warn('[Auth Store] Failed to remove auth-storage', err);
                        }
                    }

                    // Clear HTTP client auth
                    http.configureAuth({
                        getToken: () => null,
                    });
                },

                updateUser: (userUpdates) => {
                    const { user } = get();
                    if (user) {
                        set({
                            user: { ...user, ...userUpdates },
                        });
                    }
                },

                setHydrated: (hydrated) => {
                    set({ isHydrated: hydrated });
                },
            }),
            {
                name: "auth-storage",
                partialize: (state) => ({
                    user: state.user,
                    token: state.token,
                    role: state.role,
                    isAuthenticated: state.isAuthenticated,
                    rememberMe: state.rememberMe,
                }),
                onRehydrateStorage: () => (state) => {
                    if (typeof window !== 'undefined' && state?.token) {
                        // Configure HTTP client
                        http.configureAuth({
                            getToken: () => TokenStorage.getAuthToken(),
                        });
                    }
                },
            }
        ),
        {
            name: "auth-store",
            skipHydration: true, // Prevent hydration mismatch
        }
    )
);

// Create the store
const authStore = createAuthStore();

// Manual hydration with proper timing
if (typeof window !== 'undefined') {
    authStore.persist.rehydrate().then(() => {
        authStore.getState().setHydrated(true);
    });
}

export const useAuthStore = authStore;
