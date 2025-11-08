'use client';

import React from 'react';
import { 
    DocumentTextIcon, 
    BriefcaseIcon, 
    CheckCircleIcon,
    FlagIcon
} from '@heroicons/react/24/outline';
import { PriorityRefreshButton } from '../refresh/PriorityRefreshButton.ui';

interface Props {
    totalCases: number;
    priorityCases: number;
    completedCases: number;
}

export const PriorityHeader: React.FC<Props> = ({
    totalCases,
    priorityCases,
    completedCases,
}) => {
    const stats = [
        {
            label: 'Tổng hồ sơ',
            value: totalCases,
            icon: DocumentTextIcon,
            gradient: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200',
            textColor: 'text-purple-700',
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600',
        },
        {
            label: 'Ưu tiên',
            value: priorityCases,
            icon: FlagIcon,
            gradient: 'from-red-500 to-red-600',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            textColor: 'text-red-700',
            iconBg: 'bg-red-100',
            iconColor: 'text-red-600',
        },
        {
            label: 'Hoàn thành',
            value: completedCases,
            icon: CheckCircleIcon,
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
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Quản lý hồ sơ & Ưu tiên
                        </h1>
                        <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                            <span className="inline-block h-2 w-2 animate-pulse rounded-full "></span>
                            Quản lý hồ sơ và ưu tiên các hồ sơ đặc biệt.
                        </p>
                    </div>
                </div>
                <PriorityRefreshButton />
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

