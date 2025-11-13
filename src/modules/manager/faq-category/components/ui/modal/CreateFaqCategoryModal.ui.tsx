'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { FaqCategoryForm } from './FaqCategoryForm.ui';
import { useFaqCategoryForm } from '../../../hooks/useFaqCategoryForm';
import type { FaqCategory } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    initData?: FaqCategory | null;
    onSuccess?: () => void;
}

export const CreateFaqCategoryModal: React.FC<Props> = ({
    open,
    onClose,
    initData,
    onSuccess
}) => {
    const { form, isLoading } = useFaqCategoryForm({
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
            title={initData?.id ? 'Cập nhật danh mục câu hỏi thường gặp' : 'Tạo danh mục câu hỏi thường gặp mới'}
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
            <FaqCategoryForm
                form={form}
                isLoading={isLoading}
                isEdit={!!initData?.id}
            />
        </BaseModal>
    );
};

