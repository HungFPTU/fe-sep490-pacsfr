import { useForm } from '@tanstack/react-form';
import { useEffect } from 'react';
import type { Service, CreateServiceRequest, UpdateServiceRequest } from '../types';

type FormValues = {
    serviceGroupId: string;
    serviceName: string;
    serviceCode: string;
    description: string;
    serviceType: string;
    resultDocument: string;
    isOnlineAvailable: boolean;
    isActive: boolean;
    decisionNumber: string;
    executionLevel: string;
    field: string;
};

interface UseServiceFormProps {
    initData?: Service | null;
    onSubmit: (data: CreateServiceRequest | UpdateServiceRequest) => void;
    open: boolean;
}

const toFormValues = (data?: Service | null): FormValues => ({
    serviceGroupId: data?.serviceGroupId ?? '',
    serviceName: data?.serviceName ?? '',
    serviceCode: data?.serviceCode ?? '',
    description: data?.description ?? '',
    serviceType: data?.serviceType ?? '',
    resultDocument: data?.resultDocument ?? '',
    isOnlineAvailable: data?.isOnlineAvailable ?? false,
    isActive: data?.isActive ?? true,
    decisionNumber: data?.decisionNumber ?? '',
    executionLevel: data?.executionLevel ?? '',
    field: data?.field ?? '',
});

export const useServiceForm = ({ initData, onSubmit, open }: UseServiceFormProps) => {
    const isEdit = !!initData?.id;

    const form = useForm({
        defaultValues: toFormValues(initData),
        onSubmit: async ({ value }) => {
            const request = isEdit && initData?.id
                ? {
                    id: initData.id,
                    serviceGroupId: value.serviceGroupId,
                    serviceName: value.serviceName,
                    serviceCode: value.serviceCode,
                    description: value.description,
                    serviceType: value.serviceType,
                    resultDocument: value.resultDocument,
                    isOnlineAvailable: value.isOnlineAvailable,
                    isActive: value.isActive,
                    decisionNumber: value.decisionNumber,
                    executionLevel: value.executionLevel,
                    field: value.field,
                } as UpdateServiceRequest
                : {
                    serviceGroupId: value.serviceGroupId,
                    serviceName: value.serviceName,
                    serviceCode: value.serviceCode,
                    description: value.description,
                    serviceType: value.serviceType,
                    resultDocument: value.resultDocument,
                    isOnlineAvailable: value.isOnlineAvailable,
                    isActive: value.isActive,
                    decisionNumber: value.decisionNumber,
                    executionLevel: value.executionLevel,
                    field: value.field,
                } as CreateServiceRequest;

            await onSubmit(request);

            // Reset form after successful submit
            setTimeout(() => {
                form.reset(toFormValues(null));
            }, 100);
        },
    });

    useEffect(() => {
        if (open) {
            // Always reset with current initData when modal opens
            form.reset(toFormValues(initData));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, initData?.id]);

    return { form, isEdit };
};

