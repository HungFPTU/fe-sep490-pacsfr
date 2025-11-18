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

export const DepartmentFilter: React.FC<Props> = ({
    keyword,
    onKeywordChange,
    isActive,
    onStatusChange,
    onRefresh,
}) => {
    // Local state để tránh gọi API liên tục khi gõ
    const [localKeyword, setLocalKeyword] = useState<string>(keyword || '');
    const [localIsActive, setLocalIsActive] = useState<boolean>(isActive);

    // Đồng bộ khi props thay đổi từ phía ngoài
    useEffect(() => {
        setLocalKeyword(keyword || '');
        setLocalIsActive(isActive);
    }, [keyword, isActive]);

    const handleApply = () => {
        // Gọi các setter của parent trong cùng một tick → React sẽ batch lại
        onKeywordChange(localKeyword);
        onStatusChange(localIsActive);
        // Refresh data sau khi apply filters
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
            <ManagerFilterBar
                searchValue={localKeyword}
                onSearchChange={(value: string) => setLocalKeyword(value)}
                onSubmit={handleApply}
                onReset={handleReset}
                searchPlaceholder="Tìm kiếm theo tên hoặc mã phòng ban..."
            >
                <div className="w-full shrink-0 sm:w-[180px]">
                    <select
                        value={String(localIsActive)}
                        onChange={(e) => setLocalIsActive(e.target.value === 'true')}
                        className={cn(
                            'flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors',
                            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                            'disabled:cursor-not-allowed disabled:opacity-50',
                        )}
                    >
                        <option value="true">Đang hoạt động</option>
                        <option value="false">Ngừng hoạt động</option>
                    </select>
                </div>
            </ManagerFilterBar>
        </div>
    );
};

