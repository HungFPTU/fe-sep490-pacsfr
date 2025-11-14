'use client';

import React from 'react';
import Image from 'next/image';
import { useServiceGroup } from '@/modules/manager/service-group/hooks';
import { getOne } from '@/types/rest';
import type { ServiceGroup } from '@/modules/manager/service-group/types';

interface Props {
    serviceGroupId: string;
}

export const ServiceGroupDetail: React.FC<Props> = ({ serviceGroupId }) => {
    const { data: serviceGroupData, isLoading } = useServiceGroup(serviceGroupId);

    if (isLoading) {
        return (
            <div className="animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-32"></div>
            </div>
        );
    }

    if (!serviceGroupData) {
        return <p className="text-sm text-slate-500">-</p>;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const serviceGroup = getOne<ServiceGroup>(serviceGroupData as any);

    if (!serviceGroup) {
        return <p className="text-sm text-slate-500">-</p>;
    }

    return (
        <div className="flex items-center gap-3">
            {serviceGroup.iconUrl && (
                <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200">
                    <Image
                        src={serviceGroup.iconUrl}
                        alt={serviceGroup.groupName}
                        width={40}
                        height={40}
                        className="object-cover"
                    />
                </div>
            )}
            <div>
                <p className="text-sm font-medium text-slate-900">
                    {serviceGroup.groupName}
                </p>
                {serviceGroup.description && (
                    <p className="text-xs text-slate-500">
                        {serviceGroup.description.length > 50
                            ? `${serviceGroup.description.substring(0, 50)}...`
                            : serviceGroup.description}
                    </p>
                )}
            </div>
        </div>
    );
};

