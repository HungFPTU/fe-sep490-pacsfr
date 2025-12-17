'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import { Badge } from '@/shared/components/ui/badge.ui';
import type { TargetAudience } from '../../../types';

interface Props {
    targetAudience: TargetAudience;
}

export const TargetAudienceInfo: React.FC<Props> = ({ targetAudience }) => {
    const renderDate = (date?: string | Date): string => {
        if (!date) return '-';
        return formatDate(date);
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="text-sm font-medium text-muted-foreground">Tên đối tượng</label>
                    <p className="mt-1 text-sm font-semibold text-foreground">{targetAudience.name}</p>
                </div>
                <div>
                    <label className="text-sm font-medium text-muted-foreground">Trạng thái</label>
                    <div className="mt-1">
                        <Badge variant={targetAudience.isActive ? 'outline' : 'secondary'}>
                            {targetAudience.isActive ? 'Hoạt động' : 'Ngừng'}
                        </Badge>
                    </div>
                </div>
            </div>

            <div>
                <label className="text-sm font-medium text-muted-foreground">Mô tả</label>
                <p className="mt-1 text-sm text-foreground whitespace-pre-wrap">
                    {targetAudience.description || '-'}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="text-sm font-medium text-muted-foreground">Ngày tạo</label>
                    <p className="mt-1 text-sm text-foreground">{renderDate(targetAudience.createdAt)}</p>
                </div>
                {targetAudience.modifiedAt && (
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Ngày cập nhật</label>
                        <p className="mt-1 text-sm text-foreground">{renderDate(targetAudience.modifiedAt)}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

