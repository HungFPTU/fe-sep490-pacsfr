'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { DepartmentForm } from './DepartmentForm.ui';
import { useDepartmentForm } from '../../../hooks/useDepartmentForm';
import type { Department } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    initData?: Department | null;
    onSuccess?: () => void;
}

export const CreateDepartmentModal: React.FC<Props> = ({
    open,
    onClose,
    initData,
    onSuccess
}) => {
    const { form, isLoading } = useDepartmentForm({
        initData,
        open,
        onSuccess,
        onClose,
    });

    const handleOk = async () => {
        await form.handleSubmit();
    };

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={initData?.id ? 'Cập nhật phòng ban' : 'Tạo phòng ban mới'}
            onOk={handleOk}
            onCancel={onClose}
            okText="Lưu"
            cancelText="Hủy"
            centered
            size="large"
            maskClosable={!isLoading}
            keyboard={!isLoading}
            confirmLoading={isLoading}
            destroyOnClose={true}
        >
            <DepartmentForm
                form={form}
                isLoading={isLoading}
                isEdit={!!initData?.id}
            />
        </BaseModal>
    );
};

