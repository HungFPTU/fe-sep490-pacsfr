'use client';

import React from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Tooltip,
} from '@heroui/react';
import { Trash2, Eye, UserPlus, Calendar } from 'lucide-react';
import { Staff } from '../../../types';
import { ROLE_TYPE_LABELS } from '../../../enums';
import { formatDateVN } from '@core/utils/date';

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
    const columns = [
        { key: 'staffCode', label: 'MÃ NV' },
        { key: 'fullName', label: 'HỌ TÊN' },
        { key: 'orgUnitName', label: 'CƠ QUAN' },
        { key: 'email', label: 'EMAIL' },
        { key: 'phone', label: 'SỐ ĐIỆN THOẠI' },
        { key: 'position', label: 'CHỨC VỤ' },
        { key: 'roleType', label: 'VAI TRÒ' },
        { key: 'status', label: 'TRẠNG THÁI' },
        { key: 'createdAt', label: 'NGÀY TẠO' },
        { key: 'actions', label: 'THAO TÁC' },
    ];

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

            case 'orgUnitName':
                return (
                    <span className="text-sm text-gray-700">
                        {staff.orgUnitName || <span className="text-gray-400 italic">Chưa có</span>}
                    </span>
                );

            case 'email':
                return <span className="text-sm text-gray-600">{staff.email}</span>;

            case 'phone':
                return <span className="text-sm text-gray-600">{staff.phone}</span>;

            case 'position':
                return <span className="text-sm">{staff.position}</span>;

            case 'roleType':
                return (
                    <Chip
                        size="sm"
                        variant="flat"
                        color={
                            staff.roleType === 'ADMIN'
                                ? 'danger'
                                : staff.roleType === 'MANAGER'
                                    ? 'warning'
                                    : 'primary'
                        }
                    >
                        {ROLE_TYPE_LABELS[staff.roleType as keyof typeof ROLE_TYPE_LABELS] || staff.roleType}
                    </Chip>
                );

            case 'status':
                return (
                    <Chip size="sm" variant="flat" color={staff.isActive ? 'success' : 'default'}>
                        {staff.isActive ? 'Hoạt động' : 'Ngừng hoạt động'}
                    </Chip>
                );

            case 'createdAt':
                return <span className="text-sm text-gray-600">{formatDateVN(staff.createdAt)}</span>;

            case 'actions':
                return (
                    <div className="flex items-center gap-1">
                        <Tooltip content="Xem chi tiết">
                            <button
                                onClick={() => onView(staff)}
                                className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                <Eye className="w-4 h-4 text-blue-600" />
                            </button>
                        </Tooltip>

                        <Tooltip content="Gán phòng ban">
                            <button
                                onClick={() => onAssignDepartment(staff)}
                                className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
                            >
                                <UserPlus className="w-4 h-4 text-purple-600" />
                            </button>
                        </Tooltip>

                        <Tooltip content="Gán ca làm việc">
                            <button
                                onClick={() => onAssignWorkShift(staff)}
                                className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                            >
                                <Calendar className="w-4 h-4 text-green-600" />
                            </button>
                        </Tooltip>

                        <Tooltip content="Xóa">
                            <button
                                onClick={() => onDelete(staff)}
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                        </Tooltip>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <Table
                aria-label="Bảng quản lý nhân viên"
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
                    emptyContent="Không có dữ liệu nhân viên"
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

