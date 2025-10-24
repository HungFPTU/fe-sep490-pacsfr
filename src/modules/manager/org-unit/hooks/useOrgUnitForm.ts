import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { useCreateOrgUnit, useUpdateOrgUnit } from './index';
import type { OrgUnit, CreateOrgUnitRequest } from '../types';

type FormValues = {
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
                    unitCode: value.unitCode,
                    unitName: value.unitName,
                    unitType: value.unitType,
                    address: value.address,
                    phone: value.phone,
                    email: value.email,
                    isActive: value.isActive,
                };

                if (initData?.id) {
                    // Update existing org unit
                    const res = await updateMutation.mutateAsync({
                        id: initData?.id ?? '',
                        request: {
                            ...request,
                            id: initData?.id ?? '',
                        },
                    });
                    if (res?.success) {
                        addToast({ message: 'Cập nhật cơ quan thành công', type: 'success' });
                        onSuccess?.();
                        onClose();
                    } else {
                        addToast({ message: 'Cập nhật cơ quan thất bại', type: 'error' });
                    }
                } else {
                    // Create new org unit
                    const res = await createMutation.mutateAsync(request);
                    if (res?.success) {
                        addToast({ message: 'Tạo cơ quan thành công', type: 'success' });
                        onSuccess?.();
                        onClose();
                    } else {
                        addToast({ message: 'Tạo cơ quan thất bại', type: 'error' });
                    }
                }
            } catch (error) {
                console.error('Error saving org unit:', error);
                addToast({ message: 'Đã xảy ra lỗi khi lưu cơ quan', type: 'error' });
            }
        },
    });

    useEffect(() => {
        if (open) {
            form.reset(toFormValues(initData));
        }
    }, [open, initData?.id]);

    const isLoading = createMutation.isPending || updateMutation.isPending;

    return {
        form,
        isLoading,
        handleSubmit: () => form.handleSubmit(),
    };
};

