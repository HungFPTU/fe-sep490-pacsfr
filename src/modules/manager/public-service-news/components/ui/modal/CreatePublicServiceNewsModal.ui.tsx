'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { PublicServiceNewsForm } from './PublicServiceNewsForm.ui';
import { usePublicServiceNewsForm } from '../../../hooks/usePublicServiceNewsForm';
import type { PublicServiceNews } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    initData?: PublicServiceNews | null;
    onSuccess?: () => void;
}

export const CreatePublicServiceNewsModal: React.FC<Props> = ({ open, onClose, initData, onSuccess }) => {
    const { form, isLoading, handleSubmit } = usePublicServiceNewsForm({
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
            title={initData?.id ? 'Cập nhật tin tức dịch vụ công' : 'Tạo tin tức dịch vụ công'}
            onOk={handleOk}
            onCancel={onClose}
            okText="Lưu"
            cancelText="Hủy"
            centered
            size="large"
            confirmLoading={isLoading}
            maskClosable={!isLoading}
            keyboard={!isLoading}
        >
            <PublicServiceNewsForm form={form} isLoading={isLoading} isEdit={!!initData?.id} />
        </BaseModal>
    );
};
