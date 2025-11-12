/**
 * Custom Form Hook for FAQ
 * Handles form state, validation, and submission
 */

import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { useCreateFaq, useUpdateFaq } from './index';
import type { Faq } from '../types/response';
import type { CreateFaqRequest, UpdateFaqRequest } from '../types/request';

type FormValues = {
    serviceId: string;
    faqCategoryId: string;
    question: string;
    answer: string;
    isActive: boolean;
};

interface UseFaqFormProps {
    initData?: Faq | null;
    open: boolean;
    onSuccess?: () => void;
    onClose: () => void;
}

export const useFaqForm = ({
    initData,
    open,
    onSuccess,
    onClose,
}: UseFaqFormProps) => {
    const createMutation = useCreateFaq();
    const updateMutation = useUpdateFaq();
    const { addToast } = useGlobalToast();

    const toFormValues = (data?: Partial<Faq> | null): FormValues => ({
        serviceId: data?.serviceId ?? '',
        faqCategoryId: data?.faqCategoryId ?? '',
        question: data?.question ?? '',
        answer: data?.answer ?? '',
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
            if (!value.serviceId?.trim()) {
                addToast({ message: 'Vui lòng chọn dịch vụ', type: 'error' });
                return;
            }
            if (!value.faqCategoryId?.trim()) {
                addToast({ message: 'Vui lòng chọn danh mục câu hỏi thường gặp', type: 'error' });
                return;
            }
            if (!value.question?.trim()) {
                addToast({ message: 'Vui lòng nhập câu hỏi', type: 'error' });
                return;
            }
            if (!value.answer?.trim()) {
                addToast({ message: 'Vui lòng nhập câu trả lời', type: 'error' });
                return;
            }

            try {
                const request: CreateFaqRequest = {
                    serviceId: value.serviceId.trim(),
                    faqCategoryId: value.faqCategoryId.trim(),
                    question: value.question.trim(),
                    answer: value.answer.trim(),
                    isActive: value.isActive,
                };

                if (initData?.id) {
                    // Update existing FAQ
                    const updateRequest: UpdateFaqRequest = {
                        ...request,
                        id: initData.id,
                    };
                    await updateMutation.mutateAsync({
                        id: initData.id,
                        data: updateRequest,
                    });
                    addToast({
                        message: 'Cập nhật câu hỏi thường gặp thành công',
                        type: 'success',
                    });
                } else {
                    // Create new FAQ
                    await createMutation.mutateAsync(request);
                    addToast({
                        message: 'Tạo câu hỏi thường gặp thành công',
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
                console.error('Error saving FAQ:', error);
                // Extract error message from exception
                const errorMessage = error instanceof Error
                    ? error.message
                    : (initData?.id
                        ? 'Cập nhật câu hỏi thường gặp thất bại'
                        : 'Tạo câu hỏi thường gặp thất bại');

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

