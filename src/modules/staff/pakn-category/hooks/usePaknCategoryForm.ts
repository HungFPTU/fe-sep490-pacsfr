import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { useCreatePaknCategory, useUpdatePaknCategory } from '.';
import type { PaknCategory } from '../types/response';
import type { CreatePaknCategoryRequest } from '../types/request';

interface UsePaknCategoryFormProps {
    initData?: PaknCategory | null;
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

type FormValues = CreatePaknCategoryRequest;

export const usePaknCategoryForm = ({ initData, open, onClose, onSuccess }: UsePaknCategoryFormProps) => {
    const createMutation = useCreatePaknCategory();
    const updateMutation = useUpdatePaknCategory();
    const { addToast } = useGlobalToast();

    const toFormValues = (data?: PaknCategory | null): FormValues => ({
        categoryName: data?.categoryName ?? '',
        description: data?.description ?? '',
        isActive: data?.isActive ?? true,
    });

    const form = useForm({
        defaultValues: toFormValues(initData),
        onSubmit: async ({ value }) => {
            try {
                if (initData?.id) {
                    await updateMutation.mutateAsync({ id: initData.id, data: { ...value, id: initData.id } });
                    addToast({ message: 'Cập nhật danh mục thành công', type: 'success' });
                } else {
                    await createMutation.mutateAsync(value);
                    addToast({ message: 'Tạo danh mục thành công', type: 'success' });
                }
                onSuccess?.();
                onClose();
            } catch (error) {
                console.error(error);
                addToast({ message: 'Không thể lưu danh mục, vui lòng thử lại', type: 'error' });
            }
        },
    });

    useEffect(() => {
        if (open) {
            form.reset(toFormValues(initData));
        }
    }, [open, initData?.id]);

    return {
        form,
        isSubmitting: createMutation.isPending || updateMutation.isPending,
        handleSubmit: () => form.handleSubmit(),
    };
};

