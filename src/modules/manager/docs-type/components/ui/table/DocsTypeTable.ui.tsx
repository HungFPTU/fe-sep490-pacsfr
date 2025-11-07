'use client';

import React from 'react';
import { DocsTypeTableHeader } from './DocsTypeTableHeader.ui';
import { DocsTypeTableRow } from './DocsTypeTableRow.ui';
import type { DocsType } from '../../../types';

interface Props {
    docsTypes: DocsType[];
    isLoading: boolean;
    onView: (docsType: DocsType) => void;
    onEdit: (docsType: DocsType) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const DocsTypeTable: React.FC<Props> = ({
    docsTypes,
    isLoading,
    onView,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    return (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow">
            <table className="w-full">
                <DocsTypeTableHeader />
                <tbody className="divide-y divide-slate-200 bg-white">
                    {isLoading ? (
                        <tr>
                            <td colSpan={8} className="px-6 py-4 text-center text-sm text-slate-500">
                                Đang tải...
                            </td>
                        </tr>
                    ) : docsTypes.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="px-6 py-4 text-center text-sm text-slate-500">
                                Không có dữ liệu
                            </td>
                        </tr>
                    ) : (
                        docsTypes.map((docsType) => (
                            <DocsTypeTableRow
                                key={docsType.id}
                                docsType={docsType}
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

