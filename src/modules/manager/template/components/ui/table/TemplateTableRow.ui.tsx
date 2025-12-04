'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import { TableRow, TableCell } from '@/shared/components/manager/ui/table';
import { Button } from '@/shared/components/ui/button.ui';
import { Badge } from '@/shared/components/ui/badge.ui';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import type { Template } from '../../../types';

interface Props {
    template: Template;
    onView: (template: Template) => void;
    onEdit: (template: Template) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

const formatFileSize = (bytes?: number): string => {
    if (!bytes || bytes === 0) return '-';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
};

export const TemplateTableRow: React.FC<Props> = ({
    template,
    onView,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    return (
        <TableRow>
            {/* Code */}
            <TableCell className="font-medium">
                {template.templateCode || (template as unknown as { sampleCode?: string }).sampleCode || '-'}
            </TableCell>

            {/* Name */}
            <TableCell>
                {template.templateName || (template as unknown as { sampleName?: string }).sampleName || '-'}
            </TableCell>

            {/* Docs Type Name */}
            <TableCell className="text-muted-foreground">
                {template.docTypeName || template.docsTypeName || '-'}
            </TableCell>

            {/* Version */}
            <TableCell>
                {template.version ? <Badge variant="outline">{template.version}</Badge> : '-'}
            </TableCell>

            {/* File Info */}
            <TableCell className="text-muted-foreground">
                {template.fileName ? (
                    <div className="flex flex-col">
                        <span className="font-medium">{template.fileName}</span>
                        {template.fileSize && <span className="text-xs">{formatFileSize(template.fileSize)}</span>}
                    </div>
                ) : (
                    '-'
                )}
            </TableCell>

            {/* Status Badge */}
            <TableCell>
                <Badge variant={template.isActive ? 'outline' : 'secondary'}>
                    {template.isActive ? 'Hoạt động' : 'Ngừng'}
                </Badge>
            </TableCell>

            {/* Date Cell */}
            <TableCell className="text-muted-foreground">
                {template.modifiedAt ? formatDate(template.modifiedAt) : template.createdAt ? formatDate(template.createdAt) : '-'}
            </TableCell>

            {/* Actions */}
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onView(template)}
                        title="Xem chi tiết"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(template)}
                        title="Chỉnh sửa"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(template.id)}
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

