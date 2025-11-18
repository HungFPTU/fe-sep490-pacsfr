'use client';

import React from 'react';

interface PublicServiceNewsFilterProps {
    keyword: string;
    onKeywordChange: (value: string) => void;
    onSearch: () => void;
    onReset: () => void;
}

export const PublicServiceNewsFilter: React.FC<PublicServiceNewsFilterProps> = ({
    keyword,
    onKeywordChange,
    onSearch,
    onReset,
}) => {
    return (
        <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:gap-4">
            <input
                type="text"
                value={keyword}
                onChange={(e) => onKeywordChange(e.target.value)}
                placeholder="Nhập từ khóa bài viết..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
            <div className="flex items-center gap-2">
                <button
                    onClick={onSearch}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                    Tìm kiếm
                </button>
                <button
                    onClick={onReset}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                    Đặt lại
                </button>
            </div>
        </div>
    );
};

