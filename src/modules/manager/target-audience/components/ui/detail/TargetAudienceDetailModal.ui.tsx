'use client';

import React from 'react';
import { Users } from 'lucide-react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { Button } from '@/shared/components/ui/button.ui';
import { TargetAudienceInfo } from './TargetAudienceInfo.ui';
import type { TargetAudience } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    targetAudience: TargetAudience | null;
}

export const TargetAudienceDetailModal: React.FC<Props> = ({
    open,
    onClose,
    targetAudience,
}) => {
    if (!targetAudience) return null;

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={`Chi tiết đối tượng`}
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
                        <Users className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">
                            {targetAudience.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {targetAudience.isActive ? 'Đang hoạt động' : 'Đã ngừng'}
                        </p>
                    </div>
                </div>
                <TargetAudienceInfo targetAudience={targetAudience} />
            </div>
        </BaseModal>
    );
};

