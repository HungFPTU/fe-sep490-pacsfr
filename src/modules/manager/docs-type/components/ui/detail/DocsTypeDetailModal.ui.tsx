'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
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
                <DocsTypeInfo docsType={docsType} />
            </div>
        </BaseModal>
    );
};

