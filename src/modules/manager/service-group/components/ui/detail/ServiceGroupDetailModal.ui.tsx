'use client';

import React from 'react';
import { Briefcase } from 'lucide-react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { Button } from '@/shared/components/ui/button.ui';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar.ui';
import { ServiceGroupInfo } from './ServiceGroupInfo.ui';
import type { ServiceGroup } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    serviceGroup: ServiceGroup | null;
}

export const ServiceGroupDetailModal: React.FC<Props> = ({
    open,
    onClose,
    serviceGroup,
}) => {
    if (!serviceGroup) return null;

    const getAvatarFallback = (name: string, code?: string) =>
        (name?.trim()?.[0]?.toUpperCase() ?? code?.[0]?.toUpperCase() ?? '?') +
        (name?.trim()?.split(' ')[1]?.[0]?.toUpperCase() ?? code?.[1]?.toUpperCase() ?? '');

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={`Chi tiết nhóm dịch vụ: ${serviceGroup.groupName}`}
            onOk={onClose}
            okText="Đóng"
            centered
            size="large"
            footer={
                <Button
                    type="button"
                    onClick={onClose}
                    variant="default"
                >
                    Đóng
                </Button>
            }
        >
            <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-border pb-4">
                    <Avatar className="h-16 w-16 rounded-lg">
                        {serviceGroup.iconUrl && (
                            <AvatarImage src={serviceGroup.iconUrl} alt={serviceGroup.groupName} />
                        )}
                        <AvatarFallback className="bg-primary/10 text-primary">
                            {serviceGroup.iconUrl ? null : (
                                <>
                                    <Briefcase className="h-8 w-8" />
                                    <span className="sr-only">
                                        {getAvatarFallback(serviceGroup.groupName, serviceGroup.groupCode)}
                                    </span>
                                </>
                            )}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">
                            {serviceGroup.groupName}
                        </h3>
                        <p className="text-sm text-muted-foreground">Mã: {serviceGroup.groupCode}</p>
                    </div>
                </div>
                <ServiceGroupInfo serviceGroup={serviceGroup} />
            </div>
        </BaseModal>
    );
};

