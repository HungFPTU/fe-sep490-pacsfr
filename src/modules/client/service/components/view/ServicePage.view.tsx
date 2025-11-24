'use client';

import React, { useState, useMemo } from 'react';
import { useServiceList } from '../../hooks';
import { useServiceGroups } from '@/modules/client/services-group';
import { ServiceTypeFilter } from '../form';
import { ServiceTypeSection } from '../display';
import { ServiceType, DEFAULT_PAGE, DEFAULT_PAGE_SIZE_LARGE } from '../../constants';
import { classifyServiceGroups, filterServiceGroupsByType } from '../../utils/service-group-mapper';
import { getValuesPage } from '@/types/rest';

export const ServicePageView: React.FC = () => {
    const [selectedType, setSelectedType] = useState<ServiceType | null>(null);

    // Filters for API calls - Get all active services and service groups
    const allServicesFilters = useMemo(
        () => ({
            isActive: true,
            page: DEFAULT_PAGE,
            size: DEFAULT_PAGE_SIZE_LARGE,
        }),
        []
    );

    // Data fetching
    const { data: allServicesData, isLoading: isAllServicesLoading } = useServiceList(allServicesFilters);
    const { data: serviceGroupsData, isLoading: isServiceGroupsLoading } = useServiceGroups();

    // Process service groups response
    const serviceGroupsPageResult = serviceGroupsData?.data
        ? getValuesPage({
              success: true,
              data: {
                  items: serviceGroupsData.data.items?.$values || [],
                  total: serviceGroupsData.data.total || 0,
                  page: serviceGroupsData.data.page || 1,
                  size: serviceGroupsData.data.size || 10,
                  totalPages: serviceGroupsData.data.totalPages || 1,
                  hasPreviousPage: serviceGroupsData.data.hasPreviousPage || false,
                  hasNextPage: serviceGroupsData.data.hasNextPage || false,
              },
          })
        : null;

    const rawServiceGroups = serviceGroupsPageResult?.items || [];

    // Process services
    const allServicesPageResult = allServicesData ? allServicesData : null;
    const allServices = allServicesPageResult?.items || [];

    // Classify service groups based on services
    const classifiedServiceGroups = useMemo(() => {
        return classifyServiceGroups(rawServiceGroups, allServices);
    }, [rawServiceGroups, allServices]);

    // Filter service groups by selected type
    const filteredServiceGroups = useMemo(() => {
        return filterServiceGroupsByType(classifiedServiceGroups, selectedType);
    }, [classifiedServiceGroups, selectedType]);

    // Split service groups into Citizen and Business
    const { citizenServiceGroups, businessServiceGroups } = useMemo(() => {
        const citizen = filteredServiceGroups.filter(
            (group) => group.serviceType === ServiceType.CITIZEN || group.serviceType === 'both'
        );
        const business = filteredServiceGroups.filter(
            (group) => group.serviceType === ServiceType.BUSINESS || group.serviceType === 'both'
        );
        return { citizenServiceGroups: citizen, businessServiceGroups: business };
    }, [filteredServiceGroups]);

    const isLoading = isAllServicesLoading || isServiceGroupsLoading;

    return (
        <section className="py-8 sm:py-12 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                        Dịch vụ công trực tuyến
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">
                        Chọn loại dịch vụ phù hợp với nhu cầu của bạn
                    </p>
                </div>

                {/* Type Filter */}
                <div className="mb-6 sm:mb-8">
                    <ServiceTypeFilter
                        selectedType={selectedType}
                        onTypeChange={setSelectedType}
                    />
                </div>

                {/* Service Groups Grid - 2 columns */}
                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
                    {/* Công dân Column */}
                    {(selectedType === null || selectedType === ServiceType.CITIZEN) && (
                        <ServiceTypeSection
                            title="CÔNG DÂN"
                            serviceType={ServiceType.CITIZEN}
                            serviceGroups={citizenServiceGroups}
                            isLoading={isLoading}
                            displayMode="groups"
                        />
                    )}

                    {/* Doanh nghiệp Column */}
                    {(selectedType === null || selectedType === ServiceType.BUSINESS) && (
                        <ServiceTypeSection
                            title="DOANH NGHIỆP"
                            serviceType={ServiceType.BUSINESS}
                            serviceGroups={businessServiceGroups}
                            isLoading={isLoading}
                            displayMode="groups"
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

