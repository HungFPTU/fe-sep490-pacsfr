'use client';

import React from 'react';
import { ServiceGroupCard } from '../card/ServiceGroupCard.ui';
import type { ServiceGroupWithType } from '../../../types/service-group';
import { ServiceType } from '../../../enums';

interface ServiceGroupListProps {
    serviceGroups: ServiceGroupWithType[];
    serviceType: ServiceType;
    isLoading?: boolean;
}

export const ServiceGroupList: React.FC<ServiceGroupListProps> = ({
    serviceGroups,
    serviceType,
    isLoading = false,
}) => {
    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-20 animate-pulse rounded-lg border border-gray-200 bg-gray-100" />
                ))}
            </div>
        );
    }

    if (serviceGroups.length === 0) {
        return (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
                Không tìm thấy nhóm dịch vụ nào cho loại này.
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2">
            {serviceGroups.map((serviceGroup) => (
                <ServiceGroupCard
                    key={serviceGroup.id}
                    serviceGroup={serviceGroup}
                    serviceType={serviceType}
                />
            ))}
        </div>
    );
};

