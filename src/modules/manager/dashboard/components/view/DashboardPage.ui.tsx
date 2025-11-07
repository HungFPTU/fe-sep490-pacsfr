'use client';

import React, { useState } from 'react';
import { useComprehensiveReport } from '../../hooks';
import {
    DashboardHeader,
    DashboardFilter,
    DashboardStatsCards,
    DashboardTable,
    FeedbackStatisticsSection,
    StaffPerformanceSection,
} from '../ui';

export const DashboardPage: React.FC = () => {
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    const [appliedFilters, setAppliedFilters] = useState<{
        fromDate?: string;
        toDate?: string;
    }>({});

    const { data, isLoading } = useComprehensiveReport(appliedFilters);

    const handleFilter = () => {
        setAppliedFilters({
            fromDate: fromDate || undefined,
            toDate: toDate || undefined,
        });
    };

    const handleReset = () => {
        setFromDate('');
        setToDate('');
        setAppliedFilters({});
    };

    return (
        <div className="min-h-screen bg-white p-6">
            <div className="mx-auto max-w-7xl space-y-6">
                <DashboardHeader />

                <DashboardFilter
                    fromDate={fromDate}
                    toDate={toDate}
                    onFromDateChange={setFromDate}
                    onToDateChange={setToDate}
                    onFilter={handleFilter}
                    onReset={handleReset}
                />

                {isLoading ? (
                    <div className="flex h-64 items-center justify-center">
                        <div className="text-center">
                            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
                            <p className="mt-4 text-slate-600">Đang tải dữ liệu...</p>
                        </div>
                    </div>
                ) : data ? (
                    <>
                        <DashboardStatsCards data={data.systemStatistics} />

                        <DashboardTable
                            services={data.systemStatistics.serviceStatistics}
                            isLoading={isLoading}
                        />

                        <FeedbackStatisticsSection data={data.feedbackStatistics} />

                        <StaffPerformanceSection data={data.staffPerformance} />

                        {data.systemStatistics.averageProcessingTime > 0 && (
                            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h3 className="text-lg font-semibold text-slate-900">
                                    Thông tin bổ sung
                                </h3>
                                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="rounded-lg bg-indigo-50 p-4">
                                        <p className="text-sm text-indigo-600">
                                            Thời gian xử lý trung bình
                                        </p>
                                        <p className="mt-2 text-2xl font-bold text-indigo-900">
                                            {data.systemStatistics.averageProcessingTime.toFixed(1)}{' '}
                                            phút
                                        </p>
                                    </div>
                                    <div className="rounded-lg bg-green-50 p-4">
                                        <p className="text-sm text-green-600">
                                            Tỷ lệ hoàn thành
                                        </p>
                                        <p className="mt-2 text-2xl font-bold text-green-900">
                                            {data.systemStatistics.totalCases > 0
                                                ? (
                                                      (data.systemStatistics.completedCases /
                                                          data.systemStatistics.totalCases) *
                                                      100
                                                  ).toFixed(1)
                                                : 0}
                                            %
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="rounded-lg border border-slate-200 bg-white p-12 text-center shadow-sm">
                        <p className="text-slate-500">Không có dữ liệu để hiển thị</p>
                    </div>
                )}
            </div>
        </div>
    );
};

