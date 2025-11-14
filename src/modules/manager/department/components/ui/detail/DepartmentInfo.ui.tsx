'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import { ServiceGroupDetail } from './ServiceGroupDetail.ui';
import type { Department } from '../../../types';

interface Props {
    department: Department;
}

export const DepartmentInfo: React.FC<Props> = ({ department }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Code */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Mã phòng ban
                </label>
                <p className="mt-1 text-sm text-slate-900">{department.code}</p>
            </div>

            {/* Name */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Tên phòng ban
                </label>
                <p className="mt-1 text-sm text-slate-900">{department.name}</p>
            </div>

            {/* Service Group - Fetch full details */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nhóm dịch vụ
                </label>
                {department.serviceGroupId ? (
                    <ServiceGroupDetail serviceGroupId={department.serviceGroupId} />
                ) : (
                    <p className="text-sm text-slate-500">-</p>
                )}
            </div>

            {/* Level */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Cấp độ
                </label>
                <p className="mt-1 text-sm text-slate-900">Cấp {department.levelOrder}</p>
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Trạng thái
                </label>
                <span
                    className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${department.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}
                >
                    {department.isActive ? 'Hoạt động' : 'Ngừng hoạt động'}
                </span>
            </div>

            {/* Created At */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Ngày tạo
                </label>
                <p className="mt-1 text-sm text-slate-900">
                    {formatDate(department.createdAt)}
                </p>
            </div>

            {/* Modified At */}
            {department.modifiedAt && (
                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Cập nhật lần cuối
                    </label>
                    <p className="mt-1 text-sm text-slate-900">
                        {formatDate(department.modifiedAt)}
                    </p>
                </div>
            )}

            {/* Description */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">
                    Mô tả
                </label>
                <p className="mt-1 text-sm text-slate-900">{department.description || '-'}</p>
            </div>
        </div>
    );
};

