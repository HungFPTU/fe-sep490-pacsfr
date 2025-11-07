'use client';

import React from 'react';
import { Button } from '@/shared/components/ui/button.ui';
import { Plus } from 'lucide-react';

interface Props {
    onCreateClick: () => void;
    totalCount?: number;
}

export const SubmissionMethodHeader: React.FC<Props> = ({ onCreateClick, totalCount }) => {
    return (
        <div className="mb-6 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Quản lý Phương thức nộp hồ sơ</h1>
                {totalCount !== undefined && (
                    <p className="mt-1 text-sm text-muted-foreground">
                        Tổng số: <span className="font-medium">{totalCount}</span> phương thức
                    </p>
                )}
            </div>
            <Button
                onClick={onCreateClick}
                size="default"
                className="whitespace-nowrap"
            >
                <Plus className="h-4 w-4" />
                Tạo phương thức mới
            </Button>
        </div>
    );
};

