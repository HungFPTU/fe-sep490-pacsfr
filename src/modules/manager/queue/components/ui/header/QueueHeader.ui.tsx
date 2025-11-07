'use client';

import React from 'react';
import { 
    RectangleStackIcon, 
    UserGroupIcon, 
    ComputerDesktopIcon,
    ClockIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';
import { QueueRefreshButton } from '../refresh/QueueRefreshButton.ui';

interface Props {
    totalActiveQueues: number;
    totalWaitingCustomers: number;
    totalActiveCounters: number;
    lastUpdated: string;
}

export const QueueHeader: React.FC<Props> = ({
    totalActiveQueues,
    totalWaitingCustomers,
    totalActiveCounters,
    lastUpdated,
}) => {
    const formatTime = (isoString: string) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toLocaleTimeString('vi-VN');
    };

    const stats = [
        {
            label: 'Hàng đợi hoạt động',
            value: totalActiveQueues,
            icon: RectangleStackIcon,
            gradient: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            textColor: 'text-blue-700',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
        },
        {
            label: 'Khách hàng chờ',
            value: totalWaitingCustomers,
            icon: UserGroupIcon,
            gradient: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200',
            textColor: 'text-orange-700',
            iconBg: 'bg-orange-100',
            iconColor: 'text-orange-600',
        },
        {
            label: 'Quầy hoạt động',
            value: totalActiveCounters,
            icon: ComputerDesktopIcon,
            gradient: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            textColor: 'text-green-700',
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
        },
    ];

    return (
        <div className="mb-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg">
                        <ChartBarIcon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Giám sát hàng đợi
                        </h1>
                        <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                            Theo dõi trạng thái hàng đợi theo thời gian thực
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 shadow-sm">
                        <ClockIcon className="h-4 w-4 text-slate-500" />
                        <div className="text-right">
                            <div className="text-xs text-slate-500">Cập nhật</div>
                            <div className="text-sm font-semibold text-slate-700">
                                {formatTime(lastUpdated)}
                            </div>
                        </div>
                    </div>
                    <QueueRefreshButton />
                </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <div
                            key={index}
                            className={`group relative overflow-hidden rounded-xl border ${stat.borderColor} ${stat.bgColor} p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
                        >
                            <div className={`absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 transition-all duration-300 group-hover:scale-150`} />
                            
                            <div className="relative flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                                            <IconComponent className={`h-5 w-5 ${stat.iconColor}`} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-slate-600">
                                                {stat.label}
                                            </p>
                                            <p className={`text-3xl font-bold ${stat.textColor}`}>
                                                {stat.value}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${stat.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}>
                                    <IconComponent className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

