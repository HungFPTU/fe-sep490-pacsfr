'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
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

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={`Chi tiết template: ${template.templateName}`}
            onOk={onClose}
            okText="Đóng"
            centered
            size="large"
            footer={
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                >
                    Đóng
                </button>
            }
        >
            <div className="space-y-6">
                <TemplateInfo template={template} />
            </div>
        </BaseModal>
    );
};

