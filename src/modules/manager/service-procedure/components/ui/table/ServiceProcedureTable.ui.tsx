'use client';

import React from 'react';
import { ServiceProcedureTableHeader } from './ServiceProcedureTableHeader.ui';
import { ServiceProcedureTableRow } from './ServiceProcedureTableRow.ui';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/shared/components/manager/ui/table';
import type { ServiceProcedure } from '../../../types';

interface Props {
    serviceProcedures: ServiceProcedure[];
    isLoading: boolean;
    onView: (serviceProcedure: ServiceProcedure) => void;
    onEdit: (serviceProcedure: ServiceProcedure) => void;
    onDelete: (id: string) => void;
    onDownload?: (serviceProcedure: ServiceProcedure) => void;
    isDeleting?: boolean;
}

export const ServiceProcedureTable: React.FC<Props> = ({
    serviceProcedures,
    isLoading,
    onView,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <ServiceProcedureTableHeader />
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                                Đang tải...
                            </TableCell>
                        </TableRow>
                    ) : serviceProcedures.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                                Không có dữ liệu
                            </TableCell>
                        </TableRow>
                    ) : (
                        serviceProcedures.map((procedure) => (
                            <ServiceProcedureTableRow
                                key={procedure.id}
                                serviceProcedure={procedure}
                                onView={onView}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                isDeleting={isDeleting}
                            />
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
