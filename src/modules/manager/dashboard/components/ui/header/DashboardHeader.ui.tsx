'use client';

import React from 'react';

export const DashboardHeader: React.FC = () => {
    return (
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900 underline">
                Trang Quản Trị Hệ Thống PASCS
            </h1>
            <p className="mt-2 text-sm text-slate-600">
                Thống kê và báo cáo tổng hợp về các hồ sơ và dịch vụ
            </p>
        </div>
    );
};

