/**
 * Custom Form Hook for Template
 * Handles form state, validation, and submission
 */

import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { useCreateTemplate, useUpdateTemplate } from './index';
import type { Template } from '../types/response';
import type { CreateTemplateRequest, UpdateTemplateRequest } from '../types/request';

type FormValues = {
    templateCode?: string;
    templateName?: string;
    sampleCode?: string;
    sampleName?: string;
    filePath?: string;
    fileName?: string;
    fileSize?: number;
    description?: string;
    version?: string;
    docsTypeId: string;
    isActive: boolean;
};

interface UseTemplateFormProps {
    initData?: Template | null;
    open: boolean;
    onSuccess?: () => void;
    onClose: () => void;
}

export const useTemplateForm = ({
    initData,
    open,
    onSuccess,
    onClose,
}: UseTemplateFormProps) => {
    const createMutation = useCreateTemplate();
    const updateMutation = useUpdateTemplate();
    const { addToast } = useGlobalToast();

    const toFormValues = (data?: Partial<Template> | null): FormValues => ({
        templateCode: data?.templateCode ?? data?.sampleCode ?? '',
        templateName: data?.templateName ?? data?.sampleName ?? '',
        sampleCode: data?.sampleCode ?? data?.templateCode ?? '',
        sampleName: data?.sampleName ?? data?.templateName ?? '',
        filePath: data?.filePath ?? '',
        fileName: data?.fileName ?? '',
        fileSize: data?.fileSize ?? undefined,
        description: data?.description ?? '',
        version: data?.version ?? '',
        docsTypeId: data?.docsTypeId ?? '',
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
            if (!value.templateCode?.trim()) {
                addToast({ message: 'Vui lòng nhập mã template', type: 'error' });
                return;
            }
            if (!value.templateName?.trim()) {
                addToast({ message: 'Vui lòng nhập tên template', type: 'error' });
                return;
            }
            if (!value.docsTypeId?.trim()) {
                addToast({ message: 'Vui lòng chọn loại văn bản', type: 'error' });
                return;
            }

            try {
                const request: CreateTemplateRequest = {
                    templateCode: value.templateCode.trim(),
                    templateName: value.templateName.trim(),
                    filePath: value.filePath?.trim() || undefined,
                    fileName: value.fileName?.trim() || undefined,
                    fileSize: value.fileSize,
                    description: value.description?.trim() || undefined,
                    version: value.version?.trim() || undefined,
                    docsTypeId: value.docsTypeId.trim(),
                    isActive: value.isActive,
                };

                if (initData?.id) {
                    // Update existing template
                    const updateRequest: UpdateTemplateRequest = {
                        ...request,
                        id: initData.id,
                    };
                    await updateMutation.mutateAsync({
                        id: initData.id,
                        data: updateRequest,
                    });
                    addToast({
                        message: 'Cập nhật template thành công',
                        type: 'success',
                    });
                } else {
                    // Create new template
                    await createMutation.mutateAsync(request);
                    addToast({
                        message: 'Tạo template thành công',
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
                console.error('Error saving template:', error);
                // Extract error message from exception
                const errorMessage = error instanceof Error
                    ? error.message
                    : (initData?.id
                        ? 'Cập nhật template thất bại'
                        : 'Tạo template thất bại');

                addToast({
                    message: errorMessage,
                    type: 'error',
                });
            }
        },
    });

    useEffect(() => {
        if (open) {
            // Always reset with current initData when modal opens
            // Use setTimeout to ensure form state is properly updated
            setTimeout(() => {
                const formValues = toFormValues(initData);
                form.reset(formValues);
            }, 0);
        } else {
            // Clear form when modal closes
            form.reset(toFormValues(null));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, initData?.id, initData?.templateCode, initData?.sampleCode, initData?.templateName, initData?.sampleName, initData?.docsTypeId]);

    const isLoading = createMutation.isPending || updateMutation.isPending;

    return {
        form,
        isLoading,
        handleSubmit: () => form.handleSubmit(),
    };
};

