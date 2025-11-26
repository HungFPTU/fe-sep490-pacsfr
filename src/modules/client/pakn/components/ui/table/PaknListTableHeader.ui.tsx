'use client';

import { TableHead, TableHeader, TableRow } from '@/shared/components/manager/ui/table';

export const PaknListTableHeader: React.FC = () => (
    <TableHeader className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <TableRow>
            <TableHead className="w-[12%]">Mã PAKN</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead className="w-[16%]">Chủ đề</TableHead>
            <TableHead className="w-[20%]">Đơn vị tiếp nhận</TableHead>
            <TableHead className="w-[12%] text-center">Trạng thái</TableHead>
            <TableHead className="w-[12%] text-right pr-6">Ngày gửi</TableHead>
        </TableRow>
    </TableHeader>
);

