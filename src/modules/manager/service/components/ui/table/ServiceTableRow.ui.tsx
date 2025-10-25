'use client';

import React from 'react';
import type { Service } from '../../../types';

interface Props {
    service: Service;
    onView: (service: Service) => void;
    onEdit: (service: Service) => void;
    onDelete: (service: Service) => void;
    isDeleting: boolean;
}

export const ServiceTableRow: React.FC<Props> = ({ service, onView, onEdit, onDelete, isDeleting }) => {
    return (
        <tr className="hover:bg-slate-50">
            {/* Service Code */}
            <td className="px-6 py-4 text-sm font-medium text-slate-900">
                {service.serviceCode}
            </td>

            {/* Service Name */}
            <td className="px-6 py-4 text-sm text-slate-600">
                {service.serviceName}
            </td>

            {/* Service Group */}
            <td className="px-6 py-4 text-sm text-slate-600">
                {service.serviceGroupName || '-'}
            </td>

            {/* Service Type */}
            <td className="px-6 py-4 text-sm text-slate-600">
                {service.serviceType}
            </td>

            {/* Online Available */}
            <td className="px-6 py-4">
                <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${service.isOnlineAvailable
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                >
                    {service.isOnlineAvailable ? 'Có' : 'Không'}
                </span>
            </td>

            {/* Status */}
            <td className="px-6 py-4">
                <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${service.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                >
                    {service.isActive ? 'Hoạt động' : 'Ngừng'}
                </span>
            </td>

            {/* Actions */}
            <td className="px-6 py-4 text-right text-sm font-medium">
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => onView(service)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Xem chi tiết"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onEdit(service)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Chỉnh sửa"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onDelete(service)}
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

