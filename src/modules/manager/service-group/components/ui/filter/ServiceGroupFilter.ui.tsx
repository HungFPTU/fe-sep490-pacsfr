'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { ManagerFilterBar } from '@/shared/components/manager/ui';

interface Props {
    keyword: string;
    onKeywordChange: (keyword: string) => void;
    isActive: boolean;
    onStatusChange: (isActive: boolean) => void;
    onRefresh?: () => void;
}

export const ServiceGroupFilter: React.FC<Props> = ({
    keyword,
    onKeywordChange,
    isActive,
    onStatusChange,
    onRefresh,
}) => {
    // Tách thành từng filter item cho UI rõ ràng hơn
    const [localKeyword, setLocalKeyword] = useState<string>(keyword || '');
    const [localIsActive, setLocalIsActive] = useState<boolean>(isActive);

    useEffect(() => {
        setLocalKeyword(keyword || '');
        setLocalIsActive(isActive);
    }, [keyword, isActive]);

    const handleApply = () => {
        onKeywordChange(localKeyword);
        onStatusChange(localIsActive);
        if (onRefresh) onRefresh();
    };

    const handleReset = () => {
        setLocalKeyword('');
        setLocalIsActive(true);
        onKeywordChange('');
        onStatusChange(true);
        if (onRefresh) onRefresh();
    };

    return (
        <div className="mb-4 w-full">
            <ManagerFilterBar
                searchValue={localKeyword}
                onSearchChange={(value: string) => setLocalKeyword(value)}
                onSubmit={handleApply}
                onReset={handleReset}
                searchPlaceholder="Tìm kiếm theo tên hoặc mã..."
            >
                <div className="w-full shrink-0 sm:w-[180px]">
                    <select
                        value={String(localIsActive)}
                        onChange={(e) => setLocalIsActive(e.target.value === 'true')}
                        className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                            "disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                    >
                        <option value="true">Đang kích hoạt</option>
                        <option value="false">Ngừng kích hoạt</option>
                    </select>
                </div>
            </ManagerFilterBar>
        </div>
    );
};
