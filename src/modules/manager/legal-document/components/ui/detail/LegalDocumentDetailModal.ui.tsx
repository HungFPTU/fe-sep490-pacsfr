'use client';

import React from 'react';
import { FileText } from 'lucide-react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { Button } from '@/shared/components/ui/button.ui';
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
    if (!legalDocument) return null;

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={`Chi tiết văn bản pháp luật: ${legalDocument.name}`}
            onOk={onClose}
            okText="Đóng"
            centered
            size="large"
            footer={
                <Button
                    type="button"
                    onClick={onClose}
                    variant="default"
                >
                    Đóng
                </Button>
            }
        >
            <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-border pb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">
                            {legalDocument.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Số: {legalDocument.documentNumber}
                        </p>
                    </div>
                </div>
                <LegalDocumentInfo legalDocument={legalDocument} />
            </div>
        </BaseModal>
    );
};
