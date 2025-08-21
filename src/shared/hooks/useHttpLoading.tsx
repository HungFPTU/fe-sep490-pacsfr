import React from "react";

interface LoadingState {
    [key: string]: boolean;
}

interface HttpLoadingContextValue {
    loadingStates: LoadingState;
    isLoading: (key?: string) => boolean;
    isAnyLoading: () => boolean;
}

const HttpLoadingContext = React.createContext<HttpLoadingContextValue | undefined>(undefined);

export function HttpLoadingProvider({ children }: { children: React.ReactNode }) {
    const [loadingStates, setLoadingStates] = React.useState<LoadingState>({});

    React.useEffect(() => {
        const handleLoadingChange = (event: CustomEvent<{ key: string; loading: boolean }>) => {
            const { key, loading } = event.detail;
            setLoadingStates(prev => ({
                ...prev,
                [key]: loading,
            }));
        };

        window.addEventListener("http-loading-change", handleLoadingChange as EventListener);

        return () => {
            window.removeEventListener("http-loading-change", handleLoadingChange as EventListener);
        };
    }, []);

    const isLoading = React.useCallback((key?: string) => {
        if (!key) return Object.values(loadingStates).some(Boolean);
        return loadingStates[key] || false;
    }, [loadingStates]);

    const isAnyLoading = React.useCallback(() => {
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
}

export function useHttpLoading(key?: string) {
    const context = React.useContext(HttpLoadingContext);

    if (!context) {
        throw new Error("useHttpLoading must be used within HttpLoadingProvider");
    }

    return {
        isLoading: context.isLoading(key),
        isAnyLoading: context.isAnyLoading(),
        loadingStates: context.loadingStates,
    };
}

// Hook for specific API endpoints
export function useApiLoading() {
    const context = React.useContext(HttpLoadingContext);

    if (!context) {
        throw new Error("useApiLoading must be used within HttpLoadingProvider");
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
