'use client';

import React from 'react';
import { TableHead, TableRow } from '@/shared/components/manager/ui/table';

export const TargetAudienceTableHeader: React.FC = () => {
    return (
        <TableRow>
            <TableHead className="w-[200px]">Tên đối tượng</TableHead>
            <TableHead className="max-w-md">Mô tả</TableHead>
            <TableHead className="w-[120px]">Trạng thái</TableHead>
            <TableHead className="w-[150px]">Ngày tạo</TableHead>
            <TableHead className="w-[150px] text-right">Thao tác</TableHead>
        </TableRow>
    );
};

