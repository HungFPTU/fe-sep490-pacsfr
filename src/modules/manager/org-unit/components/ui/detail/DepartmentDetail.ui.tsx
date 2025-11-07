'use client';

import React from 'react';
import { useDepartmentDetail } from '@/modules/manager/department/hooks';
import { getOne } from '@/types/rest';
import { Badge } from '@/shared/components/ui/badge.ui';
import type { Department } from '@/modules/manager/department/types';

interface Props {
    departmentId: string;
}

export const DepartmentDetail: React.FC<Props> = ({ departmentId }) => {
    const { data: departmentData, isLoading } = useDepartmentDetail(departmentId);

    if (isLoading) {
        return (
            <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-32"></div>
            </div>
        );
    }

    if (!departmentData) {
        return <p className="text-sm text-muted-foreground">-</p>;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const department = getOne<Department>(departmentData as any);

    if (!department) {
        return <p className="text-sm text-muted-foreground">-</p>;
    }

    return (
        <div className="rounded-lg border border-border bg-muted/50 p-4">
            <div className="space-y-3">
                {/* Department Info */}
                <div>
                    <p className="text-sm font-medium text-foreground">
                        {department.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Mã: {department.code}
                    </p>
                </div>

                {/* Description */}
                {department.description && (
                    <div>
                        <label className="block text-xs font-medium text-foreground">
                            Mô tả
                        </label>
                        <p className="mt-1 text-xs text-muted-foreground">
                            {department.description.length > 100
                                ? `${department.description.substring(0, 100)}...`
                                : department.description}
                        </p>
                    </div>
                )}

                {/* Level Order */}
                <div className="flex items-center gap-4">
                    <div>
                        <label className="block text-xs font-medium text-foreground">
                            Cấp độ
                        </label>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Cấp {department.levelOrder}
                        </p>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-foreground">
                            Trạng thái
                        </label>
                        <div className="mt-1">
                            <Badge variant={department.isActive ? 'outline' : 'secondary'}>
                                {department.isActive ? 'Hoạt động' : 'Ngừng'}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

