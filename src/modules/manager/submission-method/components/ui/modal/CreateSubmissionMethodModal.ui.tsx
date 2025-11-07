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
        console.log('[CreateSubmissionMethodModal] handleOk called');
        console.log('[CreateSubmissionMethodModal] Form state:', form.state);
        console.log('[CreateSubmissionMethodModal] Form values:', form.state.values);
        console.log('[CreateSubmissionMethodModal] Form errors:', form.state.errors);
        console.log('[CreateSubmissionMethodModal] Form field states:', {
            submissionMethodName: form.state.fieldMeta.submissionMethodName,
            processingTime: form.state.fieldMeta.processingTime,
            fee: form.state.fieldMeta.fee,
        });

        // Try to submit - form.handleSubmit will validate and call onSubmit if valid
        const result = await handleSubmit();
        console.log('[CreateSubmissionMethodModal] handleSubmit result:', result);
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

