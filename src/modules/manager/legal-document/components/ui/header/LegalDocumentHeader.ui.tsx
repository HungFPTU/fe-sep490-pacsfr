'use client';

import React from 'react';
import { Button } from '@/shared/components/manager/ui/button';
import { PlusIcon } from 'lucide-react';

interface Props {
    onCreateNew: () => void;
    totalCount: number;
}

export const LegalDocumentHeader: React.FC<Props> = ({
    onCreateNew,
    totalCount,
}) => {
    return (
        <div className="flex items-center justify-between py-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Quản lý văn bản pháp luật</h1>
                <p className="text-sm text-slate-500 mt-1">
                    Tổng cộng {totalCount} văn bản pháp luật
                </p>
            </div>

            <Button
                onClick={onCreateNew}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
            >
                <PlusIcon className="h-4 w-4" />
                Tạo văn bản mới
            </Button>
        </div>
    );
};
