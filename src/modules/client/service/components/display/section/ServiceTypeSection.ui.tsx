'use client';

import React from 'react';
import { ServiceList } from '../list/ServiceList.ui';
import { ServiceGroupList } from '../list/ServiceGroupList.ui';
import type { Service } from '../../../types';
import type { ServiceGroupWithType } from '../../../types/service-group';
import { ServiceType } from '../../../enums';

interface ServiceTypeSectionProps {
    title: string;
    serviceType: ServiceType;
    services?: Service[];
    serviceGroups?: ServiceGroupWithType[];
    isLoading?: boolean;
    displayMode?: 'services' | 'groups';
}

export const ServiceTypeSection: React.FC<ServiceTypeSectionProps> = ({
    title,
    serviceType,
    services = [],
    serviceGroups = [],
    isLoading = false,
    displayMode = 'groups',
}) => {
    const isCitizen = serviceType === ServiceType.CITIZEN;
    
    return (
        <div className="flex-1">
            <div className="mb-6">
                <h3
                    className="text-xl font-bold"
                    style={{ color: '#d97706' }} // Orange-brown color
                >
                    {title}
                </h3>
                <div
                    className="mt-2 h-1 rounded"
                    style={{ backgroundColor: '#d97706', width: '60px' }}
                />
            </div>
            
            {displayMode === 'groups' ? (
                <ServiceGroupList
                    serviceGroups={serviceGroups}
                    serviceType={serviceType}
                    isLoading={isLoading}
                />
            ) : (
                <ServiceList
                    services={services}
                    serviceType={serviceType}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
};

