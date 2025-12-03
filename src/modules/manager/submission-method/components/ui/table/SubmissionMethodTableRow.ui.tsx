'use client';

import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { formatDate, formatCurrency } from '@/shared/lib/utils';
import { TableRow, TableCell } from '@/shared/components/manager/ui/table';
import { Button } from '@/shared/components/ui/button.ui';
import { Badge } from '@/shared/components/ui/badge.ui';
import type { SubmissionMethod } from '../../../types';

interface Props {
    submissionMethod: SubmissionMethod;
    onView: (submissionMethod: SubmissionMethod) => void;
    onEdit: (submissionMethod: SubmissionMethod) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const SubmissionMethodTableRow: React.FC<Props> = ({
    submissionMethod,
    onView,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    const formatProcessingTime = (time: string | Date): string => {
        if (!time) return '-';
        const date = time instanceof Date ? time : new Date(time);
        if (isNaN(date.getTime())) return '-';
        return formatDate(date);
    };

    return (
        <TableRow>
            {/* Name */}
            <TableCell className="font-medium">
                {submissionMethod.submissionMethodName || '-'}
            </TableCell>



            {/* Description */}
            <TableCell className="text-muted-foreground">
                <div className="max-w-xs truncate" title={submissionMethod.description || ''}>
                    {submissionMethod.description || '-'}
                </div>
            </TableCell>

            {/* Actions */}
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onView(submissionMethod)}
                        title="Xem chi tiết"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(submissionMethod)}
                        title="Chỉnh sửa"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(submissionMethod.id)}
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

