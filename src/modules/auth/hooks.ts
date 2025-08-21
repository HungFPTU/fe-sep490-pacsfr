import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "./stores/useAuthStore";
import { authService } from "./services/auth.service";
import { useGlobalToast } from "@core/patterns/SingletonHook";
import type { LoginPayload } from "./types";

/**
 * Simple Auth Hook - TanStack Query + Zustand + Service
 * Service handles business logic, Hook handles UI state
 */
export function useAuth() {
    const { user, token, isAuthenticated, setCredentials, clearCredentials } = useAuthStore();
    const { addToast } = useGlobalToast();

    // Login mutation - Service handles API + business logic
    const loginMutation = useMutation({
        mutationFn: async (credentials: LoginPayload) => {
            return authService.login(credentials);
        },
        onSuccess: (response) => {
            // Hook handles UI state updates
            setCredentials(response.user, response.token);
            addToast({ message: "Đăng nhập thành công!", type: "success" });
        },
        onError: (error) => {
            addToast({
                message: error instanceof Error ? error.message : "Đăng nhập thất bại",
                type: "error"
            });
        },
    });

    // Logout mutation
    const logoutMutation = useMutation({
        mutationFn: async () => {
            return authService.logout();
        },
        onSettled: () => {
            clearCredentials();
            addToast({ message: "Đã đăng xuất", type: "info" });
        },
    });

    // Profile query - Service handles data fetching
    const profileQuery = useQuery({
        queryKey: ["auth", "profile"],
        queryFn: () => authService.getProfile(),
        enabled: isAuthenticated && !!token,
        staleTime: 5 * 60 * 1000,
        retry: false,
    });

    // Sync profile data to store when available
    React.useEffect(() => {
        if (profileQuery.data && token) {
            setCredentials(profileQuery.data, token);
        }
    }, [profileQuery.data, token, setCredentials]);

    return {
        // State
        user: profileQuery.data || user,
        token,
        isAuthenticated,

        // Actions
        login: loginMutation.mutateAsync,
        logout: logoutMutation.mutateAsync,

        // Loading states
        isLoading: loginMutation.isPending || logoutMutation.isPending || profileQuery.isLoading,

        // Error states
        error: loginMutation.error || logoutMutation.error || profileQuery.error,
    };
}