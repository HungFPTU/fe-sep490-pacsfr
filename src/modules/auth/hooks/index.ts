import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../stores/useAuthStore";
import { authService } from "../services/auth.service";
import { useGlobalToast } from "@core/patterns/SingletonHook";
import type { LoginPayload, RegisterPayload } from "../types";

/**
 * Simple Auth Hook - TanStack Query + Zustand + Service
 * Service handles business logic, Hook handles UI state
 */
export function useAuth() {
    const { user, token, isAuthenticated, setCredentials, clearCredentials } = useAuthStore();
    const { addToast } = useGlobalToast();

    // Track if user just logged in to prevent duplicate API calls
    const [justLoggedIn, setJustLoggedIn] = React.useState(false);

    // Login mutation - Service handles API + business logic
    const loginMutation = useMutation({
        mutationFn: async (credentials: LoginPayload) => {
            return authService.login(credentials);
        },
        onSuccess: (response) => {
            // Hook handles UI state updates
            setCredentials(response.user, response.tokens.accessToken);
            setJustLoggedIn(true); // Mark as just logged in to prevent profile query
            addToast({ message: "Đăng nhập thành công!", type: "success" });
        },
        onError: (error) => {
            addToast({
                message: error instanceof Error ? error.message : "Đăng nhập thất bại",
                type: "error"
            });
        },
    });

    // Register mutation - Service handles API + business logic
    const registerMutation = useMutation({
        mutationFn: async (payload: RegisterPayload) => {
            return authService.register(payload);
        },
        onSuccess: (response) => {
            // Hook handles UI state updates
            setCredentials(response.user, response.tokens.accessToken);
            setJustLoggedIn(true); // Mark as just logged in to prevent profile query
            addToast({ message: "Đăng ký thành công! Chào mừng bạn!", type: "success" });
        },
        onError: (error) => {
            console.error("[Auth Hook] Register error:", error);
            addToast({
                message: error instanceof Error ? error.message : "Đăng ký thất bại",
                type: "error"
            });
        },
        // Prevent auto-retry to avoid duplicate submissions
        retry: false,
        // Prevent duplicate mutations
        networkMode: "offlineFirst",
    });

    // Logout mutation
    const logoutMutation = useMutation({
        mutationFn: async () => {
            return authService.logout();
        },
        onSettled: () => {
            clearCredentials();
            setJustLoggedIn(false); // Reset login flag
            addToast({ message: "Đã đăng xuất", type: "info" });
        },
    });

    // Profile query - Service handles data fetching
    const profileQuery = useQuery({
        queryKey: ["auth", "profile"],
        queryFn: () => authService.getProfile(),
        enabled: isAuthenticated && !!token && !justLoggedIn, // Prevent duplicate call after login
        staleTime: 5 * 60 * 1000,
        retry: false,
    });

    // Reset justLoggedIn flag when profile query is disabled to allow future queries
    React.useEffect(() => {
        if (justLoggedIn && isAuthenticated) {
            const timer = setTimeout(() => {
                setJustLoggedIn(false);
            }, 1000); // Reset after 1 second to allow future profile queries
            return () => clearTimeout(timer);
        }
    }, [justLoggedIn, isAuthenticated]);

    // Sync profile data to store when available (only if not from recent login)
    React.useEffect(() => {
        if (profileQuery.data && token && !justLoggedIn) {
            setCredentials(profileQuery.data, token);
        }
    }, [profileQuery.data, token, setCredentials, justLoggedIn]);

    return {
        // State
        user: profileQuery.data || user,
        token,
        isAuthenticated,

        // Actions
        login: loginMutation.mutateAsync,
        register: registerMutation.mutateAsync,
        logout: logoutMutation.mutateAsync,

        // Loading states
        isLoading: loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending || profileQuery.isLoading,

        // Error states
        error: loginMutation.error || registerMutation.error || logoutMutation.error || profileQuery.error,
    };
}