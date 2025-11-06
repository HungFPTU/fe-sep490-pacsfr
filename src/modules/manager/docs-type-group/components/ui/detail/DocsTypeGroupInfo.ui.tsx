'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import type { DocsTypeGroup } from '../../../types';

interface Props {
    docsTypeGroup: DocsTypeGroup;
}

export const DocsTypeGroupInfo: React.FC<Props> = ({ docsTypeGroup }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Group Code */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Mã nhóm hồ sơ
                </label>
                <p className="mt-1 text-sm text-slate-900">{docsTypeGroup.groupCode}</p>
            </div>

            {/* Group Name */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Tên nhóm hồ sơ
                </label>
                <p className="mt-1 text-sm text-slate-900">{docsTypeGroup.groupName}</p>
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Trạng thái
                </label>
                <span
                    className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${docsTypeGroup.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                >
                    {docsTypeGroup.isActive ? 'Hoạt động' : 'Ngừng hoạt động'}
                </span>
            </div>

            {/* Created At */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Ngày tạo
                </label>
                <p className="mt-1 text-sm text-slate-900">
                    {formatDate(docsTypeGroup.createdAt)}
                </p>
            </div>

            {/* Modified At */}
            {docsTypeGroup.modifiedAt && (
                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Cập nhật lần cuối
                    </label>
                    <p className="mt-1 text-sm text-slate-900">
                        {formatDate(docsTypeGroup.modifiedAt)}
                    </p>
                </div>
            )}

            {/* Description */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">
                    Mô tả
                </label>
                <p className="mt-1 text-sm text-slate-900">{docsTypeGroup.description || '-'}</p>
            </div>
        </div>
    );
};

