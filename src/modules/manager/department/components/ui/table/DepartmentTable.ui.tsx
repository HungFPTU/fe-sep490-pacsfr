'use client';

import React from 'react';
import { DepartmentTableHeader } from './DepartmentTableHeader.ui';
import { DepartmentTableRow } from './DepartmentTableRow.ui';
import type { Department } from '../../../types';

interface Props {
    departments: Department[];
    isLoading: boolean;
    onView: (department: Department) => void;
    onEdit: (department: Department) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const DepartmentTable: React.FC<Props> = ({
    departments,
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
                    <DepartmentTableHeader />
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                Đang tải...
                            </TableCell>
                        </TableRow>
                    ) : departments.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                Không có dữ liệu
                            </TableCell>
                        </TableRow>
                    ) : (
                        departments.map((department) => (
                            <DepartmentTableRow
                                key={department.id}
                                department={department}
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

