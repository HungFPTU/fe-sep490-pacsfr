'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ToggleSwitch } from '@/shared/components/manager/ui';
import { Button } from '@/shared/components/ui/button.ui';
import { Input } from '@/shared/components/ui/input.ui';
import { useServices } from '@/modules/manager/service/hooks';
import { useNewsCategories } from '@/modules/manager/news-category/hooks';
import { getValuesPage } from '@/types/rest';
import type { Service } from '@/modules/manager/service/types';
import type { NewsCategory } from '@/modules/manager/news-category/types';
import { useImageUpload } from '@/core/hooks/useImageUpload';
import {
    validateTitle,
    validateContent,
    validateSummary,
    validateServiceId,
    validateNewsCategoryId,
} from '../../../utils';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any;
    isLoading: boolean;
    isEdit: boolean;
}

export const PublicServiceNewsForm: React.FC<Props> = ({ form, isLoading, isEdit }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [previewName, setPreviewName] = useState<string>('');

    const { uploadImage, isUploading, error: uploadError, validateImage } = useImageUpload({
        folder: 'public-service-news',
    });

    const { data: servicesData } = useServices({
        keyword: '',
        serviceGroupId: '',
        legalBasisId: '',
        isActive: true,
        page: 1,
        size: 100,
    });

    const { data: categoriesData } = useNewsCategories({
        keyword: '',
        isActive: true,
        page: 1,
        size: 100,
    });

    const serviceOptions = useMemo(() => {
        const page = servicesData ? getValuesPage(servicesData) : null;
        return (page?.items || []) as Service[];
    }, [servicesData]);

    const categoryOptions = useMemo(() => {
        const page = categoriesData ? getValuesPage(categoriesData) : null;
        return (page?.items || []) as NewsCategory[];
    }, [categoriesData]);

    const formThumbnail = form.state.values.thumbnailUrl as string | undefined;

    useEffect(() => {
        const finalUrl = formThumbnail || '';
        if (finalUrl && finalUrl !== previewUrl) {
            setPreviewUrl(finalUrl);
            const fileName = finalUrl.split('/').pop() || 'Thumbnail hiện tại';
            setPreviewName(fileName);
        }
        if (!finalUrl && previewUrl) {
            setPreviewUrl('');
            setPreviewName('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formThumbnail, isEdit]);

    const handleChooseImage = () => {
        fileInputRef.current?.click();
    };

    const handleThumbnailChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || isUploading) {
            return;
        }

        const validation = validateImage(file);
        if (!validation.isValid) {
            alert(validation.message || 'Tệp không hợp lệ');
            event.target.value = '';
            return;
        }

        try {
            const result = await uploadImage(file);
            if (result?.data?.fileUrl) {
                const fileUrl = result.data.fileUrl;
                const fileName = result.data.originalFileName;
                setPreviewUrl(fileUrl);
                setPreviewName(fileName || 'Thumbnail');
                form.setFieldValue('thumbnailUrl', fileUrl, {
                    shouldTouch: true,
                    shouldDirty: true,
                });
            }
        } finally {
            event.target.value = '';
        }
    };

    const handleRemoveThumbnail = () => {
        setPreviewUrl('');
        setPreviewName('');
        form.setFieldValue('thumbnailUrl', '', {
            shouldTouch: true,
            shouldDirty: true,
        });
    };

    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-1 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            {isEdit ? 'Cập nhật tin tức dịch vụ công' : 'Tạo tin tức dịch vụ công'}
                        </h2>
                    </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <form.Field
                        name="serviceId"
                        validators={{
                            onBlur: ({ value }: { value: string }) => validateServiceId(value),
                        }}
                    >
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {(field: any) => {
                            const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                            return (
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="serviceId" className="text-sm font-medium text-slate-700">
                                        Dịch vụ <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="serviceId"
                                        className={`h-10 w-full rounded-lg border bg-white px-3 text-sm transition focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-200 ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-slate-300'} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                        value={(field.state.value as string) || ''}
                                        onChange={(e) => field.handleChange(e.target.value as never)}
                                        onBlur={field.handleBlur}
                                        disabled={isLoading}
                                    >
                                        <option value="">Chọn dịch vụ</option>
                                        {serviceOptions.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.serviceName}
                                            </option>
                                        ))}
                                    </select>
                                    {error && <p className="text-xs text-red-600">{error}</p>}
                                </div>
                            );
                        }}
                    </form.Field>

                    <form.Field
                        name="newsCategoryId"
                        validators={{
                            onBlur: ({ value }: { value: string }) => validateNewsCategoryId(value),
                        }}
                    >
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {(field: any) => {
                            const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                            return (
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="newsCategoryId" className="text-sm font-medium text-slate-700">
                                        Danh mục tin tức <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="newsCategoryId"
                                        className={`h-10 w-full rounded-lg border bg-white px-3 text-sm transition focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-200 ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-slate-300'} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                        value={(field.state.value as string) || ''}
                                        onChange={(e) => field.handleChange(e.target.value as never)}
                                        onBlur={field.handleBlur}
                                        disabled={isLoading}
                                    >
                                        <option value="">Chọn danh mục</option>
                                        {categoryOptions.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.categoryName}
                                            </option>
                                        ))}
                                    </select>
                                    {error && <p className="text-xs text-red-600">{error}</p>}
                                </div>
                            );
                        }}
                    </form.Field>

                    <form.Field
                        name="title"
                        validators={{
                            onBlur: ({ value }: { value: string }) => validateTitle(value),
                        }}
                    >
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {(field: any) => {
                            const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                            return (
                                <div className="md:col-span-2 flex flex-col gap-1">
                                    <label htmlFor="title" className="text-sm font-medium text-slate-700">
                                        Tiêu đề <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="title"
                                        value={(field.state.value as string) || ''}
                                        onChange={(e) => field.handleChange(e.target.value as never)}
                                        onBlur={field.handleBlur}
                                        placeholder="VD: Hướng dẫn đăng ký dịch vụ trực tuyến"
                                        className="h-10 rounded-lg border-slate-300 text-sm"
                                        disabled={isLoading}
                                    />
                                    {error && <p className="text-xs text-red-600">{error}</p>}
                                </div>
                            );
                        }}
                    </form.Field>
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <form.Field
                    name="summary"
                    validators={{
                        onBlur: ({ value }: { value: string }) => validateSummary(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="flex flex-col gap-1">
                                <label htmlFor="summary" className="text-sm font-medium text-slate-700">
                                    Tóm tắt
                                </label>
                                <textarea
                                    id="summary"
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    placeholder="Tóm tắt ngắn gọn nội dung chính"
                                    rows={4}
                                    className={`w-full rounded-lg border bg-white p-3 text-sm transition focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-200 ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-slate-300'} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    disabled={isLoading}
                                />
                                {error && <p className="text-xs text-red-600">{error}</p>}
                            </div>
                        );
                    }}
                </form.Field>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <form.Field
                    name="content"
                    validators={{
                        onBlur: ({ value }: { value: string }) => validateContent(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="flex flex-col gap-1">
                                <label htmlFor="content" className="text-sm font-medium text-slate-700">
                                    Nội dung chi tiết <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="content"
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    placeholder="Nhập nội dung chi tiết cho bài viết"
                                    rows={10}
                                    className={`w-full rounded-lg border bg-white p-3 text-sm transition focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-200 ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-slate-300'} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    disabled={isLoading}
                                />
                                {error && <p className="text-xs text-red-600">{error}</p>}
                            </div>
                        );
                    }}
                </form.Field>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-800">Hình đại diện</h3>
                        <p className="text-xs text-muted-foreground">Dung lượng tối đa 5MB. Định dạng JPG, PNG, GIF, WEBP.</p>
                    </div>
                    {previewUrl && (
                        <Button variant="ghost" size="sm" onClick={handleRemoveThumbnail} disabled={isLoading}>
                            Xóa
                        </Button>
                    )}
                </div>
                <div className="mt-4 border-2 border-dashed border-slate-300 p-4 rounded-xl">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleThumbnailChange}
                        disabled={isUploading || isLoading}
                    />
                    <label
                        htmlFor="thumbnail"
                        className={`flex flex-col items-center justify-center gap-3 ${isUploading || isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                        onClick={handleChooseImage}
                    >
                        {previewUrl ? (
                            <div className="relative h-32 w-full overflow-hidden rounded-lg border border-slate-200">
                                <Image src={previewUrl} alt="Thumbnail preview" fill className="object-cover" />
                            </div>
                        ) : (
                            <div className="flex h-32 w-full items-center justify-center rounded-lg bg-slate-50 text-sm text-muted-foreground">
                                Nhấn để chọn hình từ thiết bị
                            </div>
                        )}
                        <div className="text-center text-xs text-slate-500">
                            {isUploading ? 'Đang tải...' : previewName || 'Chưa có hình được chọn'}
                        </div>
                    </label>
                </div>
                {uploadError && (
                    <p className="mt-2 text-xs text-red-600">{uploadError}</p>
                )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-800">Trạng thái</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                    Đặt trạng thái xuất bản cho bài viết này.
                </p>
                <div className="mt-4">
                    <form.Field name="isPublished">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {(field: any) => (
                            <ToggleSwitch
                                checked={field.state.value ?? false}
                                onChange={(value: boolean) => field.handleChange(value)}
                                label={field.state.value ? 'Xuất bản ngay' : 'Lưu dưới dạng nháp'}
                                description={
                                    field.state.value
                                        ? 'Bài viết sẽ hiển thị ngay cho người dân.'
                                        : 'Bạn có thể chỉnh sửa thêm trước khi xuất bản.'
                                }
                                disabled={isLoading}
                                aria-label="Xuất bản tin tức"
                            />
                        )}
                    </form.Field>
                </div>
            </div>

            {previewUrl && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
                    Đường dẫn hình đại diện: <a href={previewUrl} className="text-sky-600 hover:underline" target="_blank" rel="noreferrer">{previewUrl}</a>
                </div>
            )}
        </div>
    );
};
