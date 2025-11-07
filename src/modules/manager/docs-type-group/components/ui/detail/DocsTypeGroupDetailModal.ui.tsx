'use client';

import React from 'react';
import { Folder } from 'lucide-react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { Button } from '@/shared/components/ui/button.ui';
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
                        <Folder className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">
                            {docsTypeGroup.groupName}
                        </h3>
                        <p className="text-sm text-muted-foreground">Mã: {docsTypeGroup.groupCode}</p>
                    </div>
                </div>
                <DocsTypeGroupInfo docsTypeGroup={docsTypeGroup} />
            </div>
        </BaseModal>
    );
};

