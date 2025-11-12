'use client';

import React, { useState } from 'react';
import { useChartsData } from '../../../hooks';
import { CaseProcessingLineChart } from './CaseProcessingLineChart.ui';
import { ServiceUsagePieChart } from './ServiceUsagePieChart.ui';
import { QueueByHourBarChart } from './QueueByHourBarChart.ui';
import { CalendarIcon, FunnelIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export const DashboardCharts: React.FC = () => {
    const currentDate = new Date();
    const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
    const [year, setYear] = useState<number>(currentDate.getFullYear());
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [filterType, setFilterType] = useState<'month' | 'range'>('month');

    const getFiltersForAPI = () => {
        if (filterType === 'month') {
            const firstDay = new Date(year, month - 1, 1);
            const lastDay = new Date(year, month, 0);
            
            return {
                month,
                year,
                startDate: firstDay.toISOString().split('T')[0],
                endDate: lastDay.toISOString().split('T')[0],
            };
        } else {
            const start = startDate ? new Date(startDate) : new Date();
            return {
                month: start.getMonth() + 1,
                year: start.getFullYear(),
                startDate,
                endDate,
            };
        }
    };

    const [appliedFilters, setAppliedFilters] = useState(() => getFiltersForAPI());

    const { lineChart, pieChart, barChart, isLoading } = useChartsData(appliedFilters);

    const handleFilter = () => {
        setAppliedFilters(getFiltersForAPI());
    };

    const handleReset = () => {
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        setMonth(currentMonth);
        setYear(currentYear);
        setStartDate('');
        setEndDate('');
        setFilterType('month');
        
        const firstDay = new Date(currentYear, currentMonth - 1, 1);
        const lastDay = new Date(currentYear, currentMonth, 0);
        
        setAppliedFilters({
            month: currentMonth,
            year: currentYear,
            startDate: firstDay.toISOString().split('T')[0],
            endDate: lastDay.toISOString().split('T')[0],
        });
    };

    return (
        <div className="space-y-6 ">
            <div className="rounded-xl border border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 shadow-sm bg-white">
                <div className="mb-4 flex items-center gap-2">
                    <CalendarIcon className="h-6 w-6 text-indigo-600" />
                    <h2 className="text-xl font-bold text-slate-900">
                        Biểu đồ thống kê
                    </h2>
                </div>

                <div className="mb-4 flex gap-2">
                    <button
                        onClick={() => setFilterType('month')}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                            filterType === 'month'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white text-slate-600 hover:bg-slate-100'
                        }`}
                    >
                        Lọc theo tháng
                    </button>
                    <button
                        onClick={() => setFilterType('range')}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                            filterType === 'range'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white text-slate-600 hover:bg-slate-100'
                        }`}
                    >
                        Lọc theo khoảng
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {filterType === 'month' ? (
                        <>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Tháng
                                </label>
                                <select
                                    value={month}
                                    onChange={(e) => setMonth(Number(e.target.value))}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                >
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                                        <option key={m} value={m}>
                                            Tháng {m}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Năm
                                </label>
                                <select
                                    value={year}
                                    onChange={(e) => setYear(Number(e.target.value))}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                >
                                    {Array.from({ length: 5 }, (_, i) => currentDate.getFullYear() - i).map((y) => (
                                        <option key={y} value={y}>
                                            {y}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Từ ngày
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Đến ngày
                                </label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                />
                            </div>
                        </>
                    )}

                    <div className="flex items-end gap-2">
                        <button
                            onClick={handleFilter}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
                        >
                            <FunnelIcon className="h-4 w-4" />
                            Lọc
                        </button>
                        <button
                            onClick={handleReset}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                        >
                            <ArrowPathIcon className="h-4 w-4" />
                            Đặt lại
                        </button>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex h-96 items-center justify-center rounded-xl border border-slate-200 bg-white">
                    <div className="text-center">
                        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
                        <p className="mt-4 text-slate-600">Đang tải biểu đồ...</p>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {lineChart.data ? (
                        <CaseProcessingLineChart data={lineChart.data} />
                    ) : lineChart.error ? (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                            <h3 className="text-lg font-semibold text-red-900">
                                Biểu đồ xử lý hồ sơ theo ngày
                            </h3>
                            <p className="mt-2 text-sm text-red-700">
                                Không thể tải dữ liệu biểu đồ
                            </p>
                        </div>
                    ) : null}
                    
                    {pieChart.data ? (
                        <ServiceUsagePieChart data={pieChart.data} />
                    ) : pieChart.error ? (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                            <h3 className="text-lg font-semibold text-red-900">
                                Tỷ lệ sử dụng dịch vụ
                            </h3>
                            <p className="mt-2 text-sm text-red-700">
                                Không thể tải dữ liệu biểu đồ
                            </p>
                        </div>
                    ) : null}
                    
                    {barChart.data ? (
                        <QueueByHourBarChart data={barChart.data} />
                    ) : barChart.error ? (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                            <h3 className="text-lg font-semibold text-red-900">
                                Biểu đồ bốc số theo giờ
                            </h3>
                            <p className="mt-2 text-sm text-red-700">
                                Không thể tải dữ liệu biểu đồ
                            </p>
                        </div>
                    ) : null}

                    {!lineChart.data && !pieChart.data && !barChart.data && !isLoading && (
                        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
                            <p className="text-slate-500">Không có dữ liệu biểu đồ</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

