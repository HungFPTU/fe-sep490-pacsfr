'use client';

import React from 'react';

interface Props {
    keyword: string;
    onKeywordChange: (keyword: string) => void;
    isActive: boolean;
    onStatusChange: (isActive: boolean) => void;
}

export const ServiceGroupFilter: React.FC<Props> = ({
    keyword,
    onKeywordChange,
    isActive,
    onStatusChange,
}) => {
    return (
        <div className="mb-4 flex gap-4">
            <input
                type="text"
                placeholder="Tìm kiếm theo tên hoặc mã..."
                value={keyword}
                onChange={(e) => onKeywordChange(e.target.value)}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
            <select
                value={String(isActive)}
                onChange={(e) => onStatusChange(e.target.value === 'true')}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            >
                <option value="true">Đang kích hoạt</option>
                <option value="false">Ngừng kích hoạt</option>
            </select>
        </div>
    );
};

