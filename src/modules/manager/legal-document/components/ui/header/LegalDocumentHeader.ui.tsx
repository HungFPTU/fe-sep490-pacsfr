'use client';

import React from 'react';
import { Button } from '@/shared/components/ui/button.ui';
import { Plus } from 'lucide-react';

interface Props {
    onCreateNew: () => void;
    totalCount: number;
}

export const LegalDocumentHeader: React.FC<Props> = ({
    onCreateNew,
    totalCount,
}) => {
    return (
        <div className="mb-6 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Quản lý văn bản pháp luật</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Tổng cộng {totalCount} văn bản pháp luật
                </p>
            </div>

            <Button
                onClick={onCreateNew}
                size="default"
                className="whitespace-nowrap"
            >
                <Plus className="h-4 w-4" />
                Tạo văn bản mới
            </Button>
        </div>
    );
};
