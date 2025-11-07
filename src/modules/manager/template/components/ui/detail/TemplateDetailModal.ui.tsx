'use client';

import React from 'react';
import { FileCode } from 'lucide-react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { Button } from '@/shared/components/ui/button.ui';
import { TemplateInfo } from './TemplateInfo.ui';
import type { Template } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    template: Template | null;
}

export const TemplateDetailModal: React.FC<Props> = ({
    open,
    onClose,
    template,
}) => {
    if (!template) return null;

    const templateName = template.templateName || (template as unknown as { sampleName?: string }).sampleName || '';
    const templateCode = template.templateCode || (template as unknown as { sampleCode?: string }).sampleCode || '';

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={`Chi tiết template: ${templateName}`}
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
                        <FileCode className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">
                            {templateName}
                        </h3>
                        <p className="text-sm text-muted-foreground">Mã: {templateCode}</p>
                    </div>
                </div>
                <TemplateInfo template={template} />
            </div>
        </BaseModal>
    );
};

