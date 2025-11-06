/**
 * Custom Form Hook for Docs Type
 * Handles form state, validation, and submission
 */

import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { useCreateDocsType, useUpdateDocsType } from './index';
import type { DocsType } from '../types/response';
import type { CreateDocsTypeRequest, UpdateDocsTypeRequest } from '../types/request';

type FormValues = {
    docTypeCode: string;
    docTypeName: string;
    description: string;
    groupId: string;
    isActive: boolean;
    fileFormat: string;
    maxFileSize: number;
    isRequired: boolean;
};

interface UseDocsTypeFormProps {
    initData?: DocsType | null;
    open: boolean;
    onSuccess?: () => void;
    onClose: () => void;
}

export const useDocsTypeForm = ({
    initData,
    open,
    onSuccess,
    onClose,
}: UseDocsTypeFormProps) => {
    const createMutation = useCreateDocsType();
    const updateMutation = useUpdateDocsType();
    const { addToast } = useGlobalToast();

    const toFormValues = (data?: Partial<DocsType> | null): FormValues => ({
        docTypeCode: data?.docTypeCode ?? '',
        docTypeName: data?.docTypeName ?? '',
        description: data?.description ?? '',
        groupId: data?.groupId ?? '',
        isActive: data?.isActive ?? true,
        fileFormat: data?.fileFormat ?? '',
        maxFileSize: data?.maxFileSize ?? 10,
        isRequired: data?.isRequired ?? false,
    });

    const form = useForm({
        defaultValues: toFormValues(initData),
        onSubmit: async ({ value }) => {
            // Prevent duplicate submission
            if (createMutation.isPending || updateMutation.isPending) {
                return;
            }

            // Final validation before submit
            if (!value.docTypeCode?.trim()) {
                addToast({ message: 'Vui lòng nhập mã loại văn bản', type: 'error' });
                return;
            }
            if (!value.docTypeName?.trim()) {
                addToast({ message: 'Vui lòng nhập tên loại văn bản', type: 'error' });
                return;
            }
            if (!value.groupId?.trim()) {
                addToast({ message: 'Vui lòng chọn nhóm hồ sơ', type: 'error' });
                return;
            }
            if (!value.fileFormat?.trim()) {
                addToast({ message: 'Vui lòng chọn định dạng file', type: 'error' });
                return;
            }

            try {
                const request: CreateDocsTypeRequest = {
                    docTypeCode: value.docTypeCode.trim(),
                    docTypeName: value.docTypeName.trim(),
                    description: value.description?.trim() || '',
                    groupId: value.groupId.trim(),
                    isActive: value.isActive,
                    fileFormat: value.fileFormat.trim(),
                    maxFileSize: value.maxFileSize,
                    isRequired: value.isRequired,
                };

                if (initData?.id) {
                    // Update existing docs type
                    const updateRequest: UpdateDocsTypeRequest = {
                        ...request,
                        id: initData.id,
                    };
                    await updateMutation.mutateAsync({
                        id: initData.id,
                        data: updateRequest,
                    });
                    addToast({
                        message: 'Cập nhật loại văn bản thành công',
                        type: 'success',
                    });
                } else {
                    // Create new docs type
                    await createMutation.mutateAsync(request);
                    addToast({
                        message: 'Tạo loại văn bản thành công',
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
                console.error('Error saving docs type:', error);
                // Extract error message from exception
                const errorMessage = error instanceof Error
                    ? error.message
                    : (initData?.id
                        ? 'Cập nhật loại văn bản thất bại'
                        : 'Tạo loại văn bản thất bại');

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

