'use client';

import React from 'react';
import { TableRow, TableHead } from '@/shared/components/manager/ui/table';

export const TemplateTableHeader: React.FC = () => {
    return (
        <TableRow>
            <TableHead className="w-[120px]">Mã template</TableHead>
            <TableHead>Tên template</TableHead>
            <TableHead className="w-[150px]">Loại văn bản</TableHead>
            <TableHead className="w-[100px]">Phiên bản</TableHead>
            <TableHead className="w-[200px]">File</TableHead>
            <TableHead className="w-[120px]">Trạng thái</TableHead>
            <TableHead className="w-[150px]">Ngày cập nhật</TableHead>
            <TableHead className="w-[120px] text-right">Thao tác</TableHead>
        </TableRow>
    );
};

