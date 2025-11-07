'use client';

import React from 'react';
import { Button } from '@/shared/components/ui/button.ui';
import { Plus } from 'lucide-react';

interface Props {
    onCreateClick: () => void;
}

export const DepartmentHeader: React.FC<Props> = ({ onCreateClick }) => {
    return (
        <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Quản lý Phòng Ban</h1>
            <Button
                onClick={onCreateClick}
                size="default"
                className="whitespace-nowrap"
            >
                <Plus className="h-4 w-4" />
                Tạo phòng ban mới
            </Button>
        </div>
    );
};

