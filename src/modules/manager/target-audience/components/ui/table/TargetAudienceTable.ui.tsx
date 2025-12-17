'use client';

import React from 'react';
import { TargetAudienceTableHeader } from './TargetAudienceTableHeader.ui';
import { TargetAudienceTableRow } from './TargetAudienceTableRow.ui';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/shared/components/manager/ui/table';
import type { TargetAudience } from '../../../types';

interface Props {
    targetAudiences: TargetAudience[];
    isLoading: boolean;
    onView: (targetAudience: TargetAudience) => void;
    onEdit: (targetAudience: TargetAudience) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const TargetAudienceTable: React.FC<Props> = ({
    targetAudiences,
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
                    <TargetAudienceTableHeader />
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                Đang tải...
                            </TableCell>
                        </TableRow>
                    ) : targetAudiences.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                Không có dữ liệu
                            </TableCell>
                        </TableRow>
                    ) : (
                        targetAudiences.map((targetAudience) => (
                            <TargetAudienceTableRow
                                key={targetAudience.id}
                                targetAudience={targetAudience}
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

