'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
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
                <label className="block text-sm font-medium text-slate-700">
                    Mã cơ quan
                </label>
                <p className="mt-1 text-sm text-slate-900">{orgUnit.unitCode}</p>
            </div>

            {/* Unit Name */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Tên cơ quan
                </label>
                <p className="mt-1 text-sm text-slate-900">{orgUnit.unitName}</p>
            </div>

            {/* Department - Fetch full details */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phòng ban
                </label>
                {orgUnit.departmentId ? (
                    <DepartmentDetail departmentId={orgUnit.departmentId} />
                ) : (
                    <p className="text-sm text-slate-500">-</p>
                )}
            </div>

            {/* Unit Type */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Loại hình
                </label>
                <p className="mt-1 text-sm text-slate-900">{orgUnit.unitType}</p>
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Trạng thái
                </label>
                <span
                    className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${orgUnit.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}
                >
                    {orgUnit.isActive ? 'Hoạt động' : 'Ngừng hoạt động'}
                </span>
            </div>

            {/* Phone */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Số điện thoại
                </label>
                <p className="mt-1 text-sm text-slate-900">{orgUnit.phone}</p>
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Email
                </label>
                <p className="mt-1 text-sm text-slate-900">{orgUnit.email}</p>
            </div>

            {/* Created At */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Ngày tạo
                </label>
                <p className="mt-1 text-sm text-slate-900">
                    {formatDate(orgUnit.createdAt)}
                </p>
            </div>

            {/* Modified At */}
            {orgUnit.modifiedAt && (
                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Cập nhật lần cuối
                    </label>
                    <p className="mt-1 text-sm text-slate-900">
                        {formatDate(orgUnit.modifiedAt)}
                    </p>
                </div>
            )}

            {/* Address */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">
                    Địa chỉ
                </label>
                <p className="mt-1 text-sm text-slate-900">{orgUnit.address}</p>
            </div>
        </div>
    );
};

