'use client';

import React from 'react';
import {
    Tooltip,
} from '@heroui/react';
import { Button } from '@/shared/components/ui/button.ui';
import { TableRow, TableCell } from '@/shared/components/manager/ui/table';
import { Trash2, Eye, UserPlus, Calendar, Clock } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge.ui';
import { Staff } from '../../../types';
import { formatDateVN } from '@core/utils/date';
import {
    getStatusLabel,
    getRoleTypeLabel,
    getTableConfig,
    getTableColumns,
} from '../../../utils';
import { getRoleTypeStyle, getStatusStyle } from '../../../utils';
import { AssignWorkShiftModal, StaffWorkShiftAssignmentsModal } from '../modal';

interface StaffTableProps {
    data: Staff[]; // Changed from RestMany<Staff> to Staff[]
    onView: (staff: Staff) => void;
    onDelete: (staff: Staff) => void;
    onAssignDepartment: (staff: Staff) => void;
    onAssignWorkShift: (staff: Staff) => void;
    onViewWorkShifts?: (staff: Staff) => void;
    onRefresh?: () => void;
    isLoading?: boolean;
}

export function StaffTable({
    data,
    onView,
    onDelete,
    onAssignDepartment,
    onRefresh,
    isLoading = false,
}: StaffTableProps) {
    const [assignWorkShiftModalOpen, setAssignWorkShiftModalOpen] = React.useState(false);
    const [viewWorkShiftsModalOpen, setViewWorkShiftsModalOpen] = React.useState(false);
    const [selectedStaff, setSelectedStaff] = React.useState<Staff | null>(null);

    const columns = getTableColumns();

    const handleAssignWorkShift = (staff: Staff) => {
        setSelectedStaff(staff);
        setAssignWorkShiftModalOpen(true);
    };

    const handleAssignWorkShiftSuccess = () => {
        onRefresh?.();
    };

    const handleViewWorkShifts = (staff: Staff) => {
        setSelectedStaff(staff);
        setViewWorkShiftsModalOpen(true);
    };

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

            case 'email':
                return <span className="text-sm text-gray-600">{staff.email}</span>;

            case 'phone':
                return <span className="text-sm text-gray-600">{staff.phone}</span>;

            case 'position':
                return <span className="text-sm">{staff.position}</span>;

            case 'roleType':
                return (
                    <Badge variant="outline" className={getRoleTypeStyle(staff.roleType)}>
                        {getRoleTypeLabel(staff.roleType)}
                    </Badge>
                );

            case 'status':
                return (
                    <Badge variant="outline" className={getStatusStyle(staff.isActive)}>
                        {getStatusLabel(staff.isActive)}
                    </Badge>
                );

            case 'createdAt':
                return <span className="text-sm text-gray-600">{formatDateVN(staff.createdAt)}</span>;

            case 'actions':
                return (
                    <div className="flex items-center gap-1">
                        <Tooltip content="Xem chi tiết">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => onView(staff)}
                            // className={`p-2 rounded-lg transition-colors ${actionColors.view}`}
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                        </Tooltip>

                        <Tooltip content="Gán phòng ban">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => onAssignDepartment(staff)}
                            >
                                <UserPlus className="w-4 h-4" />
                            </Button>
                        </Tooltip>

                        <Tooltip content="Gán ca làm việc">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleAssignWorkShift(staff)}
                            // className={`p-2 rounded-lg transition-colors ${actionColors.assignWorkShift}`}
                            >
                                <Calendar className="w-4 h-4" />
                            </Button>
                        </Tooltip>

                        <Tooltip content="Xem ca làm việc">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleViewWorkShifts(staff)}
                            //className={`p-2 rounded-lg transition-colors ${actionColors.view}`}
                            >
                                <Clock className="w-4 h-4" />
                            </Button>
                        </Tooltip>

                        <Tooltip content="Xóa">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => onDelete(staff)}
                                className="text-destructive hover:text-destructive"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
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
            <table className="w-full">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="bg-gray-50 text-gray-700 font-semibold text-xs py-3 px-4 text-left"
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={columns.length} className="text-center py-6">
                                Đang tải dữ liệu...
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="text-center py-6">
                                {tableConfig.emptyContent}
                            </td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <TableRow key={item.id}>
                                {columns.map((column) => (
                                    <TableCell key={column.key as string} className="text-sm py-2 px-4">
                                        {renderCell(item, column.key)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </tbody>
            </table>

            {/* Assign Work Shift Modal */}
            <AssignWorkShiftModal
                open={assignWorkShiftModalOpen}
                onClose={() => setAssignWorkShiftModalOpen(false)}
                staff={selectedStaff}
                onSuccess={handleAssignWorkShiftSuccess}
            />

            {/* View Work Shifts Modal */}
            <StaffWorkShiftAssignmentsModal
                open={viewWorkShiftsModalOpen}
                onClose={() => setViewWorkShiftsModalOpen(false)}
                staff={selectedStaff}
            />
        </div>
    );
}

