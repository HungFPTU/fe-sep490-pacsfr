'use client';

import React, { useState, useEffect } from 'react';
import { InputField } from '@/shared/components/layout/manager/form/BaseForm';
import { UploadCloud, CheckCircle, AlertCircle } from 'lucide-react';
import { LegalDocumentService } from '../../../services/legal-document.service';
import { useFileUpload } from '@/core/hooks/useFileUpload';
import { FormApiOf } from '@/types/types';
import type { DocumentTypeOption, DocumentStatusOption } from '../../../types';
import { ToggleSwitch } from '@/shared/components/manager/ui';

type FormValues = {
    documentNumber: string;
    documentType: string;
    name: string;
    issueDate: string;
    issueBody: string;
    effectiveDate: string;
    status: string;
    isActive: boolean;
    file?: File;
    fileUrl: string;
};

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any;
    isLoading: boolean;
    isEdit: boolean;
}

export const LegalDocumentForm: React.FC<Props> = ({ form, isLoading, isEdit }) => {
    const [uploadedFileUrl, setUploadedFileUrl] = useState<string>('');
    const [uploadedFileName, setUploadedFileName] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false);

    // Sync uploadedFileUrl with form fileUrl
    const formFileUrl = form.state.values.fileUrl;
    useEffect(() => {
        if (formFileUrl && formFileUrl !== uploadedFileUrl) {
            setUploadedFileUrl(formFileUrl);
            // Extract filename from URL for display
            const fileName = formFileUrl.split('/').pop() || 'Unknown file';
            setUploadedFileName(fileName);
            console.log('[LegalDocumentForm] Synced fileUrl from form:', formFileUrl);
        }
    }, [formFileUrl, uploadedFileUrl]);


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
            console.log('[LegalDocumentForm] Already uploading, ignoring duplicate call');
            return;
        }

        // Validate file first
        const validation = validateFile(file);

        if (!validation.isValid) {
            console.error('[LegalDocumentForm] Validation failed:', validation.error);
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
                setIsActive(true);

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
            console.error('File upload error details:', {
                error: err,
                message: errorMessage,
                stack: err instanceof Error ? err.stack : undefined
            });
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
                        onChange: ({ value }: { value: string }) => {
                            if (!value || !value.trim()) {
                                return 'Số văn bản là bắt buộc';
                            }
                            return undefined;
                        },
                    }}
                >
                    {() => (
                        <InputField<FormValues>
                            form={form as FormApiOf<FormValues>}
                            name="documentNumber"
                            label="Số văn bản"
                            required
                            placeholder="Nhập số văn bản"
                            disabled={isLoading || isEdit}
                        />
                    )}
                </form.Field>

                {/* Document Type */}
                <form.Field
                    name="documentType"
                    validators={{
                        onChange: ({ value }: { value: string }) => {
                            if (!value || !value.trim()) {
                                return 'Loại văn bản là bắt buộc';
                            }
                            return undefined;
                        },
                    }}
                >
                    {() => (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">
                                Loại văn bản <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={form.state.values.documentType || ''}
                                onChange={(e) => form.setFieldValue('documentType', e.target.value)}
                                disabled={isLoading || isEdit}
                                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                <option value="">Chọn loại văn bản</option>
                                {documentTypeOptions.map((option: DocumentTypeOption) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </form.Field>
            </div>

            {/* Document Name */}
            <form.Field
                name="name"
                validators={{
                    onChange: ({ value }: { value: string }) => {
                        if (!value || !value.trim()) {
                            return 'Tên văn bản là bắt buộc';
                        }
                        return undefined;
                    },
                }}
            >
                {() => (
                    <InputField<FormValues>
                        form={form as FormApiOf<FormValues>}
                        name="name"
                        label="Tên văn bản"
                        required
                        placeholder="Nhập tên văn bản"
                        disabled={isLoading}
                    />
                )}
            </form.Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Issue Date */}
                <form.Field
                    name="issueDate"
                    validators={{
                        onChange: ({ value }: { value: string }) => {
                            if (!value || !value.trim()) {
                                return 'Ngày ban hành là bắt buộc';
                            }
                            return undefined;
                        },
                    }}
                >
                    {() => (
                        <InputField<FormValues>
                            form={form as FormApiOf<FormValues>}
                            name="issueDate"
                            label="Ngày ban hành"
                            type="date"
                            required
                            disabled={isLoading}
                        />
                    )}
                </form.Field>

                {/* Effective Date */}
                <form.Field
                    name="effectiveDate"
                    validators={{
                        onChange: ({ value }: { value: string }) => {
                            if (!value || !value.trim()) {
                                return 'Ngày có hiệu lực là bắt buộc';
                            }
                            return undefined;
                        },
                    }}
                >
                    {() => (
                        <InputField<FormValues>
                            form={form as FormApiOf<FormValues>}
                            name="effectiveDate"
                            label="Ngày có hiệu lực"
                            type="date"
                            required
                            disabled={isLoading}
                        />
                    )}
                </form.Field>
            </div>

            {/* Issue Body */}
            <form.Field
                name="issueBody"
                validators={{
                    onChange: ({ value }: { value: string }) => {
                        if (!value || !value.trim()) {
                            return 'Cơ quan ban hành là bắt buộc';
                        }
                        return undefined;
                    },
                }}
            >
                {() => (
                    <InputField<FormValues>
                        form={form as FormApiOf<FormValues>}
                        name="issueBody"
                        label="Cơ quan ban hành"
                        required
                        placeholder="Nhập cơ quan ban hành"
                        disabled={isLoading}
                    />
                )}
            </form.Field>

            {/* Status */}
            <form.Field
                name="status"
                validators={{
                    onChange: ({ value }: { value: string }) => {
                        if (!value || !value.trim()) {
                            return 'Trạng thái là bắt buộc';
                        }
                        return undefined;
                    },
                }}
            >
                {() => (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">
                            Trạng thái <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={form.state.values.status || ''}
                            onChange={(e) => form.setFieldValue('status', e.target.value)}
                            disabled={isLoading}
                            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            <option value="">Chọn trạng thái</option>
                            {documentStatusOptions.map((option: DocumentStatusOption) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
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

                {/* Current File Preview (for edit mode with existing file) */}
                {form.state.values.fileUrl && !uploadedFileUrl && isEdit && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <div className="flex items-center space-x-3">
                            <UploadCloud className="w-8 h-8 text-blue-500" />
                            <div>
                                <p className="text-sm text-blue-700 font-medium">
                                    File hiện tại
                                </p>
                                <p className="text-xs text-blue-600">
                                    {form.state.values.fileUrl.split('/').pop() || 'Unknown file'}
                                </p>
                                <p className="text-xs text-blue-500">
                                    Click để thay đổi
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Uploaded File Preview */}
                {uploadedFileUrl && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                        <div className="flex items-center space-x-3">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                            <div>
                                <p className="text-sm text-green-700 font-medium">
                                    File đã upload
                                </p>
                                <p className="text-xs text-green-600">
                                    {uploadedFileName}
                                </p>
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

            {/* Active Status - Toggle Switch (always show, but different behavior for create vs edit) */}
            <div className="flex items-end pb-2">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <ToggleSwitch
                            checked={isActive}
                            onChange={(value: boolean) => setIsActive(value)}
                            label="Kích hoạt văn bản"
                            description={isActive ? 'Hiển thị công khai' : 'Ẩn khỏi danh sách'}
                            aria-label="Kích hoạt văn bản"
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};