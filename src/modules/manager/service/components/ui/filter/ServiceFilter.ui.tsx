'use client';

import React, { useEffect, useState } from 'react';
import { useServiceGroups } from '@/modules/manager/service-group/hooks';
import { getValuesPage } from '@/types/rest';
import { cn } from '@/shared/lib/utils';
import { ManagerFilterBar } from '@/shared/components/manager/ui';

interface Props {
    keyword: string;
    serviceGroupId: string;
    isActive: boolean;
    onKeywordChange: (value: string) => void;
    onServiceGroupIdChange: (value: string) => void;
    onIsActiveChange: (value: boolean) => void;
    onReset: () => void;
    onRefresh?: () => void;
}

export const ServiceFilter: React.FC<Props> = ({
    keyword,
    serviceGroupId,
    isActive,
    onKeywordChange,
    onServiceGroupIdChange,
    onIsActiveChange,
    onReset,
    onRefresh,
}) => {
    // Fetch service groups for dropdown
    const { data: serviceGroupsData } = useServiceGroups({
        keyword: '',
        isActive: true,
        page: 1,
        size: 100,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pageResult = serviceGroupsData ? getValuesPage(serviceGroupsData as any) : null;
    const serviceGroups = pageResult?.items || [];

    // Local state cho filters
    const [localKeyword, setLocalKeyword] = useState<string>(keyword || '');
    const [localServiceGroupId, setLocalServiceGroupId] = useState<string>(serviceGroupId || '');
    const [localIsActive, setLocalIsActive] = useState<boolean>(isActive);

    useEffect(() => {
        setLocalKeyword(keyword || '');
        setLocalServiceGroupId(serviceGroupId || '');
        setLocalIsActive(isActive);
    }, [keyword, serviceGroupId, isActive]);

    const handleApply = () => {
        onKeywordChange(localKeyword);
        onServiceGroupIdChange(localServiceGroupId);
        onIsActiveChange(localIsActive);
        // Refresh data sau khi apply filters
        if (onRefresh) {
            onRefresh();
        }
    };

    const handleResetLocal = () => {
        setLocalKeyword('');
        setLocalServiceGroupId('');
        setLocalIsActive(true);
        onReset();
    };

    return (
        <div className="mb-4">
            <ManagerFilterBar
                searchValue={localKeyword}
                onSearchChange={(value: string) => setLocalKeyword(value)}
                onSubmit={handleApply}
                onReset={handleResetLocal}
                searchPlaceholder="Tên hoặc mã dịch vụ..."
            >
                <div className="w-full shrink-0 sm:w-[190px]">
                    <select
                        value={localServiceGroupId}
                        onChange={(e) => setLocalServiceGroupId(e.target.value)}
                        className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                            "disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                    >
                        <option value="">Tất cả nhóm</option>
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {serviceGroups.map((group: any) => (
                            <option key={group.id} value={group.id}>
                                {group.groupName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full shrink-0 sm:w-[170px]">
                    <select
                        value={localIsActive ? 'true' : 'false'}
                        onChange={(e) => setLocalIsActive(e.target.value === 'true')}
                        className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                            "disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                    >
                        <option value="true">Hoạt động</option>
                        <option value="false">Ngừng hoạt động</option>
                    </select>
                </div>
            </ManagerFilterBar>
        </div>
    );
};

