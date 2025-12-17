'use client';

import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { formatDate } from '@/shared/lib/utils';
import { TableRow, TableCell } from '@/shared/components/manager/ui/table';
import { Button } from '@/shared/components/ui/button.ui';
import { Badge } from '@/shared/components/ui/badge.ui';
import type { TargetAudience } from '../../../types';

interface Props {
    targetAudience: TargetAudience;
    onView: (targetAudience: TargetAudience) => void;
    onEdit: (targetAudience: TargetAudience) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const TargetAudienceTableRow: React.FC<Props> = ({
    targetAudience,
    onView,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    const renderDate = (): string => {
        if (targetAudience.modifiedAt) {
            return formatDate(targetAudience.modifiedAt);
        }
        if (targetAudience.createdAt) {
            return formatDate(targetAudience.createdAt);
        }
        return '-';
    };

    return (
        <TableRow>
            {/* Name */}
            <TableCell className="font-medium">
                {targetAudience.name}
            </TableCell>

            {/* Description */}
            <TableCell className="max-w-md">
                <div className="truncate" title={targetAudience.description}>
                    {targetAudience.description || '-'}
                </div>
            </TableCell>

            {/* Status Badge */}
            <TableCell>
                <Badge variant={targetAudience.isActive ? 'outline' : 'secondary'}>
                    {targetAudience.isActive ? 'Hoạt động' : 'Ngừng'}
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
                        onClick={() => onView(targetAudience)}
                        title="Xem chi tiết"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(targetAudience)}
                        title="Chỉnh sửa"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(targetAudience.id)}
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

