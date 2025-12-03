'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { SubmissionMethodForm } from './SubmissionMethodForm.ui';
import { useSubmissionMethodForm } from '../../../hooks/useSubmissionMethodForm';
import type { SubmissionMethod } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    initData?: SubmissionMethod | null;
    onSuccess?: () => void;
}

export const CreateSubmissionMethodModal: React.FC<Props> = ({
    open,
    onClose,
    initData,
    onSuccess
}) => {
    const { form, isLoading, handleSubmit } = useSubmissionMethodForm({
        initData,
        open,
        onSuccess,
        onClose,
    });

    const handleOk = async () => {
        if (isLoading) {
            return;
        }
        await handleSubmit();
    };

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={initData?.id ? 'Cập nhật phương thức nộp hồ sơ' : 'Tạo phương thức nộp hồ sơ mới'}
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
            <SubmissionMethodForm
                form={form}
                isLoading={isLoading}
                isEdit={!!initData?.id}
            />
        </BaseModal>
    );
};

