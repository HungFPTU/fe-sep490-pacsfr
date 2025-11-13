'use client';

import React from 'react';
import { ClockIcon, UserGroupIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import type { ServiceGroupQueue } from '../../../types';

interface Props {
    queue: ServiceGroupQueue;
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Empty':
            return {
                bg: 'bg-slate-50',
                border: 'border-slate-200',
                text: 'text-slate-600',
                badge: 'bg-slate-100 text-slate-600',
            };
        case 'Normal':
            return {
                bg: 'bg-green-50',
                border: 'border-green-200',
                text: 'text-green-700',
                badge: 'bg-green-100 text-green-700',
            };
        case 'Busy':
            return {
                bg: 'bg-yellow-50',
                border: 'border-yellow-200',
                text: 'text-yellow-700',
                badge: 'bg-yellow-100 text-yellow-700',
            };
        case 'Critical':
            return {
                bg: 'bg-red-50',
                border: 'border-red-200',
                text: 'text-red-700',
                badge: 'bg-red-100 text-red-700',
            };
        default:
            return {
                bg: 'bg-slate-50',
                border: 'border-slate-200',
                text: 'text-slate-600',
                badge: 'bg-slate-100 text-slate-600',
            };
    }
};

const getStatusText = (status: string) => {
    switch (status) {
        case 'Empty':
            return 'Trống';
        case 'Normal':
            return 'Bình thường';
        case 'Busy':
            return 'Bận';
        case 'Critical':
            return 'Nghiêm trọng';
        default:
            return status;
    }
};

export const QueueStatsCard: React.FC<Props> = ({ queue }) => {
    const colors = getStatusColor(queue.status);
    
    return (
        <div
            className={`group relative overflow-hidden rounded-lg border ${colors.border} ${colors.bg} p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}
        >
            <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">
                    {queue.serviceGroupName}
                </h3>
                <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors.badge}`}
                >
                    {getStatusText(queue.status)}
                </span>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <UserGroupIcon className="h-4 w-4" />
                        <span>Khách chờ:</span>
                    </div>
                    <span className={`text-sm font-bold ${colors.text}`}>
                        {queue.queueLength}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <ComputerDesktopIcon className="h-4 w-4" />
                        <span>Quầy:</span>
                    </div>
                    <span className="text-sm font-bold text-slate-700">
                        {queue.activeCounters}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <ClockIcon className="h-4 w-4" />
                        <span>Thời gian:</span>
                    </div>
                    <span className="text-sm font-bold text-slate-700">
                        {queue.estimatedWaitTime}p
                    </span>
                </div>
            </div>

            {queue.counters.length > 0 && (
                <div className="mt-3 border-t border-slate-200 pt-3">
                    <div className="mb-1.5 text-xs font-medium text-slate-600">
                        Quầy:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {queue.counters.map((counter, index) => {
                            const counterStatusColor =
                                counter.status === 'Available'
                                    ? 'bg-green-100 text-green-700'
                                    : counter.status === 'Busy'
                                      ? 'bg-red-100 text-red-700'
                                      : 'bg-slate-100 text-slate-600';
                            
                            const counterStatusText =
                                counter.status === 'Available'
                                    ? 'Sẵn'
                                    : counter.status === 'Busy'
                                      ? 'Bận'
                                      : 'Off';

                            return (
                                <div
                                    key={counter.counterId}
                                    className={`rounded px-2 py-0.5 text-xs font-medium ${counterStatusColor}`}
                                >
                                    Q{index + 1}: {counterStatusText}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

