import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { useCreateOrgUnit, useUpdateOrgUnit } from './index';
import type { OrgUnit, CreateOrgUnitRequest } from '../types';

type FormValues = {
    departmentId: string;
    unitCode: string;
    unitName: string;
    unitType: string;
    address: string;
    phone: string;
    email: string;
    isActive: boolean;
};

interface UseOrgUnitFormProps {
    initData?: OrgUnit | null;
    open: boolean;
    onSuccess?: () => void;
    onClose: () => void;
}

export const useOrgUnitForm = ({
    initData,
    open,
    onSuccess,
    onClose,
}: UseOrgUnitFormProps) => {
    const createMutation = useCreateOrgUnit();
    const updateMutation = useUpdateOrgUnit();
    const { addToast } = useGlobalToast();

    const toFormValues = (data?: Partial<OrgUnit> | null): FormValues => ({
        departmentId: data?.departmentId ?? '',
        unitCode: data?.unitCode ?? '',
        unitName: data?.unitName ?? '',
        unitType: data?.unitType ?? '',
        address: data?.address ?? '',
        phone: data?.phone ?? '',
        email: data?.email ?? '',
        isActive: data?.isActive ?? true,
    });

    const form = useForm({
        defaultValues: toFormValues(initData),
        onSubmit: async ({ value }) => {
            try {
                const request: CreateOrgUnitRequest = {
                    departmentId: value.departmentId,
                    unitCode: value.unitCode,
                    unitName: value.unitName,
                    unitType: value.unitType,
                    address: value.address,
                    phone: value.phone,
                    email: value.email,
                    isActive: value.isActive,
                };

                let res;
                if (initData?.id) {
                    // Update existing org unit
                    res = await updateMutation.mutateAsync({
                        id: initData?.id ?? '',
                        request: {
                            ...request,
                            id: initData?.id ?? '',
                        },
                    });
                } else {
                    // Create new org unit
                    res = await createMutation.mutateAsync(request);
                }

                // Always close and reset on success
                if (res?.success) {
                    addToast({
                        message: initData?.id ? 'Cập nhật cơ quan thành công' : 'Tạo cơ quan thành công',
                        type: 'success'
                    });
                    onSuccess?.();
                    onClose();
                    // Reset form after successful submit
                    setTimeout(() => {
                        form.reset(toFormValues(null));
                    }, 100);
                } else {
                    addToast({
                        message: initData?.id ? 'Cập nhật cơ quan thất bại' : 'Tạo cơ quan thất bại',
                        type: 'error'
                    });
                }
            } catch (error) {
                console.error('Error saving org unit:', error);
                addToast({ message: 'Đã xảy ra lỗi khi lưu cơ quan', type: 'error' });
            }
        },
    });

    useEffect(() => {
        if (open) {
            // Always reset with current initData when modal opens
            form.reset(toFormValues(initData));
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

