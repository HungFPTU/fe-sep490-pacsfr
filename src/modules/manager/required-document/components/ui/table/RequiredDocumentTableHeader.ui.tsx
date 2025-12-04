'use client';

import React from 'react';
import { TableHead, TableRow } from '@/shared/components/manager/ui/table';

export const RequiredDocumentTableHeader: React.FC = () => {
    return (
        <TableRow>
            <TableHead className="w-[240px]">Mô tả tài liệu</TableHead>
            <TableHead className="w-[200px]">Dịch vụ</TableHead>
            <TableHead className="w-[200px]">Loại giấy tờ</TableHead>
            <TableHead className="w-[120px] text-center">Bản gốc</TableHead>
            <TableHead className="w-[120px] text-center">Bản sao</TableHead>

            <TableHead className="w-[140px] text-center">Cập nhật</TableHead>
            <TableHead className="w-[120px] text-right">Thao tác</TableHead>
        </TableRow>
    );
};

