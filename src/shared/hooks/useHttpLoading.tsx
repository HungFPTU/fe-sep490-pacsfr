import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

// HTTP Loading State Management
type LoadingState = Record<string, boolean>;

type HttpLoadingContextValue = {
    loadingStates: LoadingState;
    isLoading: (key?: string) => boolean;
    isAnyLoading: () => boolean;
};

// Export the context itself for consumption and type safety in providers
export const HttpLoadingContext = createContext<HttpLoadingContextValue | undefined>(undefined);

export const HttpLoadingProvider = ({ children }: { children: ReactNode }) => {
    const [loadingStates, setLoadingStates] = useState<LoadingState>({});

    useEffect(() => {
        const handleLoadingChange = (event: Event) => {
            // Since dispatched event is CustomEvent
            const customEvent = event as CustomEvent<{ key: string; loading: boolean }>;
            const { key, loading } = customEvent.detail;
            setLoadingStates(prev => ({
                ...prev,
                [key]: loading,
            }));
        };

        window.addEventListener("http-loading-change", handleLoadingChange);

        return () => {
            window.removeEventListener("http-loading-change", handleLoadingChange);
        };
    }, []);

    const isLoading = useCallback(
        (key?: string) => {
            if (!key) return Object.values(loadingStates).some(Boolean);
            return !!loadingStates[key];
        },
        [loadingStates]
    );

    const isAnyLoading = useCallback(() => {
        return Object.values(loadingStates).some(Boolean);
    }, [loadingStates]);

    const value: HttpLoadingContextValue = {
        loadingStates,
        isLoading,
        isAnyLoading,
    };

    return (
        <HttpLoadingContext.Provider value={value}>
            {children}
        </HttpLoadingContext.Provider>
    );
};

export function useHttpLoading(key?: string) {
    const context = useContext(HttpLoadingContext);

    if (!context) {
        throw new Error("useHttpLoading must be used within a HttpLoadingProvider");
    }

    return {
        isLoading: context.isLoading(key),
        isAnyLoading: context.isAnyLoading(),
        loadingStates: context.loadingStates,
    };
}

// Hook for specific API endpoints
export function useApiLoading() {
    const context = useContext(HttpLoadingContext);

    if (!context) {
        throw new Error("useApiLoading must be used within a HttpLoadingProvider");
    }

    return {
        // Common API loading states
        isLoginLoading: context.isLoading("POST:/auth/login"),
        isLogoutLoading: context.isLoading("POST:/auth/logout"),
        isQueueLoading: context.isLoading("GET:/queue/overview"),
        isCountersLoading: context.isLoading("GET:/queue/counters"),

        // Generic method
        isLoading: context.isLoading,
    };
}
