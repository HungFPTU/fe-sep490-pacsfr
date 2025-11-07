'use client';

import React from 'react';
import { TableRow, TableHead } from '@/shared/components/manager/ui/table';

export const DocsTypeTableHeader: React.FC = () => {
    return (
        <TableRow>
            <TableHead className="w-[120px]">Mã loại</TableHead>
            <TableHead>Tên loại</TableHead>
            <TableHead className="w-[150px]">Nhóm hồ sơ</TableHead>
            <TableHead className="w-[120px]">Định dạng</TableHead>
            <TableHead className="w-[140px]">Kích thước tối đa</TableHead>
            <TableHead className="w-[120px]">Trạng thái</TableHead>
            <TableHead className="w-[150px]">Cập nhật</TableHead>
            <TableHead className="w-[120px] text-right">Hành động</TableHead>
        </TableRow>
    );
};

