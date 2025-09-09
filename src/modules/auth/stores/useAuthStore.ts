import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { http } from "@core/http/client";
import type { User } from "../types";
import { UserRole } from "../enums";

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

                    // Configure HTTP client
                    http.configureAuth({
                        getToken: () => token,
                    });
                },

                clearCredentials: () => {
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
                    isAuthenticated: state.isAuthenticated,
                }),
                onRehydrateStorage: () => (state) => {
                    // Configure HTTP client with persisted token
                    if (state?.token) {
                        http.configureAuth({
                            getToken: () => state.token,
                        });
                    }
                },
            }
        ),
        {
            name: "auth-store",
        }
    )
);
