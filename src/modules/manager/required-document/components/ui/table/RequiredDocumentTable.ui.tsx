'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/shared/components/manager/ui/table';
import { RequiredDocumentTableHeader } from './RequiredDocumentTableHeader.ui';
import { RequiredDocumentTableRow } from './RequiredDocumentTableRow.ui';
import type { RequiredDocument } from '../../../types';

interface Props {
    requiredDocuments: RequiredDocument[];
    isLoading: boolean;
    onView: (document: RequiredDocument) => void;
    onEdit: (document: RequiredDocument) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const RequiredDocumentTable: React.FC<Props> = ({
    requiredDocuments,
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
                    <RequiredDocumentTableHeader />
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                                Đang tải dữ liệu...
                            </TableCell>
                        </TableRow>
                    ) : requiredDocuments.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                                Không có tài liệu yêu cầu nào.
                            </TableCell>
                        </TableRow>
                    ) : (
                        requiredDocuments.map((document) => (
                            <RequiredDocumentTableRow
                                key={document.id}
                                requiredDocument={document}
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

