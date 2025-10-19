"use client";

import { useState, useEffect } from "react";
// Removed unused imports - using native HTML elements for cleaner design
import { AdvancedSearchFilters } from "./AdvancedSearchFilters.ui";
import type { ServiceFilters as ServiceFiltersType } from "@/modules/client/services/types/req";

interface ServiceFiltersProps {
    filters: ServiceFiltersType;
    onFiltersChange: (filters: ServiceFiltersType) => void;
    onReset: () => void;
    className?: string;
}

export const ServiceFilters: React.FC<ServiceFiltersProps> = ({
    filters,
    onFiltersChange,
    onReset,
    className = "",
}) => {
    const [searchKeyword, setSearchKeyword] = useState(filters.keyword || "");
    const [showAdvanced, setShowAdvanced] = useState(false);

    // Sync keyword state when filters change
    useEffect(() => {
        setSearchKeyword(filters.keyword || "");
    }, [filters.keyword]);

    const handleSearch = () => {
        onFiltersChange({
            ...filters,
            keyword: searchKeyword,
            page: 1,
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleFilterChange = (newFilters: ServiceFiltersType) => {
        onFiltersChange(newFilters);
    };

    const handleReset = () => {
        setSearchKeyword("");
        setShowAdvanced(false);
        onReset();
    };

    return (
        <div className={`w-full ${className}`}>
            {/* Main Search Bar */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center gap-6">
                    {/* Search Input */}
                    <div className="flex-1 relative">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Tìm kiếm thủ tục hành chính..."
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full pl-12 pr-4 py-4 text-lg font-normal text-gray-900 placeholder-gray-500 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all duration-300 shadow-inner"
                            />
                        </div>
                    </div>

                    {/* Search Button */}
                    <button
                        onClick={handleSearch}
                        className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Tìm kiếm
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-6 py-4 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200 font-medium rounded-xl"
                    >
                        Xóa
                    </button>
                    <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="px-6 py-4 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200 font-medium rounded-xl"
                    >
                        {showAdvanced ? "Ẩn tìm kiếm nâng cao" : "Tìm kiếm nâng cao"}
                    </button>
                </div>
            </div>

            {/* Advanced Search Section */}
            {showAdvanced && (
                <div className="mt-4">
                    <AdvancedSearchFilters
                        filters={filters}
                        onFiltersChange={handleFilterChange}
                    />
                </div>
            )}
        </div>
    );
};