'use client';

import React from 'react';

interface Props {
    onCreateClick: () => void;
}

export const DocsTypeGroupHeader: React.FC<Props> = ({ onCreateClick }) => {
    return (
        <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">Quản lý Nhóm Hồ Sơ</h1>
            <button
                onClick={onCreateClick}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
            >
                + Tạo nhóm mới
            </button>
        </div>
    );
};

