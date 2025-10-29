'use client';

import React, { useState, useEffect } from 'react';
import { ToggleSwitch } from '@/shared/components/manager/ui';
import { InputField, TextareaField } from '@/shared/components/layout/manager/form/BaseForm';
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
}

export const ServiceGroupForm: React.FC<Props> = ({ form, isLoading, isEdit }) => {
    const [uploadedIconUrl, setUploadedIconUrl] = useState<string>('');
    const [uploadedIconName, setUploadedIconName] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false);

    // Debug logging
    console.log('[ServiceGroupForm] Form values:', {
        iconUrl: form.state.values.iconUrl,
        isActive: form.state.values.isActive,
        groupCode: form.state.values.groupCode,
        groupName: form.state.values.groupName,
        formState: form.state
    });

    // Sync uploadedIconUrl with form iconUrl
    const formIconUrl = form.state.values.iconUrl;
    useEffect(() => {
        if (formIconUrl && formIconUrl !== uploadedIconUrl) {
            setUploadedIconUrl(formIconUrl);
            console.log('[ServiceGroupForm] Synced iconUrl from form:', formIconUrl);
        }
    }, [formIconUrl, uploadedIconUrl]);

    const { uploadImage, isUploading, error: uploadError, validateImage } = useImageUpload({
        maxSize: 5 * 1024 * 1024, // 5MB for images
        folder: 'service_groups'
    });

    const handleIconChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Prevent duplicate uploads
        if (isUploading) {
            console.log('[ServiceGroupForm] Already uploading, ignoring duplicate call');
            return;
        }

        console.log('[ServiceGroupForm] File selected:', file.name);
        console.log('[ServiceGroupForm] File details:', {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified
        });
        console.log('[ServiceGroupForm] Current form values before upload:', form.state.values);

        // Validate file first
        console.log('[ServiceGroupForm] Validating file...');
        const validation = validateImage(file);
        console.log('[ServiceGroupForm] Validation result:', validation);

        if (!validation.isValid) {
            console.error('[ServiceGroupForm] Validation failed:', validation.message);
            alert(validation.message);
            return;
        }

        console.log('[ServiceGroupForm] File validation passed, starting upload...');
        try {
            // Upload file to backend
            console.log('[ServiceGroupForm] Calling uploadImage...');
            const result = await uploadImage(file);
            console.log('[ServiceGroupForm] Upload result:', result);

            if (result && result.data && result.data.fileUrl) {
                const fileUrl = result.data.fileUrl;
                const fileName = result.data.originalFileName;

                console.log('[ServiceGroupForm] Setting iconUrl to:', fileUrl);

                // Update local state
                setUploadedIconUrl(fileUrl);
                setUploadedIconName(fileName);
                setIsActive(true);

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

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <form.Field
                name="groupCode"
                validators={{
                    onChange: ({ value }: { value: string }) => {
                        if (!value || !value.trim()) {
                            return 'Mã nhóm là bắt buộc';
                        }
                        return undefined;
                    },
                }}
            >
                {() => (
                    <InputField<FormValues>
                        form={form as FormApiOf<FormValues>}
                        name="groupCode"
                        label="Mã nhóm"
                        required
                        placeholder="Nhập mã nhóm dịch vụ"
                        disabled={isEdit}
                    />
                )}
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
                {() => (
                    <InputField<FormValues>
                        form={form as FormApiOf<FormValues>}
                        name="groupName"
                        label="Tên nhóm"
                        required
                        placeholder="Nhập tên nhóm dịch vụ"
                    />
                )}
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
                    {() => (
                        <TextareaField<FormValues>
                            form={form as FormApiOf<FormValues>}
                            name="description"
                            label="Mô tả"
                            required
                            placeholder="Nhập mô tả nhóm dịch vụ"
                            rows={4}
                        />
                    )}
                </form.Field>
            </div>

            <div className="md:col-span-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">
                        Icon nhóm dịch vụ
                    </label>

                    {/* Icon Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <input
                            type="file"
                            onChange={handleIconChange}
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            className="hidden"
                            id="icon-upload"
                            disabled={isUploading || isLoading}
                        />
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
                    </div>

                    {/* Upload Error */}
                    {uploadError && (
                        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-red-600">{uploadError}</span>
                        </div>
                    )}

                    {/* Current Icon Preview */}
                    {form.state.values.iconUrl && !uploadedIconUrl && (
                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                            <div className="flex items-center space-x-3">
                                <Image
                                    src={form.state.values.iconUrl}
                                    alt="Current icon"
                                    width={48}
                                    height={48}
                                    className="w-12 h-12 object-cover rounded"
                                />
                                <div>
                                    <p className="text-sm text-gray-700 font-medium">
                                        Icon hiện tại
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Click để thay đổi
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Uploaded Icon Preview */}
                    {uploadedIconUrl && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                            <div className="flex items-center space-x-3">
                                <Image
                                    src={uploadedIconUrl}
                                    alt="Uploaded icon"
                                    width={48}
                                    height={48}
                                    className="w-12 h-12 object-cover rounded"
                                />
                                <div>
                                    <p className="text-sm text-green-700 font-medium">
                                        Icon đã upload
                                    </p>
                                    <p className="text-xs text-green-600">
                                        {uploadedIconName}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-end pb-2">
                <ToggleSwitch
                    checked={isActive}
                    onChange={(value: boolean) => setIsActive(value)}
                    label="Kích hoạt nhóm dịch vụ"
                    description={isActive ? 'Hiển thị công khai' : 'Ẩn khỏi danh sách'}
                    aria-label="Kích hoạt nhóm dịch vụ"
                />
            </div>
        </div>
    );
};

