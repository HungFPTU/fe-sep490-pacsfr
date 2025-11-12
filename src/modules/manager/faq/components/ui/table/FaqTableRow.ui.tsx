'use client';

import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { formatDate } from '@/shared/lib/utils';
import { TableRow, TableCell } from '@/shared/components/manager/ui/table';
import { Button } from '@/shared/components/ui/button.ui';
import { Badge } from '@/shared/components/ui/badge.ui';
import type { Faq } from '../../../types';

interface Props {
    faq: Faq;
    onView: (faq: Faq) => void;
    onEdit: (faq: Faq) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const FaqTableRow: React.FC<Props> = ({
    faq,
    onView,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    const renderDate = (): string => {
        if (faq.modifiedAt) {
            return formatDate(faq.modifiedAt);
        }
        if (faq.createdAt) {
            return formatDate(faq.createdAt);
        }
        return '-';
    };

    return (
        <TableRow>
            {/* Service Name */}
            <TableCell className="font-medium">
                {faq.serviceName || '-'}
            </TableCell>

            {/* Category Name */}
            <TableCell>
                {faq.categoryName || '-'}
            </TableCell>

            {/* Question */}
            <TableCell className="max-w-md">
                <div className="truncate" title={faq.question}>
                    {faq.question}
                </div>
            </TableCell>

            {/* Status Badge */}
            <TableCell>
                <Badge variant={faq.isActive ? 'outline' : 'secondary'}>
                    {faq.isActive ? 'Hoạt động' : 'Ngừng'}
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
                        onClick={() => onView(faq)}
                        title="Xem chi tiết"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(faq)}
                        title="Chỉnh sửa"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(faq.id)}
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

