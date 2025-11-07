'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import { TableRow, TableCell } from '@/shared/components/manager/ui/table';
import { Button } from '@/shared/components/ui/button.ui';
import { Badge } from '@/shared/components/ui/badge.ui';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import type { ServiceGroup } from '../../../types';
import { getStatusStyle } from '../../../utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar.ui';

interface Props {
    group: ServiceGroup;
    onView: (group: ServiceGroup) => void;
    onEdit: (group: ServiceGroup) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const ServiceGroupTableRow: React.FC<Props> = ({
    group,
    onView,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    // Helper for fallback - use first 2 letters of group name/capitalized code or "?".
    const getAvatarFallback = (name: string, code?: string) =>
        (name?.trim()?.[0]?.toUpperCase() ?? code?.[0]?.toUpperCase() ?? '?') +
        (name?.trim()?.split(' ')[1]?.[0]?.toUpperCase() ?? code?.[1]?.toUpperCase() ?? '');

    return (
        <TableRow>
            {/* Icon Cell, replaced with Avatar */}
            <TableCell>
                <Avatar className="h-10 w-10 rounded-lg">
                    {group.iconUrl && (
                        <AvatarImage src={group.iconUrl} alt={group.groupName} />
                    )}
                    <AvatarFallback className="bg-muted text-xs text-muted-foreground">
                        {getAvatarFallback(group.groupName, group.groupCode)}
                    </AvatarFallback>
                </Avatar>
            </TableCell>

            {/* Code */}
            <TableCell className="font-medium">
                {group.groupCode}
            </TableCell>

            {/* Name */}
            <TableCell>{group.groupName}</TableCell>

            {/* Description */}
            <TableCell className="text-muted-foreground">
                {group.description && group.description.length > 50
                    ? `${group.description.substring(0, 50)}...`
                    : group.description || '-'}
            </TableCell>

            {/* Status Badge */}
            <TableCell>
                <Badge variant={group.isActive ? 'outline' : 'secondary'}>
                    {group.isActive ? 'Hoạt động' : 'Ngừng'}
                </Badge>
            </TableCell>

            {/* Date Cell */}
            <TableCell className="text-muted-foreground">
                {group.modifiedAt ? (
                    formatDate(group.modifiedAt)
                ) : group.createdAt ? (
                    formatDate(group.createdAt)
                ) : (
                    '-'
                )}
            </TableCell>

            {/* Actions */}
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onView(group)}
                        title="Xem chi tiết"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(group)}
                        title="Chỉnh sửa"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(group.id)}
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

