'use client';

import React from 'react';
import { FileText } from 'lucide-react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { Button } from '@/shared/components/ui/button.ui';
import { DocsTypeInfo } from './DocsTypeInfo.ui';
import type { DocsType } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    docsType: DocsType | null;
}

export const DocsTypeDetailModal: React.FC<Props> = ({
    open,
    onClose,
    docsType,
}) => {
    if (!docsType) return null;

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={`Chi tiết loại văn bản: ${docsType.docTypeName}`}
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
                            {docsType.docTypeName}
                        </h3>
                        <p className="text-sm text-muted-foreground">Mã: {docsType.docTypeCode}</p>
                    </div>
                </div>
                <DocsTypeInfo docsType={docsType} />
            </div>
        </BaseModal>
    );
};

