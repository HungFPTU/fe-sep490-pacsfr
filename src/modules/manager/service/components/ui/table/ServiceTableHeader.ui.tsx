'use client';

import React from 'react';
import { TableRow, TableHead } from '@/shared/components/manager/ui/table';

export const ServiceTableHeader: React.FC = () => {
    return (
        <TableRow>
            <TableHead className="w-[120px]">Mã dịch vụ</TableHead>
            <TableHead>Tên dịch vụ</TableHead>
            <TableHead>Nhóm dịch vụ</TableHead>
            <TableHead className="w-[150px]">Loại dịch vụ</TableHead>
            <TableHead className="w-[120px]">Trực tuyến</TableHead>
            <TableHead className="w-[120px]">Trạng thái</TableHead>
            <TableHead className="w-[120px] text-right">Hành động</TableHead>
        </TableRow>
    );
};

