'use client';

import React from 'react';
import { Newspaper } from 'lucide-react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { Button } from '@/shared/components/ui/button.ui';
import { NewsCategoryInfo } from './NewsCategoryInfo.ui';
import type { NewsCategory } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    newsCategory: NewsCategory | null;
}

export const NewsCategoryDetailModal: React.FC<Props> = ({
    open,
    onClose,
    newsCategory,
}) => {
    if (!newsCategory) return null;

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={`Chi tiết danh mục: ${newsCategory.categoryName}`}
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
                        <Newspaper className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">
                            {newsCategory.categoryName}
                        </h3>
                        <p className="text-sm text-muted-foreground">Mã: {newsCategory.categoryCode}</p>
                    </div>
                </div>
                <NewsCategoryInfo newsCategory={newsCategory} />
            </div>
        </BaseModal>
    );
};

