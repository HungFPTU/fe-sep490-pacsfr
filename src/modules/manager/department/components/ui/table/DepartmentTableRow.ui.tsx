'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import { TableRow, TableCell } from '@/shared/components/manager/ui/table';
import { Button } from '@/shared/components/ui/button.ui';
import { Badge } from '@/shared/components/ui/badge.ui';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import type { Department } from '../../../types';

interface Props {
    department: Department;
    onView: (department: Department) => void;
    onEdit: (department: Department) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const DepartmentTableRow: React.FC<Props> = ({
    department,
    onView,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    return (
        <TableRow>
            {/* Code */}
            <TableCell className="font-medium">
                {department.code}
            </TableCell>

            {/* Name */}
            <TableCell>{department.name}</TableCell>

            {/* Level */}
            <TableCell className="text-muted-foreground">
                Cấp {department.levelOrder}
            </TableCell>

            {/* Description */}
            <TableCell className="text-muted-foreground">
                {department.description && department.description.length > 40
                    ? `${department.description.substring(0, 40)}...`
                    : department.description || '-'}
            </TableCell>

            {/* Status Badge */}
            <TableCell>
                <Badge variant={department.isActive ? 'outline' : 'secondary'}>
                    {department.isActive ? 'Hoạt động' : 'Ngừng'}
                </Badge>
            </TableCell>

            {/* Date Cell */}
            <TableCell className="text-muted-foreground">
                {department.modifiedAt ? (
                    formatDate(department.modifiedAt)
                ) : department.createdAt ? (
                    formatDate(department.createdAt)
                ) : (
                    '-'
                )}
            </TableCell>

            {/* Actions */}
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onView(department)}
                        title="Xem chi tiết"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(department)}
                        title="Chỉnh sửa"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(department.id)}
                        disabled={isDeleting}
                        title="Xóa"
                        className="text-destructive hover:text-destructive"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
};

