import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { useCreateDepartment, useUpdateDepartment } from './index';
import type { Department, CreateDepartmentRequest } from '../types';

type FormValues = {
    serviceGroupId: string;
    code: string;
    name: string;
    description: string;
    levelOrder: number;
    isActive: boolean;
};

interface UseDepartmentFormProps {
    initData?: Department | null;
    open: boolean;
    onSuccess?: () => void;
    onClose: () => void;
}

export const useDepartmentForm = ({
    initData,
    open,
    onSuccess,
    onClose,
}: UseDepartmentFormProps) => {
    const createMutation = useCreateDepartment();
    const updateMutation = useUpdateDepartment();
    const { addToast } = useGlobalToast();

    const toFormValues = (data?: Department | null): FormValues => ({
        serviceGroupId: data?.serviceGroupId ?? '',
        code: data?.code ?? '',
        name: data?.name ?? '',
        description: data?.description ?? '',
        levelOrder: data?.levelOrder ?? 0,
        isActive: data?.isActive ?? true,
    });

    const form = useForm({
        defaultValues: toFormValues(initData),
        onSubmit: async ({ value }) => {
            // Final validation before submit
            if (!value.serviceGroupId?.trim()) {
                addToast({ message: 'Vui lòng chọn nhóm dịch vụ', type: 'error' });
                return;
            }
            if (!value.code?.trim()) {
                addToast({ message: 'Vui lòng nhập mã phòng ban', type: 'error' });
                return;
            }
            if (!value.name?.trim()) {
                addToast({ message: 'Vui lòng nhập tên phòng ban', type: 'error' });
                return;
            }

            try {
                const request: CreateDepartmentRequest = {
                    serviceGroupId: (initData as Department)?.serviceGroupId ?? value.serviceGroupId.trim(),
                    code: value.code.trim(),
                    name: value.name.trim(),
                    description: value.description?.trim() || '',
                    levelOrder: Number(value.levelOrder),
                    isActive: value.isActive,
                };

                let res;
                if (initData?.id) {
                    // Update existing department
                    res = await updateMutation.mutateAsync({
                        id: initData?.id ?? '',
                        request: {
                            ...request,
                            id: initData?.id ?? '',
                        },
                    });
                } else {
                    // Create new department
                    res = await createMutation.mutateAsync(request);
                }

                // Always close and reset on success
                if (res?.success) {
                    addToast({
                        message: initData?.id ? 'Cập nhật phòng ban thành công' : 'Tạo phòng ban thành công',
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
                        message: initData?.id ? 'Cập nhật phòng ban thất bại' : 'Tạo phòng ban thất bại',
                        type: 'error'
                    });
                }
            } catch (error) {
                console.error('Error saving department:', error);
                addToast({ message: 'Đã xảy ra lỗi khi lưu phòng ban', type: 'error' });
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

