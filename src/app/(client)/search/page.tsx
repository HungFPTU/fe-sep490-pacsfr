"use client";

import { useServices, useServiceFilters } from "@/modules/client/services/hooks/useServices";
import { ServiceFilters } from "@/modules/client/services/components/ui/filter/ServiceFilters.ui";
import { ServicesListView } from "@/modules/client/services/components/view/list/ServicesListView.view";
import { ServicePagination } from "@/modules/client/services/components/ui/pagination/ServicePagination.ui";

export default function SearchPage() {
    const { filters, updateFilter, resetFilters, setPage } = useServiceFilters();
    const { data: servicesResponse } = useServices(filters);

    const handleFiltersChange = (newFilters: typeof filters) => {
        Object.entries(newFilters).forEach(([key, value]) => {
            updateFilter(key as keyof typeof filters, value);
        });
    };

    const handleReset = () => {
        resetFilters();
    };

    const handlePageChange = (page: number) => {
        setPage(page);
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
                        onFiltersChange={handleFiltersChange}
                        onReset={handleReset}
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
                                    value={filters.size}
                                    onChange={(e) => updateFilter("size", parseInt(e.target.value) as unknown as string | boolean | null)}
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