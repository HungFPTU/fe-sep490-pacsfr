'use client';

import React from 'react';
import { FaqTableHeader } from './FaqTableHeader.ui';
import { FaqTableRow } from './FaqTableRow.ui';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/shared/components/manager/ui/table';
import type { Faq } from '../../../types';

interface Props {
    faqs: Faq[];
    isLoading: boolean;
    onView: (faq: Faq) => void;
    onEdit: (faq: Faq) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const FaqTable: React.FC<Props> = ({
    faqs,
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
                    <FaqTableHeader />
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                Đang tải...
                            </TableCell>
                        </TableRow>
                    ) : faqs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                Không có dữ liệu
                            </TableCell>
                        </TableRow>
                    ) : (
                        faqs.map((faq) => (
                            <FaqTableRow
                                key={faq.id}
                                faq={faq}
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

