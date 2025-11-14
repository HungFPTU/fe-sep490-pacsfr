'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/manager';
import { LegalDocumentInfo } from './LegalDocumentInfo.ui';
import type { LegalDocument } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    legalDocument: LegalDocument | null;
}

export const LegalDocumentDetailModal: React.FC<Props> = ({
    open,
    onClose,
    legalDocument,
}) => {
    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title="Chi tiết văn bản pháp luật"
            onCancel={onClose}
            cancelText="Đóng"
            centered
            size="large"
            maskClosable={true}
            keyboard={true}
            destroyOnClose={true}
            footer={null}
        >
            {legalDocument && <LegalDocumentInfo legalDocument={legalDocument} />}
        </BaseModal>
    );
};
