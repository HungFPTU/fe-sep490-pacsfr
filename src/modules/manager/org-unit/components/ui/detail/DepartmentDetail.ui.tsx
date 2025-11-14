'use client';

import React from 'react';
import { useDepartmentDetail } from '@/modules/manager/department/hooks';
import { getOne } from '@/types/rest';
import type { Department } from '@/modules/manager/department/types';

interface Props {
    departmentId: string;
}

export const DepartmentDetail: React.FC<Props> = ({ departmentId }) => {
    const { data: departmentData, isLoading } = useDepartmentDetail(departmentId);

    if (isLoading) {
        return (
            <div className="animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-32"></div>
            </div>
        );
    }

    if (!departmentData) {
        return <p className="text-sm text-slate-500">-</p>;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const department = getOne<Department>(departmentData as any);

    if (!department) {
        return <p className="text-sm text-slate-500">-</p>;
    }

    return (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="space-y-3">
                {/* Department Info */}
                <div>
                    <p className="text-sm font-medium text-slate-900">
                        {department.name}
                    </p>
                    <p className="text-xs text-slate-500">
                        Mã: {department.code}
                    </p>
                </div>

                {/* Description */}
                {department.description && (
                    <div>
                        <label className="block text-xs font-medium text-slate-600">
                            Mô tả
                        </label>
                        <p className="mt-1 text-xs text-slate-700">
                            {department.description.length > 100
                                ? `${department.description.substring(0, 100)}...`
                                : department.description}
                        </p>
                    </div>
                )}

                {/* Level Order */}
                <div className="flex items-center gap-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-600">
                            Cấp độ
                        </label>
                        <p className="mt-1 text-xs text-slate-700">
                            Cấp {department.levelOrder}
                        </p>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-600">
                            Trạng thái
                        </label>
                        <span
                            className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${department.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                                }`}
                        >
                            {department.isActive ? 'Hoạt động' : 'Ngừng'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

