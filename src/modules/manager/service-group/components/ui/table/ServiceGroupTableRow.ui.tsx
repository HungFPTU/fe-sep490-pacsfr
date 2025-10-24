'use client';

import React from 'react';
import Image from 'next/image';
import { formatDate } from '@/shared/lib/utils';
import type { ServiceGroup } from '../../../types';

interface Props {
    group: ServiceGroup;
    onView: (group: ServiceGroup) => void;
    onEdit: (group: ServiceGroup) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const ServiceGroupTableRow: React.FC<Props> = ({
    group,
    onView,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    return (
        <tr key={group.id} className="hover:bg-slate-50">
            {/* Icon Cell */}
            <td className="whitespace-nowrap px-6 py-4">
                <div className="h-10 w-10 flex-shrink-0 relative overflow-hidden rounded-lg">
                    {group.iconUrl ? (
                        <Image
                            src={group.iconUrl}
                            alt={group.groupName}
                            width={40}
                            height={40}
                            className="object-cover"
                        />
                    ) : (
                        <div className="h-10 w-10 rounded-lg bg-slate-200 flex items-center justify-center">
                            <span className="text-xs text-slate-500">No img</span>
                        </div>
                    )}
                </div>
            </td>

            {/* Code */}
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                {group.groupCode}
            </td>

            {/* Name */}
            <td className="px-6 py-4 text-sm text-slate-900">{group.groupName}</td>

            {/* Description */}
            <td className="px-6 py-4 text-sm text-slate-500">
                {group.description.length > 50
                    ? `${group.description.substring(0, 50)}...`
                    : group.description}
            </td>

            {/* Status Badge */}
            <td className="whitespace-nowrap px-6 py-4 text-sm">
                <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${group.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}
                >
                    {group.isActive ? 'Hoạt động' : 'Ngừng'}
                </span>
            </td>

            {/* Date Cell */}
            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                {group.modifiedAt ? (
                    <div className="flex flex-col">
                        <span>{formatDate(group.modifiedAt)}</span>
                    </div>
                ) : group.createdAt ? (
                    <div className="flex flex-col">
                        <span>{formatDate(group.createdAt)}</span>
                    </div>
                ) : (
                    '-'
                )}
            </td>

            {/* Action Buttons */}
            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <button
                    onClick={() => onView(group)}
                    className="mr-3 text-slate-600 hover:text-slate-900"
                >
                    Xem
                </button>
                <button
                    onClick={() => onEdit(group)}
                    className="mr-3 text-indigo-600 hover:text-indigo-900"
                >
                    Sửa
                </button>
                <button
                    onClick={() => onDelete(group.id)}
                    className="text-red-600 hover:text-red-900"
                    disabled={isDeleting}
                >
                    Xóa
                </button>
            </td>
        </tr>
    );
};

