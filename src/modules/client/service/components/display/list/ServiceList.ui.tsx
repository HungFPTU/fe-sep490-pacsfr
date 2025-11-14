'use client';

import React from 'react';
import { ServiceCard } from '../card/ServiceCard.ui';
import type { Service } from '../../../types';
import { ServiceType } from '../../../enums';

interface ServiceListProps {
    services: Service[];
    serviceType: ServiceType;
    isLoading?: boolean;
}

export const ServiceList: React.FC<ServiceListProps> = ({
    services,
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

    if (services.length === 0) {
        return (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
                Không tìm thấy dịch vụ nào cho loại này.
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
                <ServiceCard key={service.id} service={service} serviceType={serviceType} />
            ))}
        </div>
    );
};

