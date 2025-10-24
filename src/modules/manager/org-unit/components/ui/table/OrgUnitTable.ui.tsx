'use client';

import React from 'react';
import { OrgUnitTableHeader } from './OrgUnitTableHeader.ui';
import { OrgUnitTableRow } from './OrgUnitTableRow.ui';
import type { OrgUnit } from '../../../types';

interface Props {
    orgUnits: OrgUnit[];
    isLoading: boolean;
    onView: (orgUnit: OrgUnit) => void;
    onEdit: (orgUnit: OrgUnit) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const OrgUnitTable: React.FC<Props> = ({
    orgUnits,
    isLoading,
    onView,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    return (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow">
            <table className="w-full">
                <OrgUnitTableHeader />
                <tbody className="divide-y divide-slate-200 bg-white">
                    {isLoading ? (
                        <tr>
                            <td colSpan={8} className="px-6 py-4 text-center text-sm text-slate-500">
                                Đang tải...
                            </td>
                        </tr>
                    ) : orgUnits.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="px-6 py-4 text-center text-sm text-slate-500">
                                Không có dữ liệu
                            </td>
                        </tr>
                    ) : (
                        orgUnits.map((orgUnit) => (
                            <OrgUnitTableRow
                                key={orgUnit.id}
                                orgUnit={orgUnit}
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

