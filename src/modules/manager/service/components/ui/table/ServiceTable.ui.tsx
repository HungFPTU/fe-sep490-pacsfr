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
            <div className="rounded-md border p-8 text-center">
                <p className="text-muted-foreground">Không có dịch vụ nào</p>
            </div>
        );
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <ServiceTableHeader />
                </TableHeader>
                <TableBody>
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
                </TableBody>
            </Table>
        </div>
    );
};

