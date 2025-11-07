'use client';

import React, { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';

interface Props {
    keyword: string;
    onKeywordChange: (keyword: string) => void;
    isActive: boolean;
    onStatusChange: (isActive: boolean) => void;
    onRefresh?: () => void;
}

export const OrgUnitFilter: React.FC<Props> = ({
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
            <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative flex-1 min-w-[220px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên hoặc mã cơ quan..."
                        value={localKeyword}
                        onChange={(e) => setLocalKeyword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleApply();
                        }}
                        className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-300 text-sm focus:border-indigo-500 focus:outline-none"
                    />
                </div>

                {/* Status */}
                <select
                    value={String(localIsActive)}
                    onChange={(e) => setLocalIsActive(e.target.value === 'true')}
                    className="h-10 rounded-lg border border-slate-300 px-4 text-sm focus:border-indigo-500 focus:outline-none min-w-[160px]"
                >
                    <option value="true">Đang hoạt động</option>
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
                    onClick={handleReset}
                    className="px-4 h-10 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                    <X className="w-4 h-4" />
                    Đặt lại
                </button>
            </div>
        </div>
    );
};

