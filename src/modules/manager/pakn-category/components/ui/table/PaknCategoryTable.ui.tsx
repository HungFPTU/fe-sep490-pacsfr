'use client';

import { Table, TableBody } from '@/shared/components/manager/ui/table';
import type { PaknCategory } from '../../../types/response';
import { PaknCategoryTableHeader } from './PaknCategoryTableHeader.ui';
import { PaknCategoryTableRow } from './PaknCategoryTableRow.ui';

interface PaknCategoryTableProps {
    categories: PaknCategory[];
    onEdit: (category: PaknCategory) => void;
    onDelete: (category: PaknCategory) => void;
}

export const PaknCategoryTable: React.FC<PaknCategoryTableProps> = ({
    categories,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="rounded-lg border border-slate-200">
            <Table>
                <PaknCategoryTableHeader />
                <TableBody>
                    {categories.map((category) => (
                        <PaknCategoryTableRow
                            key={category.id}
                            category={category}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

