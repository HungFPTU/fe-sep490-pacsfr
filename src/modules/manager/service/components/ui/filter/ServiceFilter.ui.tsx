'use client';

import React from 'react';
import { useServiceGroups } from '@/modules/manager/service-group/hooks';
import { getValuesPage } from '@/types/rest';

interface Props {
    keyword: string;
    serviceGroupId: string;
    isActive: boolean;
    onKeywordChange: (value: string) => void;
    onServiceGroupIdChange: (value: string) => void;
    onIsActiveChange: (value: boolean) => void;
    onReset: () => void;
}

export const ServiceFilter: React.FC<Props> = ({
    keyword,
    serviceGroupId,
    isActive,
    onKeywordChange,
    onServiceGroupIdChange,
    onIsActiveChange,
    onReset,
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

    return (
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {/* Search */}
                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Tìm kiếm
                    </label>
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => onKeywordChange(e.target.value)}
                        placeholder="Tên hoặc mã dịch vụ..."
                        className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                </div>

                {/* Service Group */}
                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Nhóm dịch vụ
                    </label>
                    <select
                        value={serviceGroupId}
                        onChange={(e) => onServiceGroupIdChange(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                        <option value="">Tất cả</option>
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {serviceGroups.map((group: any) => (
                            <option key={group.id} value={group.id}>
                                {group.groupName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Trạng thái
                    </label>
                    <select
                        value={isActive ? 'true' : 'false'}
                        onChange={(e) => onIsActiveChange(e.target.value === 'true')}
                        className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                        <option value="true">Hoạt động</option>
                        <option value="false">Ngừng hoạt động</option>
                    </select>
                </div>

                {/* Reset Button */}
                <div className="flex items-end">
                    <button
                        onClick={onReset}
                        className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Đặt lại
                    </button>
                </div>
            </div>
        </div>
    );
};

