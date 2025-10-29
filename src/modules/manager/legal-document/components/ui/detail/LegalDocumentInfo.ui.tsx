'use client';

import React from 'react';
import { Download } from 'lucide-react';
import { LegalDocumentService } from '@modules/manager/legal-document/services/legal-document.service';
import type { LegalDocument } from '@modules/manager/legal-document/types';

interface Props {
    legalDocument: LegalDocument;
}

export const LegalDocumentInfo: React.FC<Props> = ({ legalDocument }) => {
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
                        <p className="text-sm text-slate-900">
                            {legalDocument.createdAt ? LegalDocumentService.formatDate(legalDocument.createdAt) : 'N/A'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Document Name */}
            <div>
                <label className="text-sm font-medium text-slate-500">Tên văn bản</label>
                <p className="text-sm text-slate-900 mt-1">{legalDocument.name}</p>
            </div>

            {/* File Information */}
            {(legalDocument.fileUrl || legalDocument.fileName) && (
                <div className="border-t border-slate-200 pt-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-slate-500">File đính kèm</label>

                            {/* File URL */}
                            {legalDocument.fileUrl && (
                                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            type="button"
                                            onClick={handleDownloadFile}
                                            className="flex-shrink-0 p-1 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                                            title="Tải xuống file"
                                        >
                                            <Download className="h-5 w-5 text-blue-600 hover:text-blue-800" />
                                        </button>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-slate-900 font-medium">
                                                {legalDocument.fileName || legalDocument.fileUrl.split('/').pop() || 'Tài liệu đính kèm'}
                                            </p>
                                            <p className="text-xs text-slate-500 truncate" title={legalDocument.fileUrl}>
                                                URL: {legalDocument.fileUrl}
                                            </p>
                                            {legalDocument.fileSize && (
                                                <p className="text-xs text-slate-500">
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

                            {/* Legacy file info */}
                            {!legalDocument.fileUrl && legalDocument.fileName && (
                                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            type="button"
                                            onClick={handleDownloadFile}
                                            className="flex-shrink-0 p-1 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                                            title="Tải xuống file"
                                        >
                                            <Download className="h-5 w-5 text-blue-600 hover:text-blue-800" />
                                        </button>
                                        <div className="flex-1 min-w-0">
                                            <span className="text-sm text-slate-900">{legalDocument.fileName}</span>
                                            {legalDocument.fileSize && (
                                                <span className="text-xs text-slate-500 ml-2">
                                                    ({LegalDocumentService.formatFileSize(legalDocument.fileSize)})
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
