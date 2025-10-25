'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { StaffForm } from './StaffForm.ui';
import { useStaffForm } from '../../../hooks/useStaffForm';
import { useCreateStaff } from '../../../hooks';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { CreateStaffRequest, Staff } from '../../../types';

interface CreateStaffModalProps {
    open: boolean;
    onClose: () => void;
    initData?: Staff | null;
    onSuccess?: () => void;
}

export function CreateStaffModal({ open, onClose, initData, onSuccess }: CreateStaffModalProps) {
    const { addToast } = useGlobalToast();
    const createMutation = useCreateStaff();

    const isLoading = createMutation.isPending;

    const handleSubmit = async (data: CreateStaffRequest) => {
        try {
            const res = await createMutation.mutateAsync(data);
            if (res?.success) {
                addToast({ message: 'Tạo nhân viên mới thành công', type: 'success' });
            } else {
                addToast({ message: 'Tạo nhân viên mới thất bại', type: 'error' });
                return;
            }
            onClose();
        } catch (error) {
            addToast({ message: 'Có lỗi xảy ra khi lưu nhân viên', type: 'error' });
            console.error('Submit error:', error);
        }
    };

    const { form } = useStaffForm({
        open,
        initData: initData || null,
        onSubmit: handleSubmit,
        onClose,
        onSuccess,
    });

    const handleOk = async () => {
        await form.handleSubmit();
    };

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title="Tạo nhân viên mới"
            onOk={handleOk}
            onCancel={onClose}
            okText="Tạo mới"
            cancelText="Hủy"
            confirmLoading={isLoading}
            centered
            size="large"
            destroyOnClose={true}
        >
            <StaffForm form={form} isLoading={isLoading} isEdit={false} />
        </BaseModal>
    );
}

