'use client';

import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { formatDate } from '@/shared/lib/utils';
import { TableRow, TableCell } from '@/shared/components/manager/ui/table';
import { Button } from '@/shared/components/ui/button.ui';
import { Badge } from '@/shared/components/ui/badge.ui';
import type { NewsCategory } from '../../../types';

interface Props {
    newsCategory: NewsCategory;
    onView: (newsCategory: NewsCategory) => void;
    onEdit: (newsCategory: NewsCategory) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const NewsCategoryTableRow: React.FC<Props> = ({
    newsCategory,
    onView,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    const renderDate = (): string => {
        if (newsCategory.modifiedAt) {
            return formatDate(newsCategory.modifiedAt);
        }
        if (newsCategory.createdAt) {
            return formatDate(newsCategory.createdAt);
        }
        return '-';
    };

    return (
        <TableRow>
            {/* Code */}
            <TableCell className="font-medium">
                {newsCategory.categoryCode}
            </TableCell>

            {/* Name */}
            <TableCell>{newsCategory.categoryName}</TableCell>

            {/* Description */}
            <TableCell className="text-muted-foreground max-w-md truncate">
                {newsCategory.categoryDescription || '-'}
            </TableCell>

            {/* Status Badge */}
            <TableCell>
                <Badge variant={newsCategory.isActive ? 'outline' : 'secondary'}>
                    {newsCategory.isActive ? 'Hoạt động' : 'Ngừng'}
                </Badge>
            </TableCell>

            {/* Date Cell */}
            <TableCell className="text-muted-foreground">
                {renderDate()}
            </TableCell>

            {/* Actions */}
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onView(newsCategory)}
                        title="Xem chi tiết"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(newsCategory)}
                        title="Chỉnh sửa"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(newsCategory.id)}
                        disabled={isDeleting}
                        title="Xóa"
                        className="text-destructive hover:text-destructive"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
};

