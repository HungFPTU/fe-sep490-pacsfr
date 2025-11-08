'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { RequiredDocumentForm } from './RequiredDocumentForm.ui';
import { useRequiredDocumentForm } from '../../../hooks/useRequiredDocumentForm';
import type { RequiredDocument } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    initData?: RequiredDocument | null;
    onSuccess?: () => void;
}

export const CreateRequiredDocumentModal: React.FC<Props> = ({
    open,
    onClose,
    initData,
    onSuccess,
}) => {
    const { form, isLoading, handleSubmit } = useRequiredDocumentForm({
        initData: initData ?? null,
        open,
        onSuccess,
        onClose,
    });

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={initData?.id ? 'Cập nhật tài liệu yêu cầu' : 'Thêm mới tài liệu yêu cầu'}
            onOk={handleSubmit}
            onCancel={onClose}
            okText={initData?.id ? 'Cập nhật' : 'Lưu'}
            cancelText="Hủy"
            centered
            size="large"
            confirmLoading={isLoading}
        >
            <RequiredDocumentForm form={form} isLoading={isLoading} isEdit={!!initData?.id} />
        </BaseModal>
    );
};

