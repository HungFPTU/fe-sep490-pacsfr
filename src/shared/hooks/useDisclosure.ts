"use client";

import { useCallback, useState } from "react";

export function useDisclosure(initial = false) {
    const [isOpen, setIsOpen] = useState<boolean>(initial);
    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen((v) => !v), []);
    return { isOpen, open, close, toggle } as const;
} 