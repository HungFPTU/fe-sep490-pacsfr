'use client';

import React, { useEffect } from 'react';
import { BaseModal } from '@/shared/components/manager/modal/BaseModal';
import { useForm } from '@tanstack/react-form';
import { useAssignWorkShift } from '../../../hooks';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { Staff } from '../../../types';

interface AssignWorkShiftModalProps {
    open: boolean;
    onClose: () => void;
    staff: Staff | null;
    onSuccess?: () => void;
}

export function AssignWorkShiftModal({
    open,
    onClose,
    staff,
    onSuccess,
}: AssignWorkShiftModalProps) {
    const { addToast } = useGlobalToast();
    const assignMutation = useAssignWorkShift();

    // TODO: Fetch work shifts from API when available
    // const { data: workShiftsData } = useWorkShifts();
    // For now, use placeholder data
    const workShiftOptions = [
        { label: 'Ca sáng (7:00 - 11:30)', value: 'shift-morning' },
        { label: 'Ca chiều (13:00 - 17:00)', value: 'shift-afternoon' },
        { label: 'Ca tối (17:00 - 21:00)', value: 'shift-evening' },
    ];

    const form = useForm({
        defaultValues: {
            workShiftId: '',
        },
        onSubmit: async ({ value }) => {
            if (!value.workShiftId?.trim()) {
                addToast({ message: 'Vui lòng chọn ca làm việc', type: 'error' });
                return;
            }

            if (!staff?.id) {
                addToast({ message: 'Không tìm thấy thông tin nhân viên', type: 'error' });
                return;
            }

            try {
                const res = await assignMutation.mutateAsync({
                    staffId: staff.id,
                    data: { workShiftId: value.workShiftId },
                });

                if (res?.success) {
                    addToast({ message: 'Gán ca làm việc thành công', type: 'success' });
                    onSuccess?.();
                    onClose();
                } else {
                    addToast({ message: 'Gán ca làm việc thất bại', type: 'error' });
                }
            } catch (error) {
                addToast({ message: 'Có lỗi xảy ra khi gán ca làm việc', type: 'error' });
                console.error('Assign workshift error:', error);
            }
        },
    });

    useEffect(() => {
        if (open) {
            form.reset({ workShiftId: '' });
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
            title="Gán nhân viên vào ca làm việc"
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
                    name="workShiftId"
                    validators={{
                        onChange: ({ value }: { value: string }) =>
                            !value || !value.trim() ? 'Ca làm việc là bắt buộc' : undefined,
                    }}
                >
                    {() => (
                        <select
                            value={form.state.values.workShiftId || ''}
                            onChange={(e) => form.setFieldValue('workShiftId', e.target.value)}
                            className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {workShiftOptions.map((option) => (
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

