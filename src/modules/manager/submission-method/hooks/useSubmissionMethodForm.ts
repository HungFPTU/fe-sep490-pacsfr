/**
 * Custom Form Hook for SubmissionMethod
 * Handles form state, validation, and submission
 */

import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { useCreateSubmissionMethod, useUpdateSubmissionMethod } from './index';
import type { SubmissionMethod } from '../types/response';
import type { CreateSubmissionMethodRequest, UpdateSubmissionMethodRequest } from '../types/request';

type FormValues = {
    submissionMethodName: string;
    description?: string;
};

interface UseSubmissionMethodFormProps {
    initData?: SubmissionMethod | null;
    open: boolean;
    onSuccess?: () => void;
    onClose: () => void;
}

export const useSubmissionMethodForm = ({
    initData,
    open,
    onSuccess,
    onClose,
}: UseSubmissionMethodFormProps) => {
    const createMutation = useCreateSubmissionMethod();
    const updateMutation = useUpdateSubmissionMethod();
    const { addToast } = useGlobalToast();

    const toFormValues = (data?: Partial<SubmissionMethod> | null): FormValues => {
        return {
            submissionMethodName: data?.submissionMethodName ?? '',
            description: data?.description ?? '',
        };
    };

    const form = useForm({
        defaultValues: toFormValues(initData),
        onSubmit: async ({ value }) => {
            // Prevent duplicate submission
            if (createMutation.isPending || updateMutation.isPending) {
                return;
            }

            // Final validation before submit
            if (!value.submissionMethodName?.trim()) {
                addToast({ message: 'Vui lòng nhập tên phương thức nộp hồ sơ', type: 'error' });
                return;
            }

            try {
                const request: CreateSubmissionMethodRequest = {
                    submissionMethodName: value.submissionMethodName.trim(),
                    description: value.description?.trim() || undefined,
                };

                if (initData?.id) {
                    // Update existing submission method
                    const updateRequest: UpdateSubmissionMethodRequest = {
                        ...request,
                        id: initData.id,
                    };
                    await updateMutation.mutateAsync({
                        id: initData.id,
                        data: updateRequest,
                    });
                    addToast({
                        message: 'Cập nhật phương thức nộp hồ sơ thành công',
                        type: 'success',
                    });
                } else {
                    // Create new submission method
                    await createMutation.mutateAsync(request);
                    addToast({
                        message: 'Tạo phương thức nộp hồ sơ thành công',
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
                console.error('Error saving submission method:', error);
                const errorMessage = error instanceof Error
                    ? error.message
                    : (initData?.id
                        ? 'Cập nhật phương thức nộp hồ sơ thất bại'
                        : 'Tạo phương thức nộp hồ sơ thất bại');

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
    }, [open, initData?.id, initData?.submissionMethodName, initData?.processingTime, initData?.fee]);

    const isLoading = createMutation.isPending || updateMutation.isPending;

    const handleSubmit = async () => {
        const currentValues = form.state.values;

        // Manual validation before submitting
        if (!currentValues.submissionMethodName?.trim()) {
            addToast({ message: 'Vui lòng nhập tên phương thức nộp hồ sơ', type: 'error' });
            return;
        }

        // Call onSubmit directly
        if (form.options.onSubmit) {
            await form.options.onSubmit({
                value: currentValues,
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
        isLoading,
        handleSubmit,
    };
};


