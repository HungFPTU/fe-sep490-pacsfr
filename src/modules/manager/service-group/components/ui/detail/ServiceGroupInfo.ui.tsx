'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import type { ServiceGroup } from '../../../types';

interface Props {
    serviceGroup: ServiceGroup;
}

export const ServiceGroupInfo: React.FC<Props> = ({ serviceGroup }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Group Code */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Mã nhóm
                </label>
                <p className="mt-1 text-sm text-slate-900">{serviceGroup.groupCode}</p>
            </div>

            {/* Group Name */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Tên nhóm
                </label>
                <p className="mt-1 text-sm text-slate-900">{serviceGroup.groupName}</p>
            </div>

            {/* Display Order */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Thứ tự hiển thị
                </label>
                <p className="mt-1 text-sm text-slate-900">{serviceGroup.displayOrder}</p>
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Trạng thái
                </label>
                <span
                    className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${serviceGroup.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                >
                    {serviceGroup.isActive ? 'Hoạt động' : 'Ngừng hoạt động'}
                </span>
            </div>

            {/* Created At */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Ngày tạo
                </label>
                <p className="mt-1 text-sm text-slate-900">
                    {formatDate(serviceGroup.createdAt)}
                </p>
            </div>

            {/* Modified At */}
            {serviceGroup.modifiedAt && (
                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Cập nhật lần cuối
                    </label>
                    <p className="mt-1 text-sm text-slate-900">
                        {formatDate(serviceGroup.modifiedAt)}
                    </p>
                </div>
            )}

            {/* Description */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">
                    Mô tả
                </label>
                <p className="mt-1 text-sm text-slate-900">{serviceGroup.description}</p>
            </div>
        </div>
    );
};

