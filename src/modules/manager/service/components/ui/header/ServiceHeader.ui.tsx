'use client';

import React from 'react';

interface Props {
    onCreateClick: () => void;
}

export const ServiceHeader: React.FC<Props> = ({ onCreateClick }) => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Quản lý dịch vụ
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Quản lý danh sách dịch vụ hành chính công
                </p>
            </div>
            <button
                onClick={onCreateClick}
                className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
                Tạo dịch vụ mới
            </button>
        </div>
    );
};

