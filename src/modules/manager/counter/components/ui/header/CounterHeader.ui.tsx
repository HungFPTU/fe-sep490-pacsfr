'use client';

import React from 'react';
import { ComputerDesktopIcon, PlusIcon } from '@heroicons/react/24/outline';

interface Props {
    totalCount?: number;
    onCreateClick?: () => void;
}

export const CounterHeader: React.FC<Props> = ({ totalCount = 0, onCreateClick }) => {
    return (
        <div className="mb-6 flex items-center justify-between">
            <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg">
                    <ComputerDesktopIcon className="h-7 w-7 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Quản lý quầy
                    </h1>
                    <p className="mt-1 text-sm text-slate-600">
                        Tổng số quầy đang hoạt động: <span className="font-semibold text-indigo-600">{totalCount}</span>
                    </p>
                </div>
            </div>
            {onCreateClick && (
                <button
                    onClick={onCreateClick}
                    className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
                >
                    <PlusIcon className="h-5 w-5" />
                    Tạo Mới Quầy
                </button>
            )}
        </div>
    );
};

