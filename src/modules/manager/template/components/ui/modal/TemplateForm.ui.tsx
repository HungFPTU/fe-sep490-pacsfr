'use client';

import React from 'react';
import { ToggleSwitch } from '@/shared/components/manager/ui';
import { useDocsType } from '@/modules/manager/docs-type/hooks';
import { docsTypeService } from '@/modules/manager/docs-type/services/docs-type.service';
import { SearchableDocsTypeSelect } from './SearchableDocsTypeSelect.ui';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { FileUploadService } from '@/core/services/file-upload.service';
import { getMimeTypesFromFileFormat } from '../../../utils';
import {
    validateTemplateCode,
    validateTemplateName,
    validateDescription,
    validateDocsTypeId,
    validateVersion,
} from '../../../utils';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any;
    isLoading: boolean;
    isEdit: boolean;
}

export const TemplateForm: React.FC<Props> = ({ form, isLoading, isEdit }) => {
    const { addToast } = useGlobalToast();

    // Get current docsTypeId from form state
    const currentDocsTypeId = form.state.values.docsTypeId as string | undefined;

    // Fetch docsType details when ID is available (hook must be called at component level)
    const { data: currentSelectedDocsType } = useDocsType(currentDocsTypeId || '', !!currentDocsTypeId);

    // Use FileUploadService directly for dynamic validation based on selected docsType
    const [isFileUploading, setIsFileUploading] = React.useState(false);
    const [fileUploadError, setFileUploadError] = React.useState<string | null>(null);

    const formatFileSize = (bytes: number): string => {
        return FileUploadService.formatFileSize(bytes);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Template Code */}
                <form.Field
                    name="templateCode"
                    validators={{
                        onBlur: ({ value }: { value: string }) => validateTemplateCode(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full">
                                <label htmlFor="templateCode" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Mã template
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <input
                                    id="templateCode"
                                    type="text"
                                    className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isEdit || isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    placeholder="Nhập mã template"
                                    disabled={isEdit || isLoading}
                                />
                                {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                            </div>
                        );
                    }}
                </form.Field>

                {/* Template Name */}
                <form.Field
                    name="templateName"
                    validators={{
                        onBlur: ({ value }: { value: string }) => validateTemplateName(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full">
                                <label htmlFor="templateName" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Tên template
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <input
                                    id="templateName"
                                    type="text"
                                    className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    placeholder="Nhập tên template"
                                    disabled={isLoading}
                                />
                                {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                            </div>
                        );
                    }}
                </form.Field>

                {/* Docs Type */}
                <form.Field
                    name="docsTypeId"
                    validators={{
                        onBlur: ({ value }: { value: string }) => validateDocsTypeId(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full">
                                <label htmlFor="docsTypeId" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Loại văn bản
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <SearchableDocsTypeSelect
                                    value={(field.state.value as string) || ''}
                                    onChange={(value) => field.handleChange(value as never)}
                                    onBlur={field.handleBlur}
                                    disabled={isLoading}
                                    error={error}
                                    isLoading={isLoading}
                                />
                            </div>
                        );
                    }}
                </form.Field>

                {/* Version */}
                <form.Field
                    name="version"
                    validators={{
                        onBlur: ({ value }: { value: string | undefined }) => validateVersion(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full">
                                <label htmlFor="version" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Phiên bản
                                </label>
                                <input
                                    id="version"
                                    type="text"
                                    className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    placeholder="VD: 1.0.0, v1.0"
                                    disabled={isLoading}
                                />
                                {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                                <p className="mt-1 text-xs text-gray-500">Định dạng: 1.0.0, v1.0, 1.0.0-beta</p>
                            </div>
                        );
                    }}
                </form.Field>

                {/* File Upload - Full width */}
                <div className="md:col-span-2">
                    {/* Subscribe to docsTypeId to trigger re-render when it changes */}
                    <form.Field name="docsTypeId">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {(docsTypeField: any) => {
                            // Use the docsType fetched at component level (will update when form state changes)

                            return (
                                <form.Field name="filePath">
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {(filePathField: any) => (
                                        <form.Field name="fileName">
                                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                            {(fileNameField: any) => (
                                                <form.Field name="fileSize">
                                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                                    {(fileSizeField: any) => {
                                                        const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
                                                            const file = e.target.files?.[0];
                                                            if (!file) return;

                                                            // Get current docsTypeId from field state (most up-to-date)
                                                            const fieldDocsTypeId = docsTypeField.state.value as string | undefined;

                                                            // Check if docsType is selected
                                                            if (!fieldDocsTypeId) {
                                                                addToast({
                                                                    message: 'Vui lòng chọn loại văn bản trước khi upload file',
                                                                    type: 'error',
                                                                });
                                                                e.target.value = '';
                                                                return;
                                                            }

                                                            // Fetch docsType details if not available
                                                            let docsTypeDetails = currentSelectedDocsType;
                                                            if (!docsTypeDetails && fieldDocsTypeId) {
                                                                try {
                                                                    docsTypeDetails = await docsTypeService.getDocsTypeById(fieldDocsTypeId);
                                                                } catch (error) {
                                                                    console.error('Failed to fetch docsType:', error);
                                                                    addToast({
                                                                        message: 'Không thể tải thông tin loại văn bản',
                                                                        type: 'error',
                                                                    });
                                                                    e.target.value = '';
                                                                    return;
                                                                }
                                                            }

                                                            if (!docsTypeDetails) {
                                                                addToast({
                                                                    message: 'Không tìm thấy thông tin loại văn bản',
                                                                    type: 'error',
                                                                });
                                                                e.target.value = '';
                                                                return;
                                                            }

                                                            // Re-validate file with current docsType settings
                                                            const currentMaxSize = docsTypeDetails.maxFileSize * 1024 * 1024;
                                                            const currentAllowedTypes = getMimeTypesFromFileFormat(docsTypeDetails.fileFormat);

                                                            const validation = FileUploadService.validateFile(file, currentMaxSize, currentAllowedTypes);
                                                            if (!validation.isValid) {
                                                                addToast({
                                                                    message: validation.error || 'File không hợp lệ',
                                                                    type: 'error',
                                                                });
                                                                e.target.value = ''; // Reset input
                                                                return;
                                                            }

                                                            try {
                                                                setIsFileUploading(true);
                                                                setFileUploadError(null);

                                                                // Upload file using current docsType folder structure
                                                                const uploadFolder = docsTypeDetails
                                                                    ? `templates/${docsTypeDetails.docTypeCode || 'general'}`
                                                                    : 'templates/general';
                                                                const result = await FileUploadService.uploadFile(file, uploadFolder);

                                                                if (result.success && result.data) {
                                                                    // Update form fields
                                                                    filePathField.handleChange(result.data.fileUrl as never);
                                                                    fileNameField.handleChange(result.data.originalFileName as never);
                                                                    fileSizeField.handleChange(result.data.fileSize as never);

                                                                    addToast({
                                                                        message: 'Upload file thành công',
                                                                        type: 'success',
                                                                    });
                                                                } else {
                                                                    throw new Error(result.message || 'Upload file thất bại');
                                                                }
                                                            } catch (error) {
                                                                console.error('File upload error:', error);
                                                                const errorMessage = error instanceof Error ? error.message : 'Upload file thất bại';
                                                                setFileUploadError(errorMessage);
                                                                addToast({
                                                                    message: errorMessage,
                                                                    type: 'error',
                                                                });
                                                            } finally {
                                                                setIsFileUploading(false);
                                                                e.target.value = ''; // Reset input
                                                            }
                                                        };

                                                        const handleRemoveFile = () => {
                                                            filePathField.handleChange('' as never);
                                                            fileNameField.handleChange('' as never);
                                                            fileSizeField.handleChange(undefined as never);
                                                        };

                                                        const hasFile = filePathField.state.value || fileNameField.state.value;

                                                        // Get allowed types for accept attribute (use currentSelectedDocsType if available, otherwise empty)
                                                        const allowedTypesForAccept = currentSelectedDocsType
                                                            ? getMimeTypesFromFileFormat(currentSelectedDocsType.fileFormat)
                                                            : [];

                                                        return (
                                                            <div className="w-full">
                                                                <label className="mb-2 inline-block text-sm font-medium text-slate-700">
                                                                    File mẫu văn bản
                                                                </label>

                                                                {/* File Info Display */}
                                                                {currentSelectedDocsType && (
                                                                    <div className="mb-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                                                                        <div className="flex items-start gap-2">
                                                                            <svg className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                            </svg>
                                                                            <div className="flex-1">
                                                                                <p className="text-sm font-medium text-blue-900">
                                                                                    Thông tin file được phép
                                                                                </p>
                                                                                <div className="mt-1 text-xs text-blue-700 space-y-0.5">
                                                                                    <p>
                                                                                        <span className="font-medium">Định dạng:</span> {currentSelectedDocsType.fileFormat}
                                                                                    </p>
                                                                                    <p>
                                                                                        <span className="font-medium">Dung lượng tối đa:</span> {currentSelectedDocsType.maxFileSize} MB
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {/* Uploaded File Display */}
                                                                {hasFile && (
                                                                    <div className="mb-3 p-4 rounded-xl border-2 border-green-200 bg-green-50">
                                                                        <div className="flex items-start gap-3">
                                                                            <div className="flex-shrink-0">
                                                                                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                                                                                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                                    </svg>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex-1 min-w-0">
                                                                                <p className="text-sm font-semibold text-green-900 truncate">
                                                                                    {fileNameField.state.value || 'File đã upload'}
                                                                                </p>
                                                                                {fileSizeField.state.value && (
                                                                                    <p className="text-xs text-green-700 mt-1">
                                                                                        Dung lượng: {formatFileSize(fileSizeField.state.value as number)}
                                                                                    </p>
                                                                                )}
                                                                                {filePathField.state.value && (
                                                                                    <a
                                                                                        href={filePathField.state.value as string}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-green-700 hover:text-green-800 transition-colors"
                                                                                    >
                                                                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                                        </svg>
                                                                                        Xem file
                                                                                    </a>
                                                                                )}
                                                                            </div>
                                                                            <button
                                                                                type="button"
                                                                                onClick={handleRemoveFile}
                                                                                disabled={isLoading || isFileUploading}
                                                                                className="flex-shrink-0 p-1.5 rounded-lg text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                                                title="Xóa file"
                                                                            >
                                                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {/* File Upload Area */}
                                                                <div className="relative">
                                                                    <input
                                                                        id="templateFile"
                                                                        type="file"
                                                                        onChange={handleFileChange}
                                                                        disabled={isLoading || isFileUploading || !docsTypeField.state.value}
                                                                        accept={allowedTypesForAccept.length > 0 ? allowedTypesForAccept.join(',') : undefined}
                                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                                                                    />
                                                                    <div className={`
                                                                        relative border-2 border-dashed rounded-xl p-6 transition-all
                                                                        ${isLoading || isFileUploading || !docsTypeField.state.value
                                                                            ? 'border-slate-300 bg-slate-50 cursor-not-allowed'
                                                                            : 'border-slate-300 bg-white hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer'
                                                                        }
                                                                    `}>
                                                                        <div className="flex flex-col items-center justify-center text-center">
                                                                            <div className={`
                                                                                mb-3 p-3 rounded-full
                                                                                ${isLoading || isFileUploading || !docsTypeField.state.value
                                                                                    ? 'bg-slate-200'
                                                                                    : 'bg-indigo-100'
                                                                                }
                                                                            `}>
                                                                                {isFileUploading ? (
                                                                                    <svg className="h-6 w-6 text-indigo-600 animate-spin" fill="none" viewBox="0 0 24 24">
                                                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                                    </svg>
                                                                                ) : (
                                                                                    <svg className={`
                                                                                        h-6 w-6
                                                                                        ${isLoading || isFileUploading || !docsTypeField.state.value
                                                                                            ? 'text-slate-400'
                                                                                            : 'text-indigo-600'
                                                                                        }
                                                                                    `} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                                                    </svg>
                                                                                )}
                                                                            </div>
                                                                            <p className={`
                                                                                text-sm font-medium mb-1
                                                                                ${isLoading || isFileUploading || !docsTypeField.state.value
                                                                                    ? 'text-slate-500'
                                                                                    : 'text-slate-700'
                                                                                }
                                                                            `}>
                                                                                {isFileUploading ? 'Đang tải file lên...' : hasFile ? 'Chọn file khác' : 'Chọn file hoặc kéo thả vào đây'}
                                                                            </p>
                                                                            <p className="text-xs text-slate-500">
                                                                                {hasFile ? 'File mới sẽ thay thế file hiện tại' : 'Hỗ trợ kéo thả file trực tiếp'}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Error and Warning Messages */}
                                                                {!docsTypeField.state.value && (
                                                                    <div className="mt-2 flex items-start gap-2 p-2 rounded-lg bg-amber-50 border border-amber-200">
                                                                        <svg className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                                        </svg>
                                                                        <p className="text-xs text-amber-800">
                                                                            Vui lòng chọn loại văn bản trước khi tải file lên
                                                                        </p>
                                                                    </div>
                                                                )}
                                                                {fileUploadError && (
                                                                    <div className="mt-2 flex items-start gap-2 p-2 rounded-lg bg-red-50 border border-red-200">
                                                                        <svg className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                        </svg>
                                                                        <p className="text-xs text-red-800">
                                                                            {fileUploadError}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    }}
                                                </form.Field>
                                            )}
                                        </form.Field>
                                    )}
                                </form.Field>
                            );
                        }}
                    </form.Field>
                </div>
            </div>

            {/* Description */}
            <form.Field
                name="description"
                validators={{
                    onBlur: ({ value }: { value: string | undefined }) => validateDescription(value),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="description" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Mô tả
                            </label>
                            <textarea
                                id="description"
                                className={`w-full rounded-xl border bg-white outline-none transition p-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                placeholder="Nhập mô tả template"
                                rows={3}
                                disabled={isLoading}
                            />
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            {/* Is Active */}
            <form.Field name="isActive">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => (
                    <ToggleSwitch
                        checked={field.state.value ?? false}
                        onChange={(value: boolean) => {
                            field.handleChange(value);
                        }}
                        label="Kích hoạt template"
                        description={field.state.value ? 'Hiển thị công khai' : 'Ẩn khỏi danh sách'}
                        disabled={isLoading}
                        aria-label="Kích hoạt template"
                    />
                )}
            </form.Field>
        </div>
    );
};

