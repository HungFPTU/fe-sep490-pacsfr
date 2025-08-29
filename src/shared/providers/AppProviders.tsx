"use client";

import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { HeroUIProvider } from "./HeroUIProvider";
import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";
import { HttpLoadingProvider } from "@shared/hooks/useHttpLoading";

export function AppProviders({ children }: { children: React.ReactNode }) {
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