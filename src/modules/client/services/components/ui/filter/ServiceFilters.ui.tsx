"use client";

import { useState, useEffect } from "react";
import { Input, Button } from "@heroui/react";
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
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex gap-3">
                    <Input
                        placeholder="Nhập từ khoá tìm kiếm"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1"
                        size="lg"
                        startContent={
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        }
                        classNames={{
                            input: "text-base",
                            inputWrapper: "border-none shadow-none focus-within:shadow-none focus-visible:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        }}
                    />
                    <Button
                        color="primary"
                        size="lg"
                        onClick={handleSearch}
                        className="px-8 bg-red-600 hover:bg-red-700"
                        startContent={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        }
                    >
                        Tìm kiếm
                    </Button>
                    <Button
                        variant="light"
                        size="lg"
                        onClick={handleReset}
                        className="px-6 text-gray-600 hover:text-gray-800"
                    >
                        Xóa
                    </Button>
                    <Button
                        variant="light"
                        size="lg"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="px-6 text-gray-600 hover:text-gray-800"
                    >
                        {showAdvanced ? "Ẩn tìm kiếm nâng cao" : "Tìm kiếm nâng cao"}
                    </Button>
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