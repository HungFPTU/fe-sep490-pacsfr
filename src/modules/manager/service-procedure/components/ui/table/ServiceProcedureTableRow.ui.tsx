'use client';

import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { TableRow, TableCell } from '@/shared/components/manager/ui/table';
import { Button } from '@/shared/components/ui/button.ui';
import { Badge } from '@/shared/components/ui/badge.ui';
import type { ServiceProcedure } from '../../../types';

interface Props {
    serviceProcedure: ServiceProcedure;
    onView: (serviceProcedure: ServiceProcedure) => void;
    onEdit: (serviceProcedure: ServiceProcedure) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const ServiceProcedureTableRow: React.FC<Props> = ({
    serviceProcedure,
    onView,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    const { stepNumber, stepName, serviceName, templateName, responsibleUnit, processingTime, isActive } = serviceProcedure;

    return (
        <TableRow>
            <TableCell className="font-medium">{stepNumber}</TableCell>
            <TableCell>
                <div className="max-w-[220px] font-medium text-foreground">{stepName}</div>
                {serviceProcedure.stepDescription && (
                    <p className="mt-1 max-w-[220px] text-xs text-muted-foreground" title={serviceProcedure.stepDescription}>
                        {serviceProcedure.stepDescription}
                    </p>
                )}
            </TableCell>
            <TableCell className="text-muted-foreground">{serviceName || '-'}</TableCell>
            <TableCell className="text-muted-foreground">{templateName || '-'}</TableCell>
            <TableCell className="text-muted-foreground">{responsibleUnit || '-'}</TableCell>
            <TableCell className="text-muted-foreground">{processingTime || '-'}</TableCell>
            <TableCell>
                <Badge variant={isActive ? 'outline' : 'secondary'}>
                    {isActive ? 'Hoạt động' : 'Ngừng'}
                </Badge>
            </TableCell>
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onView(serviceProcedure)}
                        title="Xem chi tiết"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(serviceProcedure)}
                        title="Chỉnh sửa"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(serviceProcedure.id)}
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
