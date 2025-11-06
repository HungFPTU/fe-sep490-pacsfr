'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { DocsTypeGroupForm } from './DocsTypeGroupForm.ui';
import { useDocsTypeGroupForm } from '../../../hooks/useDocsTypeGroupForm';
import type { DocsTypeGroup } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    initData?: DocsTypeGroup | null;
    onSuccess?: () => void;
}

export const CreateDocsTypeGroupModal: React.FC<Props> = ({
    open,
    onClose,
    initData,
    onSuccess
}) => {
    const { form, isLoading } = useDocsTypeGroupForm({
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
            title={initData?.id ? 'Cập nhật nhóm hồ sơ' : 'Tạo nhóm hồ sơ mới'}
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
            <DocsTypeGroupForm
                form={form}
                isLoading={isLoading}
                isEdit={!!initData?.id}
            />
        </BaseModal>
    );
};

