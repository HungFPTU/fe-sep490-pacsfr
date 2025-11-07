'use client';

import React from 'react';
import { TableRow, TableHead } from '@/shared/components/manager/ui/table';

export const ServiceProcedureTableHeader: React.FC = () => {
    return (
        <TableRow>
            <TableHead className="w-[80px]">Bước</TableHead>
            <TableHead className="w-[220px]">Tên bước</TableHead>
            <TableHead className="w-[220px]">Dịch vụ</TableHead>
            <TableHead className="w-[220px]">Mẫu biểu</TableHead>
            <TableHead className="w-[180px]">Đơn vị phụ trách</TableHead>
            <TableHead className="w-[160px]">Thời gian xử lý</TableHead>
            <TableHead className="w-[120px]">Trạng thái</TableHead>
            <TableHead className="w-[120px] text-right">Hành động</TableHead>
        </TableRow>
    );
};
