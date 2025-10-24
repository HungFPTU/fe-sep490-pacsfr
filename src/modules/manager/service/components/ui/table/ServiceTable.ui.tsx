'use client';

import React from 'react';
import { ServiceTableHeader } from './ServiceTableHeader.ui';
import { ServiceTableRow } from './ServiceTableRow.ui';
import type { Service } from '../../../types';

interface Props {
    services: Service[];
    onView: (service: Service) => void;
    onEdit: (service: Service) => void;
    onDelete: (service: Service) => void;
    isDeleting: boolean;
    deletingId: string | null;
}

export const ServiceTable: React.FC<Props> = ({
    services,
    onView,
    onEdit,
    onDelete,
    isDeleting,
    deletingId,
}) => {
    if (services.length === 0) {
        return (
            <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
                <p className="text-slate-500">Không có dịch vụ nào</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <ServiceTableHeader />
                    <tbody className="divide-y divide-slate-200 bg-white">
                        {services.map((service) => (
                            <ServiceTableRow
                                key={service.id}
                                service={service}
                                onView={onView}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                isDeleting={isDeleting && deletingId === service.id}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

