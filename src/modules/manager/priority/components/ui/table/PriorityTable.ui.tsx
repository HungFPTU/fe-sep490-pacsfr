'use client';

import React from 'react';
import { PriorityCard } from '../stats/PriorityCard.ui';
import type { PriorityCase } from '../../../types';

interface Props {
    cases: PriorityCase[];
    isLoading: boolean;
    onCardClick?: (priorityCase: PriorityCase) => void;
}

export const PriorityTable: React.FC<Props> = ({ cases, isLoading, onCardClick }) => {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
                    <p className="text-sm text-slate-600">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    if (cases.length === 0) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <p className="text-lg font-medium text-slate-600">
                        Không có hồ sơ ưu tiên nào
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                        Hiện tại không có hồ sơ ưu tiên nào trong hệ thống
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cases.map((priorityCase) => (
                <PriorityCard 
                    key={priorityCase.id} 
                    priorityCase={priorityCase}
                    onClick={onCardClick}
                />
            ))}
        </div>
    );
};

