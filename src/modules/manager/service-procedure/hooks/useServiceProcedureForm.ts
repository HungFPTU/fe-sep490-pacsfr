import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import type { ServiceProcedure } from '../types/response';
import type { ServiceProcedureFormValues, CreateServiceProcedureRequest, UpdateServiceProcedureRequest } from '../types/request';
import {
    validateTemplateId,
    validateServiceId,
    validateStepNumber,
    validateStepName,
    validateResponsibleUnit,
    validateProcessingTime,
    validateStepDescription,
    validateNotes,
} from '../utils';
import { useCreateServiceProcedure, useUpdateServiceProcedure } from './index';

interface UseServiceProcedureFormProps {
    initData?: ServiceProcedure | null;
    open: boolean;
    onSuccess?: () => void;
    onClose: () => void;
}

const toFormValues = (data?: Partial<ServiceProcedure> | null): ServiceProcedureFormValues => ({
    templateId: data?.templateId ?? '',
    serviceId: data?.serviceId ?? '',
    stepNumber: data?.stepNumber ?? 1,
    stepName: data?.stepName ?? '',
    stepDescription: data?.stepDescription ?? '',
    responsibleUnit: data?.responsibleUnit ?? '',
    processingTime: data?.processingTime ?? '',
    notes: data?.notes ?? '',
    isActive: data?.isActive ?? true,
});

export const useServiceProcedureForm = ({
    initData,
    open,
    onSuccess,
    onClose,
}: UseServiceProcedureFormProps) => {
    const createMutation = useCreateServiceProcedure();
    const updateMutation = useUpdateServiceProcedure();
    const { addToast } = useGlobalToast();

    const form = useForm({
        defaultValues: toFormValues(initData),
        onSubmit: async ({ value }) => {
            if (createMutation.isPending || updateMutation.isPending) {
                return;
            }

            const errors = [
                validateTemplateId(value.templateId),
                validateServiceId(value.serviceId),
                validateStepNumber(value.stepNumber),
                validateStepName(value.stepName),
                validateResponsibleUnit(value.responsibleUnit),
                validateProcessingTime(value.processingTime),
                validateStepDescription(value.stepDescription),
                validateNotes(value.notes),
            ].filter(Boolean);

            if (errors.length > 0) {
                addToast({ message: errors[0] as string, type: 'error' });
                return;
            }

            try {
                const payload: CreateServiceProcedureRequest = {
                    templateId: value.templateId,
                    serviceId: value.serviceId,
                    stepNumber: Number(value.stepNumber),
                    stepName: value.stepName.trim(),
                    stepDescription: value.stepDescription?.trim() || undefined,
                    responsibleUnit: value.responsibleUnit.trim(),
                    processingTime: value.processingTime.trim(),
                    notes: value.notes?.trim() || undefined,
                    isActive: value.isActive,
                };

                if (initData?.id) {
                    const updatePayload: UpdateServiceProcedureRequest = {
                        id: initData.id,
                        ...payload,
                    };
                    await updateMutation.mutateAsync({ id: initData.id, data: updatePayload });
                    addToast({ message: 'Cập nhật quy trình dịch vụ thành công', type: 'success' });
                } else {
                    await createMutation.mutateAsync(payload);
                    addToast({ message: 'Tạo mới quy trình dịch vụ thành công', type: 'success' });
                }

                onSuccess?.();
                onClose();
                setTimeout(() => form.reset(toFormValues(null)), 100);
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Không thể lưu quy trình dịch vụ';
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
