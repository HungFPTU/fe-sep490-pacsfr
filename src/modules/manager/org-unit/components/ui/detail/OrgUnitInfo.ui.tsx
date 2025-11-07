'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import { Badge } from '@/shared/components/ui/badge.ui';
import { DepartmentDetail } from './DepartmentDetail.ui';
import type { OrgUnit } from '../../../types';

interface Props {
    orgUnit: OrgUnit;
}

export const OrgUnitInfo: React.FC<Props> = ({ orgUnit }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Unit Code */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Mã cơ quan
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{orgUnit.unitCode}</p>
            </div>

            {/* Unit Name */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Tên cơ quan
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{orgUnit.unitName}</p>
            </div>

            {/* Department - Fetch full details */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                    Phòng ban
                </label>
                {orgUnit.departmentId ? (
                    <DepartmentDetail departmentId={orgUnit.departmentId} />
                ) : (
                    <p className="text-sm text-muted-foreground">-</p>
                )}
            </div>

            {/* Unit Type */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Loại hình
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{orgUnit.unitType}</p>
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Trạng thái
                </label>
                <div className="mt-1">
                    <Badge variant={orgUnit.isActive ? 'outline' : 'secondary'}>
                        {orgUnit.isActive ? 'Hoạt động' : 'Ngừng hoạt động'}
                    </Badge>
                </div>
            </div>

            {/* Phone */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Số điện thoại
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{orgUnit.phone}</p>
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Email
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{orgUnit.email}</p>
            </div>

            {/* Created At */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Ngày tạo
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                    {formatDate(orgUnit.createdAt)}
                </p>
            </div>

            {/* Modified At */}
            {orgUnit.modifiedAt && (
                <div>
                    <label className="block text-sm font-medium text-foreground">
                        Cập nhật lần cuối
                    </label>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {formatDate(orgUnit.modifiedAt)}
                    </p>
                </div>
            )}

            {/* Address */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground">
                    Địa chỉ
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{orgUnit.address}</p>
            </div>
        </div>
    );
};

