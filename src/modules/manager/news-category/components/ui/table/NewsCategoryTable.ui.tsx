'use client';

import React from 'react';
import { NewsCategoryTableHeader } from './NewsCategoryTableHeader.ui';
import { NewsCategoryTableRow } from './NewsCategoryTableRow.ui';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/shared/components/manager/ui/table';
import type { NewsCategory } from '../../../types';

interface Props {
    newsCategories: NewsCategory[];
    isLoading: boolean;
    onView: (newsCategory: NewsCategory) => void;
    onEdit: (newsCategory: NewsCategory) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const NewsCategoryTable: React.FC<Props> = ({
    newsCategories,
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
                    <NewsCategoryTableHeader />
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                Đang tải...
                            </TableCell>
                        </TableRow>
                    ) : newsCategories.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                Không có dữ liệu
                            </TableCell>
                        </TableRow>
                    ) : (
                        newsCategories.map((newsCategory) => (
                            <NewsCategoryTableRow
                                key={newsCategory.id}
                                newsCategory={newsCategory}
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

