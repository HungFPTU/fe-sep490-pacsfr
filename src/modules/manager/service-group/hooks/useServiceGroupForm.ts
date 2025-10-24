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

                if (initData?.id) {
                    // Update existing service group
                    const res = await updateMutation.mutateAsync({
                        id: initData?.id ?? '',
                        request: {
                            ...request,
                            id: initData?.id ?? '',
                        },
                    });
                    if (res?.success) {
                        addToast({ message: 'Cập nhật nhóm dịch vụ thành công', type: 'success' });
                        onSuccess?.();
                        onClose();
                    } else {
                        addToast({ message: 'Cập nhật nhóm dịch vụ thất bại', type: 'error' });
                    }
                } else {
                    // Create new service group
                    const res = await createMutation.mutateAsync(request);
                    if (res?.success) {
                        addToast({ message: 'Tạo nhóm dịch vụ thành công', type: 'success' });
                        onSuccess?.();
                        onClose();
                    } else {
                        addToast({ message: 'Tạo nhóm dịch vụ thất bại', type: 'error' });
                    }
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

