'use client';

import React, { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

interface Props {
    onFilter: (filters: {
        caseCode?: string;
        priorityLevel?: number;
        caseStatus?: string;
    }) => void;
}

export const PriorityFilter: React.FC<Props> = ({ onFilter }) => {
    const [caseCode, setCaseCode] = useState('');
    const [priorityLevel, setPriorityLevel] = useState<number | undefined>(undefined);
    const [caseStatus, setCaseStatus] = useState('');

    const handleApplyFilter = () => {
        onFilter({
            caseCode: caseCode || undefined,
            priorityLevel,
            caseStatus: caseStatus || undefined,
        });
    };

    const handleReset = () => {
        setCaseCode('');
        setPriorityLevel(undefined);
        setCaseStatus('');
        onFilter({
            caseCode: undefined,
            priorityLevel: undefined,
            caseStatus: undefined,
        });
    };

    return (
        <div className="mb-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
                <FunnelIcon className="h-5 w-5 text-slate-600" />
                <h3 className="font-semibold text-slate-900">Bộ lọc</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div className="relative">
                    <label className="mb-1 block text-xs font-medium text-slate-600">
                        Mã hồ sơ
                    </label>
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={caseCode}
                            onChange={(e) => setCaseCode(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">
                        Mức ưu tiên
                    </label>
                    <select
                        value={priorityLevel ?? ''}
                        onChange={(e) => setPriorityLevel(e.target.value ? Number(e.target.value) : undefined)}
                        className="w-full rounded-lg border border-slate-300 py-2 px-4 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    >
                        <option value="">Tất cả</option>
                        <option value="1">Ưu tiên </option>
                        <option value="0">Bình thường </option>
                    </select>
                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">
                        Trạng thái
                    </label>
                    <select
                        value={caseStatus}
                        onChange={(e) => setCaseStatus(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-2 px-4 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    >
                        <option value="">Tất cả</option>
                        <option value="Mới tiếp nhận">Mới tiếp nhận</option>
                        <option value="Đang xử lý">Đang xử lý</option>
                        <option value="Hoàn thành">Hoàn thành</option>
                        <option value="Từ chối">Từ chối</option>
                    </select>
                </div>

                <div className="flex items-end gap-2">
                    <button
                        onClick={handleApplyFilter}
                        className="flex-1 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
                    >
                        Lọc
                    </button>
                    <button
                        onClick={handleReset}
                        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                        Đặt lại
                    </button>
                </div>
            </div>
        </div>
    );
};

