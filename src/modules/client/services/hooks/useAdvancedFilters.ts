"use client";

import { useEffect } from "react";
import type { ServiceFilters } from "../types/req";
import type { SearchByType } from "../types/filter-options";

interface UseAdvancedFiltersProps {
    filters: ServiceFilters;
    onFiltersChange: (filters: ServiceFilters) => void;
}

export const useAdvancedFilters = ({
    filters,
    onFiltersChange,
}: UseAdvancedFiltersProps) => {
    const searchBy: SearchByType = (filters.searchBy || "department") as SearchByType;

    // Reset dependent filters when searchBy changes
    useEffect(() => {
        // Only reset if searchBy actually changed and filters have values
        if (
            filters.implementingAgency ||
            filters.field ||
            filters.implementationLevel ||
            filters.targetAudience
        ) {
            onFiltersChange({
                ...filters,
                implementingAgency: "",
                field: "",
                implementationLevel: "",
                targetAudience: "",
                page: 1,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchBy]); // Only reset when searchBy changes

    const handleFilterChange = (key: keyof ServiceFilters, value: string | boolean | null) => {
        onFiltersChange({
            ...filters,
            [key]: value,
            page: 1, // Reset to first page when filters change
        });
    };

    return {
        searchBy,
        handleFilterChange,
    };
};

