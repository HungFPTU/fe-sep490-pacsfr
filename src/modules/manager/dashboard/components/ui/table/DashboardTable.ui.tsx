'use client';

import React from 'react';
import { DashboardTableHeader } from './DashboardTableHeader.ui';
import { DashboardTableRow } from './DashboardTableRow.ui';
import type { ServiceStatistic } from '../../../types';

interface Props {
    services: ServiceStatistic[];
    isLoading: boolean;
}

export const DashboardTable: React.FC<Props> = ({ services, isLoading }) => {
    return (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-900">
                    Thống kê theo dịch vụ
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                    Chi tiết hiệu suất xử lý của từng dịch vụ
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <DashboardTableHeader />
                    <tbody className="divide-y divide-slate-200">
                        {isLoading ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-6 py-8 text-center text-slate-500"
                                >
                                    Đang tải dữ liệu...
                                </td>
                            </tr>
                        ) : services.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-6 py-8 text-center text-slate-500"
                                >
                                    Không có dữ liệu
                                </td>
                            </tr>
                        ) : (
                            services.map((service, index) => (
                                <DashboardTableRow
                                    key={service.serviceId}
                                    service={service}
                                    index={index + 1}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

