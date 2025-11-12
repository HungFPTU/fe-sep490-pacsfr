'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { FaqForm } from './FaqForm.ui';
import { useFaqForm } from '../../../hooks/useFaqForm';
import type { Faq } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    initData?: Faq | null;
    onSuccess?: () => void;
}

export const CreateFaqModal: React.FC<Props> = ({
    open,
    onClose,
    initData,
    onSuccess
}) => {
    const { form, isLoading } = useFaqForm({
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
            title={initData?.id ? 'Cập nhật câu hỏi thường gặp' : 'Tạo câu hỏi thường gặp mới'}
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
            <FaqForm
                form={form}
                isLoading={isLoading}
                isEdit={!!initData?.id}
            />
        </BaseModal>
    );
};

