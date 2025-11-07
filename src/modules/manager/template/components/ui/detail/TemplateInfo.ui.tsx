'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import type { Template } from '../../../types';

interface Props {
    template: Template;
}

export const TemplateInfo: React.FC<Props> = ({ template }) => {
    const formatFileSize = (bytes?: number): string => {
        if (!bytes || bytes === 0) return '-';
        const mb = bytes / (1024 * 1024);
        return `${mb.toFixed(2)} MB`;
    };

    const infoItems = [
        {
            label: 'Mã template',
            value: template.templateCode,
        },
        {
            label: 'Tên template',
            value: template.templateName,
        },
        {
            label: 'Loại văn bản',
            value: template.docsTypeName || '-',
        },
        {
            label: 'Phiên bản',
            value: template.version || '-',
        },
        {
            label: 'Tên file',
            value: template.fileName || '-',
        },
        {
            label: 'Kích thước file',
            value: formatFileSize(template.fileSize),
        },
        {
            label: 'Đường dẫn file',
            value: template.filePath || '-',
        },
        {
            label: 'Mô tả',
            value: template.description || '-',
        },
        {
            label: 'Trạng thái',
            value: template.isActive ? 'Hoạt động' : 'Ngừng',
            badge: true,
            badgeClass: template.isActive
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800',
        },
        {
            label: 'Ngày tạo',
            value: template.createdAt ? formatDate(template.createdAt) : '-',
        },
        {
            label: 'Ngày cập nhật',
            value: template.modifiedAt ? formatDate(template.modifiedAt) : '-',
        },
    ];

    return (
        <div className="space-y-4">
            {infoItems.map((item, index) => (
                <div key={index} className="border-b border-slate-200 pb-4 last:border-b-0">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-700">{item.label}</p>
                            {item.badge ? (
                                <span className={`mt-1 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${item.badgeClass}`}>
                                    {item.value}
                                </span>
                            ) : (
                                <p className="mt-1 text-sm text-slate-900">{item.value}</p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

