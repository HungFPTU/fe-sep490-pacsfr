'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
                    />
                    <Legend />
                    <Line 
                        type="monotone" 
                        dataKey="Tổng hồ sơ" 
                        stroke="#6366f1" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="Hoàn thành" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="Đang xử lý" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

