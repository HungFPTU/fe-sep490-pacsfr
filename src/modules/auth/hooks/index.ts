import React, { useMemo, useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../stores/useAuthStore";
import { authService } from "../services/auth.service";
import { useGlobalToast } from "@core/patterns/SingletonHook";
import type { LoginPayload, RegisterPayload } from "../types";

/**
 * Optimized Auth Hook - TanStack Query + Zustand + Service
 * Prevents unnecessary re-renders and duplicate API calls
 */
export function useAuth() {
    const {
        user,
        token,
        role,
        isAuthenticated,
        isHydrated,
        setCredentials
    } = useAuthStore();
    const { addToast } = useGlobalToast();

    // Memoized state to prevent unnecessary re-renders
    const authState = useMemo(() => ({
        user,
        token,
        role,
        isAuthenticated: isAuthenticated && isHydrated, // Only consider authenticated if hydrated
    }), [user, token, role, isAuthenticated, isHydrated]);

    // Track login state to prevent duplicate profile calls
    const [justLoggedIn, setJustLoggedIn] = React.useState(false);

    // Memoized login mutation
    const loginMutation = useMutation({
        mutationFn: async (credentials: LoginPayload) => {
            const result = await authService.login(credentials);
            return { ...result, rememberMe: credentials.rememberMe };
        },
        onSuccess: (response) => {
            console.log('[useAuth] Login success');
            setCredentials(response.user, response.tokens.accessToken, response.role, response.rememberMe);
            setJustLoggedIn(true);
            addToast({ message: "Đăng nhập thành công!", type: "success" });
        },
        onError: (error) => {
            addToast({
                message: error instanceof Error ? error.message : "Đăng nhập thất bại",
                type: "error"
            });
        },
    });

    // Memoized register mutation
    const registerMutation = useMutation({
        mutationFn: async (payload: RegisterPayload) => {
            return authService.register(payload);
        },
        onSuccess: (response) => {
            setCredentials(response.user, response.tokens.accessToken, response?.role);
            setJustLoggedIn(true);
            addToast({ message: "Đăng ký thành công! Chào mừng bạn!", type: "success" });
        },
        onError: (error) => {
            console.error("[Auth Hook] Register error:", error);
            addToast({
                message: error instanceof Error ? error.message : "Đăng ký thất bại",
                type: "error"
            });
        },
        retry: false,
        networkMode: "offlineFirst",
    });

    // Memoized logout mutation
    const logoutMutation = useMutation({
        mutationFn: async () => {
            return authService.logout();
        },
        onSettled: () => {
            setJustLoggedIn(false);
            addToast({ message: "Đã đăng xuất", type: "info" });
        },
    });

    // Optimized profile query - only run when necessary
    const profileQuery = useQuery({
        queryKey: ["auth", "profile", token],
        queryFn: () => authService.getProfile(),
        enabled: authState.isAuthenticated && !!authState.token && !justLoggedIn && isHydrated,
        staleTime: 10 * 60 * 1000, // 10 minutes - longer cache
        gcTime: 15 * 60 * 1000, // 15 minutes garbage collection
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    // Reset justLoggedIn flag after successful login
    React.useEffect(() => {
        if (justLoggedIn && authState.isAuthenticated) {
            const timer = setTimeout(() => {
                setJustLoggedIn(false);
            }, 2000); // Increased to 2 seconds
            return () => clearTimeout(timer);
        }
    }, [justLoggedIn, authState.isAuthenticated]);

    // Sync profile data to store (only if not from recent login)
    React.useEffect(() => {
        if (profileQuery.data && authState.token && authState.role && !justLoggedIn) {
            setCredentials(profileQuery.data, authState.token, authState.role);
        }
    }, [profileQuery.data, authState.token, authState.role, setCredentials, justLoggedIn]);

    // Memoized return object to prevent unnecessary re-renders
    return useMemo(() => ({
        // State
        user: profileQuery.data || authState.user,
        token: authState.token,
        role: authState.role,
        isAuthenticated: authState.isAuthenticated,
        isHydrated,

        // Actions
        login: loginMutation.mutateAsync,
        register: registerMutation.mutateAsync,
        logout: logoutMutation.mutateAsync,

        // Loading states
        isLoading: loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending || (profileQuery.isLoading && !justLoggedIn),

        // Error states
        error: loginMutation.error || registerMutation.error || logoutMutation.error || profileQuery.error,
    }), [
        profileQuery.data,
        authState.user,
        authState.token,
        authState.role,
        authState.isAuthenticated,
        isHydrated,
        loginMutation.mutateAsync,
        registerMutation.mutateAsync,
        logoutMutation.mutateAsync,
        loginMutation.isPending,
        registerMutation.isPending,
        logoutMutation.isPending,
        profileQuery.isLoading,
        justLoggedIn,
        loginMutation.error,
        registerMutation.error,
        logoutMutation.error,
        profileQuery.error,
    ]);
}