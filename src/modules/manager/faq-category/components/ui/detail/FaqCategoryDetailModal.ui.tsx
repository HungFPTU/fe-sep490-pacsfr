'use client';

import React from 'react';
import { HelpCircle } from 'lucide-react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { Button } from '@/shared/components/ui/button.ui';
import { FaqCategoryInfo } from './FaqCategoryInfo.ui';
import type { FaqCategory } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    faqCategory: FaqCategory | null;
}

export const FaqCategoryDetailModal: React.FC<Props> = ({
    open,
    onClose,
    faqCategory,
}) => {
    if (!faqCategory) return null;

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={`Chi tiết danh mục: ${faqCategory.categoryName}`}
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
                            {faqCategory.categoryName}
                        </h3>
                        <p className="text-sm text-muted-foreground">Mã: {faqCategory.categoryCode}</p>
                    </div>
                </div>
                <FaqCategoryInfo faqCategory={faqCategory} />
            </div>
        </BaseModal>
    );
};

