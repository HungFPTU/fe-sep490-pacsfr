'use client';

import { TableHead, TableHeader, TableRow } from '@/shared/components/manager/ui/table';

export const PaknCategoryTableHeader: React.FC = () => (
    <TableHeader className="bg-slate-50">
        <TableRow>
            <TableHead className="w-[30%]">Tên danh mục</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead className="w-[12%] text-center">Trạng thái</TableHead>
            <TableHead className="w-[15%] text-right pr-6">Thao tác</TableHead>
        </TableRow>
    </TableHeader>
);

