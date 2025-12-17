'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { TargetAudienceForm } from './TargetAudienceForm.ui';
import { useTargetAudienceForm } from '../../../hooks/useTargetAudienceForm';
import type { TargetAudience } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    initData?: TargetAudience | null;
    onSuccess?: () => void;
}

export const CreateTargetAudienceModal: React.FC<Props> = ({
    open,
    onClose,
    initData,
    onSuccess
}) => {
    const { form, isLoading } = useTargetAudienceForm({
        initData,
        open,
        onSuccess,
        onClose,
    });

    const handleOk = async () => {
        if (isLoading) {
            return;
        }
        await form.handleSubmit();
    };

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={initData?.id ? 'Cập nhật đối tượng' : 'Tạo đối tượng mới'}
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
            <TargetAudienceForm
                form={form}
                isLoading={isLoading}
                isEdit={!!initData?.id}
            />
        </BaseModal>
    );
};

