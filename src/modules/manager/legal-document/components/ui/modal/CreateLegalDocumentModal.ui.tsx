'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/manager';
import { LegalDocumentForm } from './LegalDocumentForm.ui';
import { useLegalDocumentForm, useCreateLegalDocument, useUpdateLegalDocument } from '../../../hooks';
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
    const { formData, errors, updateField, validateForm, resetForm } = useLegalDocumentForm(
        initData ? {
            documentNumber: initData.documentNumber,
            documentType: initData.documentType,
            name: initData.name,
            issueDate: initData.issueDate.toString(),
            issueBody: initData.issueBody,
            effectiveDate: initData.effectiveDate.toString(),
            status: initData.status,
            isActive: initData.isActive,
        } : undefined
    );

    const createMutation = useCreateLegalDocument();
    const updateMutation = useUpdateLegalDocument();
    const isEdit = !!initData?.id;

    const handleOk = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const requestData = {
                documentNumber: formData.documentNumber,
                documentType: formData.documentType,
                name: formData.name,
                issueDate: new Date(formData.issueDate),
                issueBody: formData.issueBody,
                effectiveDate: new Date(formData.effectiveDate),
                status: formData.status,
                isActive: formData.isActive,
                file: formData.file,
            };

            if (isEdit) {
                await updateMutation.mutateAsync({
                    id: initData!.id,
                    data: {
                        id: initData!.id,
                        ...requestData,
                    },
                });
            } else {
                await createMutation.mutateAsync(requestData);
            }

            resetForm();
            onSuccess?.();
        } catch (error) {
            console.error('Error saving legal document:', error);
            // You can add toast notification here
        }
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const isLoading = createMutation.isPending || updateMutation.isPending;

    return (
        <BaseModal
            open={open}
            onClose={handleClose}
            title={isEdit ? 'Cập nhật văn bản pháp luật' : 'Tạo văn bản pháp luật mới'}
            onOk={handleOk}
            onCancel={handleClose}
            okText={isLoading ? 'Đang xử lý...' : (isEdit ? 'Cập nhật' : 'Tạo mới')}
            cancelText="Hủy"
            centered
            size="large"
            maskClosable={false}
            keyboard={false}
            destroyOnClose={true}
        >
            <LegalDocumentForm
                formData={formData}
                errors={errors}
                updateField={updateField}
                isEdit={isEdit}
            />
        </BaseModal>
    );
};
