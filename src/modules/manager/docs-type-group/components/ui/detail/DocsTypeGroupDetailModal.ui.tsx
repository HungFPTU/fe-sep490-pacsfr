'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { DocsTypeGroupInfo } from './DocsTypeGroupInfo.ui';
import type { DocsTypeGroup } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    docsTypeGroup: DocsTypeGroup | null;
}

export const DocsTypeGroupDetailModal: React.FC<Props> = ({
    open,
    onClose,
    docsTypeGroup,
}) => {
    if (!docsTypeGroup) return null;

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={`Chi tiết nhóm hồ sơ: ${docsTypeGroup.groupName}`}
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
                <DocsTypeGroupInfo docsTypeGroup={docsTypeGroup} />
            </div>
        </BaseModal>
    );
};

