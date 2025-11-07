'use client';

import React, { useState, useEffect } from 'react';
import { UploadCloud, CheckCircle, AlertCircle } from 'lucide-react';
import { LegalDocumentService } from '../../../services/legal-document.service';
import { useFileUpload } from '@/core/hooks/useFileUpload';
import type { DocumentTypeOption, DocumentStatusOption, LegalDocument } from '../../../types';
import { ToggleSwitch } from '@/shared/components/manager/ui';
import {
    validateDocumentNumber,
    validateDocumentType,
    validateName,
    validateIssueDate,
    validateEffectiveDate,
    validateIssueBody,
    validateStatus,
} from '../../../utils';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any;
    isLoading: boolean;
    isEdit: boolean;
    initData?: LegalDocument | null;
}

export const LegalDocumentForm: React.FC<Props> = ({ form, isLoading, isEdit, initData }) => {
    const [uploadedFileUrl, setUploadedFileUrl] = useState<string>('');
    const [uploadedFileName, setUploadedFileName] = useState<string>('');

    // Sync uploadedFileUrl with initData fileUrl (for edit mode) or form fileUrl (for new uploads)
    const formFileUrl = form.state.values.fileUrl;
    const initFileUrl = initData?.fileUrl;

    useEffect(() => {
        // Priority: newly uploaded file > initData fileUrl
        if (formFileUrl && formFileUrl !== uploadedFileUrl) {
            // This handles both new uploads and form reset
            setUploadedFileUrl(formFileUrl);
            const fileName = formFileUrl.split('/').pop() || 'Unknown file';
            setUploadedFileName(fileName);
        } else if (isEdit && initFileUrl && !formFileUrl) {
            // Fallback: sync from initData if form doesn't have fileUrl yet
            setUploadedFileUrl(initFileUrl);
            const fileName = initFileUrl.split('/').pop() || 'Unknown file';
            setUploadedFileName(fileName);
        } else if (!isEdit && !formFileUrl) {
            // Reset when not in edit mode and no file
            setUploadedFileUrl('');
            setUploadedFileName('');
        }
    }, [formFileUrl, initFileUrl, isEdit, uploadedFileUrl]);

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
        if (!file) return;

        // Prevent duplicate uploads
        if (isUploading) {
            return;
        }

        // Validate file first
        const validation = validateFile(file);

        if (!validation.isValid) {
            alert(validation.error);
            return;
        }

        try {
            // Upload file to backend
            const result = await uploadFile(file);

            if (result && result.data && result.data.fileUrl) {
                const fileUrl = result.data.fileUrl;
                const fileName = result.data.originalFileName;

                // Update local state
                setUploadedFileUrl(fileUrl);
                setUploadedFileName(fileName);

                // Update form using setFieldValue with callback
                form.setFieldValue('fileUrl', fileUrl, {
                    shouldTouch: true,
                    shouldDirty: true
                });
                // Clear file after successful upload since we now have fileUrl
                form.setFieldValue('file', undefined, {
                    shouldTouch: true,
                    shouldDirty: true
                });

                // Clear input to prevent duplicate uploads
                if (event.target) {
                    event.target.value = '';
                }

            } else {
                console.error('[LegalDocumentForm] Upload failed - no fileUrl in result:', result);
            }
        } catch (err) {
            console.error('File upload failed:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            alert(`Upload file thất bại: ${errorMessage}`);
        }
    };

    const documentTypeOptions = LegalDocumentService.getDocumentTypeOptions();
    const documentStatusOptions = LegalDocumentService.getDocumentStatusOptions();

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Document Number */}
                <form.Field
                    name="documentNumber"
                    validators={{
                        onBlur: ({ value }: { value: string }) => validateDocumentNumber(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full">
                                <label htmlFor="documentNumber" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Số quyết định
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <input
                                    id="documentNumber"
                                    type="text"
                                    className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading || isEdit ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => {
                                        // Auto-uppercase for code part and allow only valid characters
                                        let inputValue = e.target.value;
                                        // Allow forward slash, numbers, uppercase letters, and hyphens
                                        inputValue = inputValue.replace(/[^0-9\/A-Za-z-]/gi, '');
                                        // Convert letters to uppercase only for the code part (after second slash)
                                        const parts = inputValue.split('/');
                                        if (parts.length >= 3) {
                                            // Only uppercase the code part (third segment)
                                            parts[2] = parts[2].toUpperCase();
                                        }
                                        field.handleChange(parts.join('/') as never);
                                    }}
                                    onBlur={field.handleBlur}
                                    placeholder="VD: 15/2025/TT-BCA"
                                    disabled={isLoading || isEdit}
                                />
                                {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                                <p className="mt-1 text-xs text-gray-500">
                                    Định dạng: SỐ/NĂM/MÃ (ví dụ: 15/2025/TT-BCA)
                                </p>
                            </div>
                        );
                    }}
                </form.Field>

                {/* Document Type */}
                <form.Field
                    name="documentType"
                    validators={{
                        onBlur: ({ value }: { value: string }) => validateDocumentType(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full">
                                <label htmlFor="documentType" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Loại văn bản
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <select
                                    id="documentType"
                                    className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading || isEdit ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    disabled={isLoading || isEdit}
                                >
                                    <option value="">Chọn loại văn bản</option>
                                    {documentTypeOptions.map((option: DocumentTypeOption) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                            </div>
                        );
                    }}
                </form.Field>
            </div>

            {/* Document Name */}
            <form.Field
                name="name"
                validators={{
                    onBlur: ({ value }: { value: string }) => validateName(value),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="name" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Tên văn bản
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                placeholder="Nhập tên văn bản"
                                disabled={isLoading}
                            />
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Issue Date */}
                <form.Field
                    name="issueDate"
                    validators={{
                        onBlur: ({ value }: { value: string }) => {
                            const effectiveDate = form.state.values.effectiveDate as string | undefined;
                            return validateIssueDate(value, effectiveDate);
                        },
                        onChange: ({ value }: { value: string }) => {
                            const effectiveDate = form.state.values.effectiveDate as string | undefined;
                            // Re-validate effective date when issue date changes
                            if (effectiveDate && effectiveDate.trim()) {
                                setTimeout(() => {
                                    form.validateField('effectiveDate', 'change');
                                }, 0);
                            }
                            return validateIssueDate(value, effectiveDate);
                        },
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full">
                                <label htmlFor="issueDate" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Ngày ban hành
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <input
                                    id="issueDate"
                                    type="date"
                                    max={new Date().toISOString().split('T')[0]}
                                    className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => {
                                        field.handleChange(e.target.value as never);
                                        // Trigger validation on change
                                        setTimeout(() => {
                                            field.handleBlur();
                                        }, 0);
                                    }}
                                    onBlur={field.handleBlur}
                                    disabled={isLoading}
                                />
                                {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                                <p className="mt-1 text-xs text-gray-500">Không được là tương lai</p>
                            </div>
                        );
                    }}
                </form.Field>

                {/* Effective Date */}
                <form.Field
                    name="effectiveDate"
                    validators={{
                        onBlur: ({ value }: { value: string }) => {
                            const issueDate = form.state.values.issueDate as string | undefined;
                            return validateEffectiveDate(value, issueDate);
                        },
                        onChange: ({ value }: { value: string }) => {
                            const issueDate = form.state.values.issueDate as string | undefined;
                            // Re-validate issue date when effective date changes
                            if (issueDate && issueDate.trim()) {
                                setTimeout(() => {
                                    form.validateField('issueDate', 'change');
                                }, 0);
                            }
                            return validateEffectiveDate(value, issueDate);
                        },
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        const issueDate = form.state.values.issueDate as string | undefined;
                        const minDate = issueDate || undefined;

                        return (
                            <div className="w-full">
                                <label htmlFor="effectiveDate" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Ngày có hiệu lực
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <input
                                    id="effectiveDate"
                                    type="date"
                                    min={minDate}
                                    className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => {
                                        field.handleChange(e.target.value as never);
                                        // Trigger validation on change
                                        setTimeout(() => {
                                            field.handleBlur();
                                        }, 0);
                                    }}
                                    onBlur={field.handleBlur}
                                    disabled={isLoading}
                                />
                                {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                                <p className="mt-1 text-xs text-gray-500">
                                    Phải sau hoặc bằng ngày ban hành
                                </p>
                            </div>
                        );
                    }}
                </form.Field>
            </div>

            {/* Issue Body */}
            <form.Field
                name="issueBody"
                validators={{
                    onBlur: ({ value }: { value: string }) => validateIssueBody(value),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="issueBody" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Cơ quan ban hành
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <input
                                id="issueBody"
                                type="text"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                placeholder="Nhập cơ quan ban hành"
                                disabled={isLoading}
                            />
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            {/* Status */}
            <form.Field
                name="status"
                validators={{
                    onBlur: ({ value }: { value: string }) => validateStatus(value),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="status" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Trạng thái
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <select
                                id="status"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                disabled={isLoading}
                            >
                                <option value="">Chọn trạng thái</option>
                                {documentStatusOptions.map((option: DocumentStatusOption) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            {/* File Upload */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                    File đính kèm {isEdit && <span className="text-gray-500">(Chỉ thay đổi khi cần thiết)</span>}
                </label>

                {/* File Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.txt"
                        className="hidden"
                        id="file-upload"
                        disabled={isUploading || isLoading}
                    />
                    <label
                        htmlFor="file-upload"
                        className={`cursor-pointer flex flex-col items-center space-y-2 ${isUploading || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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

                {/* File Preview - Show existing file in edit mode or newly uploaded file */}
                {(uploadedFileUrl || (isEdit && (formFileUrl || initFileUrl))) && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                        <div className="flex items-center space-x-3">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                            <div>
                                <p className="text-sm text-green-700 font-medium">
                                    {isEdit ? 'File hiện tại' : 'File đã upload'}
                                </p>
                                <p className="text-xs text-green-600">
                                    {uploadedFileName || (initFileUrl || formFileUrl || '').split('/').pop() || 'Unknown file'}
                                </p>
                                {isEdit && (
                                    <p className="text-xs text-green-500 mt-1">
                                        Click để thay đổi file
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Selected File Info (for new file selection) */}
                {form.state.values.file && !uploadedFileUrl && !isEdit && (
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                        <p className="text-sm text-gray-700">
                            <strong>File đã chọn:</strong> {form.state.values.file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                            Kích thước: {formatFileSize(form.state.values.file.size)}
                        </p>
                    </div>
                )}
            </div>

            {/* Active Status - Toggle Switch */}
            <form.Field name="isActive">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => (
                    <ToggleSwitch
                        checked={field.state.value ?? false}
                        onChange={(value: boolean) => {
                            field.handleChange(value);
                        }}
                        label="Kích hoạt văn bản"
                        description={field.state.value ? 'Hiển thị công khai' : 'Ẩn khỏi danh sách'}
                        disabled={isLoading}
                        aria-label="Kích hoạt văn bản"
                    />
                )}
            </form.Field>
        </div>
    );
};
