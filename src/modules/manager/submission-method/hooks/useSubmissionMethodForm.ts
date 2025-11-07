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
import { SUBMISSION_METHOD_OPTIONS } from '../constants';

type FormValues = {
    submissionMethodName: string;
    otherMethodName?: string; // For "Khác" option
    processingTime: string; // ISO 8601 date string
    fee: number;
    description?: string;
    isActive: boolean;
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
        // Convert processingTime to ISO string if it's a Date
        let processingTimeStr = '';
        if (data?.processingTime) {
            if (data.processingTime instanceof Date) {
                processingTimeStr = data.processingTime.toISOString();
            } else if (typeof data.processingTime === 'string') {
                processingTimeStr = data.processingTime;
            }
        }

        const methodName = data?.submissionMethodName ?? '';
        // Check if the method name is one of the predefined options
        const isPredefinedOption = Object.values(SUBMISSION_METHOD_OPTIONS).includes(
            methodName as typeof SUBMISSION_METHOD_OPTIONS[keyof typeof SUBMISSION_METHOD_OPTIONS]
        );

        return {
            submissionMethodName: isPredefinedOption ? methodName : SUBMISSION_METHOD_OPTIONS.OTHER,
            otherMethodName: isPredefinedOption ? undefined : methodName,
            processingTime: processingTimeStr,
            fee: data?.fee ?? 0,
            description: data?.description ?? '',
            isActive: data?.isActive ?? true,
        };
    };

    const form = useForm({
        defaultValues: toFormValues(initData),
        onSubmit: async ({ value }) => {
            console.log('[useSubmissionMethodForm] Form onSubmit triggered');
            console.log('[useSubmissionMethodForm] Form values:', value);

            // Prevent duplicate submission
            if (createMutation.isPending || updateMutation.isPending) {
                console.log('[useSubmissionMethodForm] Already submitting, ignoring duplicate call');
                return;
            }

            // Final validation before submit
            if (!value.submissionMethodName?.trim()) {
                console.log('[useSubmissionMethodForm] Validation failed: submissionMethodName is empty');
                addToast({ message: 'Vui lòng chọn phương thức nộp hồ sơ', type: 'error' });
                return;
            }

            // If "Khác" is selected, validate otherMethodName
            if (value.submissionMethodName.trim() === SUBMISSION_METHOD_OPTIONS.OTHER) {
                if (!value.otherMethodName?.trim()) {
                    addToast({ message: 'Vui lòng nhập tên phương thức khác', type: 'error' });
                    return;
                }
            }

            if (!value.processingTime?.trim()) {
                addToast({ message: 'Vui lòng chọn thời gian xử lý', type: 'error' });
                return;
            }
            if (value.fee === undefined || value.fee === null || value.fee < 0) {
                addToast({ message: 'Vui lòng nhập phí hợp lệ', type: 'error' });
                return;
            }

            try {
                // Determine final submission method name for payload
                // If "Khác" is selected, use otherMethodName; otherwise use submissionMethodName
                let finalMethodName: string;
                if (value.submissionMethodName.trim() === SUBMISSION_METHOD_OPTIONS.OTHER) {
                    finalMethodName = value.otherMethodName!.trim();
                } else {
                    finalMethodName = value.submissionMethodName.trim();
                }

                console.log('[useSubmissionMethodForm] Final method name:', finalMethodName);
                console.log('[useSubmissionMethodForm] Selected method:', value.submissionMethodName);

                const request: CreateSubmissionMethodRequest = {
                    submissionMethodName: finalMethodName,
                    processingTime: value.processingTime.trim(),
                    fee: value.fee,
                    description: value.description?.trim() || undefined,
                };

                console.log('[useSubmissionMethodForm] Request payload:', request);

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
                // Extract error message from exception
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
        console.log('[useSubmissionMethodForm] handleSubmit called');
        const currentValues = form.state.values;
        console.log('[useSubmissionMethodForm] Current form values:', JSON.stringify(currentValues, null, 2));
        console.log('[useSubmissionMethodForm] submissionMethodName value:', currentValues.submissionMethodName);
        console.log('[useSubmissionMethodForm] submissionMethodName type:', typeof currentValues.submissionMethodName);
        console.log('[useSubmissionMethodForm] Current form errors:', form.state.errors);

        // Manual validation before submitting
        // Check submissionMethodName - be more lenient with validation
        const submissionMethodName = currentValues.submissionMethodName;
        if (!submissionMethodName || (typeof submissionMethodName === 'string' && !submissionMethodName.trim())) {
            console.log('[useSubmissionMethodForm] Validation failed: submissionMethodName is empty or invalid');
            console.log('[useSubmissionMethodForm] submissionMethodName value:', submissionMethodName);
            addToast({ message: 'Vui lòng chọn phương thức nộp hồ sơ', type: 'error' });
            return;
        }

        // If "Khác" is selected, check otherMethodName
        const methodNameStr = typeof submissionMethodName === 'string' ? submissionMethodName.trim() : String(submissionMethodName).trim();
        if (methodNameStr === SUBMISSION_METHOD_OPTIONS.OTHER) {
            if (!currentValues.otherMethodName?.trim()) {
                console.log('[useSubmissionMethodForm] Validation failed: otherMethodName is empty');
                addToast({ message: 'Vui lòng nhập tên phương thức khác', type: 'error' });
                return;
            }
        }

        // Check processingTime
        if (!currentValues.processingTime?.trim()) {
            console.log('[useSubmissionMethodForm] Validation failed: processingTime is empty');
            addToast({ message: 'Vui lòng chọn thời gian xử lý', type: 'error' });
            return;
        }

        // Check fee
        if (currentValues.fee === undefined || currentValues.fee === null || currentValues.fee < 0) {
            console.log('[useSubmissionMethodForm] Validation failed: fee is invalid');
            addToast({ message: 'Vui lòng nhập phí hợp lệ', type: 'error' });
            return;
        }

        console.log('[useSubmissionMethodForm] All validations passed, calling onSubmit directly');
        // Instead of form.handleSubmit() which may be blocked by field-level validation,
        // call onSubmit directly with current form values
        // This ensures onSubmit is called even if there are field-level validation errors
        // (we've already done manual validation above)
        if (form.options.onSubmit) {
            console.log('[useSubmissionMethodForm] Calling onSubmit directly with form values');
            await form.options.onSubmit({
                value: currentValues,
                formApi: form,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                meta: undefined as any,
            });
        } else {
            console.log('[useSubmissionMethodForm] onSubmit not found, falling back to form.handleSubmit()');
            await form.handleSubmit();
        }
    };

    return {
        form,
        isLoading,
        handleSubmit,
    };
};

