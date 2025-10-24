'use client';

import React from 'react';

export const OrgUnitTableHeader: React.FC = () => {
    return (
        <thead className="bg-slate-50">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Mã cơ quan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Tên cơ quan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Loại hình
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Địa chỉ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Liên hệ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Cập nhật
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                    Hành động
                </th>
            </tr>
        </thead>
    );
};

