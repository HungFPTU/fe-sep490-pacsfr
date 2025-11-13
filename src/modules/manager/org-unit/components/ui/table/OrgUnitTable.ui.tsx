'use client';

import React from 'react';
import { OrgUnitTableHeader } from './OrgUnitTableHeader.ui';
import { OrgUnitTableRow } from './OrgUnitTableRow.ui';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/shared/components/manager/ui/table';
import type { OrgUnit } from '../../../types';

interface Props {
    orgUnits: OrgUnit[];
    isLoading: boolean;
    onView: (orgUnit: OrgUnit) => void;
    onEdit: (orgUnit: OrgUnit) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const OrgUnitTable: React.FC<Props> = ({
    orgUnits,
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
                    <OrgUnitTableHeader />
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                Đang tải...
                            </TableCell>
                        </TableRow>
                    ) : orgUnits.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                Không có dữ liệu
                            </TableCell>
                        </TableRow>
                    ) : (
                        orgUnits.map((orgUnit) => (
                            <OrgUnitTableRow
                                key={orgUnit.id}
                                orgUnit={orgUnit}
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

