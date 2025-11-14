'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { useDocsTypeGroups } from '@/modules/manager/docs-type-group/hooks';
import { getValuesPage } from '@/types/rest';
import type { DocsTypeGroup } from '@/modules/manager/docs-type-group/types';
import { ManagerFilterBar } from '@/shared/components/manager/ui';

interface Props {
    keyword: string;
    onKeywordChange: (keyword: string) => void;
    groupId: string;
    onGroupIdChange: (groupId: string) => void;
    isActive: boolean;
    onStatusChange: (isActive: boolean) => void;
}

export const DocsTypeFilter: React.FC<Props> = ({
    keyword,
    onKeywordChange,
    groupId,
    onGroupIdChange,
    isActive,
    onStatusChange,
}) => {
    // Local state để tránh gọi API liên tục khi gõ
    const [localKeyword, setLocalKeyword] = useState<string>(keyword || '');
    const [localGroupId, setLocalGroupId] = useState<string>(groupId || '');
    const [localIsActive, setLocalIsActive] = useState<boolean>(isActive);

    // Đồng bộ khi props thay đổi từ phía ngoài
    useEffect(() => {
        setLocalKeyword(keyword || '');
        setLocalGroupId(groupId || '');
        setLocalIsActive(isActive);
    }, [keyword, groupId, isActive]);

    // Fetch docs type groups for dropdown
    const { data: groupsData } = useDocsTypeGroups({
        keyword: '',
        isActive: true,
        page: 1,
        size: 100,
    });

    const pageResult = groupsData ? getValuesPage(groupsData) : null;
    const groups = pageResult?.items || [];

    const handleApply = () => {
        // Gọi các setter của parent trong cùng một tick → React sẽ batch lại
        onKeywordChange(localKeyword);
        onGroupIdChange(localGroupId);
        onStatusChange(localIsActive);
    };

    const handleReset = () => {
        setLocalKeyword('');
        setLocalGroupId('');
        setLocalIsActive(true);
        onKeywordChange('');
        onGroupIdChange('');
        onStatusChange(true);
    };

    return (
        <div className="mb-4">
            <ManagerFilterBar
                searchValue={localKeyword}
                onSearchChange={(value: string) => setLocalKeyword(value)}
                onSubmit={handleApply}
                onReset={handleReset}
                searchPlaceholder="Tìm kiếm theo tên hoặc mã..."
            >
                <div className="w-full shrink-0 sm:w-[200px]">
                    <select
                        value={localGroupId}
                        onChange={(e) => setLocalGroupId(e.target.value)}
                        className={cn(
                            'flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors',
                            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                            'disabled:cursor-not-allowed disabled:opacity-50',
                        )}
                    >
                        <option value="">Tất cả nhóm hồ sơ</option>
                        {groups.map((group: DocsTypeGroup) => (
                            <option key={group.id} value={group.id}>
                                {group.groupName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full shrink-0 sm:w-[170px]">
                    <select
                        value={String(localIsActive)}
                        onChange={(e) => setLocalIsActive(e.target.value === 'true')}
                        className={cn(
                            'flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors',
                            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                            'disabled:cursor-not-allowed disabled:opacity-50',
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

