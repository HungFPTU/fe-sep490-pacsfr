/**
 * Custom Form Hook for Public Service News
 * Handles form state, validation, and submission
 */

'use client';

import { useEffect, useMemo } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { useCreatePublicServiceNews, useUpdatePublicServiceNews } from './index';
import { useAuth } from '@/modules/auth/hooks';
import type { PublicServiceNews } from '../types/response';
import type { CreatePublicServiceNewsRequest, UpdatePublicServiceNewsRequest } from '../types/request';

type FormValues = {
    serviceId: string;
    newsCategoryId: string;
    staffId?: string;
    title: string;
    thumbnailUrl: string;
    content: string;
    summary: string;
    isPublished: boolean;
};

interface UsePublicServiceNewsFormProps {
    initData?: PublicServiceNews | null;
    open: boolean;
    onSuccess?: () => void;
    onClose: () => void;
}

export const usePublicServiceNewsForm = ({
    initData,
    open,
    onSuccess,
    onClose,
}: UsePublicServiceNewsFormProps) => {
    const createMutation = useCreatePublicServiceNews();
    const updateMutation = useUpdatePublicServiceNews();
    const { addToast } = useGlobalToast();
    const { user } = useAuth();

    const currentStaffId = useMemo(() => user?.id ?? undefined, [user?.id]);

    const toFormValues = (data?: Partial<PublicServiceNews> | null): FormValues => ({
        serviceId: data?.serviceId ?? '',
        newsCategoryId: data?.newsCategoryId ?? '',
        staffId: data?.staffId ?? currentStaffId,
        title: data?.title ?? '',
        thumbnailUrl: data?.thumbnailUrl ?? '',
        content: data?.content ?? '',
        summary: data?.summary ?? '',
        isPublished: data?.isPublished ?? false,
    });

    const form = useForm({
        defaultValues: toFormValues(initData),
        onSubmit: async ({ value }) => {
            // Prevent duplicate submission
            if (createMutation.isPending || updateMutation.isPending) {
                return;
            }

            // Final validation before submit
            if (!value.serviceId?.trim()) {
                addToast({ message: 'Vui lòng chọn dịch vụ', type: 'error' });
                return;
            }
            if (!value.newsCategoryId?.trim()) {
                addToast({ message: 'Vui lòng chọn danh mục tin tức', type: 'error' });
                return;
            }
            if (!value.title?.trim()) {
                addToast({ message: 'Vui lòng nhập tiêu đề', type: 'error' });
                return;
            }
            if (!value.content?.trim()) {
                addToast({ message: 'Vui lòng nhập nội dung', type: 'error' });
                return;
            }

            try {
                const request: CreatePublicServiceNewsRequest = {
                    serviceId: value.serviceId.trim(),
                    newsCategoryId: value.newsCategoryId.trim(),
                    title: value.title.trim(),
                    thumbnailUrl: value.thumbnailUrl?.trim() || '',
                    content: value.content.trim(),
                    summary: value.summary?.trim() || '',
                    isPublished: value.isPublished,
                };

                const staffFromForm = value.staffId?.trim() || currentStaffId;
                if (staffFromForm) {
                    request.staffId = staffFromForm;
                }

                if (initData?.id) {
                    // Update existing public service news
                    const updateRequest: UpdatePublicServiceNewsRequest = {
                        ...request,
                        id: initData.id,
                    };
                    await updateMutation.mutateAsync({
                        id: initData.id,
                        data: updateRequest,
                    });
                    addToast({
                        message: 'Cập nhật tin tức dịch vụ công thành công',
                        type: 'success',
                    });
                } else {
                    // Create new public service news
                    await createMutation.mutateAsync(request);
                    addToast({
                        message: 'Tạo tin tức dịch vụ công thành công',
                        type: 'success',
                    });
                }

                onSuccess?.();
                onClose();

                // Reset form after successful submit
                setTimeout(() => {
                    form.reset(toFormValues(null));
                }, 100);
            } catch (error) {
                console.error('Error saving public service news:', error);
                // Extract error message from exception
                const errorMessage = error instanceof Error
                    ? error.message
                    : (initData?.id
                        ? 'Cập nhật tin tức dịch vụ công thất bại'
                        : 'Tạo tin tức dịch vụ công thất bại');

                addToast({
                    message: errorMessage,
                    type: 'error',
                });
            }
        },
    });

    useEffect(() => {
        if (open) {
            form.reset(toFormValues(initData));
        } else {
            form.reset(toFormValues(null));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, initData?.id, currentStaffId]);

    const isLoading = createMutation.isPending || updateMutation.isPending;

    return {
        form,
        isLoading,
        handleSubmit: () => form.handleSubmit(),
    };
};

