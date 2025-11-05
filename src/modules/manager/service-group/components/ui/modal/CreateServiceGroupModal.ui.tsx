'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
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
    const { form, isLoading } = useServiceGroupForm({
        initData,
        open,
        onSuccess,
        onClose,
    });

    const handleOk = async () => {
        if (isLoading) {
            console.log('[CreateServiceGroupModal] Already submitting, ignoring click');
            return;
        }
        await form.handleSubmit();
    };

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={initData?.id ? 'Cập nhật nhóm dịch vụ' : 'Tạo nhóm dịch vụ mới'}
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
            <ServiceGroupForm
                form={form}
                isLoading={isLoading}
                isEdit={!!initData?.id}
                initData={initData}
            />
        </BaseModal>
    );
};

