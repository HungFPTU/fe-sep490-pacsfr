"use client";

import { useState, useEffect } from "react";
import { ManagerFilterBar } from "@/shared/components/manager/ui";
import { AdvancedSearchFilters } from "./AdvancedSearchFilters.ui";
import type { ServiceFilters as ServiceFiltersType } from "@/modules/client/services/types/req";

interface ServiceFiltersProps {
    filters: ServiceFiltersType; // Local filter state (not applied yet)
    activeFilters: ServiceFiltersType; // Currently active filters (applied)
    onFiltersChange: (filters: ServiceFiltersType) => void; // Update local state
    onSearch: (filters: ServiceFiltersType) => void; // Apply filters and search
    onReset: () => void; // Reset and clear filters
    isLoading?: boolean;
    className?: string;
}

export const ServiceFilters: React.FC<ServiceFiltersProps> = ({
    filters,
    activeFilters,
    onFiltersChange,
    onSearch,
    onReset,
    isLoading = false,
    className = "",
}) => {
    const [showAdvanced, setShowAdvanced] = useState(false);

    // Sync local keyword when activeFilters change (e.g., after reset)
    useEffect(() => {
        if (activeFilters.keyword !== filters.keyword) {
            onFiltersChange({
                ...filters,
                keyword: activeFilters.keyword,
            });
        }
    }, [activeFilters.keyword]);

    // Handle search button click - apply all filters
    const handleSearch = () => {
        onSearch({
            ...filters,
            page: 1, // Reset to first page on search
        });
    };

    // Handle reset button click
    const handleReset = () => {
        setShowAdvanced(false);
        onReset();
    };

    // Handle filter changes (local state only, not triggering API)
    const handleFilterChange = (newFilters: ServiceFiltersType) => {
        onFiltersChange(newFilters);
    };

    return (
        <div className={`w-full space-y-4 ${className}`}>
            {/* Main Filter Bar */}
            <div>
                <ManagerFilterBar
                    searchValue={filters.keyword || ""}
                    onSearchChange={(value: string) => {
                        onFiltersChange({
                            ...filters,
                            keyword: value,
                        });
                    }}
                    onSubmit={handleSearch}
                    onReset={handleReset}
                    searchPlaceholder="Tìm kiếm thủ tục hành chính..."
                    isSubmitting={isLoading}
                    searchButtonVariant="red"
                >
                    {/* Additional filters can be added here as children */}
                    <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap"
                    >
                        {showAdvanced ? "Ẩn bộ lọc" : "Bộ lọc nâng cao"}
                    </button>
                </ManagerFilterBar>
            </div>

            {/* Advanced Search Section */}
            {showAdvanced && (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                    <AdvancedSearchFilters
                        filters={filters}
                        onFiltersChange={handleFilterChange}
                    />
                </div>
            )}
        </div>
    );
};