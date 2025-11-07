'use client';

import React from 'react';
import { DocsTypeGroupTableHeader } from './DocsTypeGroupTableHeader.ui';
import { DocsTypeGroupTableRow } from './DocsTypeGroupTableRow.ui';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/manager/ui/table';
import type { DocsTypeGroup } from '../../../types';

interface Props {
    groups: DocsTypeGroup[];
    isLoading: boolean;
    onView: (group: DocsTypeGroup) => void;
    onEdit: (group: DocsTypeGroup) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const DocsTypeGroupTable: React.FC<Props> = ({
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
                    <DocsTypeGroupTableHeader />
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                Đang tải...
                            </TableCell>
                        </TableRow>
                    ) : groups.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                Không có dữ liệu
                            </TableCell>
                        </TableRow>
                    ) : (
                        groups.map((group) => (
                            <DocsTypeGroupTableRow
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

