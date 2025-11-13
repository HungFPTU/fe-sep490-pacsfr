"use client";

import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@heroui/react";
import { ServiceFilters } from "../../ui/filter/ServiceFilters.ui";
import { ServiceList } from "../../ui/list/ServiceList.ui";
import { ServicePagination } from "../../ui/pagination/ServicePagination.ui";
import { useServices, useServiceFilters } from "../../../hooks/useServices";
import type { ServiceFilters as ServiceFiltersType } from "../../../types/req";

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
            implementingAgency: "",
            field: "",
            implementationLevel: "",
            targetAudience: "",
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
        <div className={`space-y-6 ${className}`}>
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Thủ tục hành chính
                </h1>
                <p className="text-gray-600 mt-1">
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
            />

            {/* Results Summary */}
            {pagination && (
                <Card className="bg-gray-50 border-gray-200">
                    <CardBody className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <p className="text-gray-700">
                                <span className="font-semibold">{pagination.total}</span> thủ tục được tìm thấy
                                {activeFilters.keyword && (
                                    <span> cho từ khóa <strong>&quot;{activeFilters.keyword}&quot;</strong></span>
                                )}
                            </p>
                            <div className="text-sm text-gray-600">
                                Trang {pagination.page} / {pagination.totalPages}
                            </div>
                        </div>
                    </CardBody>
                </Card>
            )}

            {/* Services List */}
            <ServiceList
                services={services}
                loading={isLoading}
                error={error}
                showDescription={true}
            />

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
                <div className="mt-8">
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
