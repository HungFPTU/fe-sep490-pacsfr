'use client';

import React from 'react';

interface Props {
    fromDate?: string;
    toDate?: string;
    onFromDateChange: (date: string) => void;
    onToDateChange: (date: string) => void;
    onFilter: () => void;
    onReset: () => void;
}

export const DashboardFilter: React.FC<Props> = ({
    fromDate,
    toDate,
    onFromDateChange,
    onToDateChange,
    onFilter,
    onReset,
}) => {
    return (
        <div className="mb-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-end gap-4">
                <div className="flex-1">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Từ ngày
                    </label>
                    <input
                        type="date"
                        value={fromDate || ''}
                        onChange={(e) => onFromDateChange(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                </div>

                <div className="flex-1">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Đến ngày
                    </label>
                    <input
                        type="date"
                        value={toDate || ''}
                        onChange={(e) => onToDateChange(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                </div>

                <button
                    onClick={onFilter}
                    className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Lọc
                </button>

                <button
                    onClick={onReset}
                    className="rounded-lg border border-slate-300 bg-white px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                    Đặt lại
                </button>
            </div>
        </div>
    );
};

