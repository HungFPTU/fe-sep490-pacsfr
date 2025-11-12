"use client";

import React from "react";
import { TableRow, TableHead } from "@/shared/components/manager/ui/table";

export const PublicServiceNewsTableHeader: React.FC = () => {
    return (
        <TableRow>
            <TableHead className="w-[220px]">Tiêu đề</TableHead>
            <TableHead>Danh mục</TableHead>
            <TableHead>Dịch vụ</TableHead>
            <TableHead className="w-[160px]">Tác giả</TableHead>
            <TableHead className="w-[120px]">Trạng thái</TableHead>
            <TableHead className="w-[150px]">Cập nhật</TableHead>
            <TableHead className="w-[140px] text-right">Hành động</TableHead>
        </TableRow>
    );
};
