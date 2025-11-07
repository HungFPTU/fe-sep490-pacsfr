'use client';

import React, { useEffect, useState } from 'react';
import { useServiceGroups } from '@/modules/manager/service-group/hooks';
import { getValuesPage } from '@/types/rest';
import { Search, X } from 'lucide-react';

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
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative flex-1 min-w-[220px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={localKeyword}
                        onChange={(e) => setLocalKeyword(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleApply(); }}
                        placeholder="Tên hoặc mã dịch vụ..."
                        className="w-full h-10 pl-10 pr-4 rounded-md border border-slate-300 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                </div>

                {/* Service Group */}
                <select
                    value={localServiceGroupId}
                    onChange={(e) => setLocalServiceGroupId(e.target.value)}
                    className="h-10 min-w-[180px] rounded-md border border-slate-300 px-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                    <option value="">Tất cả nhóm</option>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {serviceGroups.map((group: any) => (
                        <option key={group.id} value={group.id}>
                            {group.groupName}
                        </option>
                    ))}
                </select>

                {/* Status */}
                <select
                    value={localIsActive ? 'true' : 'false'}
                    onChange={(e) => setLocalIsActive(e.target.value === 'true')}
                    className="h-10 min-w-[160px] rounded-md border border-slate-300 px-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                    <option value="true">Hoạt động</option>
                    <option value="false">Ngừng hoạt động</option>
                </select>

                {/* Actions */}
                <button
                    onClick={handleApply}
                    className="px-4 h-10 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                    <Search className="w-4 h-4" />
                    Tìm kiếm
                </button>
                <button
                    onClick={handleResetLocal}
                    className="px-4 h-10 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                    <X className="w-4 h-4" />
                    Đặt lại
                </button>
            </div>
        </div>
    );
};

