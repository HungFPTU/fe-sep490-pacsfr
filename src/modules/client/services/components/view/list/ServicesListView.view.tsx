"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Card, CardBody } from "@heroui/react";
import { ServiceFilters } from "../../ui/filter/ServiceFilters.ui";
import { ServiceList } from "../../ui/list/ServiceList.ui";
import { ServicePagination } from "../../ui/pagination/ServicePagination.ui";
import { useServices, useServiceFilters } from "../../../hooks/useServices";
import type { ServiceFilters as ServiceFiltersType } from "../../../types/req";
import { useDerivedFilterOptions } from "../../../hooks/useDerivedFilterOptions";
import { filterServicesByAdvancedFilters, hasAdvancedFilters } from "../../../utils/service-filtering";

interface ServicesListViewProps {
    className?: string;
    initialFilters?: Partial<ServiceFiltersType>;
}

export const ServicesListView: React.FC<ServicesListViewProps> = ({
    className = "",
    initialFilters = {},
}) => {
    const { filters, updateFilter, resetFilters, setPage } = useServiceFilters({
        size: 10,
        ...initialFilters,
    });

    // Active filters state - only updated when search button is clicked
    const [activeFilters, setActiveFilters] = useState<ServiceFiltersType>(filters);

    // Sync activeFilters when filters change (e.g., initial mount)
    useEffect(() => {
        setActiveFilters(filters);
    }, []); // Only on mount

    const { data: response, isLoading, error, refetch } = useServices(activeFilters);
    const services = response?.data?.items?.$values || [];
    const filterOptions = useDerivedFilterOptions(services);
    const filteredServices = useMemo(
        () => filterServicesByAdvancedFilters(services, activeFilters),
        [services, activeFilters]
    );
    const isUsingAdvancedFilters = hasAdvancedFilters(activeFilters);
    const pagination = response?.data;

    // Handle search - apply filters and refetch
    const handleSearch = (newFilters: ServiceFiltersType) => {
        setActiveFilters({
            ...newFilters,
            page: 1, // Reset to first page on search
        });
        // Refetch will be triggered automatically by React Query when activeFilters changes
    };

    // Handle reset - clear filters and refetch
    const handleReset = () => {
        const defaultFilters: ServiceFiltersType = {
            keyword: "",
            serviceGroupId: "",
            legalBasisId: "",
            isActive: null,
            page: 1,
            size: 10,
            serviceType: "",
            field: "",
            executionLevel: "",
            onlineAvailable: null,
            searchBy: "department",
        };
        resetFilters();
        setActiveFilters(defaultFilters);
        // Refetch will be triggered automatically by React Query when activeFilters changes
    };

    const handlePageChange = (page: number) => {
        setActiveFilters(prev => ({ ...prev, page }));
    };

    return (
        <div className={`space-y-4 sm:space-y-6 ${className}`}>
            {/* Header */}
            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Thủ tục hành chính
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                    Tìm kiếm và tra cứu các thủ tục hành chính
                </p>
            </div>

            {/* Filters */}
            <ServiceFilters
                filters={filters}
                activeFilters={activeFilters}
                onFiltersChange={(newFilters) => {
                    // Update local filter state (not triggering API)
                    Object.entries(newFilters).forEach(([key, value]) => {
                        updateFilter(key as keyof ServiceFiltersType, value);
                    });
                }}
                onSearch={handleSearch}
                onReset={handleReset}
                isLoading={isLoading}
                options={filterOptions}
            />

            {/* Results Summary */}
            {pagination && (
                <Card className="bg-gray-50 border-gray-200">
                    <CardBody className="p-3 sm:p-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm sm:text-base text-gray-700">
                                <span className="font-semibold">{pagination.total}</span> thủ tục trong hệ thống
                                {activeFilters.keyword && (
                                    <span className="block sm:inline"> cho từ khóa <strong>&quot;{activeFilters.keyword}&quot;</strong></span>
                                )}
                            </p>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                {isUsingAdvancedFilters && (
                                    <p className="text-xs sm:text-sm text-emerald-600">
                                        {filteredServices.length} kết quả phù hợp bộ lọc nâng cao
                                    </p>
                                )}
                                <div className="text-xs sm:text-sm text-gray-600">
                                    Trang {pagination.page} / {pagination.totalPages}
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            )}

            {/* Services List */}
            <ServiceList
                services={filteredServices}
                loading={isLoading}
                error={error}
                showDescription={true}
            />

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
                <div className="mt-4 sm:mt-8">
                    <ServicePagination
                        pagination={pagination}
                        onPageChange={handlePageChange}
                        variant="default"
                    />
                </div>
            )}

        </div>
    );
};
