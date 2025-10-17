"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface QueryProviderProps {
    children: React.ReactNode;
}

// Create a client with SSR-safe configuration
const createQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            // Time in milliseconds
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
            retry: (failureCount, error) => {
                // Don't retry on 4xx errors (client errors)
                if (error instanceof Error && error.message.includes("4")) {
                    return false;
                }
                return failureCount < 3;
            },
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            // SSR-safe options
            refetchOnMount: false,
        },
        mutations: {
            retry: 1,
        },
    },
});

export function QueryProvider({ children }: QueryProviderProps) {
    // Create query client only on client side
    const [queryClient] = useState(() => createQueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {process.env.NODE_ENV === "development" && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
        </QueryClientProvider>
    );
}
