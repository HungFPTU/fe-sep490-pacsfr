'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { ServiceProcedureForm } from './ServiceProcedureForm.ui';
import { useServiceProcedureForm } from '../../../hooks/useServiceProcedureForm';
import type { ServiceProcedure } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    initData?: ServiceProcedure | null;
    onSuccess?: () => void;
}

export const CreateServiceProcedureModal: React.FC<Props> = ({ open, onClose, initData, onSuccess }) => {
    const { form, isLoading, handleSubmit } = useServiceProcedureForm({
        initData,
        open,
        onSuccess,
        onClose,
    });

    const handleOk = async () => {
        if (!isLoading) {
            await handleSubmit();
        }
    };

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={initData?.id ? 'Cập nhật quy trình dịch vụ' : 'Tạo quy trình dịch vụ mới'}
            onOk={handleOk}
            onCancel={onClose}
            okText="Lưu"
            cancelText="Hủy"
            centered
            size="large"
            maskClosable={!isLoading}
            keyboard={!isLoading}
            confirmLoading={isLoading}
            destroyOnClose
        >
            <ServiceProcedureForm form={form} isLoading={isLoading} />
        </BaseModal>
    );
};
