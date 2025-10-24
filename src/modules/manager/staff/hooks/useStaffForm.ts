import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { Staff, CreateStaffRequest } from '../types';

// ==================== Form Types ====================

export interface StaffFormValues {
    orgUnitId: string;
    staffCode: string;
    fullName: string;
    username: string;
    password?: string;
    email: string;
    phone: string;
    position: string;
    roleType: string;
    specialization?: string;
    isActive?: boolean;
}

interface UseStaffFormProps {
    open: boolean;
    initData: Staff | null;
    onSubmit: (data: CreateStaffRequest) => Promise<void>;
    onClose: () => void;
    onSuccess?: () => void;
}

// ==================== Helper Functions ====================

function toFormValues(data: Staff | null): StaffFormValues {
    if (!data) {
        return {
            orgUnitId: '',
            staffCode: '',
            fullName: '',
            username: '',
            password: '',
            email: '',
            phone: '',
            position: '',
            roleType: 'STAFF',
            specialization: '',
            isActive: true,
        };
    }

    return {
        orgUnitId: data.orgUnitId,
        staffCode: data.staffCode,
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        phone: data.phone,
        position: data.position,
        roleType: data.roleType,
        specialization: data.specialization || '',
        isActive: data.isActive,
    };
}

function toRequest(
    values: StaffFormValues,
): CreateStaffRequest {
    return {
        orgUnitId: values.orgUnitId,
        staffCode: values.staffCode,
        fullName: values.fullName,
        username: values.username,
        password: values.password || '',
        email: values.email,
        phone: values.phone,
        position: values.position,
        roleType: values.roleType,
        specialization: values.specialization || undefined,
        createdBy: 'system', // TODO: Get from auth context
    };
}

// ==================== Custom Hook ====================

export function useStaffForm({ open, initData, onSubmit, onClose, onSuccess }: UseStaffFormProps) {
    const { addToast } = useGlobalToast();

    const form = useForm({
        defaultValues: toFormValues(initData),
        onSubmit: async ({ value }) => {
            // Final validation before submit
            if (!value.orgUnitId?.trim()) {
                addToast({ message: 'Vui lòng chọn cơ quan', type: 'error' });
                return;
            }
            if (!value.staffCode?.trim()) {
                addToast({ message: 'Vui lòng nhập mã nhân viên', type: 'error' });
                return;
            }
            if (!value.fullName?.trim()) {
                addToast({ message: 'Vui lòng nhập họ tên', type: 'error' });
                return;
            }
            if (!value.username?.trim() && !initData?.id) {
                addToast({ message: 'Vui lòng nhập tên đăng nhập', type: 'error' });
                return;
            }
            if (!value.password?.trim() && !initData?.id) {
                addToast({ message: 'Vui lòng nhập mật khẩu', type: 'error' });
                return;
            }
            if (!value.email?.trim()) {
                addToast({ message: 'Vui lòng nhập email', type: 'error' });
                return;
            }
            if (!value.phone?.trim()) {
                addToast({ message: 'Vui lòng nhập số điện thoại', type: 'error' });
                return;
            }
            if (!value.position?.trim()) {
                addToast({ message: 'Vui lòng nhập chức vụ', type: 'error' });
                return;
            }
            if (!value.roleType?.trim()) {
                addToast({ message: 'Vui lòng chọn vai trò', type: 'error' });
                return;
            }

            try {
                const request = toRequest(value);
                await onSubmit(request);
                onSuccess?.();
            } catch (error) {
                console.error('Form submission error:', error);
                addToast({
                    message: 'Có lỗi xảy ra khi lưu thông tin nhân viên',
                    type: 'error',
                });
            }
        },
    });

    // Reset form when modal opens/closes
    useEffect(() => {
        if (open) {
            form.reset(toFormValues(initData));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, initData?.id]);

    return { form };
}

