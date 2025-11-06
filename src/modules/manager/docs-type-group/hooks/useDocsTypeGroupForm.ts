/**
 * Custom Form Hook for Docs Type Group
 * Handles form state, validation, and submission
 */

import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { useCreateDocsTypeGroup, useUpdateDocsTypeGroup } from './index';
import type { DocsTypeGroup } from '../types/response';
import type { CreateDocsTypeGroupRequest, UpdateDocsTypeGroupRequest } from '../types/request';

type FormValues = {
    groupCode: string;
    groupName: string;
    description: string;
    isActive: boolean;
};

interface UseDocsTypeGroupFormProps {
    initData?: DocsTypeGroup | null;
    open: boolean;
    onSuccess?: () => void;
    onClose: () => void;
}

export const useDocsTypeGroupForm = ({
    initData,
    open,
    onSuccess,
    onClose,
}: UseDocsTypeGroupFormProps) => {
    const createMutation = useCreateDocsTypeGroup();
    const updateMutation = useUpdateDocsTypeGroup();
    const { addToast } = useGlobalToast();

    const toFormValues = (data?: Partial<DocsTypeGroup> | null): FormValues => ({
        groupCode: data?.groupCode ?? '',
        groupName: data?.groupName ?? '',
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
            if (!value.groupCode?.trim()) {
                addToast({ message: 'Vui lòng nhập mã nhóm hồ sơ', type: 'error' });
                return;
            }
            if (!value.groupName?.trim()) {
                addToast({ message: 'Vui lòng nhập tên nhóm hồ sơ', type: 'error' });
                return;
            }

            try {
                const request: CreateDocsTypeGroupRequest = {
                    groupCode: value.groupCode.trim(),
                    groupName: value.groupName.trim(),
                    description: value.description?.trim() || '',
                    isActive: value.isActive,
                };

                if (initData?.id) {
                    // Update existing docs type group
                    const updateRequest: UpdateDocsTypeGroupRequest = {
                        ...request,
                        id: initData.id,
                    };
                    await updateMutation.mutateAsync({
                        id: initData.id,
                        data: updateRequest,
                    });
                    addToast({
                        message: 'Cập nhật nhóm hồ sơ thành công',
                        type: 'success',
                    });
                } else {
                    // Create new docs type group
                    await createMutation.mutateAsync(request);
                    addToast({
                        message: 'Tạo nhóm hồ sơ thành công',
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
                console.error('Error saving docs type group:', error);
                // Extract error message from exception
                const errorMessage = error instanceof Error 
                    ? error.message 
                    : (initData?.id
                        ? 'Cập nhật nhóm hồ sơ thất bại'
                        : 'Tạo nhóm hồ sơ thất bại');
                
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

