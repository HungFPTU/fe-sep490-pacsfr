/**
 * Custom Form Hook for Service
 * Handles form state, validation, and submission
 */

import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGlobalToast } from '@core/patterns/SingletonHook';
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
    condition: string;
    legislationDocumentIds: string[];
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
    condition: data?.condition ?? '',
    legislationDocumentIds: [], // Will be populated from API if needed
});

export const useServiceForm = ({ initData, onSubmit, open }: UseServiceFormProps) => {
    const isEdit = !!initData?.id;
    const { addToast } = useGlobalToast();

    const form = useForm({
        defaultValues: toFormValues(initData),
        validators: {
            onChange: ({ value }) => {
                const errors: Partial<Record<keyof FormValues, string>> = {};

                // Required field validations
                if (!value.serviceGroupId?.trim()) {
                    errors.serviceGroupId = 'Nhóm dịch vụ là bắt buộc';
                }

                if (!value.serviceCode?.trim()) {
                    errors.serviceCode = 'Mã dịch vụ là bắt buộc';
                } else {
                    // Service code format validation: alphanumeric, no spaces, max 50 chars
                    const codeRegex = /^[A-Za-z0-9_-]+$/;
                    if (!codeRegex.test(value.serviceCode.trim())) {
                        errors.serviceCode = 'Mã dịch vụ chỉ được chứa chữ cái, số, dấu gạch dưới và dấu gạch ngang';
                    } else if (value.serviceCode.trim().length > 50) {
                        errors.serviceCode = 'Mã dịch vụ không được vượt quá 50 ký tự';
                    }
                }

                if (!value.serviceName?.trim()) {
                    errors.serviceName = 'Tên dịch vụ là bắt buộc';
                } else {
                    // Service name length validation: min 3, max 255
                    if (value.serviceName.trim().length < 3) {
                        errors.serviceName = 'Tên dịch vụ phải có ít nhất 3 ký tự';
                    } else if (value.serviceName.trim().length > 255) {
                        errors.serviceName = 'Tên dịch vụ không được vượt quá 255 ký tự';
                    }
                }

                if (!value.serviceType?.trim()) {
                    errors.serviceType = 'Loại dịch vụ là bắt buộc';
                }

                if (!value.executionLevel?.trim()) {
                    errors.executionLevel = 'Cấp thực hiện là bắt buộc';
                }

                if (!value.field?.trim()) {
                    errors.field = 'Lĩnh vực là bắt buộc';
                }

                // Description length validation (optional but has max length)
                if (value.description && value.description.trim().length > 1000) {
                    errors.description = 'Mô tả không được vượt quá 1000 ký tự';
                }

                // Condition length validation (optional but has max length)
                if (value.condition && value.condition.trim().length > 1000) {
                    errors.condition = 'Điều kiện thực hiện không được vượt quá 1000 ký tự';
                }

                return Object.keys(errors).length > 0 ? errors : undefined;
            },
        },
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
                    condition: value.condition?.trim() || '',
                    legislationDocumentIds: value.legislationDocumentIds && value.legislationDocumentIds.length > 0
                        ? value.legislationDocumentIds
                        : undefined,
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
                    condition: value.condition?.trim() || '',
                    legislationDocumentIds: value.legislationDocumentIds && value.legislationDocumentIds.length > 0
                        ? value.legislationDocumentIds
                        : undefined,
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
            form.reset(toFormValues(initData));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, initData?.id]);

    return { form, isEdit };
};
