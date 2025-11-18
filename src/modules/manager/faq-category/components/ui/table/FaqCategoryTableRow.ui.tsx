'use client';

import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { formatDate } from '@/shared/lib/utils';
import { TableRow, TableCell } from '@/shared/components/manager/ui/table';
import { Button } from '@/shared/components/ui/button.ui';
import { Badge } from '@/shared/components/ui/badge.ui';
import type { FaqCategory } from '../../../types';

interface Props {
    faqCategory: FaqCategory;
    onView: (faqCategory: FaqCategory) => void;
    onEdit: (faqCategory: FaqCategory) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const FaqCategoryTableRow: React.FC<Props> = ({
    faqCategory,
    onView,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    const renderDate = (): string => {
        if (faqCategory.modifiedAt) {
            return formatDate(faqCategory.modifiedAt);
        }
        if (faqCategory.createdAt) {
            return formatDate(faqCategory.createdAt);
        }
        return '-';
    };

    return (
        <TableRow>
            {/* Code */}
            <TableCell className="font-medium">
                {faqCategory.categoryCode}
            </TableCell>

            {/* Name */}
            <TableCell>{faqCategory.categoryName}</TableCell>

            {/* Description */}
            <TableCell className="text-muted-foreground max-w-md truncate">
                {faqCategory.description || '-'}
            </TableCell>

            {/* Status Badge */}
            <TableCell>
                <Badge variant={faqCategory.isActive ? 'outline' : 'secondary'}>
                    {faqCategory.isActive ? 'Hoạt động' : 'Ngừng'}
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
                        onClick={() => onView(faqCategory)}
                        title="Xem chi tiết"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(faqCategory)}
                        title="Chỉnh sửa"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(faqCategory.id)}
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

