'use client';

import { TableCell, TableRow } from '@/shared/components/manager/ui/table';
import { Button } from '@/shared/components/ui/button.ui';
import { Pencil, Trash2 } from 'lucide-react';
import type { PaknCategory } from '../../../types/response';
import { PaknCategoryStatusBadge } from '../others/PaknCategoryStatusBadge.ui';

interface PaknCategoryTableRowProps {
    category: PaknCategory;
    onEdit: (category: PaknCategory) => void;
    onDelete: (category: PaknCategory) => void;
}

export const PaknCategoryTableRow: React.FC<PaknCategoryTableRowProps> = ({
    category,
    onEdit,
    onDelete,
}) => {
    return (
        <TableRow>
            <TableCell className="font-medium">{category.categoryName}</TableCell>
            <TableCell>
                <div className="max-w-md truncate text-sm text-slate-600">
                    {category.description || '-'}
                </div>
            </TableCell>
            <TableCell>
                <PaknCategoryStatusBadge isActive={category.isActive} />
            </TableCell>
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(category)}
                        title="Chỉnh sửa"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(category)}
                        title="Xóa"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
};

