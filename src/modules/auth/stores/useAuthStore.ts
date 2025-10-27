import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { http } from "@core/http/client";
import { TokenStorage } from "@core/utils/storage";
import type { User } from "../types";
import { UserRole } from "../enums";

// SSR-safe storage
// const createSSRSafeStorage = () => {
//     if (typeof window === 'undefined') {
//         return {
//             getItem: (key: string) => null,
//             setItem: (key: string, value: string) => { },
//             removeItem: (key: string) => { },
//         };
//     }
//     return localStorage;
// };

interface AuthState {
    // State
    user: User | null;
    role?: UserRole | null;
    token: string | null;
    isAuthenticated: boolean;
    rememberMe: boolean;

    // Actions
    setCredentials: (user: User, token: string, role: UserRole, rememberMe?: boolean) => void;
    clearCredentials: () => void;
    updateUser: (user: Partial<User>) => void;
}

// Create store with skipHydration
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

                // Actions
                setCredentials: (user, token, role, rememberMe = false) => {
                    console.log('[Auth Store] setCredentials called with:', { user, token, role, rememberMe });
                    console.log('[Auth Store] User data details:', {
                        id: user.id,
                        username: user.username,
                        role: user.role,
                        roleType: (user as { roleType?: string })?.roleType,
                        position: user.position,
                        fullName: user.fullName
                    });
                    set({
                        user,
                        token,
                        role,
                        isAuthenticated: true,
                        rememberMe,
                    });

                    // Lưu token vào localStorage
                    TokenStorage.setAuthToken(token);
                    console.log('[Auth Store] Token saved to localStorage');

                    // ✅ NEW: Also save token to cookies for middleware
                    if (typeof document !== 'undefined') {
                        // Set cookie expiration based on rememberMe
                        const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60; // 30 days if rememberMe, 7 days otherwise
                        document.cookie = `auth-token=${token}; path=/; max-age=${maxAge}; secure; samesite=strict`;
                        console.log('[Auth Store] Token saved to cookies with rememberMe:', rememberMe);
                    }

                    // Configure HTTP client to get token from storage
                    http.configureAuth({
                        getToken: () => TokenStorage.getAuthToken(),
                    });
                },

                clearCredentials: () => {
                    // Xóa token từ localStorage
                    TokenStorage.removeAuthToken();
                    console.log('[Auth Store] Token removed from localStorage');

                    // ✅ NEW: Also clear token from cookies
                    if (typeof document !== 'undefined') {
                        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                        console.log('[Auth Store] Token removed from cookies');
                    }

                    set({
                        user: null,
                        token: null,
                        role: null,
                        isAuthenticated: false,
                        rememberMe: false,
                    });

                    // Xóa auth-storage khỏi localStorage (xóa mục lưu trữ persist)
                    if (typeof window !== 'undefined') {
                        try {
                            localStorage.removeItem("auth-storage");
                            console.log('[Auth Store] auth-storage removed from localStorage');
                        } catch (err) {
                            console.warn('[Auth Store] Failed to remove auth-storage from localStorage', err);
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
                    console.log('[Auth Store] onRehydrateStorage called with state:', state);
                    // Only run on client side
                    if (typeof window !== 'undefined') {
                        // Configure HTTP client to get token from storage
                        if (state?.token) {
                            http.configureAuth({
                                getToken: () => TokenStorage.getAuthToken(),
                            });

                            // Restore token from localStorage
                            const localToken = TokenStorage.getAuthToken();
                            if (localToken && localToken === state.token) {
                                console.log('[Auth Store] Token restored from localStorage');
                            } else {
                                console.warn('[Auth Store] Token mismatch, clearing state');
                                // Clear state if token doesn't match - will be handled by store
                            }
                        } else {
                            console.log('[Auth Store] No token in state, clearing auth');
                            // Clear state - will be handled by store
                        }
                    }
                },
            }
        ),
        {
            name: "auth-store",
            // Fix hydration mismatch
            skipHydration: true,
        }
    )
);

// Create the store
const authStore = createAuthStore();

// Manual hydration
if (typeof window !== 'undefined') {
    authStore.persist.rehydrate();
}

export const useAuthStore = authStore;
