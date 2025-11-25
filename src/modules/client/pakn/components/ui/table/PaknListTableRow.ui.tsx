'use client';

import { TableCell, TableRow } from '@/shared/components/manager/ui/table';
import { PaknStatusBadge } from '../status/PaknStatusBadge.ui';
import type { PaknItem } from '../../../types/response';
import { formatDate as formatDateUtils } from '@/shared/lib/utils';

interface PaknListTableRowProps {
    item: PaknItem;
}

const formatDate = (value?: string) => {
    if (!value) return '—';
    try {
        return formatDateUtils(value);
    } catch {
        return value;
    }
};

export const PaknListTableRow: React.FC<PaknListTableRowProps> = ({ item }) => (
    <TableRow>
        <TableCell className="font-semibold text-slate-900">{item.paknCode || '—'}</TableCell>
        <TableCell>
            <div className="text-sm font-medium text-slate-900">{item.title}</div>
            <div className="text-xs text-slate-500">{item.citizenName}</div>
        </TableCell>
        <TableCell className="text-sm text-slate-700">{item.categoryName || '—'}</TableCell>
        <TableCell className="text-sm text-slate-700">{item.orgUnitName || '—'}</TableCell>
        <TableCell className="text-center">
            <PaknStatusBadge status={item.status} />
        </TableCell>
        <TableCell className="text-right pr-6 text-sm text-slate-600">
            {formatDate(item.createdAt)}
        </TableCell>
    </TableRow>
);

