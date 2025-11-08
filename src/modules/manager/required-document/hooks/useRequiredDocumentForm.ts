'use client';

import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import type { RequiredDocument } from '../types/response';
import type {
    RequiredDocumentFormValues,
    CreateRequiredDocumentRequest,
    UpdateRequiredDocumentRequest,
} from '../types/request';
import {
    validateServiceId,
    validateDocTypeId,
    validateDescription,
    validateQuantityOriginal,
    validateQuantityCopy,
} from '../utils';
import { useCreateRequiredDocument, useUpdateRequiredDocument } from './index';

interface UseRequiredDocumentFormProps {
    initData?: RequiredDocument | null;
    open: boolean;
    onSuccess?: () => void;
    onClose: () => void;
}

const toFormValues = (data?: Partial<RequiredDocument> | null): RequiredDocumentFormValues => ({
    serviceId: data?.serviceId ?? '',
    docTypeId: data?.docTypeId ?? '',
    description: data?.description ?? '',
    quantityOriginal: data?.quantityOriginal ?? 0,
    quantityCopy: data?.quantityCopy ?? 0,
    isActive: data?.isActive ?? true,
});

export const useRequiredDocumentForm = ({
    initData,
    open,
    onSuccess,
    onClose,
}: UseRequiredDocumentFormProps) => {
    const createMutation = useCreateRequiredDocument();
    const updateMutation = useUpdateRequiredDocument();
    const { addToast } = useGlobalToast();

    const form = useForm({
        defaultValues: toFormValues(initData),
        onSubmit: async ({ value }) => {
            if (createMutation.isPending || updateMutation.isPending) {
                return;
            }

            const errors = [
                validateServiceId(value.serviceId),
                validateDocTypeId(value.docTypeId),
                validateDescription(value.description),
                validateQuantityOriginal(Number(value.quantityOriginal)),
                validateQuantityCopy(Number(value.quantityCopy)),
            ].filter(Boolean);

            if (errors.length > 0) {
                addToast({ message: errors[0] as string, type: 'error' });
                return;
            }

            const payload: CreateRequiredDocumentRequest = {
                serviceId: value.serviceId,
                docTypeId: value.docTypeId,
                description: value.description.trim(),
                quantityOriginal: Math.max(0, Math.floor(Number(value.quantityOriginal) || 0)),
                quantityCopy: Math.max(0, Math.floor(Number(value.quantityCopy) || 0)),
                isActive: value.isActive,
            };

            try {
                if (initData?.id) {
                    const updatePayload: UpdateRequiredDocumentRequest = {
                        id: initData.id,
                        ...payload,
                    };
                    await updateMutation.mutateAsync({ id: initData.id, data: updatePayload });
                    addToast({ message: 'Cập nhật tài liệu yêu cầu thành công', type: 'success' });
                } else {
                    await createMutation.mutateAsync(payload);
                    addToast({ message: 'Tạo mới tài liệu yêu cầu thành công', type: 'success' });
                }

                onSuccess?.();
                onClose();
                setTimeout(() => form.reset(toFormValues(null)), 100);
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Không thể lưu tài liệu yêu cầu';
                addToast({ message, type: 'error' });
            }
        },
    });

    useEffect(() => {
        if (open) {
            setTimeout(() => form.reset(toFormValues(initData)), 0);
        } else {
            form.reset(toFormValues(null));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, initData?.id]);

    const handleSubmit = async () => {
        if (form.options.onSubmit) {
            await form.options.onSubmit({
                value: form.state.values,
                formApi: form,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                meta: undefined as any,
            });
        } else {
            await form.handleSubmit();
        }
    };

    return {
        form,
        isLoading: createMutation.isPending || updateMutation.isPending,
        handleSubmit,
    };
};

