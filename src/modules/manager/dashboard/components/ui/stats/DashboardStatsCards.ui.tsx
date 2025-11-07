'use client';

import React from 'react';
import {
    DocumentTextIcon,
    ClockIcon,
    ArrowPathIcon,
    CheckCircleIcon,
    XCircleIcon,
    CalendarDaysIcon,
    ChartBarIcon,
    PresentationChartLineIcon,
} from '@heroicons/react/24/outline';
import type { SystemStatistics } from '../../../types';

interface Props {
    data: SystemStatistics;
}

export const DashboardStatsCards: React.FC<Props> = ({ data }) => {
    const stats = [
        {
            label: 'Tổng hồ sơ',
            value: data.totalCases,
            Icon: DocumentTextIcon,
            bgGradient: 'from-blue-500 to-blue-600',
            textColor: 'text-blue-600',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
        },
        {
            label: 'Chờ xử lý',
            value: data.pendingCases,
            Icon: ClockIcon,
            bgGradient: 'from-amber-500 to-amber-600',
            textColor: 'text-amber-600',
            iconBg: 'bg-amber-100',
            iconColor: 'text-amber-600',
        },
        {
            label: 'Đang xử lý',
            value: data.inProgressCases,
            Icon: ArrowPathIcon,
            bgGradient: 'from-purple-500 to-purple-600',
            textColor: 'text-purple-600',
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600',
        },
        {
            label: 'Hoàn thành',
            value: data.completedCases,
            Icon: CheckCircleIcon,
            bgGradient: 'from-green-500 to-green-600',
            textColor: 'text-green-600',
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
        },
        {
            label: 'Từ chối',
            value: data.rejectedCases,
            Icon: XCircleIcon,
            bgGradient: 'from-red-500 to-red-600',
            textColor: 'text-red-600',
            iconBg: 'bg-red-100',
            iconColor: 'text-red-600',
        },
        {
            label: 'Hôm nay',
            value: data.todayCases,
            Icon: CalendarDaysIcon,
            bgGradient: 'from-indigo-500 to-indigo-600',
            textColor: 'text-indigo-600',
            iconBg: 'bg-indigo-100',
            iconColor: 'text-indigo-600',
        },
        {
            label: 'Tuần này',
            value: data.thisWeekCases,
            Icon: ChartBarIcon,
            bgGradient: 'from-cyan-500 to-cyan-600',
            textColor: 'text-cyan-600',
            iconBg: 'bg-cyan-100',
            iconColor: 'text-cyan-600',
        },
        {
            label: 'Tháng này',
            value: data.thisMonthCases,
            Icon: PresentationChartLineIcon,
            bgGradient: 'from-teal-500 to-teal-600',
            textColor: 'text-teal-600',
            iconBg: 'bg-teal-100',
            iconColor: 'text-teal-600',
        },
    ];

    return (
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {stats.map((stat, index) => {
                const IconComponent = stat.Icon;
                return (
                    <div
                        key={index}
                        className="group relative overflow-hidden rounded-lg border border-slate-200/60 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <div
                            className={`absolute right-0 top-0 h-16 w-16 translate-x-6 -translate-y-6 rounded-full bg-gradient-to-br ${stat.bgGradient} opacity-10 transition-all duration-300 group-hover:scale-125`}
                        />

                        <div className="relative">
                            <div className="mb-3 flex items-center justify-between">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconBg} transition-transform duration-300 group-hover:scale-110`}
                                >
                                    <IconComponent className={`h-5 w-5 ${stat.iconColor}`} />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <p className="text-xs font-medium text-slate-500">
                                    {stat.label}
                                </p>
                                <p className={`text-2xl font-bold ${stat.textColor}`}>
                                    {stat.value.toLocaleString('vi-VN')}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
