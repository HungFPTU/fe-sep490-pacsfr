'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { BarChartData } from '../../../types';

interface Props {
    data: BarChartData;
}

export const QueueByHourBarChart: React.FC<Props> = ({ data }) => {
    const chartData = data.hourlyData.map(point => ({
        name: point.hourLabel,
        'Số lượng bốc số': point.ticketCount,
        'Tỷ lệ %': point.percentage,
    }));

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-900">
                    Biểu đồ bốc số theo giờ
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                    Tổng: {data.totalTickets} lượt bốc số - Giờ cao điểm: {data.peakHour}:00 ({data.peakHourTicketCount} lượt)
                </p>
            </div>
            
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12 }}
                        stroke="#64748b"
                        angle={-45}
                        textAnchor="end"
                        height={80}
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
                    <Bar 
                        dataKey="Số lượng bốc số" 
                        fill="#6366f1"
                        radius={[8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>

            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-lg bg-indigo-50 p-4">
                    <p className="text-sm text-indigo-600">Tổng lượt bốc số</p>
                    <p className="mt-2 text-2xl font-bold text-indigo-900">
                        {data.totalTickets}
                    </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-4">
                    <p className="text-sm text-purple-600">Giờ cao điểm</p>
                    <p className="mt-2 text-2xl font-bold text-purple-900">
                        {data.peakHour}:00
                    </p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                    <p className="text-sm text-blue-600">Số lượng cao điểm</p>
                    <p className="mt-2 text-2xl font-bold text-blue-900">
                        {data.peakHourTicketCount}
                    </p>
                </div>
                <div className="rounded-lg bg-cyan-50 p-4">
                    <p className="text-sm text-cyan-600">Trung bình/giờ</p>
                    <p className="mt-2 text-2xl font-bold text-cyan-900">
                        {(data.totalTickets / 24).toFixed(1)}
                    </p>
                </div>
            </div>
        </div>
    );
};

