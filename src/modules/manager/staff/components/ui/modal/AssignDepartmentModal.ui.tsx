'use client';

import React, { useEffect } from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { useForm } from '@tanstack/react-form';
import { useAssignDepartment } from '../../../hooks';
import { useDepartments } from '@/modules/manager/department/hooks';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { Staff } from '../../../types';
import { getValuesPage, RestPaged } from '@/types/rest';
import { Department } from '@/modules/manager/department';

interface AssignDepartmentModalProps {
    open: boolean;
    onClose: () => void;
    staff: Staff | null;
    onSuccess?: () => void;
}

export function AssignDepartmentModal({
    open,
    onClose,
    staff,
    onSuccess,
}: AssignDepartmentModalProps) {
    const { addToast } = useGlobalToast();
    const assignMutation = useAssignDepartment();
    const { data: departmentsData } = useDepartments({ isActive: true });

    const departments = getValuesPage(departmentsData as RestPaged<Department>);

    const departmentOptions = departments.items?.map((dept: Department) => ({
        label: dept.name,
        value: dept.id,
    }));

    const form = useForm({
        defaultValues: {
            departmentId: staff?.departmentId || '',
        },
        onSubmit: async ({ value }) => {
            if (!value.departmentId?.trim()) {
                addToast({ message: 'Vui lòng chọn phòng ban', type: 'error' });
                return;
            }

            if (!staff?.id) {
                addToast({ message: 'Không tìm thấy thông tin nhân viên', type: 'error' });
                return;
            }

            try {
                const res = await assignMutation.mutateAsync({
                    staffId: staff.id,
                    data: { departmentId: value.departmentId },
                });

                if (res?.success) {
                    addToast({ message: 'Gán phòng ban thành công', type: 'success' });
                    onSuccess?.();
                    onClose();
                } else {
                    addToast({ message: 'Gán phòng ban thất bại', type: 'error' });
                }
            } catch (error) {
                addToast({ message: 'Có lỗi xảy ra khi gán phòng ban', type: 'error' });
                console.error('Assign department error:', error);
            }
        },
    });

    useEffect(() => {
        if (open) {
            form.reset({ departmentId: staff?.departmentId || '' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, staff?.id]);

    const handleOk = async () => {
        await form.handleSubmit();
    };

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title="Gán nhân viên vào phòng ban"
            onOk={handleOk}
            onCancel={onClose}
            okText="Gán"
            cancelText="Hủy"
            confirmLoading={assignMutation.isPending}
            centered
            size="medium"
            destroyOnClose={true}
        >
            <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">Nhân viên:</span> {staff?.fullName}
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold">Mã NV:</span> {staff?.staffCode}
                    </p>
                </div>

                <form.Field
                    name="departmentId"
                    validators={{
                        onChange: ({ value }: { value: string }) =>
                            !value || !value.trim() ? 'Phòng ban là bắt buộc' : undefined,
                    }}
                >
                    {() => (
                        <select
                            value={form.state.values.departmentId || ''}
                            onChange={(e) => form.setFieldValue('departmentId', e.target.value)}
                            className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {departmentOptions.map((option: { label: string; value: string }) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}
                </form.Field>
            </div>
        </BaseModal>
    );
}

