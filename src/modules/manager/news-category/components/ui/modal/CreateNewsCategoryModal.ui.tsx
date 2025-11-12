'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { NewsCategoryForm } from './NewsCategoryForm.ui';
import { useNewsCategoryForm } from '../../../hooks/useNewsCategoryForm';
import type { NewsCategory } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    initData?: NewsCategory | null;
    onSuccess?: () => void;
}

export const CreateNewsCategoryModal: React.FC<Props> = ({
    open,
    onClose,
    initData,
    onSuccess
}) => {
    const { form, isLoading } = useNewsCategoryForm({
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
            title={initData?.id ? 'Cập nhật danh mục tin tức' : 'Tạo danh mục tin tức mới'}
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
            <NewsCategoryForm
                form={form}
                isLoading={isLoading}
                isEdit={!!initData?.id}
            />
        </BaseModal>
    );
};

