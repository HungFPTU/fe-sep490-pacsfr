"use client";

import React, { useMemo } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { HeroUIProvider } from "./HeroUIProvider";
import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";
import { HttpLoadingProvider } from "@shared/hooks";

export function AppProviders({ children }: { children: React.ReactNode }) {
    // const [mounted, setMounted] = useState(false);

    // useEffect(() => {
    //     setMounted(true);
    // }, []);

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

    // // Show loading state during hydration to prevent chunk loading errors
    // if (!mounted) {
    //     return;
    // }

    return providers;
} 