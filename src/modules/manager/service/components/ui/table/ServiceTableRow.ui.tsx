'use client';

import React from 'react';
import type { Service } from '../../../types';
import { getServiceTypeLabel } from '../../../utils';
import { TableRow, TableCell } from '@/shared/components/manager/ui/table';
import { Button } from '@/shared/components/ui/button.ui';
import { Badge } from '@/shared/components/ui/badge.ui';
import { Eye, Pencil, Trash2 } from 'lucide-react';

interface Props {
    service: Service;
    onView: (service: Service) => void;
    onEdit: (service: Service) => void;
    onDelete: (service: Service) => void;
    isDeleting: boolean;
}

export const ServiceTableRow: React.FC<Props> = ({ service, onView, onEdit, onDelete, isDeleting }) => {
    return (
        <TableRow>
            {/* Service Code */}
            <TableCell className="font-medium">
                {service.serviceCode}
            </TableCell>

            {/* Service Name */}
            <TableCell>
                {service.serviceName}
            </TableCell>

            {/* Service Group Name */}
            <TableCell>
                {service.serviceGroupName}
            </TableCell>

            {/* Service Type */}
            <TableCell>
                <Badge variant="outline">
                    {getServiceTypeLabel(service.serviceType)}
                </Badge>
            </TableCell>

            {/* Online Available */}
            <TableCell>
                <Badge variant={service.isOnlineAvailable ? 'outline' : 'secondary'}>
                    {service.isOnlineAvailable ? 'Có' : 'Không'}
                </Badge>
            </TableCell>

            {/* Status */}
            <TableCell>
                <Badge variant={service.isActive ? 'outline' : 'secondary'}>
                    {service.isActive ? 'Hoạt động' : 'Ngừng'}
                </Badge>
            </TableCell>

            {/* Actions */}
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onView(service)}
                        title="Xem chi tiết"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(service)}
                        title="Chỉnh sửa"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(service)}
                        disabled={isDeleting}
                        title="Xóa"
                        className="text-destructive hover:text-destructive"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
};

