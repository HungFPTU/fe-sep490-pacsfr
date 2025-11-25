'use client';

import { Table, TableBody } from '@/shared/components/manager/ui/table';
import type { PaknItem } from '../../../types/response';
import { PaknListTableHeader } from './PaknListTableHeader.ui';
import { PaknListTableRow } from './PaknListTableRow.ui';

interface PaknListTableProps {
    items: PaknItem[];
}

export const PaknListTable: React.FC<PaknListTableProps> = ({ items }) => {
    return (
        <div className="rounded-lg border border-slate-200">
            <Table>
                <PaknListTableHeader />
                <TableBody>
                    {items.map((item) => (
                        <PaknListTableRow key={item.id} item={item} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

