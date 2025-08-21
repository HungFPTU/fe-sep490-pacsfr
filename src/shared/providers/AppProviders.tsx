"use client";

import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { HeroUIProvider } from "./HeroUIProvider";
import { QueryProvider } from "./QueryProvider";
import { HttpLoadingProvider } from "@shared/hooks/useHttpLoading";

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <HeroUIProvider>
                <QueryProvider>
                    <HttpLoadingProvider>
                        {children}
                    </HttpLoadingProvider>
                </QueryProvider>
            </HeroUIProvider>
        </ThemeProvider>
    );
} 