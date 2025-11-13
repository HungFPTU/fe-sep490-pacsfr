'use client';

import React from 'react';
import { formatDate, formatCurrency } from '@/shared/lib/utils';
import { Badge } from '@/shared/components/ui/badge.ui';
import type { SubmissionMethod } from '../../../types';

interface Props {
    submissionMethod: SubmissionMethod;
}

export const SubmissionMethodInfo: React.FC<Props> = ({ submissionMethod }) => {
    const formatProcessingTime = (time: string | Date): string => {
        if (!time) return '-';
        const date = time instanceof Date ? time : new Date(time);
        if (isNaN(date.getTime())) return '-';
        return formatDate(date);
    };

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Submission Method Name */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Tên phương thức nộp hồ sơ
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                    {submissionMethod.submissionMethodName || '-'}
                </p>
            </div>

            {/* Processing Time */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Thời gian xử lý
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                    {formatProcessingTime(submissionMethod.processingTime)}
                </p>
            </div>

            {/* Fee */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Phí
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                    {formatCurrency(submissionMethod.fee)}
                </p>
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Trạng thái
                </label>
                <div className="mt-1">
                    <Badge variant={submissionMethod.isActive ? 'outline' : 'secondary'}>
                        {submissionMethod.isActive ? 'Đang kích hoạt' : 'Ngừng kích hoạt'}
                    </Badge>
                </div>
            </div>

            {/* Created At */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Ngày tạo
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                    {submissionMethod.createdAt ? formatDate(submissionMethod.createdAt) : '-'}
                </p>
            </div>

            {/* Modified At */}
            {submissionMethod.modifiedAt && (
                <div>
                    <label className="block text-sm font-medium text-foreground">
                        Cập nhật lần cuối
                    </label>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {formatDate(submissionMethod.modifiedAt)}
                    </p>
                </div>
            )}

            {/* Description */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground">
                    Mô tả
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                    {submissionMethod.description || '-'}
                </p>
            </div>
        </div>
    );
};

