'use client';

import React from 'react';

export const CounterTableHeader: React.FC = () => {
    return (
        <thead className="bg-slate-50">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Mã quầy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Tên quầy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Vị trí
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Loại quầy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Sức chứa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Nhóm dịch vụ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Trạng thái
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
                    Thao tác
                </th>
            </tr>
        </thead>
    );
};

