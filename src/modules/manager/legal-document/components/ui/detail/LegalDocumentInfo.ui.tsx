'use client';

import React from 'react';
import { Button } from '@heroui/react';
import { Download } from 'lucide-react';
import { LegalDocumentService } from '@modules/manager/legal-document/services/legal-document.service';
import type { LegalDocument } from '@modules/manager/legal-document/types';

interface Props {
    legalDocument: LegalDocument;
}

export const LegalDocumentInfo: React.FC<Props> = ({ legalDocument }) => {
    const handleDownloadFile = async () => {
        try {
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
        }
    };

    return (
        <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-slate-500">Số văn bản</label>
                        <p className="text-sm text-slate-900 font-medium">{legalDocument.documentNumber}</p>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-500">Loại văn bản</label>
                        <p className="text-sm text-slate-900">{LegalDocumentService.formatDocumentType(legalDocument.documentType)}</p>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-500">Ngày ban hành</label>
                        <p className="text-sm text-slate-900">{LegalDocumentService.formatDate(legalDocument.issueDate)}</p>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-500">Ngày có hiệu lực</label>
                        <p className="text-sm text-slate-900">{LegalDocumentService.formatDate(legalDocument.effectiveDate)}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-slate-500">Cơ quan ban hành</label>
                        <p className="text-sm text-slate-900">{legalDocument.issueBody}</p>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-500">Trạng thái</label>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${LegalDocumentService.getStatusColor(legalDocument.status) === 'success' ? 'bg-green-100 text-green-800' :
                            LegalDocumentService.getStatusColor(legalDocument.status) === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                LegalDocumentService.getStatusColor(legalDocument.status) === 'danger' ? 'bg-red-100 text-red-800' :
                                    LegalDocumentService.getStatusColor(legalDocument.status) === 'primary' ? 'bg-blue-100 text-blue-800' :
                                        'bg-gray-100 text-gray-800'
                            }`}>
                            {LegalDocumentService.formatDocumentStatus(legalDocument.status)}
                        </span>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-500">Trạng thái hoạt động</label>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${legalDocument.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                            {legalDocument.isActive ? 'Hoạt động' : 'Không hoạt động'}
                        </span>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-500">Ngày tạo</label>
                        <p className="text-sm text-slate-900">{LegalDocumentService.formatDate(legalDocument.createdAt)}</p>
                    </div>
                </div>
            </div>

            {/* Document Name */}
            <div>
                <label className="text-sm font-medium text-slate-500">Tên văn bản</label>
                <p className="text-sm text-slate-900 mt-1">{legalDocument.name}</p>
            </div>

            {/* File Information */}
            {legalDocument.fileName && (
                <div className="border-t border-slate-200 pt-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="text-sm font-medium text-slate-500">File đính kèm</label>
                            <div className="flex items-center space-x-2 mt-1">
                                <Download className="h-4 w-4 text-slate-400" />
                                <span className="text-sm text-slate-900">{legalDocument.fileName}</span>
                                {legalDocument.fileSize && (
                                    <span className="text-xs text-slate-500">
                                        ({LegalDocumentService.formatFileSize(legalDocument.fileSize)})
                                    </span>
                                )}
                            </div>
                        </div>
                        <Button
                            size="sm"
                            color="primary"
                            variant="solid"
                            onClick={handleDownloadFile}
                            startContent={<Download className="h-4 w-4" />}
                        >
                            Tải xuống
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
