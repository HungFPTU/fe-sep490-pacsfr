'use client';

import React, { useState } from 'react';
import { Input, ToggleSwitch } from '@/shared/components/manager/ui';
import { UploadCloud, CheckCircle, AlertCircle } from 'lucide-react';
import { LegalDocumentService } from '../../../services/legal-document.service';
import { useFileUpload } from '@/core/hooks/useFileUpload';
import type { LegalDocumentFormData, DocumentTypeOption, DocumentStatusOption } from '../../../types';

interface Props {
    formData: LegalDocumentFormData;
    errors: Partial<Record<keyof LegalDocumentFormData, string>>;
    updateField: (field: keyof LegalDocumentFormData, value: string | File | boolean) => void;
    isEdit?: boolean;
}

export const LegalDocumentForm: React.FC<Props> = ({
    formData,
    errors,
    updateField,
}) => {
    const [uploadedFileUrl, setUploadedFileUrl] = useState<string>('');
    const [uploadedFileName, setUploadedFileName] = useState<string>('');

    const { uploadFile, isUploading, error: uploadError, validateFile, formatFileSize } = useFileUpload({
        maxSize: 10 * 1024 * 1024, // 10MB
        allowedTypes: [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain'
        ],
        folder: 'legal_documents'
    });

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Validate file first
            const validation = validateFile(file);
            if (!validation.isValid) {
                alert(validation.error);
                return;
            }

            try {
                // Upload file to backend
                const result = await uploadFile(file);
                setUploadedFileUrl(result.data.fileUrl);
                setUploadedFileName(result.data.originalFileName);

                // Update form data with file
                updateField('file', file);
            } catch (err) {
                console.error('File upload failed:', err);
                alert('Upload file thất bại. Vui lòng thử lại.');
            }
        }
    };

    const documentTypeOptions = LegalDocumentService.getDocumentTypeOptions();
    const documentStatusOptions = LegalDocumentService.getDocumentStatusOptions();

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Document Number */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">
                        Số văn bản <span className="text-red-500">*</span>
                    </label>
                    <Input
                        value={formData.documentNumber}
                        onChange={(e) => updateField('documentNumber', e.target.value)}
                        placeholder="Nhập số văn bản"
                        className={errors.documentNumber ? 'border-red-500' : ''}
                    />
                    {errors.documentNumber && (
                        <p className="text-red-500 text-sm">{errors.documentNumber}</p>
                    )}
                </div>

                {/* Document Type */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">
                        Loại văn bản <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={formData.documentType || ''}
                        onChange={(e) => updateField('documentType', e.target.value)}
                        className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 ${errors.documentType
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-300'
                            }`}
                    >
                        <option value="">Chọn loại văn bản</option>
                        {documentTypeOptions.map((option: DocumentTypeOption) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {errors.documentType && (
                        <p className="text-red-500 text-sm">{errors.documentType}</p>
                    )}
                </div>
            </div>

            {/* Document Name */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                    Tên văn bản <span className="text-red-500">*</span>
                </label>
                <Input
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Nhập tên văn bản"
                    className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Issue Date */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">
                        Ngày ban hành <span className="text-red-500">*</span>
                    </label>
                    <Input
                        type="date"
                        value={formData.issueDate}
                        onChange={(e) => updateField('issueDate', e.target.value)}
                        className={errors.issueDate ? 'border-red-500' : ''}
                    />
                    {errors.issueDate && (
                        <p className="text-red-500 text-sm">{errors.issueDate}</p>
                    )}
                </div>

                {/* Effective Date */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">
                        Ngày có hiệu lực <span className="text-red-500">*</span>
                    </label>
                    <Input
                        type="date"
                        value={formData.effectiveDate}
                        onChange={(e) => updateField('effectiveDate', e.target.value)}
                        className={errors.effectiveDate ? 'border-red-500' : ''}
                    />
                    {errors.effectiveDate && (
                        <p className="text-red-500 text-sm">{errors.effectiveDate}</p>
                    )}
                </div>
            </div>

            {/* Issue Body */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                    Cơ quan ban hành <span className="text-red-500">*</span>
                </label>
                <Input
                    value={formData.issueBody}
                    onChange={(e) => updateField('issueBody', e.target.value)}
                    placeholder="Nhập cơ quan ban hành"
                    className={errors.issueBody ? 'border-red-500' : ''}
                />
                {errors.issueBody && (
                    <p className="text-red-500 text-sm">{errors.issueBody}</p>
                )}
            </div>

            {/* Status */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                    Trạng thái <span className="text-red-500">*</span>
                </label>
                <select
                    value={formData.status || ''}
                    onChange={(e) => updateField('status', e.target.value)}
                    className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 ${errors.status
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300'
                        }`}
                >
                    <option value="">Chọn trạng thái</option>
                    {documentStatusOptions.map((option: DocumentStatusOption) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {errors.status && (
                    <p className="text-red-500 text-sm">{errors.status}</p>
                )}
            </div>

            {/* File Upload */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                    File đính kèm
                </label>

                {/* File Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.txt"
                        className="hidden"
                        id="file-upload"
                        disabled={isUploading}
                    />
                    <label
                        htmlFor="file-upload"
                        className={`cursor-pointer flex flex-col items-center space-y-2 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isUploading ? (
                            <>
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                <span className="text-sm text-gray-600">Đang upload...</span>
                            </>
                        ) : (
                            <>
                                <UploadCloud className="w-8 h-8 text-gray-400" />
                                <div>
                                    <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                        Chọn file để upload
                                    </span>
                                    <p className="text-xs text-gray-500 mt-1">
                                        PDF, DOC, DOCX, TXT (tối đa 10MB)
                                    </p>
                                </div>
                            </>
                        )}
                    </label>
                </div>

                {/* Upload Error */}
                {uploadError && (
                    <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-600">{uploadError}</span>
                    </div>
                )}

                {/* Upload Success */}
                {uploadedFileUrl && (
                    <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-md">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <div className="flex-1">
                            <p className="text-sm text-green-800 font-medium">
                                File đã upload thành công!
                            </p>
                            <p className="text-xs text-green-600">
                                {uploadedFileName}
                            </p>
                        </div>
                    </div>
                )}

                {/* Current File Info */}
                {formData.file && !uploadedFileUrl && (
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                        <p className="text-sm text-gray-700">
                            <strong>File đã chọn:</strong> {formData.file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                            Kích thước: {formatFileSize(formData.file.size)}
                        </p>
                    </div>
                )}
            </div>

            {/* Active Status - Toggle Switch */}
            <ToggleSwitch
                checked={formData.isActive}
                onChange={(checked) => updateField('isActive', checked)}
                label="Kích hoạt văn bản"
                description={formData.isActive ? 'Hiển thị công khai' : 'Ẩn khỏi danh sách'}
                aria-label="Kích hoạt văn bản"
            />
        </div>
    );
};