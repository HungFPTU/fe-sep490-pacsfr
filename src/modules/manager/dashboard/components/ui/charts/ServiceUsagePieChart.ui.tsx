'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { PieChartData } from '../../../types';

interface Props {
    data: PieChartData;
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export const ServiceUsagePieChart: React.FC<Props> = ({ data }) => {
    const chartData = data.serviceData.map(service => ({
        name: service.serviceName,
        value: service.usageCount,
        percentage: service.usagePercentage,
        group: service.serviceGroupName,
    }));

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-900">
                    Tỷ lệ sử dụng dịch vụ
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                    Tổng: {data.totalUsage} lượt sử dụng
                </p>
            </div>
            
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(props) => {
                            const payload = props.payload as { name: string; percentage: number };
                            return `${payload.name}: ${payload.percentage.toFixed(1)}%`;
                        }}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '0.5rem',
                        }}
                        formatter={(value: number, name: string, props: unknown) => {
                            const percentage = (props as { payload: { percentage: number } }).payload.percentage;
                            return [`${value} lượt (${percentage.toFixed(1)}%)`, name];
                        }}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>

            <div className="mt-6 space-y-2">
                {data.serviceData.map((service, index) => (
                    <div key={service.serviceId} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                        <div className="flex items-center gap-3">
                            <div 
                                className="h-4 w-4 rounded"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <div>
                                <p className="text-sm font-medium text-slate-900">{service.serviceName}</p>
                                <p className="text-xs text-slate-500">{service.serviceGroupName}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-semibold text-slate-900">{service.usageCount} lượt</p>
                            <p className="text-xs text-slate-500">{service.usagePercentage.toFixed(1)}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

