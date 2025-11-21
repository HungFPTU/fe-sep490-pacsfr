'use client';

import React from 'react';
import { EyeIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import type { Counter } from '../../../types';

interface Props {
    counter: Counter;
    onView?: (counterId: string) => void;
    onAssignStaff?: (counterId: string) => void;
}

export const CounterTableRow: React.FC<Props> = ({ counter, onView, onAssignStaff }) => {
    const getStatusBadge = (isActive: boolean) => {
        if (isActive) {
            return (
                <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                    Hoạt động
                </span>
            );
        }
        return (
            <span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
                Ngừng hoạt động
            </span>
        );
    };

    const serviceGroups = counter.serviceGroups?.$values || [];
    const serviceGroupsText = serviceGroups.length > 0
        ? serviceGroups.map(sg => sg.groupName).join(', ')
        : 'Không có';

    return (
        <tr className="border-b border-slate-200 bg-white transition-colors hover:bg-slate-50">
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                {counter.counterCode || '-'}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900">
                {counter.counterName || '-'}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                {counter.location || '-'}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                {counter.counterType || '-'}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                {counter.maxCapacity ? `${counter.maxCapacity} người` : '-'}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                {counter.staffName || '-'}
            </td>
            <td className="px-6 py-4 text-sm text-slate-600">
                <div className="max-w-xs">
                    {serviceGroups.length > 0 ? (
                        <div className="space-y-1">
                            {serviceGroups.map((sg) => (
                                <div key={sg.id} className="flex items-center gap-2">
                                    <span className="inline-flex rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800">
                                        {sg.groupName}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        ({sg.currentLength} đang chờ)
                                    </span>
                                    {sg.status && (
                                        <span className={`inline-flex rounded-full px-1.5 py-0.5 text-xs font-medium ${
                                            sg.status === 'Active' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-slate-100 text-slate-800'
                                        }`}>
                                            {sg.status}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <span className="text-slate-400">-</span>
                    )}
                </div>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm">
                {getStatusBadge(counter.isActive)}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() => onView?.(counter.id)}
                        className="inline-flex items-center justify-center rounded-lg p-2 text-indigo-600 transition-colors hover:bg-indigo-50"
                        title="Xem chi tiết"
                    >
                        <EyeIcon className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => onAssignStaff?.(counter.id)}
                        className="inline-flex items-center justify-center rounded-lg p-2 text-green-600 transition-colors hover:bg-green-50"
                        title="Gán nhân viên cho quầy"
                    >
                        <UserPlusIcon className="h-5 w-5" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

