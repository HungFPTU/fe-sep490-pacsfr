'use client';

import React from 'react';
import { ServiceGroupTableHeader } from './ServiceGroupTableHeader.ui';
import { ServiceGroupTableRow } from './ServiceGroupTableRow.ui';
import type { ServiceGroup } from '../../../types';

interface Props {
    groups: ServiceGroup[];
    isLoading: boolean;
    onView: (group: ServiceGroup) => void;
    onEdit: (group: ServiceGroup) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const ServiceGroupTable: React.FC<Props> = ({
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
                <ServiceGroupTableHeader />
                <tbody className="divide-y divide-slate-200 bg-white">
                    {isLoading ? (
                        <tr>
                            <td colSpan={7} className="px-6 py-4 text-center text-sm text-slate-500">
                                Đang tải...
                            </td>
                        </tr>
                    ) : groups.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="px-6 py-4 text-center text-sm text-slate-500">
                                Không có dữ liệu
                            </td>
                        </tr>
                    ) : (
                        groups.map((group) => (
                            <ServiceGroupTableRow
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

