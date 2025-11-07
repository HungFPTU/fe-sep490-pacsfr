'use client';

import React from 'react';

export const SubmissionMethodTableHeader: React.FC = () => {
    return (
        <thead className="bg-slate-50">
            <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700">
                    Tên phương thức
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700">
                    Thời gian xử lý
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700">
                    Phí
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700">
                    Mô tả
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700">
                    Trạng thái
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700">
                    Ngày tạo
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-700">
                    Thao tác
                </th>
            </tr>
        </thead>
    );
};

