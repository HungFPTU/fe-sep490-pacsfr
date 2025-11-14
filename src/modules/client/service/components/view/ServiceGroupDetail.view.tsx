'use client';

import React, { useMemo } from 'react';
import { useServiceGroup } from '@/modules/client/services-group';
import { useServiceList } from '../../hooks';
import { ServiceList } from '../display/list/ServiceList.ui';
import { ServiceType, DEFAULT_PAGE, DEFAULT_PAGE_SIZE_LARGE } from '../../constants';
import { getServiceGroupIcon } from '../../utils/icon-mapper';
import Link from 'next/link';

interface ServiceGroupDetailViewProps {
    serviceGroupId: string;
}

export const ServiceGroupDetailView: React.FC<ServiceGroupDetailViewProps> = ({
    serviceGroupId,
}) => {
    // Fetch service group detail
    const { data: serviceGroupData, isLoading: isServiceGroupLoading } = useServiceGroup(serviceGroupId);

    // Fetch services for this service group
    const servicesFilters = useMemo(
        () => ({
            serviceGroupId,
            isActive: true,
            page: DEFAULT_PAGE,
            size: DEFAULT_PAGE_SIZE_LARGE,
        }),
        [serviceGroupId]
    );

    const { data: servicesData, isLoading: isServicesLoading } = useServiceList(servicesFilters);

    // Process data
    const serviceGroup = serviceGroupData?.data || null;
    const servicesPageResult = servicesData ? servicesData : null;
    const services = servicesPageResult?.items || [];

    if (isServiceGroupLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />
                </div>
            </div>
        );
    }

    if (!serviceGroup) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy nhóm dịch vụ</h2>
                    <p className="text-gray-600 mb-6">Nhóm dịch vụ bạn đang tìm kiếm không tồn tại.</p>
                    <Link
                        href="/"
                        className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Về trang chủ
                    </Link>
                </div>
            </div>
        );
    }

    const IconComponent = getServiceGroupIcon(serviceGroup.groupName, ServiceType.CITIZEN);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Service Group Header */}
            <div className="relative mb-8 rounded-xl bg-linear-to-r from-orange-50 via-orange-50 to-white p-8 shadow-lg overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                        <path
                            d="M50,100 Q100,50 150,100 T250,100"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                    </svg>
                </div>

                <div className="relative flex items-start gap-6">
                    {/* Icon */}
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-orange-600 text-white shadow-lg">
                        <IconComponent className="h-10 w-10" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{serviceGroup.groupName}</h1>
                        {serviceGroup.description && (
                            <p className="text-gray-700 text-lg mb-4">{serviceGroup.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Mã nhóm: {serviceGroup.groupCode}</span>
                            {services.length > 0 && (
                                <span>{services.length} dịch vụ</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Services List */}
            {isServicesLoading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />
                </div>
            ) : services.length > 0 ? (
                <ServiceList
                    services={services}
                    serviceType={ServiceType.CITIZEN}
                    isLoading={false}
                />
            ) : (
                <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-12 text-center text-gray-500">
                    <p className="text-lg font-medium mb-2">Chưa có dịch vụ nào</p>
                    <p className="text-sm">Nhóm dịch vụ này hiện chưa có dịch vụ nào được đăng tải.</p>
                </div>
            )}
        </div>
    );
};

