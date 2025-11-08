'use client';

import React from 'react';
import { SubmissionMethodTableHeader } from './SubmissionMethodTableHeader.ui';
import { SubmissionMethodTableRow } from './SubmissionMethodTableRow.ui';
import type { SubmissionMethod } from '../../../types';

interface Props {
    submissionMethods: SubmissionMethod[];
    isLoading: boolean;
    onView: (submissionMethod: SubmissionMethod) => void;
    onEdit: (submissionMethod: SubmissionMethod) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const SubmissionMethodTable: React.FC<Props> = ({
    submissionMethods,
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
                    <SubmissionMethodTableHeader />
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                Đang tải...
                            </TableCell>
                        </TableRow>
                    ) : submissionMethods.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                Không có dữ liệu
                            </TableCell>
                        </TableRow>
                    ) : (
                        submissionMethods.map((submissionMethod) => (
                            <SubmissionMethodTableRow
                                key={submissionMethod.id}
                                submissionMethod={submissionMethod}
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

