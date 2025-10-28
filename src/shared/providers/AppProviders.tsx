"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { HeroUIProvider } from "./HeroUIProvider";
import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";
import { HttpLoadingProvider } from "@shared/hooks";

export function AppProviders({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Memoized providers to prevent unnecessary re-renders
    const providers = useMemo(() => (
        <ThemeProvider>
            <HeroUIProvider>
                <QueryProvider>
                    <AuthProvider>
                        <HttpLoadingProvider>
                            {children}
                        </HttpLoadingProvider>
                    </AuthProvider>
                </QueryProvider>
            </HeroUIProvider>
        </ThemeProvider>
    ), [children]);

    // Show loading state during hydration to prevent chunk loading errors
    if (!mounted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải...</p>
                </div>
            </div>
        );
    }

    return providers;
} 