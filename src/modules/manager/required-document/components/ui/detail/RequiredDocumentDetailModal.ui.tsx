'use client';

import React from 'react';
import { FileText } from 'lucide-react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { Button } from '@/shared/components/ui/button.ui';
import { RequiredDocumentInfo } from './RequiredDocumentInfo.ui';
import type { RequiredDocument } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    document: RequiredDocument | null;
}

export const RequiredDocumentDetailModal: React.FC<Props> = ({ open, onClose, document }) => {
    if (!document) return null;

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={`Chi tiết tài liệu yêu cầu`}
            centered
            size="large"
            footer={
                <div className="flex items-center justify-end">
                    <Button onClick={onClose}>Đóng</Button>
                </div>
            }
        >
            <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-border pb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">{document.description || 'Tài liệu yêu cầu'}</h3>
                        <p className="text-sm text-muted-foreground">ID: {document.id}</p>
                    </div>
                </div>
                <RequiredDocumentInfo document={document} />
            </div>
        </BaseModal>
    );
};

