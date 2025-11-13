'use client';

import React from 'react';
import { ServiceGroupTableHeader } from './ServiceGroupTableHeader.ui';
import { ServiceGroupTableRow } from './ServiceGroupTableRow.ui';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/shared/components/manager/ui/table';
import type { ServiceGroup } from '../../../types';

interface Props {
    groups: ServiceGroup[];
    isLoading: boolean;
    onView: (group: ServiceGroup) => void;
    onEdit: (group: ServiceGroup) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const ServiceGroupTable: React.FC<Props> = ({
    groups,
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
                    <ServiceGroupTableHeader />
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                Đang tải...
                            </TableCell>
                        </TableRow>
                    ) : groups.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                Không có dữ liệu
                            </TableCell>
                        </TableRow>
                    ) : (
                        groups.map((group) => (
                            <ServiceGroupTableRow
                                key={group.id}
                                group={group}
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

