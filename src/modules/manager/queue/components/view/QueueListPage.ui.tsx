'use client';

import React from 'react';
import { useQueueMonitoring } from '../../hooks';
import { QueueHeader, QueueTable } from '../ui';

export const QueueListPage: React.FC = () => {
    const { data, isLoading, error } = useQueueMonitoring();

    if (error) {
        return (
            <div className="min-h-screen bg-white p-6">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="mb-4 text-red-600">
                                <svg
                                    className="mx-auto h-12 w-12"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <p className="text-lg font-medium text-slate-900">
                                Không thể tải dữ liệu
                            </p>
                            <p className="mt-2 text-sm text-slate-600">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white p-6">
            <div className="mx-auto max-w-7xl space-y-6">
                {data ? (
                    <>
                        <QueueHeader
                            totalActiveQueues={data.totalActiveQueues}
                            totalWaitingCustomers={data.totalWaitingCustomers}
                            totalActiveCounters={data.totalActiveCounters}
                            lastUpdated={data.lastUpdated}
                        />
                        <QueueTable
                            queues={data.serviceGroupQueues}
                            isLoading={isLoading}
                        />
                    </>
                ) : (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
                            <p className="text-sm text-slate-600">Đang tải dữ liệu...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

