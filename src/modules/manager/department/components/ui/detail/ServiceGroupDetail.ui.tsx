'use client';

import React from 'react';
import { useServiceGroup } from '@/modules/manager/service-group/hooks';
import { getOne } from '@/types/rest';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar.ui';
import type { ServiceGroup } from '@/modules/manager/service-group/types';

interface Props {
    serviceGroupId: string;
}

export const ServiceGroupDetail: React.FC<Props> = ({ serviceGroupId }) => {
    const { data: serviceGroupData, isLoading } = useServiceGroup(serviceGroupId);

    if (isLoading) {
        return (
            <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-32"></div>
            </div>
        );
    }

    if (!serviceGroupData) {
        return <p className="text-sm text-muted-foreground">-</p>;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const serviceGroup = getOne<ServiceGroup>(serviceGroupData as any);

    if (!serviceGroup) {
        return <p className="text-sm text-muted-foreground">-</p>;
    }

    const getAvatarFallback = (name: string, code?: string) =>
        (name?.trim()?.[0]?.toUpperCase() ?? code?.[0]?.toUpperCase() ?? '?') +
        (name?.trim()?.split(' ')[1]?.[0]?.toUpperCase() ?? code?.[1]?.toUpperCase() ?? '');

    return (
        <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 rounded-lg">
                {serviceGroup.iconUrl && (
                    <AvatarImage src={serviceGroup.iconUrl} alt={serviceGroup.groupName} />
                )}
                <AvatarFallback className="bg-muted text-xs text-muted-foreground">
                    {getAvatarFallback(serviceGroup.groupName, serviceGroup.groupCode)}
                </AvatarFallback>
            </Avatar>
            <div>
                <p className="text-sm font-medium text-foreground">
                    {serviceGroup.groupName}
                </p>
                {serviceGroup.description && (
                    <p className="text-xs text-muted-foreground">
                        {serviceGroup.description.length > 50
                            ? `${serviceGroup.description.substring(0, 50)}...`
                            : serviceGroup.description}
                    </p>
                )}
            </div>
        </div>
    );
};

