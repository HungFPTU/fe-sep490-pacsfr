'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import { ServiceGroupDetail } from './ServiceGroupDetail.ui';
import type { Service } from '../../../types';
import { getServiceTypeLabel, getExecutionLevelLabel, getServiceFieldLabel } from '../../../utils';

interface Props {
    service: Service;
}

export const ServiceInfo: React.FC<Props> = ({ service }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Service Code */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Mã dịch vụ
                </label>
                <p className="mt-1 text-sm text-slate-900">{service.serviceCode}</p>
            </div>

            {/* Service Name */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Tên dịch vụ
                </label>
                <p className="mt-1 text-sm text-slate-900">{service.serviceName}</p>
            </div>

            {/* Service Group - Fetch full details */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nhóm dịch vụ
                </label>
                {service.serviceGroupId ? (
                    <ServiceGroupDetail serviceGroupId={service.serviceGroupId} />
                ) : (
                    <p className="text-sm text-slate-500">-</p>
                )}
            </div>

            {/* Service Type */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Loại dịch vụ
                </label>
                <span className="mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-indigo-100 text-indigo-800">
                    {getServiceTypeLabel(service.serviceType)}
                </span>
            </div>

            {/* Execution Level */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Cấp thực hiện
                </label>
                <span className="mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-800">
                    {getExecutionLevelLabel(service.executionLevel)}
                </span>
            </div>

            {/* Field */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Lĩnh vực
                </label>
                <span className="mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800">
                    {getServiceFieldLabel(service.field)}
                </span>
            </div>

            {/* Decision Number */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Số quyết định
                </label>
                <p className="mt-1 text-sm text-slate-900">{service.decisionNumber || '-'}</p>
            </div>

            {/* Result Document */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Kết quả giải quyết
                </label>
                <p className="mt-1 text-sm text-slate-900">{service.resultDocument || '-'}</p>
            </div>

            {/* Online Available */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Hỗ trợ trực tuyến
                </label>
                <span
                    className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${service.isOnlineAvailable
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                >
                    {service.isOnlineAvailable ? 'Có' : 'Không'}
                </span>
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Trạng thái
                </label>
                <span
                    className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${service.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                >
                    {service.isActive ? 'Hoạt động' : 'Ngừng hoạt động'}
                </span>
            </div>

            {/* Created At */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Ngày tạo
                </label>
                <p className="mt-1 text-sm text-slate-900">
                    {formatDate(service.createdAt)}
                </p>
            </div>

            {/* Modified At */}
            {service.modifiedAt && (
                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Cập nhật lần cuối
                    </label>
                    <p className="mt-1 text-sm text-slate-900">
                        {formatDate(service.modifiedAt)}
                    </p>
                </div>
            )}

            {/* Description */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">
                    Mô tả
                </label>
                <p className="mt-1 text-sm text-slate-900">{service.description || '-'}</p>
            </div>
        </div>
    );
};

