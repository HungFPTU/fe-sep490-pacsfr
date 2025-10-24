import { useForm } from '@tanstack/react-form';
import { useEffect } from 'react';
import type { Service, CreateServiceRequest, UpdateServiceRequest } from '../types';
import { useGlobalToast } from '@core/patterns/SingletonHook';

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
    const { addToast } = useGlobalToast();

    const form = useForm({
        defaultValues: toFormValues(initData),
        onSubmit: async ({ value }) => {
            // Final validation before submit
            if (!value.serviceGroupId?.trim()) {
                addToast({ message: 'Vui lòng chọn nhóm dịch vụ', type: 'error' });
                return;
            }
            if (!value.serviceCode?.trim()) {
                addToast({ message: 'Vui lòng nhập mã dịch vụ', type: 'error' });
                return;
            }
            if (!value.serviceName?.trim()) {
                addToast({ message: 'Vui lòng nhập tên dịch vụ', type: 'error' });
                return;
            }
            if (!value.serviceType?.trim()) {
                addToast({ message: 'Vui lòng chọn loại dịch vụ', type: 'error' });
                return;
            }
            if (!value.executionLevel?.trim()) {
                addToast({ message: 'Vui lòng chọn cấp thực hiện', type: 'error' });
                return;
            }
            if (!value.field?.trim()) {
                addToast({ message: 'Vui lòng chọn lĩnh vực', type: 'error' });
                return;
            }

            const request = isEdit && initData?.id
                ? {
                    id: initData.id,
                    serviceGroupId: value.serviceGroupId.trim(),
                    serviceName: value.serviceName.trim(),
                    serviceCode: value.serviceCode.trim(),
                    description: value.description?.trim() || '',
                    serviceType: value.serviceType.trim(),
                    resultDocument: value.resultDocument?.trim() || '',
                    isOnlineAvailable: value.isOnlineAvailable,
                    isActive: value.isActive,
                    decisionNumber: value.decisionNumber?.trim() || '',
                    executionLevel: value.executionLevel.trim(),
                    field: value.field.trim(),
                } as UpdateServiceRequest
                : {
                    serviceGroupId: value.serviceGroupId.trim(),
                    serviceName: value.serviceName.trim(),
                    serviceCode: value.serviceCode.trim(),
                    description: value.description?.trim() || '',
                    serviceType: value.serviceType.trim(),
                    resultDocument: value.resultDocument?.trim() || '',
                    isOnlineAvailable: value.isOnlineAvailable,
                    isActive: value.isActive,
                    decisionNumber: value.decisionNumber?.trim() || '',
                    executionLevel: value.executionLevel.trim(),
                    field: value.field.trim(),
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

