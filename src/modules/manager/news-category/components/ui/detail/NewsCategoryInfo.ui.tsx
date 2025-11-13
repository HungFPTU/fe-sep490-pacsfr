'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import { Badge } from '@/shared/components/ui/badge.ui';
import type { NewsCategory } from '../../../types';

interface Props {
    newsCategory: NewsCategory;
}

export const NewsCategoryInfo: React.FC<Props> = ({ newsCategory }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Category Code */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Mã danh mục
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{newsCategory.categoryCode}</p>
            </div>

            {/* Category Name */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Tên danh mục
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{newsCategory.categoryName}</p>
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Trạng thái
                </label>
                <div className="mt-1">
                    <Badge variant={newsCategory.isActive ? 'outline' : 'secondary'}>
                        {newsCategory.isActive ? 'Hoạt động' : 'Ngừng'}
                    </Badge>
                </div>
            </div>

            {/* Created At */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Ngày tạo
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                    {newsCategory.createdAt ? formatDate(newsCategory.createdAt) : '-'}
                </p>
            </div>

            {/* Modified At */}
            {newsCategory.modifiedAt && (
                <div>
                    <label className="block text-sm font-medium text-foreground">
                        Cập nhật lần cuối
                    </label>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {formatDate(newsCategory.modifiedAt)}
                    </p>
                </div>
            )}

            {/* Category Description */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground">
                    Mô tả
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{newsCategory.categoryDescription || '-'}</p>
            </div>
        </div>
    );
};

