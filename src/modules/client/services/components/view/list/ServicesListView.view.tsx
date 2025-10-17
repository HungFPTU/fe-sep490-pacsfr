"use client";

import { useState } from "react";
import { Card, CardBody } from "@heroui/react";
import { ServiceFilters } from "../../ui/filter/ServiceFilters.ui";
import { ServiceList } from "../../ui/list/ServiceList.ui";
import { ServicePagination } from "../../ui/pagination/ServicePagination.ui";
import { useServices, useServiceFilters } from "../../../hooks/useServices";
import type { ServiceFilters as ServiceFiltersType } from "../../../types";

interface ServicesListViewProps {
    className?: string;
    initialFilters?: Partial<ServiceFiltersType>;
}

export const ServicesListView: React.FC<ServicesListViewProps> = ({
    className = "",
    initialFilters = {},
}) => {
    const { filters, updateFilter, resetFilters } = useServiceFilters({
        size: 10,
        ...initialFilters,
    });

    const handleFiltersChange = (newFilters: typeof filters) => {
        Object.entries(newFilters).forEach(([key, value]) => {
            updateFilter(key as keyof typeof filters, value);
        });
    };

    const { data: response, isLoading, error } = useServices(filters);
    const services = response?.data?.items?.$values || [];
    const pagination = response?.data;

    const handlePageChange = (page: number) => {
        updateFilter("page", page as unknown as string | boolean | null);
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
                onFiltersChange={handleFiltersChange}
                onReset={resetFilters}
            />

            {/* Results Summary */}
            {pagination && (
                <Card className="bg-gray-50 border-gray-200">
                    <CardBody className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <p className="text-gray-700">
                                <span className="font-semibold">{pagination.total}</span> thủ tục được tìm thấy
                                {filters.keyword && (
                                    <span> cho từ khóa <strong>&quot;{filters.keyword}&quot;</strong></span>
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
