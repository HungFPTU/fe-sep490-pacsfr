'use client';

import React from 'react';
import { FaqCategoryTableHeader } from './FaqCategoryTableHeader.ui';
import { FaqCategoryTableRow } from './FaqCategoryTableRow.ui';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/shared/components/manager/ui/table';
import type { FaqCategory } from '../../../types';

interface Props {
    faqCategories: FaqCategory[];
    isLoading: boolean;
    onView: (faqCategory: FaqCategory) => void;
    onEdit: (faqCategory: FaqCategory) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const FaqCategoryTable: React.FC<Props> = ({
    faqCategories,
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
                    <FaqCategoryTableHeader />
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                Đang tải...
                            </TableCell>
                        </TableRow>
                    ) : faqCategories.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                Không có dữ liệu
                            </TableCell>
                        </TableRow>
                    ) : (
                        faqCategories.map((faqCategory) => (
                            <FaqCategoryTableRow
                                key={faqCategory.id}
                                faqCategory={faqCategory}
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

