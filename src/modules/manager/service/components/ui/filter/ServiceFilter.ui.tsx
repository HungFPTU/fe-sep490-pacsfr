'use client';

import React, { useEffect, useState } from 'react';
import { useServiceGroups } from '@/modules/manager/service-group/hooks';
import { getValuesPage } from '@/types/rest';
import { Search, X } from 'lucide-react';
import { Button } from '@/shared/components/ui/button.ui';
import { Input } from '@/shared/components/ui/input.ui';
import { cn } from '@/shared/lib/utils';

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
            <div className="flex items-center gap-1 flex-nowrap">
                {/* Search */}
                <div className="relative flex-1 min-w-[280px] mr-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                        type="text"
                        value={localKeyword}
                        onChange={(e) => setLocalKeyword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleApply();
                        }}
                        placeholder="Tên hoặc mã dịch vụ..."
                        className="pl-10"
                    />
                </div>

                {/* Service Group */}
                <div className="min-w-[170px] mr-3">
                    <select
                        value={localServiceGroupId}
                        onChange={(e) => setLocalServiceGroupId(e.target.value)}
                        className={cn(
                            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
                            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
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

                {/* Status */}
                <div className="min-w-[170px] mr-3">
                    <select
                        value={localIsActive ? 'true' : 'false'}
                        onChange={(e) => setLocalIsActive(e.target.value === 'true')}
                        className={cn(
                            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
                            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                            "disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                    >
                        <option value="true">Hoạt động</option>
                        <option value="false">Ngừng hoạt động</option>
                    </select>
                </div>

                {/* Actions */}
                <Button
                    onClick={handleApply}
                    size="default"
                    className="whitespace-nowrap mr-2 flex-shrink-0"
                >
                    <Search className="h-4 w-4 mr-1" />
                    Tìm kiếm
                </Button>
                <Button
                    onClick={handleResetLocal}
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

