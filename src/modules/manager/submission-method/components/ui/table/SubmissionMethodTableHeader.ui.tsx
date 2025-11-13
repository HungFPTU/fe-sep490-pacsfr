'use client';

import React from 'react';
import { TableRow, TableHead } from '@/shared/components/manager/ui/table';

export const SubmissionMethodTableHeader: React.FC = () => {
    return (
        <TableRow>
            <TableHead className="w-[220px]">Tên phương thức</TableHead>
            <TableHead className="w-[150px]">Thời gian xử lý</TableHead>
            <TableHead className="w-[120px]">Phí</TableHead>
            <TableHead className="w-[200px]">Mô tả</TableHead>
            <TableHead className="w-[120px]">Trạng thái</TableHead>
            {/* <TableHead className="w-[150px]">Ngày tạo</TableHead> */}
            <TableHead className="w-[120px] text-right">Thao tác</TableHead>
        </TableRow>
    );
};

