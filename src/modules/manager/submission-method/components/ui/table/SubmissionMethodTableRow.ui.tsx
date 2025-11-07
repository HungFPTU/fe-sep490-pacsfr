'use client';

import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { formatDate } from '@/shared/lib/utils';
import type { SubmissionMethod } from '../../../types';

interface Props {
    submissionMethod: SubmissionMethod;
    onView: (submissionMethod: SubmissionMethod) => void;
    onEdit: (submissionMethod: SubmissionMethod) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const SubmissionMethodTableRow: React.FC<Props> = ({
    submissionMethod,
    onView,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    const formatFee = (fee: number): string => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(fee);
    };

    const formatProcessingTime = (time: string | Date): string => {
        if (!time) return '-';
        const date = time instanceof Date ? time : new Date(time);
        if (isNaN(date.getTime())) return '-';
        return formatDate(date);
    };

    return (
        <tr key={submissionMethod.id} className="hover:bg-slate-50">
            {/* Name */}
            <td className="px-6 py-4 text-sm font-medium text-slate-900">
                {submissionMethod.submissionMethodName || '-'}
            </td>

            {/* Processing Time */}
            <td className="px-6 py-4 text-sm text-slate-500">
                {formatProcessingTime(submissionMethod.processingTime)}
            </td>

            {/* Fee */}
            <td className="px-6 py-4 text-sm text-slate-500">
                {formatFee(submissionMethod.fee)}
            </td>

            {/* Description */}
            <td className="px-6 py-4 text-sm text-slate-500">
                <div className="max-w-xs truncate" title={submissionMethod.description || ''}>
                    {submissionMethod.description || '-'}
                </div>
            </td>

            {/* Status */}
            <td className="px-6 py-4 text-sm">
                {submissionMethod.isActive ? (
                    <span className="inline-flex rounded-full px-2 py-1 text-xs font-semibold bg-green-100 text-green-800">
                        Đang kích hoạt
                    </span>
                ) : (
                    <span className="inline-flex rounded-full px-2 py-1 text-xs font-semibold bg-red-100 text-red-800">
                        Ngừng kích hoạt
                    </span>
                )}
            </td>

            {/* Created At */}
            <td className="px-6 py-4 text-sm text-slate-500">
                {submissionMethod.createdAt ? formatDate(submissionMethod.createdAt) : '-'}
            </td>

            {/* Actions */}
            <td className="px-6 py-4 text-sm text-right">
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => onView(submissionMethod)}
                        className="p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded transition-colors"
                        title="Xem chi tiết"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onEdit(submissionMethod)}
                        className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                        title="Chỉnh sửa"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(submissionMethod.id)}
                        disabled={isDeleting}
                        className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Xóa"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

