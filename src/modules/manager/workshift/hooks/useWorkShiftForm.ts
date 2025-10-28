import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { useCreateWorkShift, useUpdateWorkShift } from './index';
import type { WorkShift, CreateWorkShiftRequest } from '../types';

type FormValues = {
    name: string;
    startTime: string;
    endTime: string;
    description?: string;
    isActive: boolean;
};

interface UseWorkShiftFormProps {
    initData?: WorkShift | null;
    open: boolean;
    onSuccess?: () => void;
    onClose: () => void;
}

export const useWorkShiftForm = ({
    initData,
    open,
    onSuccess,
    onClose,
}: UseWorkShiftFormProps) => {
    const createMutation = useCreateWorkShift();
    const updateMutation = useUpdateWorkShift();
    const { addToast } = useGlobalToast();

    const toFormValues = (data?: WorkShift | null): FormValues => ({
        name: data?.name ?? '',
        startTime: data?.startTime ?? '',
        endTime: data?.endTime ?? '',
        description: data?.description ?? '',
        isActive: data?.isActive ?? true,
    });

    const form = useForm({
        defaultValues: toFormValues(initData),
        onSubmit: async ({ value }) => {
            // Final validation before submit
            if (!value.name?.trim()) {
                addToast({ message: 'Vui lòng nhập tên ca', type: 'error' });
                return;
            }
            if (!value.startTime?.trim()) {
                addToast({ message: 'Vui lòng nhập giờ bắt đầu', type: 'error' });
                return;
            }
            if (!value.endTime?.trim()) {
                addToast({ message: 'Vui lòng nhập giờ kết thúc', type: 'error' });
                return;
            }

            try {
                const request: CreateWorkShiftRequest = {
                    name: value.name.trim(),
                    startTime: value.startTime.trim(),
                    endTime: value.endTime.trim(),
                    description: value.description?.trim() || '',
                    isActive: value.isActive,
                };

                let res;
                if (initData?.id) {
                    // Update existing workshift
                    res = await updateMutation.mutateAsync({
                        id: initData?.id ?? '',
                        request: {
                            ...request,
                            id: initData?.id ?? '',
                        },
                    });
                } else {
                    // Create new workshift
                    res = await createMutation.mutateAsync(request);
                }

                // Always close and reset on success
                if (res?.success) {
                    addToast({
                        message: initData?.id ? 'Cập nhật ca làm việc thành công' : 'Tạo ca làm việc thành công',
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
                        message: initData?.id ? 'Cập nhật ca làm việc thất bại' : 'Tạo ca làm việc thất bại',
                        type: 'error'
                    });
                }
            } catch (error) {
                console.error('Error saving workshift:', error);
                addToast({ message: 'Đã xảy ra lỗi khi lưu ca làm việc', type: 'error' });
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

