'use client';

import React from 'react';
import { Badge } from '@/shared/components/ui/badge.ui';
import { formatDate } from '@/shared/lib/utils';
import type { RequiredDocument } from '../../../types';

interface Props {
    document: RequiredDocument;
}

const InfoRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div className="flex flex-col gap-1 rounded-lg border border-slate-200 bg-slate-50 p-3">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
        <span className="text-sm text-foreground">{value || '-'}</span>
    </div>
);

export const RequiredDocumentInfo: React.FC<Props> = ({ document }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoRow label="Dịch vụ áp dụng" value={document.serviceName || '---'} />
            <InfoRow label="Loại giấy tờ" value={document.docTypeName || document.docTypeCode || '---'} />
            <InfoRow label="Mô tả tài liệu" value={document.description} />
            <InfoRow label="Số bản gốc" value={document.quantityOriginal} />
            <InfoRow label="Số bản sao" value={document.quantityCopy} />
            <InfoRow
                label="Trạng thái"
                value={
                    <Badge variant={document.isActive ? 'outline' : 'secondary'}>
                        {document.isActive ? 'Đang áp dụng' : 'Ngừng áp dụng'}
                    </Badge>
                }
            />
            <InfoRow
                label="Ngày tạo"
                value={document.createdAt ? formatDate(document.createdAt) : '-'}
            />
            <InfoRow
                label="Cập nhật gần nhất"
                value={document.modifiedAt ? formatDate(document.modifiedAt) : '-'}
            />
        </div>
    );
};

