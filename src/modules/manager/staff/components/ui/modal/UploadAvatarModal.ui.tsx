'use client';

import React, { useState, useRef } from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { useUploadAvatar } from '../../../hooks';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { Staff } from '../../../types';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface UploadAvatarModalProps {
    open: boolean;
    onClose: () => void;
    staff: Staff | null;
    onSuccess?: () => void;
}

export function UploadAvatarModal({ open, onClose, staff, onSuccess }: UploadAvatarModalProps) {
    const { addToast } = useGlobalToast();
    const uploadMutation = useUploadAvatar();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const isLoading = uploadMutation.isPending;

    // Reset when modal opens/closes
    React.useEffect(() => {
        if (open) {
            setSelectedFile(null);
            setPreviewUrl(null);
        }
    }, [open]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                addToast({
                    message: 'Vui lòng chọn file ảnh',
                    type: 'error',
                });
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                addToast({
                    message: 'Kích thước file không được vượt quá 5MB',
                    type: 'error',
                });
                return;
            }

            setSelectedFile(file);
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async () => {
        if (!staff || !selectedFile) {
            addToast({
                message: 'Vui lòng chọn file ảnh',
                type: 'error',
            });
            return;
        }

        try {
            const res = await uploadMutation.mutateAsync({
                staffId: staff.id,
                file: selectedFile,
            });

            if (res?.success) {
                addToast({
                    message: 'Cập nhật ảnh đại diện thành công',
                    type: 'success',
                });
                onSuccess?.();
                onClose();
            } else {
                addToast({
                    message: 'Cập nhật ảnh đại diện thất bại',
                    type: 'error',
                });
            }
        } catch (error) {
            console.error('Error uploading avatar:', error);
            addToast({
                message: 'Cập nhật ảnh đại diện thất bại',
                type: 'error',
            });
        }
    };

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title="Cập nhật ảnh đại diện cho nhân viên"
            onOk={handleSubmit}
            onCancel={onClose}
            okText={isLoading ? 'Đang tải lên...' : 'Cập nhật'}
            cancelText="Hủy"
            centered
            size="medium"
            maskClosable={!isLoading}
            keyboard={!isLoading}
            confirmLoading={isLoading}
            destroyOnClose={true}
        >
            <div className="space-y-6">
                {/* Staff Info */}
                {staff && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-blue-900 mb-2">Thông tin nhân viên</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div>
                                <span className="text-blue-700 font-medium">Mã NV:</span>
                                <span className="ml-2 text-blue-600">{staff.staffCode}</span>
                            </div>
                            <div>
                                <span className="text-blue-700 font-medium">Họ tên:</span>
                                <span className="ml-2 text-blue-600">{staff.fullName}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Current Avatar */}
                {staff?.avatarUrl && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ảnh đại diện hiện tại
                        </label>
                        <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                            <Image
                                src={staff.avatarUrl}
                                alt={staff.fullName}
                                width={128}
                                height={128}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}

                {/* File Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Chọn ảnh đại diện mới <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-4">
                        {!selectedFile ? (
                            <div
                                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <p className="mt-2 text-sm text-gray-600">
                                    Click để chọn file hoặc kéo thả file vào đây
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    Hỗ trợ: JPG, PNG, GIF (Tối đa 5MB)
                                </p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    disabled={isLoading}
                                />
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                                    {previewUrl && (
                                        <Image
                                            src={previewUrl}
                                            alt="Preview"
                                            width={512}
                                            height={512}
                                            className="w-full h-full object-contain"
                                        />
                                    )}
                                    <button
                                        type="button"
                                        onClick={handleRemoveFile}
                                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                        disabled={isLoading}
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <ImageIcon className="w-4 h-4" />
                                    <span>{selectedFile.name}</span>
                                    <span className="text-gray-400">
                                        ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-sm text-blue-600 hover:text-blue-700 underline"
                                    disabled={isLoading}
                                >
                                    Chọn file khác
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    disabled={isLoading}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </BaseModal>
    );
}

