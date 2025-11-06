'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/manager';
import { LegalDocumentForm } from './LegalDocumentForm.ui';
import { useLegalDocumentForm } from '../../../hooks';
import type { LegalDocument } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    initData?: LegalDocument | null;
    onSuccess?: () => void;
}

export const CreateLegalDocumentModal: React.FC<Props> = ({
    open,
    onClose,
    initData,
    onSuccess
}) => {
    const { form, isLoading } = useLegalDocumentForm({
        initData,
        open,
        onSuccess,
        onClose,
    });

    const handleOk = async () => {
        if (isLoading) {
            console.log('[CreateLegalDocumentModal] Already submitting, ignoring click');
            return;
        }
        await form.handleSubmit();
    };

    const isEdit = !!initData?.id;

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={isEdit ? 'Cập nhật văn bản pháp luật' : 'Tạo văn bản pháp luật mới'}
            onOk={handleOk}
            onCancel={onClose}
            okText={isLoading ? 'Đang xử lý...' : (isEdit ? 'Cập nhật' : 'Tạo mới')}
            cancelText="Hủy"
            centered
            size="large"
            maskClosable={!isLoading}
            keyboard={!isLoading}
            confirmLoading={isLoading}
            destroyOnClose={true}
        >
            <LegalDocumentForm
                form={form}
                isLoading={isLoading}
                isEdit={isEdit}
                initData={initData}
            />
        </BaseModal>
    );
};
