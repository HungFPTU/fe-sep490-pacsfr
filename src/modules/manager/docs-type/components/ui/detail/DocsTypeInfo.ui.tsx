'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import { Badge } from '@/shared/components/ui/badge.ui';
import type { DocsType } from '../../../types';

interface Props {
    docsType: DocsType;
}

const formatFileSize = (mb: number): string => `${mb} MB`;

export const DocsTypeInfo: React.FC<Props> = ({ docsType }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Doc Type Code */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Mã loại văn bản
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{docsType.docTypeCode}</p>
            </div>

            {/* Doc Type Name */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Tên loại văn bản
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{docsType.docTypeName}</p>
            </div>

            {/* Group Name */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Nhóm hồ sơ
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{docsType.groupName || '-'}</p>
            </div>

            {/* File Format */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Định dạng file
                </label>
                <div className="mt-1">
                    <Badge variant="outline">{docsType.fileFormat}</Badge>
                </div>
            </div>

            {/* Max File Size */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Kích thước file tối đa
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{formatFileSize(docsType.maxFileSize)}</p>
            </div>

            {/* Is Required */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Bắt buộc
                </label>
                <div className="mt-1">
                    <Badge variant={docsType.isRequired ? 'outline' : 'secondary'}>
                        {docsType.isRequired ? 'Bắt buộc' : 'Không bắt buộc'}
                    </Badge>
                </div>
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Trạng thái
                </label>
                <div className="mt-1">
                    <Badge variant={docsType.isActive ? 'outline' : 'secondary'}>
                        {docsType.isActive ? 'Hoạt động' : 'Ngừng'}
                    </Badge>
                </div>
            </div>

            {/* Created At */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Ngày tạo
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                    {formatDate(docsType.createdAt)}
                </p>
            </div>

            {/* Modified At */}
            {docsType.modifiedAt && (
                <div>
                    <label className="block text-sm font-medium text-foreground">
                        Cập nhật lần cuối
                    </label>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {formatDate(docsType.modifiedAt)}
                    </p>
                </div>
            )}

            {/* Description */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground">
                    Mô tả
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{docsType.description || '-'}</p>
            </div>
        </div>
    );
};
