'use client';

import React from 'react';
import { TableRow, TableHead } from '@/shared/components/manager/ui/table';

export const OrgUnitTableHeader: React.FC = () => {
    return (
        <TableRow>
            <TableHead className="w-[120px]">Mã cơ quan</TableHead>
            <TableHead>Tên cơ quan</TableHead>
            <TableHead className="w-[120px]">Loại hình</TableHead>
            <TableHead className="w-[180px]">Liên hệ</TableHead>
            <TableHead className="w-[120px]">Trạng thái</TableHead>
            <TableHead className="w-[150px]">Cập nhật</TableHead>
            <TableHead className="w-[120px] text-right">Hành động</TableHead>
        </TableRow>
    );
};

