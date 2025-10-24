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
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow">
            <table className="w-full">
                <DepartmentTableHeader />
                <tbody className="divide-y divide-slate-200 bg-white">
                    {isLoading ? (
                        <tr>
                            <td colSpan={8} className="px-6 py-4 text-center text-sm text-slate-500">
                                Đang tải...
                            </td>
                        </tr>
                    ) : departments.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="px-6 py-4 text-center text-sm text-slate-500">
                                Không có dữ liệu
                            </td>
                        </tr>
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
                </tbody>
            </table>
        </div>
    );
};

