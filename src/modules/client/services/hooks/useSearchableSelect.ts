"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { OptionItem } from "../types/filter.types";

interface UseSearchableSelectProps {
    options: OptionItem[];
    value?: string | null;
    onChange: (value: string) => void;
}

export const useSearchableSelect = ({
    options,
    value,
    onChange,
}: UseSearchableSelectProps) => {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const filteredOptions = useMemo(() => {
        if (!query.trim()) {
            return options;
        }
        const normalizedQuery = query.toLowerCase();
        return options.filter((option) =>
            option.name.toLowerCase().includes(normalizedQuery),
        );
    }, [options, query]);

    // Reset query when value, options, or open state changes
    useEffect(() => {
        setQuery("");
    }, [value, options, open]);

    // Handle click outside and escape key
    useEffect(() => {
        if (!open) {
            return;
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                event.target instanceof Node &&
                !containerRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [open]);

    const selectedOption = useMemo(() => {
        return options.find((option) => option.id === value) ?? null;
    }, [options, value]);

    const handleToggle = () => {
        setOpen((prev) => !prev);
    };

    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onChange("");
        setOpen(false);
    };

    const handleSelect = (selectedId: string) => {
        onChange(selectedId);
        setOpen(false);
    };

    return {
        query,
        open,
        containerRef,
        filteredOptions,
        selectedOption,
        handleToggle,
        handleClear,
        handleSelect,
        setQuery,
    };
};

