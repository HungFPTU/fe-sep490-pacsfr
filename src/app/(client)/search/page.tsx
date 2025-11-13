"use client";

import { useState, useEffect } from "react";
import { useServices, useServiceFilters } from "@/modules/client/services/hooks/useServices";
import { ServiceFilters } from "@/modules/client/services/components/ui/filter/ServiceFilters.ui";
import { ServicesListView } from "@/modules/client/services/components/view/list/ServicesListView.view";
import { ServicePagination } from "@/modules/client/services/components/ui/pagination/ServicePagination.ui";
import type { ServiceFilters as ServiceFiltersType } from "@/modules/client/services/types/req";

export default function SearchPage() {
    const { filters, updateFilter, resetFilters } = useServiceFilters();

    // Active filters state - only updated when search button is clicked
    const [activeFilters, setActiveFilters] = useState<ServiceFiltersType>(filters);

    // Sync activeFilters when filters change (e.g., initial mount)
    useEffect(() => {
        setActiveFilters(filters);
    }, []); // Only on mount

    const { data: servicesResponse, isLoading } = useServices(activeFilters);

    const handleFiltersChange = (newFilters: ServiceFiltersType) => {
        // Update local filter state (not triggering API)
        Object.entries(newFilters).forEach(([key, value]) => {
            updateFilter(key as keyof ServiceFiltersType, value);
        });
    };

    const handleSearch = (newFilters: ServiceFiltersType) => {
        setActiveFilters({
            ...newFilters,
            page: 1, // Reset to first page on search
        });
        // Refetch will be triggered automatically by React Query when activeFilters changes
    };

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
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Tìm kiếm dịch vụ
                    </h1>
                    <p className="text-gray-600">
                        Tìm kiếm và lọc các dịch vụ hành chính phù hợp với nhu cầu của bạn
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-8">
                    <ServiceFilters
                        filters={filters}
                        activeFilters={activeFilters}
                        onFiltersChange={handleFiltersChange}
                        onSearch={handleSearch}
                        onReset={handleReset}
                        isLoading={isLoading}
                    />
                </div>

                {/* Results Header */}
                {servicesResponse && (
                    <div className="mb-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Tìm thấy <span className="font-medium text-gray-900">
                                        {servicesResponse.data.total}
                                    </span> dịch vụ
                                </p>
                                <p className="text-xs text-gray-500">
                                    Trang {servicesResponse.data.page} / {servicesResponse.data.totalPages}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-600">Hiển thị:</label>
                                <select
                                    value={activeFilters.size}
                                    onChange={(e) => {
                                        const newSize = parseInt(e.target.value);
                                        setActiveFilters(prev => ({ ...prev, size: newSize, page: 1 }));
                                    }}
                                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Services List */}
                <ServicesListView
                    initialFilters={filters}
                />

                {/* Pagination */}
                {servicesResponse && servicesResponse.data.totalPages > 1 && (
                    <div className="mt-8">
                        <ServicePagination
                            pagination={servicesResponse.data}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}