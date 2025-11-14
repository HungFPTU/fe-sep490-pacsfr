'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
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
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                >
                    Đóng
                </button>
            }
        >
            <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                        <svg
                            className="h-8 w-8 text-indigo-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                            {orgUnit.unitName}
                        </h3>
                        <p className="text-sm text-slate-500">Mã: {orgUnit.unitCode}</p>
                    </div>
                </div>
                <OrgUnitInfo orgUnit={orgUnit} />
            </div>
        </BaseModal>
    );
};

