"use client";

import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { HeroUIProvider } from "./HeroUIProvider";
import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";
import { HttpLoadingProvider } from "@shared/hooks/useHttpLoading";

export function AppProviders({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Show loading state during hydration
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

    return (
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
    );
} 