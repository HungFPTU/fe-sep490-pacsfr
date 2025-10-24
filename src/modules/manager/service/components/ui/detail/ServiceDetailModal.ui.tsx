'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/manager/modal/BaseModal';
import { ServiceInfo } from './ServiceInfo.ui';
import type { Service } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    service: Service | null;
}

export const ServiceDetailModal: React.FC<Props> = ({
    open,
    onClose,
    service,
}) => {
    if (!service) return null;

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={`Chi tiết dịch vụ: ${service.serviceName}`}
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
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                            {service.serviceName}
                        </h3>
                        <p className="text-sm text-slate-500">Mã: {service.serviceCode}</p>
                    </div>
                </div>
                <ServiceInfo service={service} />
            </div>
        </BaseModal>
    );
};

