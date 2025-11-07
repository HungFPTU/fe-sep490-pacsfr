'use client';

import React, { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/shared/components/ui/button.ui';
import { Input } from '@/shared/components/ui/input.ui';
import { cn } from '@/shared/lib/utils';

interface Props {
    keyword: string;
    onKeywordChange: (keyword: string) => void;
    isActive: boolean;
    onStatusChange: (isActive: boolean) => void;
    onRefresh?: () => void;
}

export const DocsTypeGroupFilter: React.FC<Props> = ({
    keyword,
    onKeywordChange,
    isActive,
    onStatusChange,
    onRefresh,
}) => {
    const [localKeyword, setLocalKeyword] = useState<string>(keyword || '');
    const [localIsActive, setLocalIsActive] = useState<boolean>(isActive);

    useEffect(() => {
        setLocalKeyword(keyword || '');
        setLocalIsActive(isActive);
    }, [keyword, isActive]);

    const handleApply = () => {
        onKeywordChange(localKeyword);
        onStatusChange(localIsActive);
        if (onRefresh) {
            onRefresh();
        }
    };

    const handleReset = () => {
        setLocalKeyword('');
        setLocalIsActive(true);
        onKeywordChange('');
        onStatusChange(true);
    };

    return (
        <div className="mb-4">
            <div className="flex items-center gap-1 flex-nowrap">
                <div className="relative flex-1 min-w-[280px] mr-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                        type="text"
                        placeholder="Tìm kiếm theo tên hoặc mã..."
                        value={localKeyword}
                        onChange={(e) => setLocalKeyword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleApply();
                        }}
                        className="pl-10"
                    />
                </div>

                <div className="min-w-[160px] mr-3">
                    <select
                        value={String(localIsActive)}
                        onChange={(e) => setLocalIsActive(e.target.value === 'true')}
                        className={cn(
                            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors',
                            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
                            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                            'disabled:cursor-not-allowed disabled:opacity-50'
                        )}
                    >
                        <option value="true">Đang kích hoạt</option>
                        <option value="false">Ngừng kích hoạt</option>
                    </select>
                </div>

                <Button
                    onClick={handleApply}
                    size="default"
                    className="whitespace-nowrap mr-2 flex-shrink-0"
                >
                    <Search className="h-4 w-4 mr-1" />
                    Tìm kiếm
                </Button>
                <Button
                    onClick={handleReset}
                    variant="outline"
                    size="default"
                    className="whitespace-nowrap flex-shrink-0"
                >
                    <X className="h-4 w-4 mr-1" />
                    Đặt lại
                </Button>
            </div>
        </div>
    );
};

