'use client';

import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { formatDate } from '@/shared/lib/utils';
import { TableRow, TableCell } from '@/shared/components/manager/ui/table';
import { Button } from '@/shared/components/ui/button.ui';
import { Badge } from '@/shared/components/ui/badge.ui';
import type { DocsType } from '../../../types';

interface Props {
    docsType: DocsType;
    onView: (docsType: DocsType) => void;
    onEdit: (docsType: DocsType) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

const formatFileSize = (mb: number | null | undefined): string => {
    if (mb === null || mb === undefined) {
        return '-';
    }
    return `${Number(mb).toFixed(2)} MB`;
};

export const DocsTypeTableRow: React.FC<Props> = ({
    docsType,
    onView,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    const renderDate = (): string => {
        if (docsType.modifiedAt) {
            return formatDate(docsType.modifiedAt);
        }
        if (docsType.createdAt) {
            return formatDate(docsType.createdAt);
        }
        return '-';
    };

    return (
        <TableRow>
            {/* Code */}
            <TableCell className="font-medium">
                {docsType.docTypeCode}
            </TableCell>

            {/* Name */}
            <TableCell>{docsType.docTypeName}</TableCell>

            {/* Group Name */}
            <TableCell className="text-muted-foreground">
                {docsType.groupName || '-'}
            </TableCell>

            {/* File Format */}
            <TableCell>
                <Badge variant="outline">{docsType.fileFormat}</Badge>
            </TableCell>

            {/* Max File Size */}
            <TableCell className="text-muted-foreground">
                {formatFileSize(docsType.maxFileSize)}
            </TableCell>

            {/* Status Badge */}
            <TableCell>
                <Badge variant={docsType.isActive ? 'outline' : 'secondary'}>
                    {docsType.isActive ? 'Hoạt động' : 'Ngừng'}
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
                        onClick={() => onView(docsType)}
                        title="Xem chi tiết"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(docsType)}
                        title="Chỉnh sửa"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(docsType.id)}
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

