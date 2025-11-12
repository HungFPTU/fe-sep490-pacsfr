'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import { Badge } from '@/shared/components/ui/badge.ui';
import type { FaqCategory } from '../../../types';

interface Props {
    faqCategory: FaqCategory;
}

export const FaqCategoryInfo: React.FC<Props> = ({ faqCategory }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Category Code */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Mã danh mục
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{faqCategory.categoryCode}</p>
            </div>

            {/* Category Name */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Tên danh mục
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{faqCategory.categoryName}</p>
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Trạng thái
                </label>
                <div className="mt-1">
                    <Badge variant={faqCategory.isActive ? 'outline' : 'secondary'}>
                        {faqCategory.isActive ? 'Hoạt động' : 'Ngừng'}
                    </Badge>
                </div>
            </div>

            {/* Created At */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Ngày tạo
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                    {faqCategory.createdAt ? formatDate(faqCategory.createdAt) : '-'}
                </p>
            </div>

            {/* Modified At */}
            {faqCategory.modifiedAt && (
                <div>
                    <label className="block text-sm font-medium text-foreground">
                        Cập nhật lần cuối
                    </label>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {formatDate(faqCategory.modifiedAt)}
                    </p>
                </div>
            )}

            {/* Description */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground">
                    Mô tả
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{faqCategory.description || '-'}</p>
            </div>
        </div>
    );
};

