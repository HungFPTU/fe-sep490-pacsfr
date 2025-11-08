'use client';

import React from 'react';
import { Button } from '@/shared/components/ui/button.ui';
import { Plus } from 'lucide-react';

interface Props {
    onCreateClick: () => void;
    totalCount?: number;
}

export const RequiredDocumentHeader: React.FC<Props> = ({ onCreateClick, totalCount }) => {
    return (
        <div className="mb-6 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Quản lý tài liệu yêu cầu</h1>
                {totalCount !== undefined && (
                    <p className="mt-1 text-sm text-muted-foreground">
                        Tổng số: <span className="font-medium">{totalCount}</span> tài liệu
                    </p>
                )}
            </div>
            <Button onClick={onCreateClick} size="default" className="whitespace-nowrap">
                <Plus className="mr-2 h-4 w-4" />
                Thêm tài liệu mới
            </Button>
        </div>
    );
};

