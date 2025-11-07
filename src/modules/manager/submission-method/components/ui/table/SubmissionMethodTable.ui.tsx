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
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow">
            <table className="w-full">
                <SubmissionMethodTableHeader />
                <tbody className="divide-y divide-slate-200 bg-white">
                    {isLoading ? (
                        <tr>
                            <td colSpan={7} className="px-6 py-4 text-center text-sm text-slate-500">
                                Đang tải...
                            </td>
                        </tr>
                    ) : submissionMethods.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="px-6 py-4 text-center text-sm text-slate-500">
                                Không có dữ liệu
                            </td>
                        </tr>
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
                </tbody>
            </table>
        </div>
    );
};

