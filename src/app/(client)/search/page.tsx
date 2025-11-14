"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useServices, useServiceFilters } from "@/modules/client/services/hooks/useServices";
import { ServicesListView } from "@/modules/client/services/components/view/list/ServicesListView.view";
import { ServicePagination } from "@/modules/client/services/components/ui/pagination/ServicePagination.ui";
import type { ServiceFilters as ServiceFiltersType } from "@/modules/client/services/types/req";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const { filters, updateFilter } = useServiceFilters();

    // Read serviceGroupId from URL on mount
    const serviceGroupIdFromUrl = searchParams.get('serviceGroupId');

    // Initialize activeFilters with serviceGroupId from URL if present
    const [activeFilters, setActiveFilters] = useState<ServiceFiltersType>(() => {
        if (serviceGroupIdFromUrl) {
            return {
                ...filters,
                serviceGroupId: serviceGroupIdFromUrl,
                page: 1,
            };
        }
        return filters;
    });

    // Sync filters with URL serviceGroupId
    useEffect(() => {
        if (serviceGroupIdFromUrl) {
            // Update filter state
            updateFilter('serviceGroupId', serviceGroupIdFromUrl);
            // Update active filters to trigger API call
            setActiveFilters((prev) => ({
                ...prev,
                serviceGroupId: serviceGroupIdFromUrl,
                page: 1,
            }));
        }
    }, [serviceGroupIdFromUrl, updateFilter]); // Re-run when URL param changes

    const { data: servicesResponse } = useServices(activeFilters);

    const handlePageChange = (page: number) => {
        setActiveFilters(prev => ({ ...prev, page }));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-7xl mx-auto">
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