'use client';

import React from 'react';
import { DocsTypeGroupTableHeader } from './DocsTypeGroupTableHeader.ui';
import { DocsTypeGroupTableRow } from './DocsTypeGroupTableRow.ui';
import type { DocsTypeGroup } from '../../../types';

interface Props {
    groups: DocsTypeGroup[];
    isLoading: boolean;
    onView: (group: DocsTypeGroup) => void;
    onEdit: (group: DocsTypeGroup) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const DocsTypeGroupTable: React.FC<Props> = ({
    groups,
    isLoading,
    onView,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    return (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow">
            <table className="w-full">
                <DocsTypeGroupTableHeader />
                <tbody className="divide-y divide-slate-200 bg-white">
                    {isLoading ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-4 text-center text-sm text-slate-500">
                                Đang tải...
                            </td>
                        </tr>
                    ) : groups.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-4 text-center text-sm text-slate-500">
                                Không có dữ liệu
                            </td>
                        </tr>
                    ) : (
                        groups.map((group) => (
                            <DocsTypeGroupTableRow
                                key={group.id}
                                group={group}
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

