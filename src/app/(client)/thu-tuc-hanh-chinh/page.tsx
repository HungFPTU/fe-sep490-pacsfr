"use client";

import { GovernmentHeader } from "@/shared/components/home/GovernmentHeader.com";
import { ServiceFilters, ServiceList, useServices, useServiceFilters } from "@/modules/client/services";

export default function ServicesPage() {
    const breadcrumbItems = [
        { label: "Trang chủ", href: "/" },
        { label: "Dịch vụ hành chính" }
    ];

    const { filters, updateFilter, resetFilters } = useServiceFilters({
        size: 10,
    });

    const handleFiltersChange = (newFilters: typeof filters) => {
        Object.entries(newFilters).forEach(([key, value]) => {
            updateFilter(key as keyof typeof filters, value);
        });
    };

    const { data: response, isLoading, error } = useServices(filters);
    const services = response?.data?.items?.$values || [];
    const pagination = response?.data;

    return (
        <div className="min-h-screen bg-gray-50">
            <GovernmentHeader breadcrumbItems={breadcrumbItems} />

            <div className="container mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Dịch vụ hành chính
                    </h1>
                    <p className="text-lg text-gray-600">
                        Tìm kiếm và tra cứu các dịch vụ hành chính trực tuyến
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-8">
                    <ServiceFilters
                        filters={filters}
                        onFiltersChange={handleFiltersChange}
                        onReset={resetFilters}
                    />
                </div>

                {/* Results Summary */}
                {pagination && (
                    <div className="mb-6">
                        <p className="text-gray-600">
                            Hiển thị {services.length} trong tổng số {pagination.total} dịch vụ
                            {filters.keyword && (
                                <span> cho từ khóa &quot;<strong>{filters.keyword}</strong>&quot;</span>
                            )}
                        </p>
                    </div>
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
                    <div className="mt-8 flex justify-center">
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => updateFilter("page", filters.page - 1 as unknown as string)}
                                disabled={!pagination.hasPreviousPage}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                Trước
                            </button>

                            <span className="px-4 py-2 text-sm text-gray-700">
                                Trang {pagination.page} / {pagination.totalPages}
                            </span>

                            <button
                                onClick={() => updateFilter("page", filters.page + 1 as unknown as string)}
                                disabled={!pagination.hasNextPage}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                Sau
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
