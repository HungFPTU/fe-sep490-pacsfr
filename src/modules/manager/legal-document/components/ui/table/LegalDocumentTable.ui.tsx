'use client';

import React from 'react';
import { DataTable } from '@/shared/components/manager';
import { ColumnDef } from '@tanstack/react-table';
import type { LegalDocument } from '../../../types';

interface Props {
    legalDocuments: LegalDocument[];
    isLoading: boolean;
    onView: (legalDocument: LegalDocument) => void;
    onEdit: (legalDocument: LegalDocument) => void;
    onDelete: (legalDocument: LegalDocument) => void;
    onDownload?: (legalDocument: LegalDocument) => void;
    isDeleting?: boolean;
}

export const LegalDocumentTable: React.FC<Props> = ({
    legalDocuments,
    isLoading,
    onView,
    onEdit,
    onDelete,
    onDownload,
    isDeleting = false,
}) => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <LegalDocumentTableHeader />
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                                Đang tải...
                            </TableCell>
                        </TableRow>
                    ) : legalDocuments.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                                Không có dữ liệu
                            </TableCell>
                        </TableRow>
                    ) : (
                        legalDocuments.map((legalDocument) => (
                            <LegalDocumentTableRow
                                key={legalDocument.id}
                                legalDocument={legalDocument}
                                onView={onView}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onDownload={onDownload}
                                isDeleting={isDeleting}
                            />
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
