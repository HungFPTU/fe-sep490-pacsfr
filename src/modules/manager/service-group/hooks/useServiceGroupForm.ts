/**
 * Custom Form Hook for Service Group
 * Handles form state, validation, and submission
 */

import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { useCreateServiceGroup, useUpdateServiceGroup } from './index';
import type { ServiceGroup } from '../types/response';
import type { CreateServiceGroupRequest, UpdateServiceGroupRequest } from '../types/request';

type FormValues = {
    groupCode: string;
    groupName: string;
    description: string;
    iconUrl: string;
    displayOrder: number;
    isActive: boolean;
};

interface UseServiceGroupFormProps {
    initData?: ServiceGroup | null;
    open: boolean;
    onSuccess?: () => void;
    onClose: () => void;
}

export const useServiceGroupForm = ({
    initData,
    open,
    onSuccess,
    onClose,
}: UseServiceGroupFormProps) => {
    const createMutation = useCreateServiceGroup();
    const updateMutation = useUpdateServiceGroup();
    const { addToast } = useGlobalToast();

    const toFormValues = (data?: Partial<ServiceGroup> | null): FormValues => ({
        groupCode: data?.groupCode ?? '',
        groupName: data?.groupName ?? '',
        description: data?.description ?? '',
        iconUrl: data?.iconUrl ?? '',
        displayOrder: data?.displayOrder ?? 0,
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
                addToast({ message: 'Vui lòng nhập mã nhóm', type: 'error' });
                return;
            }
            if (!value.groupName?.trim()) {
                addToast({ message: 'Vui lòng nhập tên nhóm', type: 'error' });
                return;
            }

            try {
                const request: CreateServiceGroupRequest = {
                    groupCode: value.groupCode.trim(),
                    groupName: value.groupName.trim(),
                    description: value.description?.trim() || '',
                    iconUrl: value.iconUrl.trim(),
                    displayOrder: value.displayOrder,
                    isActive: value.isActive,
                };

                if (initData?.id) {
                    // Update existing service group
                    const updateRequest: UpdateServiceGroupRequest = {
                        ...request,
                        id: initData.id,
                    };
                    await updateMutation.mutateAsync({
                        id: initData.id,
                        data: updateRequest,
                    });
                    addToast({
                        message: 'Cập nhật nhóm dịch vụ thành công',
                        type: 'success',
                    });
                } else {
                    // Create new service group
                    await createMutation.mutateAsync(request);
                    addToast({
                        message: 'Tạo nhóm dịch vụ thành công',
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
                console.error('Error saving service group:', error);
                // Extract error message from exception
                const errorMessage = error instanceof Error 
                    ? error.message 
                    : (initData?.id
                        ? 'Cập nhật nhóm dịch vụ thất bại'
                        : 'Tạo nhóm dịch vụ thất bại');
                
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
