/**
 * Custom Form Hook for TargetAudience
 * Handles form state, validation, and submission
 */

import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { useCreateTargetAudience, useUpdateTargetAudience } from './index';
import type { TargetAudience } from '../types/response';
import type { CreateTargetAudienceRequest, UpdateTargetAudienceRequest } from '../types/request';

type FormValues = {
    name: string;
    description: string;
    isActive: boolean;
};

interface UseTargetAudienceFormProps {
    initData?: TargetAudience | null;
    open: boolean;
    onSuccess?: () => void;
    onClose: () => void;
}

export const useTargetAudienceForm = ({
    initData,
    open,
    onSuccess,
    onClose,
}: UseTargetAudienceFormProps) => {
    const createMutation = useCreateTargetAudience();
    const updateMutation = useUpdateTargetAudience();
    const { addToast } = useGlobalToast();

    const toFormValues = (data?: Partial<TargetAudience> | null): FormValues => ({
        name: data?.name ?? '',
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
            if (!value.name?.trim()) {
                addToast({ message: 'Vui lòng nhập tên đối tượng', type: 'error' });
                return;
            }
            if (!value.description?.trim()) {
                addToast({ message: 'Vui lòng nhập mô tả', type: 'error' });
                return;
            }

            try {
                const request: CreateTargetAudienceRequest = {
                    name: value.name.trim(),
                    description: value.description.trim(),
                    isActive: value.isActive,
                };

                if (initData?.id) {
                    // Update existing TargetAudience
                    const updateRequest: UpdateTargetAudienceRequest = {
                        ...request,
                        id: initData.id,
                    };
                    await updateMutation.mutateAsync({
                        id: initData.id,
                        data: updateRequest,
                    });
                    addToast({
                        message: 'Cập nhật đối tượng thành công',
                        type: 'success',
                    });
                } else {
                    // Create new TargetAudience
                    await createMutation.mutateAsync(request);
                    addToast({
                        message: 'Tạo đối tượng thành công',
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
                console.error('Error saving TargetAudience:', error);
                // Extract error message from exception
                const errorMessage = error instanceof Error
                    ? error.message
                    : (initData?.id
                        ? 'Cập nhật đối tượng thất bại'
                        : 'Tạo đối tượng thất bại');

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

