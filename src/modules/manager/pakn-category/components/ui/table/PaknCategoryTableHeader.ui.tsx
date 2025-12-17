'use client';

import { TableHead, TableHeader, TableRow } from '@/shared/components/manager/ui/table';

export const PaknCategoryTableHeader: React.FC = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className="w-[200px]">Tên danh mục</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead className="w-[120px]">Trạng thái</TableHead>
                <TableHead className="w-[150px] text-right">Thao tác</TableHead>
            </TableRow>
        </TableHeader>
    );
};

