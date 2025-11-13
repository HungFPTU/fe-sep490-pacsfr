'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import { Badge } from '@/shared/components/ui/badge.ui';
import type { ServiceGroup } from '../../../types';

interface Props {
    serviceGroup: ServiceGroup;
}

export const ServiceGroupInfo: React.FC<Props> = ({ serviceGroup }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Group Code */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Mã nhóm
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{serviceGroup.groupCode}</p>
            </div>

            {/* Group Name */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Tên nhóm
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{serviceGroup.groupName}</p>
            </div>

            {/* Display Order */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Thứ tự hiển thị
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{serviceGroup.displayOrder}</p>
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Trạng thái
                </label>
                <div className="mt-1">
                    <Badge variant={serviceGroup.isActive ? 'outline' : 'secondary'}>
                        {serviceGroup.isActive ? 'Hoạt động' : 'Ngừng hoạt động'}
                    </Badge>
                </div>
            </div>

            {/* Created At */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Ngày tạo
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                    {formatDate(serviceGroup.createdAt)}
                </p>
            </div>

            {/* Modified At */}
            {serviceGroup.modifiedAt && (
                <div>
                    <label className="block text-sm font-medium text-foreground">
                        Cập nhật lần cuối
                    </label>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {formatDate(serviceGroup.modifiedAt)}
                    </p>
                </div>
            )}

            {/* Description */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground">
                    Mô tả
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{serviceGroup.description || '-'}</p>
            </div>
        </div>
    );
};

