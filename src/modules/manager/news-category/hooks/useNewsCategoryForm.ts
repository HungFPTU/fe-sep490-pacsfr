/**
 * Custom Form Hook for News Category
 * Handles form state, validation, and submission
 */

'use client';

import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { useCreateNewsCategory, useUpdateNewsCategory } from './index';
import type { NewsCategory } from '../types/response';
import type { CreateNewsCategoryRequest, UpdateNewsCategoryRequest } from '../types/request';

type FormValues = {
    categoryCode: string;
    categoryName: string;
    categoryDescription: string;
    isActive: boolean;
};

interface UseNewsCategoryFormProps {
    initData?: NewsCategory | null;
    open: boolean;
    onSuccess?: () => void;
    onClose: () => void;
}

export const useNewsCategoryForm = ({
    initData,
    open,
    onSuccess,
    onClose,
}: UseNewsCategoryFormProps) => {
    const createMutation = useCreateNewsCategory();
    const updateMutation = useUpdateNewsCategory();
    const { addToast } = useGlobalToast();

    const toFormValues = (data?: Partial<NewsCategory> | null): FormValues => ({
        categoryCode: data?.categoryCode ?? '',
        categoryName: data?.categoryName ?? '',
        categoryDescription: data?.categoryDescription ?? '',
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
                const request: CreateNewsCategoryRequest = {
                    categoryCode: value.categoryCode?.trim() || undefined,
                    categoryName: value.categoryName.trim(),
                    categoryDescription: value.categoryDescription?.trim() || '',
                    isActive: value.isActive,
                };

                if (initData?.id) {
                    // Update existing news category
                    const updateRequest: UpdateNewsCategoryRequest = {
                        ...request,
                        id: initData.id,
                    };
                    await updateMutation.mutateAsync({
                        id: initData.id,
                        data: updateRequest,
                    });
                    addToast({
                        message: 'Cập nhật danh mục tin tức thành công',
                        type: 'success',
                    });
                } else {
                    // Create new news category
                    await createMutation.mutateAsync(request);
                    addToast({
                        message: 'Tạo danh mục tin tức thành công',
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
                console.error('Error saving news category:', error);
                // Extract error message from exception
                const errorMessage = error instanceof Error
                    ? error.message
                    : (initData?.id
                        ? 'Cập nhật danh mục tin tức thất bại'
                        : 'Tạo danh mục tin tức thất bại');

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

