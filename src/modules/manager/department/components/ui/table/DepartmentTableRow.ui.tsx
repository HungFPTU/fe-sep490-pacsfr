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

            {/* Actions */}
            <td className="px-6 py-4 text-right text-sm font-medium">
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => onView(department)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Xem chi tiết"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onEdit(department)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Chỉnh sửa"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onDelete(department.id)}
                        disabled={isDeleting}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                        title="Xóa"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    );
};

