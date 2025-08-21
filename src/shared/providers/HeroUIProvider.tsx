"use client";

import React from "react";
import { HeroUIProvider as BaseHeroUIProvider } from "@heroui/react";

interface HeroUIProviderProps {
    children: React.ReactNode;
}

export function HeroUIProvider({ children }: HeroUIProviderProps) {
    return (
        <BaseHeroUIProvider>
            {children}
        </BaseHeroUIProvider>
    );
}
