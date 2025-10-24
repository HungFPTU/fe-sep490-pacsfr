'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import type { OrgUnit } from '../../../types';

interface Props {
    orgUnit: OrgUnit;
    onView: (orgUnit: OrgUnit) => void;
    onEdit: (orgUnit: OrgUnit) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const OrgUnitTableRow: React.FC<Props> = ({
    orgUnit,
    onView,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    return (
        <tr key={orgUnit.id} className="hover:bg-slate-50">
            {/* Code */}
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                {orgUnit.unitCode}
            </td>

            {/* Name */}
            <td className="px-6 py-4 text-sm text-slate-900">{orgUnit.unitName}</td>

            {/* Type */}
            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                {orgUnit.unitType}
            </td>

            {/* Address */}
            <td className="px-6 py-4 text-sm text-slate-500">
                {orgUnit.address.length > 40
                    ? `${orgUnit.address.substring(0, 40)}...`
                    : orgUnit.address}
            </td>

            {/* Contact */}
            <td className="px-6 py-4 text-sm text-slate-500">
                <div className="flex flex-col">
                    <span className="font-medium">{orgUnit.phone}</span>
                    <span className="text-xs text-slate-400">{orgUnit.email}</span>
                </div>
            </td>

            {/* Status Badge */}
            <td className="whitespace-nowrap px-6 py-4 text-sm">
                <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${orgUnit.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                >
                    {orgUnit.isActive ? 'Hoạt động' : 'Ngừng'}
                </span>
            </td>

            {/* Date Cell */}
            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                {orgUnit.modifiedAt ? (
                    <div className="flex flex-col">
                        <span>{formatDate(orgUnit.modifiedAt)}</span>
                    </div>
                ) : orgUnit.createdAt ? (
                    <div className="flex flex-col">
                        <span>{formatDate(orgUnit.createdAt)}</span>
                    </div>
                ) : (
                    '-'
                )}
            </td>

            {/* Action Buttons */}
            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <button
                    onClick={() => onView(orgUnit)}
                    className="mr-3 text-slate-600 hover:text-slate-900"
                >
                    Xem
                </button>
                <button
                    onClick={() => onEdit(orgUnit)}
                    className="mr-3 text-indigo-600 hover:text-indigo-900"
                >
                    Sửa
                </button>
                <button
                    onClick={() => onDelete(orgUnit.id)}
                    className="text-red-600 hover:text-red-900"
                    disabled={isDeleting}
                >
                    Xóa
                </button>
            </td>
        </tr>
    );
};

