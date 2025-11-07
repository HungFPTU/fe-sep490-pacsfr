'use client';

import React from 'react';
import { ListChecks } from 'lucide-react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { Button } from '@/shared/components/ui/button.ui';
import { ServiceProcedureInfo } from './ServiceProcedureInfo.ui';
import type { ServiceProcedure } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    serviceProcedure: ServiceProcedure | null;
}

export const ServiceProcedureDetailModal: React.FC<Props> = ({ open, onClose, serviceProcedure }) => {
    if (!serviceProcedure) {
        return null;
    }

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={`Chi tiết quy trình: ${serviceProcedure.stepName}`}
            onOk={onClose}
            okText="Đóng"
            centered
            size="large"
            footer={
                <Button type="button" onClick={onClose} variant="default">
                    Đóng
                </Button>
            }
        >
            <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-border pb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <ListChecks className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Bước {serviceProcedure.stepNumber}</p>
                        <h3 className="text-lg font-semibold text-foreground">{serviceProcedure.stepName}</h3>
                    </div>
                </div>
                <ServiceProcedureInfo serviceProcedure={serviceProcedure} />
            </div>
        </BaseModal>
    );
};
