'use client';

import React from 'react';
import { CounterTableHeader } from './CounterTableHeader.ui';
import { CounterTableRow } from './CounterTableRow.ui';
import type { Counter } from '../../../types';

interface Props {
    counters: Counter[];
    isLoading: boolean;
    onView?: (counterId: string) => void;
    onAssignServiceGroup?: (counterId: string) => void;
    onDelete?: (counterId: string) => void;
    isDeleting?: boolean;
}

export const CounterTable: React.FC<Props> = ({ counters, isLoading, onView, onAssignServiceGroup, onDelete, isDeleting }) => {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
                    <p className="text-sm text-slate-600">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    if (counters.length === 0) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-center py-12">
                    <p className="text-lg font-medium text-slate-600">
                        Không có quầy nào
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                        Hiện tại không có quầy nào đang hoạt động
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full">
                <CounterTableHeader />
                <tbody className="divide-y divide-slate-200">
                    {counters.map((counter) => (
                        <CounterTableRow 
                            key={counter.id} 
                            counter={counter} 
                            onView={onView}
                            onAssignServiceGroup={onAssignServiceGroup}
                            onDelete={onDelete}
                            isDeleting={isDeleting}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

