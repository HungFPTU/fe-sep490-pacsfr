'use client';

import React from 'react';

interface Props {
    onCreateClick: () => void;
    totalCount?: number;
}

export const TemplateHeader: React.FC<Props> = ({ onCreateClick, totalCount }) => {
    return (
        <div className="mb-6 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Quản lý Mẫu văn bản</h1>
                {totalCount !== undefined && (
                    <p className="mt-1 text-sm text-slate-500">
                        Tổng số: <span className="font-medium">{totalCount}</span> mẫu văn bản
                    </p>
                )}
            </div>
            <button
                onClick={onCreateClick}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
            >
                + Tạo mẫu văn bản mới
            </button>
        </div>
    );
};

