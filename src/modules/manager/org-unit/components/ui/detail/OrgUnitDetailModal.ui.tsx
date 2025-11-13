'use client';

import React from 'react';
import { Building2 } from 'lucide-react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { Button } from '@/shared/components/ui/button.ui';
import { OrgUnitInfo } from './OrgUnitInfo.ui';
import type { OrgUnit } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    orgUnit: OrgUnit | null;
}

export const OrgUnitDetailModal: React.FC<Props> = ({
    open,
    onClose,
    orgUnit,
}) => {
    if (!orgUnit) return null;

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={`Chi tiết cơ quan: ${orgUnit.unitName}`}
            onOk={onClose}
            okText="Đóng"
            centered
            size="large"
            footer={
                <Button
                    type="button"
                    onClick={onClose}
                    variant="default"
                >
                    Đóng
                </Button>
            }
        >
            <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-border pb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Building2 className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">
                            {orgUnit.unitName}
                        </h3>
                        <p className="text-sm text-muted-foreground">Mã: {orgUnit.unitCode}</p>
                    </div>
                </div>
                <OrgUnitInfo orgUnit={orgUnit} />
            </div>
        </BaseModal>
    );
};

