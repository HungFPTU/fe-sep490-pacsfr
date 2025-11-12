'use client';

import React from 'react';
import { TableRow, TableHead } from '@/shared/components/manager/ui/table';

export const FaqCategoryTableHeader: React.FC = () => {
    return (
        <TableRow>
            <TableHead className="w-[120px]">Mã danh mục</TableHead>
            <TableHead>Tên danh mục</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead className="w-[120px]">Trạng thái</TableHead>
            <TableHead className="w-[150px]">Cập nhật</TableHead>
            <TableHead className="w-[120px] text-right">Hành động</TableHead>
        </TableRow>
    );
};

