'use client';

import React, { useEffect } from 'react';
import { BaseModal } from '@/shared/components/manager';
import { LegalDocumentForm } from './LegalDocumentForm.ui';
import { useLegalDocumentForm, useCreateLegalDocument, useUpdateLegalDocument } from '../../../hooks';
import type { LegalDocument, DocumentType, DocumentStatus } from '../../../types';

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
    // Debug logging
    console.log('[CreateLegalDocumentModal] initData:', initData);
    console.log('[CreateLegalDocumentModal] isEdit:', !!initData?.id);

    const { formData, errors, updateField, validateForm, resetForm } = useLegalDocumentForm(
        initData ? {
            documentNumber: initData.documentNumber,
            documentType: initData.documentType,
            name: initData.name,
            issueDate: initData.issueDate ? (typeof initData.issueDate === 'string' ? initData.issueDate.split('T')[0] : new Date(initData.issueDate).toISOString().split('T')[0]) : '',
            issueBody: initData.issueBody,
            effectiveDate: initData.effectiveDate ? (typeof initData.effectiveDate === 'string' ? initData.effectiveDate.split('T')[0] : new Date(initData.effectiveDate).toISOString().split('T')[0]) : '',
            status: initData.status,
            isActive: initData.isActive,
        } : undefined
    );

    // Debug form data
    console.log('[CreateLegalDocumentModal] formData:', formData);

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
                documentType: formData.documentType as DocumentType,
                name: formData.name,
                issueDate: new Date(formData.issueDate),
                issueBody: formData.issueBody,
                effectiveDate: new Date(formData.effectiveDate),
                status: formData.status as DocumentStatus,
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

    // Reset form when modal opens with new initData
    useEffect(() => {
        if (open && initData) {
            console.log('[CreateLegalDocumentModal] Modal opened with initData, resetting form');
            resetForm();
        }
    }, [open, initData, resetForm]);

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
