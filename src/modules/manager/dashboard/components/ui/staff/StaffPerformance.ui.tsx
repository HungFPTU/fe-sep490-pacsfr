'use client';

import React from 'react';
import { UserGroupIcon, StarIcon } from '@heroicons/react/24/outline';
import type { StaffPerformance } from '../../../types';

interface Props {
    data: StaffPerformance[];
}

export const StaffPerformanceSection: React.FC<Props> = ({ data }) => {
    const sortedStaff = [...data].sort((a, b) => b.totalCases - a.totalCases);
    const topPerformers = sortedStaff.slice(0, 5);

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">
                        Hiệu suất làm việc của nhân viên
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                        Top nhân viên xử lý nhiều hồ sơ nhất
                    </p>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-purple-50 px-4 py-2">
                    <UserGroupIcon className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-semibold text-purple-600">
                        {data.length} nhân viên
                    </span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="border-b border-slate-200 bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                                #
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                                Nhân viên
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                                Tổng hồ sơ
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                                Hoàn thành
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                                Chờ xử lý
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                                Tỷ lệ HT
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                                Đánh giá TB
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                                Phản hồi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {topPerformers.map((staff, index) => (
                            <tr
                                key={staff.staffId}
                                className="transition-colors hover:bg-slate-50"
                            >
                                <td className="px-4 py-4">
                                    <div
                                        className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-white ${
                                            index === 0
                                                ? 'bg-gradient-to-br from-yellow-400 to-yellow-600'
                                                : index === 1
                                                  ? 'bg-gradient-to-br from-slate-300 to-slate-500'
                                                  : index === 2
                                                    ? 'bg-gradient-to-br from-orange-400 to-orange-600'
                                                    : 'bg-slate-400'
                                        }`}
                                    >
                                        {index + 1}
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <div>
                                        <div className="font-semibold text-slate-900">
                                            {staff.staffName}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            {staff.staffCode}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-center">
                                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                                        {staff.totalCases}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-center">
                                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                                        {staff.completedCases}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-center">
                                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                                        {staff.pendingCases}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-center">
                                    <span
                                        className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
                                            staff.completionRate >= 80
                                                ? 'bg-green-100 text-green-700'
                                                : staff.completionRate >= 50
                                                  ? 'bg-yellow-100 text-yellow-700'
                                                  : 'bg-red-100 text-red-700'
                                        }`}
                                    >
                                        {staff.completionRate.toFixed(0)}%
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-center">
                                    <div className="flex items-center justify-center gap-1">
                                        <StarIcon className="h-4 w-4 text-amber-400 fill-amber-400" />
                                        <span className="font-semibold text-slate-900">
                                            {staff.averageRating.toFixed(1)}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-center">
                                    <span className="text-sm text-slate-600">
                                        {staff.totalFeedbacks}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {data.length > 5 && (
                <div className="mt-4 text-center text-sm text-slate-500">
                    Hiển thị top 5 / {data.length} nhân viên
                </div>
            )}
        </div>
    );
};
