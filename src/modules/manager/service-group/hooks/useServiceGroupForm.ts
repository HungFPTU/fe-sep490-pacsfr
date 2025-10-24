import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { useCreateServiceGroup, useUpdateServiceGroup } from './index';
import type { ServiceGroup, CreateServiceGroupRequest } from '../types';

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
            try {
                const request: CreateServiceGroupRequest = {
                    groupCode: value.groupCode,
                    groupName: value.groupName,
                    description: value.description,
                    iconUrl: value.iconUrl,
                    displayOrder: value.displayOrder,
                    isActive: value.isActive,
                };

                let res;
                if (initData?.id) {
                    // Update existing service group
                    res = await updateMutation.mutateAsync({
                        id: initData?.id ?? '',
                        request: {
                            ...request,
                            id: initData?.id ?? '',
                        },
                    });
                } else {
                    // Create new service group
                    res = await createMutation.mutateAsync(request);
                }

                // Always close and reset on success
                if (res?.success) {
                    addToast({
                        message: initData?.id ? 'Cập nhật nhóm dịch vụ thành công' : 'Tạo nhóm dịch vụ thành công',
                        type: 'success'
                    });
                    onSuccess?.();
                    onClose();
                    // Reset form after successful submit
                    setTimeout(() => {
                        form.reset(toFormValues(null));
                    }, 100);
                } else {
                    addToast({
                        message: initData?.id ? 'Cập nhật nhóm dịch vụ thất bại' : 'Tạo nhóm dịch vụ thất bại',
                        type: 'error'
                    });
                }
            } catch (error) {
                console.error('Error saving service group:', error);
                addToast({ message: 'Đã xảy ra lỗi khi lưu nhóm dịch vụ', type: 'error' });
            }
        },
    });

    useEffect(() => {
        if (open) {
            // Always reset with current initData when modal opens
            form.reset(toFormValues(initData));
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

