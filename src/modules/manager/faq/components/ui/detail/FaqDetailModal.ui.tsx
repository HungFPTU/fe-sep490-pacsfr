'use client';

import React from 'react';
import { HelpCircle } from 'lucide-react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { Button } from '@/shared/components/ui/button.ui';
import { FaqInfo } from './FaqInfo.ui';
import type { Faq } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    faq: Faq | null;
}

export const FaqDetailModal: React.FC<Props> = ({
    open,
    onClose,
    faq,
}) => {
    if (!faq) return null;

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={`Chi tiết câu hỏi thường gặp`}
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
                        <HelpCircle className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">
                            {faq.question}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {faq.serviceName} - {faq.categoryName}
                        </p>
                    </div>
                </div>
                <FaqInfo faq={faq} />
            </div>
        </BaseModal>
    );
};

