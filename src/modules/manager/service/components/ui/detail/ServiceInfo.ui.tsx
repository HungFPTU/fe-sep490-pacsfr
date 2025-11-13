'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import { ServiceGroupDetail } from './ServiceGroupDetail.ui';
import type { Service } from '../../../types';
import { getServiceTypeLabel, getExecutionLevelLabel, getServiceFieldLabel } from '../../../utils';
import { Badge } from '@/shared/components/ui/badge.ui';

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
                <div className="mt-1">
                    <Badge variant="outline">
                        {getServiceTypeLabel(service.serviceType)}
                    </Badge>
                </div>
            </div>

            {/* Execution Level */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Cấp thực hiện
                </label>
                <div className="mt-1">
                    <Badge variant="outline">
                        {getExecutionLevelLabel(service.executionLevel)}
                    </Badge>
                </div>
            </div>

            {/* Field */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Lĩnh vực
                </label>
                <div className="mt-1">
                    <Badge variant="outline">
                        {getServiceFieldLabel(service.field)}
                    </Badge>
                </div>
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
                <div className="mt-1">
                    <Badge variant={service.isOnlineAvailable ? 'outline' : 'secondary'}>
                        {service.isOnlineAvailable ? 'Có' : 'Không'}
                    </Badge>
                </div>
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Trạng thái
                </label>
                <div className="mt-1">
                    <Badge variant={service.isActive ? 'outline' : 'secondary'}>
                        {service.isActive ? 'Hoạt động' : 'Ngừng'}
                    </Badge>
                </div>
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

