'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import { getServiceIcon } from '../../../utils/icon-mapper';
import type { Service } from '../../../types';
import { ServiceType } from '../../../enums';

interface ServiceCardProps {
    service: Service;
    serviceType: ServiceType;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, serviceType }) => {
    const IconComponent = getServiceIcon(service.serviceName, serviceType);
    const isCitizen = serviceType === ServiceType.CITIZEN;

    return (
        <Link
            href={`/thu-tuc-hanh-chinh/${service.id}`}
            className="group flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-red-300 hover:shadow-md"
        >
            <div
                className={cn(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-colors',
                    isCitizen
                        ? 'bg-teal-100 group-hover:bg-teal-200'
                        : 'bg-red-100 group-hover:bg-red-200'
                )}
            >
                <IconComponent
                    className={cn(
                        'h-6 w-6',
                        isCitizen ? 'text-teal-600' : 'text-red-600'
                    )}
                />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                    {service.serviceName}
                </h3>
                {service.description && (
                    <p className="mt-1 text-xs text-gray-600 line-clamp-1">
                        {service.description}
                    </p>
                )}
            </div>
            <div className="shrink-0">
                <svg
                    className="h-5 w-5 text-gray-400 group-hover:text-red-600 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </Link>
    );
};

