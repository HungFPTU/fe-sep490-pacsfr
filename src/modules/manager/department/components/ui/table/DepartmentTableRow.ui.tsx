'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import type { Department } from '../../../types';

interface Props {
    department: Department;
    onView: (department: Department) => void;
    onEdit: (department: Department) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const DepartmentTableRow: React.FC<Props> = ({
    department,
    onView,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    return (
        <tr key={department.id} className="hover:bg-slate-50">
            {/* Code */}
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                {department.code}
            </td>

            {/* Name */}
            <td className="px-6 py-4 text-sm text-slate-900">{department.name}</td>

            {/* Level */}
            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                Cấp {department.levelOrder}
            </td>

            {/* Description */}
            <td className="px-6 py-4 text-sm text-slate-500">
                {department.description && department.description.length > 40
                    ? `${department.description.substring(0, 40)}...`
                    : department.description || '-'}
            </td>

            {/* Status Badge */}
            <td className="whitespace-nowrap px-6 py-4 text-sm">
                <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${department.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}
                >
                    {department.isActive ? 'Hoạt động' : 'Ngừng'}
                </span>
            </td>

            {/* Date Cell */}
            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                {department.modifiedAt ? (
                    <div className="flex flex-col">
                        <span>{formatDate(department.modifiedAt)}</span>
                    </div>
                ) : department.createdAt ? (
                    <div className="flex flex-col">
                        <span>{formatDate(department.createdAt)}</span>
                    </div>
                ) : (
                    '-'
                )}
            </td>

            {/* Action Buttons */}
            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <button
                    onClick={() => onView(department)}
                    className="mr-3 text-slate-600 hover:text-slate-900"
                >
                    Xem
                </button>
                <button
                    onClick={() => onEdit(department)}
                    className="mr-3 text-indigo-600 hover:text-indigo-900"
                >
                    Sửa
                </button>
                <button
                    onClick={() => onDelete(department.id)}
                    className="text-red-600 hover:text-red-900"
                    disabled={isDeleting}
                >
                    Xóa
                </button>
            </td>
        </tr>
    );
};

