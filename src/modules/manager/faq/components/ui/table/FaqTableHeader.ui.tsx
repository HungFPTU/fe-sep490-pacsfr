'use client';

import React from 'react';
import { TableRow, TableHead } from '@/shared/components/manager/ui/table';

export const FaqTableHeader: React.FC = () => {
    return (
        <TableRow>
            <TableHead className="w-[200px]">Dịch vụ</TableHead>
            <TableHead className="w-[150px]">Danh mục</TableHead>
            <TableHead>Câu hỏi</TableHead>
            <TableHead className="w-[120px]">Trạng thái</TableHead>
            <TableHead className="w-[150px]">Cập nhật</TableHead>
            <TableHead className="w-[120px] text-right">Hành động</TableHead>
        </TableRow>
    );
};

