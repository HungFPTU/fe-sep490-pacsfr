'use client';

import React from 'react';
import { DocsTypeTableHeader } from './DocsTypeTableHeader.ui';
import { DocsTypeTableRow } from './DocsTypeTableRow.ui';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/shared/components/manager/ui/table';
import type { DocsType } from '../../../types';

interface Props {
    docsTypes: DocsType[];
    isLoading: boolean;
    onView: (docsType: DocsType) => void;
    onEdit: (docsType: DocsType) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const DocsTypeTable: React.FC<Props> = ({
    docsTypes,
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
                    <DocsTypeTableHeader />
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                                Đang tải...
                            </TableCell>
                        </TableRow>
                    ) : docsTypes.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                                Không có dữ liệu
                            </TableCell>
                        </TableRow>
                    ) : (
                        docsTypes.map((docsType) => (
                            <DocsTypeTableRow
                                key={docsType.id}
                                docsType={docsType}
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

