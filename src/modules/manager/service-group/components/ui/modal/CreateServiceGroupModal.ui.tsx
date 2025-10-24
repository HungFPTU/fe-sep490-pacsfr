'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/manager/modal/BaseModal';
import { ServiceGroupForm } from './ServiceGroupForm.ui';
import { useServiceGroupForm } from '../../../hooks/useServiceGroupForm';
import type { ServiceGroup } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    initData?: ServiceGroup | null;
    onSuccess?: () => void;
}

export const CreateServiceGroupModal: React.FC<Props> = ({
    open,
    onClose,
    initData,
    onSuccess
}) => {
    const { form, isLoading, handleSubmit } = useServiceGroupForm({
        initData,
        open,
        onSuccess,
        onClose,
    });

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={initData?.id ? 'Cập nhật nhóm dịch vụ' : 'Tạo nhóm dịch vụ mới'}
            onOk={handleSubmit}
            onCancel={onClose}
            okText="Lưu"
            cancelText="Hủy"
            centered
            size="large"
            maskClosable={!isLoading}
            keyboard={!isLoading}
            confirmLoading={isLoading}
        >
            <ServiceGroupForm
                form={form}
                isLoading={isLoading}
                isEdit={!!initData?.id}
            />
        </BaseModal>
    );
};

