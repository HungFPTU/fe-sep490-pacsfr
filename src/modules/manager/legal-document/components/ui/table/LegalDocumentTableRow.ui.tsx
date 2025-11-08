'use client';

import React from 'react';
import { Eye, Pencil, Trash2, Download } from 'lucide-react';
import { TableRow, TableCell } from '@/shared/components/manager/ui/table';
import { Button } from '@/shared/components/ui/button.ui';
import { Badge } from '@/shared/components/ui/badge.ui';
import { DOCUMENT_STATUS_LABELS, DOCUMENT_TYPE_LABELS } from '../../../constants';
import type { LegalDocument } from '../../../types';

interface Props {
    legalDocument: LegalDocument;
    onView: (legalDocument: LegalDocument) => void;
    onEdit: (legalDocument: LegalDocument) => void;
    onDelete: (legalDocument: LegalDocument) => void;
    onDownload?: (legalDocument: LegalDocument) => void;
    isDeleting?: boolean;
}

export const LegalDocumentTableRow: React.FC<Props> = ({
    legalDocument,
    onView,
    onEdit,
    onDelete,
    onDownload,
    isDeleting = false,
}) => {
    const formatDateVN = (date: string | Date): string => {
        if (!date) return '-';
        const dateObj = date instanceof Date ? date : new Date(date);
        if (isNaN(dateObj.getTime())) return '-';
        return dateObj.toLocaleDateString('vi-VN');
    };

    const getDocumentTypeLabel = (type: string): string => {
        return DOCUMENT_TYPE_LABELS[type as keyof typeof DOCUMENT_TYPE_LABELS] || type;
    };

    const getStatusLabel = (status: string): string => {
        return DOCUMENT_STATUS_LABELS[status as keyof typeof DOCUMENT_STATUS_LABELS] || status;
    };

    const getDocumentTypeVariant = (type: string): 'default' | 'secondary' | 'outline' => {
        // Map document types to badge variants
        if (type === 'LAW' || type === 'RESOLUTION') return 'default';
        if (type === 'DECREE' || type === 'CIRCULAR') return 'secondary';
        return 'outline';
    };

    const getStatusVariant = (status: string): 'secondary' | 'outline' | 'destructive' => {
        if (status === 'Active') return 'outline';
        if (status === 'Draft') return 'outline';
        if (status === 'Expired' || status === 'Replaced' || status === 'Cancelled') return 'destructive';
        return 'outline';
    };

    return (
        <TableRow>
            {/* Document Number */}
            <TableCell className="font-medium">
                {legalDocument.documentNumber}
            </TableCell>

            {/* Name */}
            <TableCell>
                <div className="max-w-[300px] truncate" title={legalDocument.name}>
                    {legalDocument.name}
                </div>
            </TableCell>

            {/* Document Type */}
            <TableCell>
                <Badge variant={getDocumentTypeVariant(legalDocument.documentType)}>
                    {getDocumentTypeLabel(legalDocument.documentType)}
                </Badge>
            </TableCell>

            {/* Status */}
            <TableCell>
                <Badge variant={getStatusVariant(legalDocument.status)}>
                    {getStatusLabel(legalDocument.status)}
                </Badge>
            </TableCell>

            {/* Issue Date */}
            <TableCell className="text-muted-foreground">
                {formatDateVN(legalDocument.issueDate)}
            </TableCell>

            {/* Effective Date */}
            <TableCell className="text-muted-foreground">
                {formatDateVN(legalDocument.effectiveDate)}
            </TableCell>

            {/* Is Active */}
            <TableCell>
                <Badge variant={legalDocument.isActive ? 'outline' : 'secondary'}>
                    {legalDocument.isActive ? 'Hoạt động' : 'Không hoạt động'}
                </Badge>
            </TableCell>

            {/* Actions */}
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onView(legalDocument)}
                        title="Xem chi tiết"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(legalDocument)}
                        title="Chỉnh sửa"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    {onDownload && (
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onDownload(legalDocument)}
                            title="Tải xuống"
                        >
                            <Download className="h-4 w-4" />
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(legalDocument)}
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

