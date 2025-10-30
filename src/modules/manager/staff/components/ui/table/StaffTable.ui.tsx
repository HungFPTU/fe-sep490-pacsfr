'use client';

import React from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
} from '@heroui/react';
import { Trash2, Eye, UserPlus, Calendar } from 'lucide-react';
import { Staff } from '../../../types';
import { formatDateVN } from '@core/utils/date';
import {
    getStatusLabel,
    getRoleTypeLabel,
    getActionButtonColors,
    formatOrgUnitName,
    getTableConfig,
    getTableColumns
} from '../../../utils';
import { getBadgeStyle, getRoleTypeStyle, getStatusStyle } from '../../../utils';

interface StaffTableProps {
    data: Staff[]; // Changed from RestMany<Staff> to Staff[]
    onView: (staff: Staff) => void;
    onDelete: (staff: Staff) => void;
    onAssignDepartment: (staff: Staff) => void;
    onAssignWorkShift: (staff: Staff) => void;
    isLoading?: boolean;
}

export function StaffTable({
    data,
    onView,
    onDelete,
    onAssignDepartment,
    onAssignWorkShift,
    isLoading = false,
}: StaffTableProps) {
    const columns = getTableColumns();
    const actionColors = getActionButtonColors();

    const renderCell = (staff: Staff, columnKey: React.Key) => {
        switch (columnKey) {
            case 'staffCode':
                return (
                    <div className="flex flex-col">
                        <span className="font-medium text-sm">{staff.staffCode}</span>
                        <span className="text-xs text-gray-500">{staff.username}</span>
                    </div>
                );

            case 'fullName':
                return <span className="font-medium">{staff.fullName}</span>;

            // case 'orgUnitName':
            //     return (
            //         <span className="text-sm text-gray-700">
            //             {formatOrgUnitName(staff.orgUnitName)}
            //         </span>
            //     );

            case 'email':
                return <span className="text-sm text-gray-600">{staff.email}</span>;

            case 'phone':
                return <span className="text-sm text-gray-600">{staff.phone}</span>;

            case 'position':
                return <span className="text-sm">{staff.position}</span>;

            case 'roleType':
                return (
                    <span className={`${getBadgeStyle()} ${getRoleTypeStyle(staff.roleType)}`}>
                        {getRoleTypeLabel(staff.roleType)}
                    </span>
                );

            case 'status':
                return (
                    <span className={`${getBadgeStyle()} ${getStatusStyle(staff.isActive)}`}>
                        {getStatusLabel(staff.isActive)}
                    </span>
                );

            case 'createdAt':
                return <span className="text-sm text-gray-600">{formatDateVN(staff.createdAt)}</span>;

            case 'actions':
                return (
                    <div className="flex items-center gap-1">
                        <Tooltip content="Xem chi tiết">
                            <button
                                onClick={() => onView(staff)}
                                className={`p-2 rounded-lg transition-colors ${actionColors.view}`}
                            >
                                <Eye className="w-4 h-4" />
                            </button>
                        </Tooltip>

                        <Tooltip content="Gán phòng ban">
                            <button
                                onClick={() => onAssignDepartment(staff)}
                                className={`p-2 rounded-lg transition-colors ${actionColors.assignDepartment}`}
                            >
                                <UserPlus className="w-4 h-4" />
                            </button>
                        </Tooltip>

                        <Tooltip content="Gán ca làm việc">
                            <button
                                onClick={() => onAssignWorkShift(staff)}
                                className={`p-2 rounded-lg transition-colors ${actionColors.assignWorkShift}`}
                            >
                                <Calendar className="w-4 h-4" />
                            </button>
                        </Tooltip>

                        <Tooltip content="Xóa">
                            <button
                                onClick={() => onDelete(staff)}
                                className={`p-2 rounded-lg transition-colors ${actionColors.delete}`}
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </Tooltip>
                    </div>
                );

            default:
                return null;
        }
    };

    const tableConfig = getTableConfig();

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <Table
                aria-label={tableConfig.ariaLabel}
                classNames={{
                    wrapper: 'shadow-none',
                    th: 'bg-gray-50 text-gray-700 font-semibold text-xs',
                    td: 'text-sm',
                }}
            >
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody
                    items={data}
                    isLoading={isLoading}
                    emptyContent={tableConfig.emptyContent}
                >
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

