'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { LineChartData } from '../../../types';

interface Props {
    data: LineChartData;
}

export const CaseProcessingLineChart: React.FC<Props> = ({ data }) => {
    const chartData = data.dataPoints.map(point => ({
        name: `Ngày ${point.day}`,
        'Tổng hồ sơ': point.caseCount,
        'Hoàn thành': point.completedCount,
        'Đang xử lý': point.processingCount,
    }));

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-900">
                    Biểu đồ xử lý hồ sơ theo ngày
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                    Tháng {data.month}/{data.year} - Tổng: {data.totalCases} hồ sơ
                </p>
            </div>

            <ResponsiveContainer width="100%" height={400}>
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
            </ResponsiveContainer>
        </div>
    );
};
