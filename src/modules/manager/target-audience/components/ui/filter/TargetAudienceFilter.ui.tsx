'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { ManagerFilterBar } from '@/shared/components/manager/ui';

interface Props {
    keyword: string;
    isActive: boolean;
    onApply: (filters: { keyword: string; isActive: boolean }) => void;
    onReset: () => void;
}

export const TargetAudienceFilter: React.FC<Props> = ({
    keyword,
    isActive,
    onApply,
    onReset,
}) => {
    // Local state for filter inputs (not triggering API)
    const [localFilters, setLocalFilters] = useState({
        keyword: keyword || '',
        isActive: isActive,
    });

    // Sync local filters when props change (e.g., reset from parent)
    useEffect(() => {
        setLocalFilters({
            keyword: keyword || '',
            isActive: isActive,
        });
    }, [keyword, isActive]);

    const handleApply = () => {
        // Apply filters - trigger API call
        onApply({
            keyword: localFilters.keyword.trim(),
            isActive: localFilters.isActive,
        });
    };

    const handleReset = () => {
        const resetFilters = {
            keyword: '',
            isActive: true,
        };
        setLocalFilters(resetFilters);
        onApply(resetFilters);
        onReset();
    };

    return (
        <div className="mb-4">
            <ManagerFilterBar
                searchValue={localFilters.keyword}
                onSearchChange={(value: string) => setLocalFilters((prev) => ({ ...prev, keyword: value }))}
                onSubmit={handleApply}
                onReset={handleReset}
                searchPlaceholder="Tìm kiếm theo tên hoặc mô tả..."
            >
                <div className="w-full shrink-0 sm:w-[170px]">
                    <select
                        value={String(localFilters.isActive)}
                        onChange={(e) => setLocalFilters((prev) => ({ ...prev, isActive: e.target.value === 'true' }))}
                        className={cn(
                            'flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors',
                            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
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

