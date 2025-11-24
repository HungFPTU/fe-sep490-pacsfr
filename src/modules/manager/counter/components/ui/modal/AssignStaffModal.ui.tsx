'use client';

import React, { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { BaseModal } from '@/shared/components/manager/features/modal/BaseModal';
import { SelectField } from '@/shared/components/manager/features/form/BaseForm';
import { useAssignStaff, useStaffOptions } from '../../../hooks';
import type { AssignStaffRequest } from '../../../types';
import type { FormApiOf } from '@/types/types';
import { UserPlusIcon } from '@heroicons/react/24/outline';

interface Props {
    open: boolean;
    onClose: () => void;
    counterId: string | null;
    onSuccess?: () => void;
}

export const AssignStaffModal: React.FC<Props> = ({ open, onClose, counterId, onSuccess }) => {
    const assignMutation = useAssignStaff();
    const { data: staffOptions = [], isLoading: isLoadingStaff } = useStaffOptions();

    const form = useForm({
        defaultValues: {
            staffId: '',
        } as AssignStaffRequest,
        onSubmit: async ({ value }: { value: AssignStaffRequest }) => {
            if (!counterId) return;
            try {
                await assignMutation.mutateAsync({ counterId, data: value });
                onSuccess?.();
                onClose();
            } catch (error) {
                console.error('Error assigning staff:', error);
            }
        },
    });

    useEffect(() => {
        if (open) {
            form.reset({
                staffId: '',
            });
        }
    }, [open]);

    const handleOk = async () => {
        if (assignMutation.isPending || !counterId) {
            return;
        }
        await form.handleSubmit();
    };

    const selectOptions = staffOptions.map((staff) => ({
        label: staff.name,
        value: staff.id,
    }));

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={
                <div className="flex items-center gap-2">
                    <UserPlusIcon className="h-5 w-5 text-indigo-600" />
                    <span>Gán nhân viên cho quầy</span>
                </div>
            }
            onOk={handleOk}
            onCancel={onClose}
            okText="Gán nhân viên"
            cancelText="Hủy Bỏ"
            centered
            size="medium"
            maskClosable={!assignMutation.isPending}
            keyboard={!assignMutation.isPending}
            confirmLoading={assignMutation.isPending}
        >
            <div className="space-y-4">
                <SelectField<AssignStaffRequest, string>
                    form={form as FormApiOf<AssignStaffRequest>}
                    name="staffId"
                    label="Chọn nhân viên"
                    required
                    placeholder="— Chọn nhân viên —"
                    options={selectOptions}
                    disabled={assignMutation.isPending || isLoadingStaff}
                />
            </div>
        </BaseModal>
    );
};

