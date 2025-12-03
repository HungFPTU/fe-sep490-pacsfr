'use client';

import React from 'react';
import Image from 'next/image';
import { Layers } from 'lucide-react';
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

    const serviceGroup = serviceGroupData as ServiceGroup;

    if (!serviceGroup) {
        return <p className="text-sm text-slate-500">-</p>;
    }

    return (
        <div className="flex items-center gap-3">
            {/* <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-slate-50 flex items-center justify-center">
                {serviceGroup.iconUrl ? (
                    <Image
                        src={serviceGroup.iconUrl}
                        alt={serviceGroup.groupCode}
                        width={40}
                        height={40}
                        className="object-cover"
                    />
                ) : (
                    <Layers className="h-5 w-5 text-slate-400" />
                )}
            </div> */}
            <div>
                <p className="text-sm font-medium text-slate-900">
                    {serviceGroup.groupName}
                </p>
                <p className="text-xs text-slate-500 font-mono">
                    {serviceGroup.groupCode}
                </p>
                {serviceGroup.description && (
                    <p className="text-xs text-slate-500 mt-0.5">
                        {serviceGroup.description.length > 50
                            ? `${serviceGroup.description.substring(0, 50)}...`
                            : serviceGroup.description}
                    </p>
                )}
            </div>
        </div>
    );
};

