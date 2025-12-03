/**
 * Custom Form Hook for FAQ Category
 * Handles form state, validation, and submission
 */

import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { useCreateFaqCategory, useUpdateFaqCategory } from './index';
import type { FaqCategory } from '../types/response';
import type { CreateFaqCategoryRequest, UpdateFaqCategoryRequest } from '../types/request';

type FormValues = {
    categoryCode: string;
    categoryName: string;
    description: string;
    isActive: boolean;
};

interface UseFaqCategoryFormProps {
    initData?: FaqCategory | null;
    open: boolean;
    onSuccess?: () => void;
    onClose: () => void;
}

export const useFaqCategoryForm = ({
    initData,
    open,
    onSuccess,
    onClose,
}: UseFaqCategoryFormProps) => {
    const createMutation = useCreateFaqCategory();
    const updateMutation = useUpdateFaqCategory();
    const { addToast } = useGlobalToast();

    const toFormValues = (data?: Partial<FaqCategory> | null): FormValues => ({
        categoryCode: data?.categoryCode ?? '',
        categoryName: data?.categoryName ?? '',
        description: data?.description ?? '',
        isActive: data?.isActive ?? true,
    });

    const form = useForm({
        defaultValues: toFormValues(initData),
        onSubmit: async ({ value }) => {
            // Prevent duplicate submission
            if (createMutation.isPending || updateMutation.isPending) {
                return;
            }

            // Final validation before submit

            if (!value.categoryName?.trim()) {
                addToast({ message: 'Vui lòng nhập tên danh mục', type: 'error' });
                return;
            }

            try {
                const request: CreateFaqCategoryRequest = {
                    categoryCode: value.categoryCode?.trim() || undefined,
                    categoryName: value.categoryName.trim(),
                    description: value.description?.trim() || '',
                    isActive: value.isActive,
                };

                if (initData?.id) {
                    // Update existing FAQ category
                    const updateRequest: UpdateFaqCategoryRequest = {
                        ...request,
                        id: initData.id,
                    };
                    await updateMutation.mutateAsync({
                        id: initData.id,
                        data: updateRequest,
                    });
                    addToast({
                        message: 'Cập nhật danh mục câu hỏi thường gặp thành công',
                        type: 'success',
                    });
                } else {
                    // Create new FAQ category
                    await createMutation.mutateAsync(request);
                    addToast({
                        message: 'Tạo danh mục câu hỏi thường gặp thành công',
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
                console.error('Error saving FAQ category:', error);
                // Extract error message from exception
                const errorMessage = error instanceof Error
                    ? error.message
                    : (initData?.id
                        ? 'Cập nhật danh mục câu hỏi thường gặp thất bại'
                        : 'Tạo danh mục câu hỏi thường gặp thất bại');

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
    }, [open, initData?.id]);

    const isLoading = createMutation.isPending || updateMutation.isPending;

    return {
        form,
        isLoading,
        handleSubmit: () => form.handleSubmit(),
    };
};

