'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { ServiceGroupIcon } from './ServiceGroupIcon.ui';
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
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                >
                    Đóng
                </button>
            }
        >
            <div className="space-y-6">
                <ServiceGroupIcon
                    iconUrl={serviceGroup.iconUrl}
                    groupName={serviceGroup.groupName}
                    groupCode={serviceGroup.groupCode}
                />
                <ServiceGroupInfo serviceGroup={serviceGroup} />
            </div>
        </BaseModal>
    );
};

