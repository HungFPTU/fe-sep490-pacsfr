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

    // Actions
    setCredentials: (user: User, token: string, role: UserRole) => void;
    clearCredentials: () => void;
    updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set, get) => ({
                // Initial state
                user: null,
                token: null,
                role: null,
                isAuthenticated: false,

                // Actions
                setCredentials: (user, token, role) => {
                    set({
                        user,
                        token,
                        role,
                        isAuthenticated: true,
                    });

                    // Lưu token vào localStorage
                    TokenStorage.setAuthToken(token);
                    console.log('[Auth Store] Token saved to localStorage');

                    // Configure HTTP client to get token from storage
                    http.configureAuth({
                        getToken: () => TokenStorage.getAuthToken(),
                    });
                },

                clearCredentials: () => {
                    // Xóa token từ localStorage
                    TokenStorage.removeAuthToken();
                    console.log('[Auth Store] Token removed from localStorage');

                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                    });

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
                }),
                onRehydrateStorage: () => (state) => {
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
                            }
                        }
                    }
                },
            }
        ),
        {
            name: "auth-store",
        }
    )
);
