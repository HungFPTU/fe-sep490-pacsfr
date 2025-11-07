'use client';

import React from 'react';
import { TableRow, TableHead } from '@/shared/components/manager/ui/table';

export const LegalDocumentTableHeader: React.FC = () => {
    return (
        <TableRow>
            <TableHead className="w-[150px]">Số văn bản</TableHead>
            <TableHead>Tên văn bản</TableHead>
            <TableHead className="w-[130px]">Loại văn bản</TableHead>
            <TableHead className="w-[130px]">Trạng thái</TableHead>
            <TableHead className="w-[130px]">Ngày ban hành</TableHead>
            <TableHead className="w-[130px]">Ngày hiệu lực</TableHead>
            <TableHead className="w-[120px]">Hoạt động</TableHead>
            <TableHead className="w-[150px] text-right">Hành động</TableHead>
        </TableRow>
    );
};

