'use client';

import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/shared/components/ui/button.ui';
import { Badge } from '@/shared/components/ui/badge.ui';
import { LegalDocumentService } from '@modules/manager/legal-document/services/legal-document.service';
import type { LegalDocument } from '@modules/manager/legal-document/types';
import { formatDate } from '@/shared/lib/utils';

interface Props {
    legalDocument: LegalDocument;
}

export const LegalDocumentInfo: React.FC<Props> = ({ legalDocument }) => {
    const formatDateVN = (date: string | Date): string => {
        if (!date) return '-';
        const dateObj = date instanceof Date ? date : new Date(date);
        if (isNaN(dateObj.getTime())) return '-';
        return formatDate(dateObj);
    };

    const handleDownloadFile = async () => {
        try {
            // If we have fileUrl, download directly from URL
            if (legalDocument.fileUrl) {
                const link = document.createElement('a');
                link.href = legalDocument.fileUrl;
                link.download = legalDocument.fileName || 'document.pdf';
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                return;
            }

            // Fallback to API download
            const response = await LegalDocumentService.downloadFile(legalDocument.id);
            const blob = new Blob([response.data as unknown as BlobPart]);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = legalDocument.fileName || 'document.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
            alert('Không thể tải xuống file. Vui lòng thử lại.');
        }
    };

    const getStatusVariant = (status: string): 'default' | 'secondary' | 'outline' | 'destructive' => {
        if (status === 'Active') return 'default';
        if (status === 'Draft') return 'secondary';
        if (status === 'Expired' || status === 'Replaced' || status === 'Cancelled') return 'destructive';
        return 'outline';
    };

    const getDocumentTypeVariant = (type: string): 'default' | 'secondary' | 'outline' => {
        if (type === 'LAW' || type === 'RESOLUTION') return 'default';
        if (type === 'DECREE' || type === 'CIRCULAR') return 'secondary';
        return 'outline';
    };

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Document Number */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Số văn bản
                </label>
                <p className="mt-1 text-sm text-muted-foreground font-medium">
                    {legalDocument.documentNumber}
                </p>
            </div>

            {/* Document Type */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Loại văn bản
                </label>
                <div className="mt-1">
                    <Badge variant={getDocumentTypeVariant(legalDocument.documentType)}>
                        {LegalDocumentService.formatDocumentType(legalDocument.documentType)}
                    </Badge>
                </div>
            </div>

            {/* Issue Date */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Ngày ban hành
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                    {formatDateVN(legalDocument.issueDate)}
                </p>
            </div>

            {/* Effective Date */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Ngày có hiệu lực
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                    {formatDateVN(legalDocument.effectiveDate)}
                </p>
            </div>

            {/* Issue Body */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Cơ quan ban hành
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                    {legalDocument.issueBody}
                </p>
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Trạng thái
                </label>
                <div className="mt-1">
                    <Badge variant={getStatusVariant(legalDocument.status)}>
                        {LegalDocumentService.formatDocumentStatus(legalDocument.status)}
                    </Badge>
                </div>
            </div>

            {/* Is Active */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Trạng thái hoạt động
                </label>
                <div className="mt-1">
                    <Badge variant={legalDocument.isActive ? 'outline' : 'secondary'}>
                        {legalDocument.isActive ? 'Hoạt động' : 'Không hoạt động'}
                    </Badge>
                </div>
            </div>

            {/* Created At */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Ngày tạo
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                    {formatDateVN(legalDocument.createdAt)}
                </p>
            </div>

            {/* Document Name */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground">
                    Tên văn bản
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                    {legalDocument.name}
                </p>
            </div>

            {/* File Information */}
            {(legalDocument.fileUrl || legalDocument.fileName) && (
                <div className="md:col-span-2 border-t border-border pt-4">
                    <label className="block text-sm font-medium text-foreground mb-2">
                        File đính kèm
                    </label>
                    {legalDocument.fileUrl && (
                        <div className="mt-2 p-3 bg-muted/50 rounded-lg border border-border">
                            <div className="flex items-center gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={handleDownloadFile}
                                    title="Tải xuống file"
                                >
                                    <Download className="h-4 w-4" />
                                </Button>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground">
                                        {legalDocument.fileName || legalDocument.fileUrl.split('/').pop() || 'Tài liệu đính kèm'}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate mt-1" title={legalDocument.fileUrl}>
                                        URL: {legalDocument.fileUrl}
                                    </p>
                                    {legalDocument.fileSize && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Kích thước: {LegalDocumentService.formatFileSize(legalDocument.fileSize)}
                                        </p>
                                    )}
                                    <p className="text-xs text-green-600 mt-1">
                                        ✓ File đã được upload thành công
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    {!legalDocument.fileUrl && legalDocument.fileName && (
                        <div className="mt-2 p-3 bg-muted/50 rounded-lg border border-border">
                            <div className="flex items-center gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={handleDownloadFile}
                                    title="Tải xuống file"
                                >
                                    <Download className="h-4 w-4" />
                                </Button>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-foreground">
                                        {legalDocument.fileName}
                                    </p>
                                    {legalDocument.fileSize && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                            ({LegalDocumentService.formatFileSize(legalDocument.fileSize)})
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
