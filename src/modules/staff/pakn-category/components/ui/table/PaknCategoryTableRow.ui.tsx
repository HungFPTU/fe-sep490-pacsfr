'use client';

import { TableCell, TableRow } from '@/shared/components/manager/ui/table';
import { Button } from '@/shared/components/ui/button.ui';
import { Pencil, Trash2 } from 'lucide-react';
import { PaknCategoryStatusBadge } from '../others/PaknCategoryStatusBadge.ui';
import type { PaknCategory } from '../../../types/response';

interface PaknCategoryTableRowProps {
    category: PaknCategory;
    onEdit: (category: PaknCategory) => void;
    onDelete: (category: PaknCategory) => void;
}

export const PaknCategoryTableRow: React.FC<PaknCategoryTableRowProps> = ({ category, onEdit, onDelete }) => (
    <TableRow>
        <TableCell className="font-medium text-slate-900">
            {category.categoryName}
        </TableCell>
        <TableCell className="text-slate-600">
            {category.description || '—'}
        </TableCell>
        <TableCell className="text-center">
            <PaknCategoryStatusBadge isActive={category.isActive} />
        </TableCell>
        <TableCell className="text-right pr-6">
            <div className="flex justify-end gap-2">
                <Button
                    size="icon"
                    variant="outline"
                    className="h-9 w-9"
                    onClick={() => onEdit(category)}
                    title="Chỉnh sửa"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button
                    size="icon"
                    variant="red"
                    className="h-9 w-9"
                    onClick={() => onDelete(category)}
                    title="Xóa"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </TableCell>
    </TableRow>
);

