'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import { Badge } from '@/shared/components/ui/badge.ui';
import type { DocsTypeGroup } from '../../../types';

interface Props {
    docsTypeGroup: DocsTypeGroup;
}

export const DocsTypeGroupInfo: React.FC<Props> = ({ docsTypeGroup }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Group Code */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Mã nhóm hồ sơ
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{docsTypeGroup.groupCode}</p>
            </div>

            {/* Group Name */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Tên nhóm hồ sơ
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{docsTypeGroup.groupName}</p>
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Trạng thái
                </label>
                <div className="mt-1">
                    <Badge variant={docsTypeGroup.isActive ? 'outline' : 'secondary'}>
                        {docsTypeGroup.isActive ? 'Hoạt động' : 'Ngừng hoạt động'}
                    </Badge>
                </div>
            </div>

            {/* Created At */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Ngày tạo
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                    {formatDate(docsTypeGroup.createdAt)}
                </p>
            </div>

            {/* Modified At */}
            {docsTypeGroup.modifiedAt && (
                <div>
                    <label className="block text-sm font-medium text-foreground">
                        Cập nhật lần cuối
                    </label>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {formatDate(docsTypeGroup.modifiedAt)}
                    </p>
                </div>
            )}

            {/* Description */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground">
                    Mô tả
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{docsTypeGroup.description || '-'}</p>
            </div>
        </div>
    );
};

