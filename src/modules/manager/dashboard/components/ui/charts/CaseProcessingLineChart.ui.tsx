'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Settings } from 'lucide-react';
import type { LineChartData } from '../../../types';

interface Props {
    data: LineChartData;
}

export const CaseProcessingLineChart: React.FC<Props> = ({ data }) => {
    const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

    const chartData = data.dataPoints.map(point => ({
        name: `Ngày ${point.day}`,
        'Tổng hồ sơ': point.caseCount,
        'Hoàn thành': point.completedCount,
        'Đang xử lý': point.processingCount,
    }));

    const toggleChartType = () => {
        setChartType(prev => prev === 'bar' ? 'line' : 'bar');
    };

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                        Biểu đồ xử lý hồ sơ theo ngày
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                        Tháng {data.month}/{data.year} - Tổng: {data.totalCases} hồ sơ
                    </p>
                </div>
                <button
                    onClick={toggleChartType}
                    className="flex items-center gap-2 rounded-lg border p-2 hover:bg-slate-50 transition-colors"
                    title="Chuyển kiểu biểu đồ"
                >
                    <Settings className="h-4 w-4 text-slate-600" />
                    <span className="text-sm font-medium text-slate-600">
                        {chartType === 'bar' ? 'Biểu đồ đường' : 'Biểu đồ cột'}
                    </span>
                </button>
            </div>

            <ResponsiveContainer width="100%" height={400}>
                {chartType === 'bar' ? (
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 12 }}
                            stroke="#64748b"
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            stroke="#64748b"
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e2e8f0',
                                borderRadius: '0.5rem',
                            }}
                            cursor={{ fill: '#f1f5f9' }}
                        />
                        <Legend />
                        <Bar
                            dataKey="Tổng hồ sơ"
                            fill="#6366f1"
                            radius={[4, 4, 0, 0]}
                            barSize={40}
                        />
                        <Bar
                            dataKey="Hoàn thành"
                            fill="#10b981"
                            radius={[4, 4, 0, 0]}
                            barSize={40}
                        />
                        <Bar
                            dataKey="Đang xử lý"
                            fill="#f59e0b"
                            radius={[4, 4, 0, 0]}
                            barSize={40}
                        />
                    </BarChart>
                ) : (
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 12 }}
                            stroke="#64748b"
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            stroke="#64748b"
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e2e8f0',
                                borderRadius: '0.5rem',
                            }}
                            cursor={{ stroke: '#64748b', strokeWidth: 1 }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="Tổng hồ sơ"
                            stroke="#6366f1"
                            activeDot={{ r: 8 }}
                            strokeWidth={2}
                        />
                        <Line
                            type="monotone"
                            dataKey="Hoàn thành"
                            stroke="#10b981"
                            activeDot={{ r: 8 }}
                            strokeWidth={2}
                        />
                        <Line
                            type="monotone"
                            dataKey="Đang xử lý"
                            stroke="#f59e0b"
                            activeDot={{ r: 8 }}
                            strokeWidth={2}
                        />
                    </LineChart>
                )}
            </ResponsiveContainer>
        </div>
    );
};
