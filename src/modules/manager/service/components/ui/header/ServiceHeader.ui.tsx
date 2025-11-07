'use client';

import React from 'react';
import { Button } from '@/shared/components/ui/button.ui';
import { Plus } from 'lucide-react';

interface Props {
    onCreateClick: () => void;
}

export const ServiceHeader: React.FC<Props> = ({ onCreateClick }) => {
    return (
        <div className="mb-6 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-foreground">
                    Quản lý dịch vụ
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Quản lý danh sách dịch vụ hành chính công
                </p>
            </div>
            <Button
                onClick={onCreateClick}
                size="default"
                className="whitespace-nowrap"
            >
                <Plus className="h-4 w-4" />
                Tạo dịch vụ mới
            </Button>
        </div>
    );
};

