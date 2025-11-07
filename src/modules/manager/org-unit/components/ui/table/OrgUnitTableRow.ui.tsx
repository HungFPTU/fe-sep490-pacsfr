'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import { TableRow, TableCell } from '@/shared/components/manager/ui/table';
import { Button } from '@/shared/components/ui/button.ui';
import { Badge } from '@/shared/components/ui/badge.ui';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import type { OrgUnit } from '../../../types';

interface Props {
    orgUnit: OrgUnit;
    onView: (orgUnit: OrgUnit) => void;
    onEdit: (orgUnit: OrgUnit) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const OrgUnitTableRow: React.FC<Props> = ({
    orgUnit,
    onView,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    return (
        <TableRow>
            {/* Code */}
            <TableCell className="font-medium">
                {orgUnit.unitCode}
            </TableCell>

            {/* Name */}
            <TableCell>{orgUnit.unitName}</TableCell>

            {/* Type */}
            <TableCell className="text-muted-foreground">
                {orgUnit.unitType}
            </TableCell>

            {/* Contact */}
            <TableCell className="text-muted-foreground">
                <div className="flex flex-col">
                    <span className="font-medium">{orgUnit.phone}</span>
                    <span className="text-xs">{orgUnit.email}</span>
                </div>
            </TableCell>

            {/* Status Badge */}
            <TableCell>
                <Badge variant={orgUnit.isActive ? 'outline' : 'secondary'}>
                    {orgUnit.isActive ? 'Hoạt động' : 'Ngừng'}
                </Badge>
            </TableCell>

            {/* Date Cell */}
            <TableCell className="text-muted-foreground">
                {orgUnit.modifiedAt ? (
                    formatDate(orgUnit.modifiedAt)
                ) : orgUnit.createdAt ? (
                    formatDate(orgUnit.createdAt)
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
                        onClick={() => onView(orgUnit)}
                        title="Xem chi tiết"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(orgUnit)}
                        title="Chỉnh sửa"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(orgUnit.id)}
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

