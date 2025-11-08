'use client';

import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { TableCell, TableRow } from '@/shared/components/manager/ui/table';
import { Button } from '@/shared/components/ui/button.ui';
import { Badge } from '@/shared/components/ui/badge.ui';
import { formatDate } from '@/shared/lib/utils';
import type { RequiredDocument } from '../../../types';

interface Props {
    requiredDocument: RequiredDocument;
    onView: (document: RequiredDocument) => void;
    onEdit: (document: RequiredDocument) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const RequiredDocumentTableRow: React.FC<Props> = ({
    requiredDocument,
    onView,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    return (
        <TableRow>
            <TableCell>
                <div className="max-w-xs truncate" title={requiredDocument.description}>
                    {requiredDocument.description || '-'}
                </div>
            </TableCell>
            <TableCell className="text-muted-foreground">
                {requiredDocument.serviceName || '---'}
            </TableCell>
            <TableCell className="text-muted-foreground">
                {requiredDocument.docTypeName || requiredDocument.docTypeCode || '---'}
            </TableCell>
            <TableCell className="text-center">
                {requiredDocument.quantityOriginal ?? 0}
            </TableCell>
            <TableCell className="text-center">
                {requiredDocument.quantityCopy ?? 0}
            </TableCell>
            <TableCell>
                <Badge variant={requiredDocument.isActive ? 'outline' : 'secondary'}>
                    {requiredDocument.isActive ? 'Đang áp dụng' : 'Ngừng áp dụng'}
                </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">
                {requiredDocument.modifiedAt
                    ? formatDate(requiredDocument.modifiedAt)
                    : requiredDocument.createdAt
                    ? formatDate(requiredDocument.createdAt)
                    : '-'}
            </TableCell>
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => onView(requiredDocument)} title="Xem chi tiết">
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => onEdit(requiredDocument)} title="Chỉnh sửa">
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(requiredDocument.id)}
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

