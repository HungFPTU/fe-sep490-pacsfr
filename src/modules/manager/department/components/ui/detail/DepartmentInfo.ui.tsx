'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import { ServiceGroupDetail } from './ServiceGroupDetail.ui';
import type { Department } from '../../../types';
import { Badge } from '@/shared/components/ui/badge.ui';

interface Props {
    department: Department;
}

export const DepartmentInfo: React.FC<Props> = ({ department }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Code */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Mã phòng ban
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{department.code}</p>
            </div>

            {/* Name */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Tên phòng ban
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{department.name}</p>
            </div>

            {/* Service Group - Fetch full details */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                    Nhóm dịch vụ
                </label>
                {department.serviceGroupName ? (
                    <ServiceGroupDetail serviceGroupId={department.serviceGroupId} />
                ) : (
                    <p className="text-sm text-muted-foreground">-</p>
                )}
            </div>

            {/* Level */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Cấp độ
                </label>
                <p className="mt-1 text-sm text-muted-foreground">Cấp {department.levelOrder}</p>
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Trạng thái
                </label>
                <div className="mt-1">
                    <Badge variant={department.isActive ? 'outline' : 'secondary'}>
                        {department.isActive ? 'Hoạt động' : 'Ngừng'}
                    </Badge>
                </div>
            </div>

            {/* Created At */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Ngày tạo
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                    {formatDate(department.createdAt)}
                </p>
            </div>

            {/* Modified At */}
            {department.modifiedAt && (
                <div>
                    <label className="block text-sm font-medium text-foreground">
                        Cập nhật lần cuối
                    </label>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {formatDate(department.modifiedAt)}
                    </p>
                </div>
            )}

            {/* Description */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground">
                    Mô tả
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{department.description || '-'}</p>
            </div>
        </div>
    );
};

