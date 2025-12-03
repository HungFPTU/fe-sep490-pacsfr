'use client';

import React, { useState, useEffect } from 'react';
import { ToggleSwitch } from '@/shared/components/manager/ui';
import { InputField } from '@/shared/components/layout/manager/form/BaseForm';
import { ImageIcon, AlertCircle } from 'lucide-react';
import { useImageUpload } from '@/core/hooks/useImageUpload';
import { FormApiOf } from '@/types/types';
import Image from 'next/image';

type FormValues = {
    groupCode: string;
    groupName: string;
    description: string;
    iconUrl: string;
    displayOrder: number;
    isActive: boolean;
};

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any;
    isLoading: boolean;
    isEdit: boolean;
    initData?: { iconUrl?: string | null } | null;
}

export const ServiceGroupForm: React.FC<Props> = ({ form, isLoading, isEdit, initData }) => {
    const [uploadedIconUrl, setUploadedIconUrl] = useState<string>('');
    const [uploadedIconName, setUploadedIconName] = useState<string>('');

    // Sync uploadedIconUrl from both initData and form values
    const formIconUrl = form.state.values.iconUrl;

    useEffect(() => {
        // Priority: form iconUrl > initData iconUrl
        const finalIconUrl = formIconUrl || initData?.iconUrl || '';

        if (finalIconUrl && finalIconUrl !== uploadedIconUrl) {
            setUploadedIconUrl(finalIconUrl);
            const fileName = finalIconUrl.split('/').pop() || 'Icon hiện tại';
            setUploadedIconName(fileName);
        } else if (!finalIconUrl && uploadedIconUrl) {
            // Reset when iconUrl becomes empty
            setUploadedIconUrl('');
            setUploadedIconName('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formIconUrl, initData?.iconUrl, isEdit]);

    const { uploadImage, isUploading, error: uploadError, validateImage } = useImageUpload({
        maxSize: 5 * 1024 * 1024, // 5MB for images
        folder: 'service_groups'
    });

    const handleIconChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Prevent duplicate uploads
        if (isUploading) {
            return;
        }

        // Validate file first
        const validation = validateImage(file);
        if (!validation.isValid) {
            alert(validation.message);
            return;
        }

        try {
            // Upload file to backend
            const result = await uploadImage(file);

            if (result && result.data && result.data.fileUrl) {
                const fileUrl = result.data.fileUrl;
                const fileName = result.data.originalFileName;

                // Update local state
                setUploadedIconUrl(fileUrl);
                setUploadedIconName(fileName);

                // Update form using setFieldValue with callback
                form.setFieldValue('iconUrl', fileUrl, {
                    shouldTouch: true,
                    shouldDirty: true
                });
                // Clear iconFile after successful upload since we now have iconUrl
                form.setFieldValue('iconFile', undefined, {
                    shouldTouch: true,
                    shouldDirty: true
                });

                // Force form to re-render
                form.notify('iconUrl', 'change');
                form.notify('iconFile', 'change');

                // Clear input to prevent duplicate uploads
                if (event.target) {
                    event.target.value = '';
                }

            } else {
                console.error('[ServiceGroupForm] Upload failed - no fileUrl in result:', result);
            }
        } catch (err) {
            console.error('Icon upload failed:', err);
        }
    }

    // Helper to get first error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getFirstError = (field: any) => {
        const te = field.state.meta.touchedErrors;
        const e = field.state.meta.errors;
        const isTouched = field.state.meta.isTouched;
        const arr = isTouched
            ? (Array.isArray(e) && e.length ? e : [])
            : (Array.isArray(te) && te.length ? te : []);
        const first = (arr as Array<string | undefined>).find((m): m is string => typeof m === 'string' && m.length > 0);
        return first ?? null;
    };

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <form.Field name="groupCode">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    return (
                        <div className="w-full">
                            <label htmlFor="groupCode" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Mã nhóm
                            </label>
                            <input
                                id="groupCode"
                                type="text"
                                disabled={true}
                                value={isEdit ? (field.state.value as string) ?? '' : ''}
                                placeholder={isEdit ? '' : 'Mã sẽ được tự động sinh'}
                                className="w-full rounded-xl border bg-slate-100 outline-none transition h-10 px-3 text-sm border-slate-300 cursor-not-allowed"
                            />
                        </div>
                    );
                }}
            </form.Field>

            <form.Field
                name="groupName"
                validators={{
                    onChange: ({ value }: { value: string }) => {
                        if (!value || !value.trim()) {
                            return 'Tên nhóm là bắt buộc';
                        }
                        return undefined;
                    },
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = getFirstError(field);
                    return (
                        <div className="w-full">
                            <label htmlFor="groupName" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Tên nhóm
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <input
                                id="groupName"
                                type="text"
                                disabled={isLoading}
                                value={(field.state.value as string) ?? ''}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.currentTarget.value as never)}
                                placeholder="Nhập tên nhóm dịch vụ"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                            />
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            <InputField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="displayOrder"
                label="Thứ tự hiển thị"
                type="number"
                placeholder="0"
            />

            <div className="md:col-span-2">
                <form.Field
                    name="description"
                    validators={{
                        onChange: ({ value }: { value: string }) => {
                            if (!value || !value.trim()) {
                                return 'Mô tả là bắt buộc';
                            }
                            return undefined;
                        },
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = getFirstError(field);
                        return (
                            <div className="w-full">
                                <label htmlFor="description" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Mô tả
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    disabled={isLoading}
                                    value={(field.state.value as string) ?? ''}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.currentTarget.value as never)}
                                    placeholder="Nhập mô tả nhóm dịch vụ"
                                    rows={4}
                                    className={`w-full rounded-xl border bg-white outline-none transition p-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                />
                                {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                            </div>
                        );
                    }}
                </form.Field>
            </div>

            <div className="md:col-span-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">
                        Icon nhóm dịch vụ
                    </label>

                    {/* Icon Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors relative">
                        <input
                            type="file"
                            onChange={handleIconChange}
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            className="hidden"
                            id="icon-upload"
                            disabled={isUploading || isLoading}
                        />

                        {/* Display image if uploaded or exists */}
                        {(uploadedIconUrl || form.state.values.iconUrl) && !isUploading ? (
                            <label
                                htmlFor="icon-upload"
                                className={`cursor-pointer flex flex-col items-center justify-center space-y-3 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                                    <Image
                                        src={uploadedIconUrl || form.state.values.iconUrl || ''}
                                        alt="Icon preview"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                        {uploadedIconUrl ? 'Icon đã upload' : 'Icon hiện tại'}
                                    </p>
                                    {uploadedIconName && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            {uploadedIconName}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-400 mt-1">
                                        Click để thay đổi
                                    </p>
                                </div>
                            </label>
                        ) : (
                            <label
                                htmlFor="icon-upload"
                                className={`cursor-pointer flex flex-col items-center space-y-2 ${isUploading || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isUploading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                        <span className="text-sm text-gray-600">Đang upload...</span>
                                    </>
                                ) : (
                                    <>
                                        <ImageIcon className="w-8 h-8 text-gray-400" />
                                        <div>
                                            <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                                Chọn icon để upload
                                            </span>
                                            <p className="text-xs text-gray-500 mt-1">
                                                JPG, PNG, GIF, WEBP (tối đa 5MB)
                                            </p>
                                        </div>
                                    </>
                                )}
                            </label>
                        )}
                    </div>

                    {/* Upload Error */}
                    {uploadError && (
                        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-red-600">{uploadError}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-end pb-2">
                <form.Field name="isActive">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => (
                        <ToggleSwitch
                            checked={field.state.value ?? false}
                            onChange={(value: boolean) => {
                                field.handleChange(value);
                                form.setFieldValue('isActive', value);
                            }}
                            label="Kích hoạt nhóm dịch vụ"
                            description={field.state.value ? 'Hiển thị công khai' : 'Ẩn khỏi danh sách'}
                            aria-label="Kích hoạt nhóm dịch vụ"
                            disabled={isLoading}
                        />
                    )}
                </form.Field>
            </div>
        </div>
    );
};

