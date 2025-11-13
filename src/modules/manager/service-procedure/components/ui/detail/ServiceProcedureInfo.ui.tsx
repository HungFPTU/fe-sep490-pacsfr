'use client';

import React from 'react';
import { Badge } from '@/shared/components/ui/badge.ui';
import type { ServiceProcedure } from '../../../types';

interface Props {
    serviceProcedure: ServiceProcedure;
}

export const ServiceProcedureInfo: React.FC<Props> = ({ serviceProcedure }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
                <label className="block text-sm font-medium text-foreground">Tên bước</label>
                <p className="mt-1 text-sm text-muted-foreground">{serviceProcedure.stepName}</p>
            </div>
            <div>
                <label className="block text-sm font-medium text-foreground">Thứ tự bước</label>
                <p className="mt-1 text-sm text-muted-foreground">Bước {serviceProcedure.stepNumber}</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground">Dịch vụ</label>
                <p className="mt-1 text-sm text-muted-foreground">{serviceProcedure.serviceName || '-'}</p>
            </div>
            <div>
                <label className="block text-sm font-medium text-foreground">Mẫu biểu</label>
                <p className="mt-1 text-sm text-muted-foreground">{serviceProcedure.templateName || '-'}</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground">Đơn vị chịu trách nhiệm</label>
                <p className="mt-1 text-sm text-muted-foreground">{serviceProcedure.responsibleUnit}</p>
            </div>
            <div>
                <label className="block text-sm font-medium text-foreground">Thời gian xử lý</label>
                <p className="mt-1 text-sm text-muted-foreground">{serviceProcedure.processingTime}</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground">Trạng thái</label>
                <div className="mt-1">
                    <Badge variant={serviceProcedure.isActive ? 'outline' : 'secondary'}>
                        {serviceProcedure.isActive ? 'Hoạt động' : 'Ngừng'}
                    </Badge>
                </div>
            </div>

            {serviceProcedure.stepDescription && (
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground">Mô tả chi tiết</label>
                    <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
                        {serviceProcedure.stepDescription}
                    </p>
                </div>
            )}

            {serviceProcedure.notes && (
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground">Ghi chú</label>
                    <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">{serviceProcedure.notes}</p>
                </div>
            )}
        </div>
    );
};
