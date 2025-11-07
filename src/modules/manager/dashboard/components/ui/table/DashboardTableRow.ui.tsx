'use client';

import React from 'react';
import type { ServiceStatistic } from '../../../types';

interface Props {
    service: ServiceStatistic;
    index: number;
}

export const DashboardTableRow: React.FC<Props> = ({ service, index }) => {
    const getCompletionRateColor = (rate: number) => {
        if (rate >= 80) return 'text-green-600 bg-green-50';
        if (rate >= 50) return 'text-yellow-600 bg-yellow-50';
        return 'text-red-600 bg-red-50';
    };

    return (
        <tr className="hover:bg-slate-50">
            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900">
                {index}
            </td>
            <td className="px-6 py-4 text-sm font-medium text-slate-900">
                {service.serviceName}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-slate-900">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {service.totalCases}
                </span>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-slate-900">
                <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                    {service.completedCases}
                </span>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-slate-900">
                {service.averageProcessingTime.toFixed(1)}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getCompletionRateColor(service.completionRate)}`}
                >
                    {service.completionRate.toFixed(0)}%
                </span>
            </td>
        </tr>
    );
};

