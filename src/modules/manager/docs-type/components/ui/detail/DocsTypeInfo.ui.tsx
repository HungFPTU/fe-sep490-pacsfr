'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import type { DocsType } from '../../../types';

interface Props {
    docsType: DocsType;
}

export const DocsTypeInfo: React.FC<Props> = ({ docsType }) => {
    const formatFileSize = (mb: number): string => {
        return `${mb} MB`;
    };

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Doc Type Code */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Mã loại văn bản
                </label>
                <p className="mt-1 text-sm text-slate-900">{docsType.docTypeCode}</p>
            </div>

            {/* Doc Type Name */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Tên loại văn bản
                </label>
                <p className="mt-1 text-sm text-slate-900">{docsType.docTypeName}</p>
            </div>

            {/* Group Name */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Nhóm hồ sơ
                </label>
                <p className="mt-1 text-sm text-slate-900">{docsType.groupName || '-'}</p>
            </div>

            {/* File Format */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Định dạng file
                </label>
                <span className="mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800">
                    {docsType.fileFormat}
                </span>
            </div>

            {/* Max File Size */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Kích thước file tối đa
                </label>
                <p className="mt-1 text-sm text-slate-900">{formatFileSize(docsType.maxFileSize)}</p>
            </div>

            {/* Is Required */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Bắt buộc
                </label>
                <span
                    className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${docsType.isRequired
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                >
                    {docsType.isRequired ? 'Bắt buộc' : 'Không bắt buộc'}
                </span>
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Trạng thái
                </label>
                <span
                    className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${docsType.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                >
                    {docsType.isActive ? 'Hoạt động' : 'Ngừng hoạt động'}
                </span>
            </div>

            {/* Created At */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Ngày tạo
                </label>
                <p className="mt-1 text-sm text-slate-900">
                    {formatDate(docsType.createdAt)}
                </p>
            </div>

            {/* Modified At */}
            {docsType.modifiedAt && (
                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Cập nhật lần cuối
                    </label>
                    <p className="mt-1 text-sm text-slate-900">
                        {formatDate(docsType.modifiedAt)}
                    </p>
                </div>
            )}

            {/* Description */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">
                    Mô tả
                </label>
                <p className="mt-1 text-sm text-slate-900">{docsType.description || '-'}</p>
            </div>
        </div>
    );
};

