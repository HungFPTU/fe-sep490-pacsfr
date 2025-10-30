'use client';

import React, { useState, useEffect } from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { LoadingSpinner } from '@/shared/components/common';
import { Staff } from '../../../types';
import { WorkShiftAssignment } from '@modules/manager/workshift/types';
import { useWorkShifts } from '@modules/manager/workshift';
import { formatDateVN } from '@core/utils/date';
import { useCounterMap } from '@/modules/manager/counter/hooks';

interface StaffWorkShiftAssignmentsModalProps {
    open: boolean;
    onClose: () => void;
    staff: Staff | null;
    // assignments are fetched internally by staffId
}

// Helper function to format time
const formatTime = (timeString: string): string => {
    if (!timeString) return '';
    // If timeString is already in HH:mm format, return as is
    if (timeString.includes(':')) {
        return timeString.substring(0, 5); // Take only HH:mm part
    }
    return timeString;
};

// Helper function to get shift type color
const getShiftTypeColor = (shiftType: string): string => {
    switch (shiftType) {
        case 'Sáng': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'Chiều': return 'bg-orange-100 text-orange-800 border-orange-200';
        case 'Cả ngày': return 'bg-blue-100 text-blue-800 border-blue-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

export function StaffWorkShiftAssignmentsModal({
    open,
    onClose,
    staff,
}: StaffWorkShiftAssignmentsModalProps) {
    const staffId = staff?.id || '';
    const { data, isLoading, error } = useWorkShifts({
        page: 1,
        size: 100,
        staffId,
    });

    // Extract assignments from REST/.NET shapes
    const assignments: WorkShiftAssignment[] = (() => {
        const raw = data?.data;
        if (!raw) return [];
        if (Array.isArray(raw)) return raw as WorkShiftAssignment[];
        if (Array.isArray(raw.items)) return raw.items as unknown as WorkShiftAssignment[];
        if (raw.items && Array.isArray(raw.items.$values)) return raw.items.$values as unknown as WorkShiftAssignment[];
        if (Array.isArray(raw.$values)) return raw.$values as unknown as WorkShiftAssignment[];
        return [];
    })();

    const [filteredAssignments, setFilteredAssignments] = useState<WorkShiftAssignment[]>([]);
    useEffect(() => {
        if (staffId) {
            setFilteredAssignments(assignments.filter(a => a.staffId === staffId));
        } else {
            setFilteredAssignments([]);
        }
    }, [assignments, staffId]);

    // Dùng custom hook từ counter module
    const uniqueCounterIds = filteredAssignments
        .filter(a => a.counterId)
        .map(a => a.counterId);
    const { counterMap } = useCounterMap(uniqueCounterIds, open);

    // Group assignments by date
    const groupedAssignments = filteredAssignments.reduce((groups, assignment) => {
        const date = assignment.shiftDate.split('T')[0];
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(assignment);
        return groups;
    }, {} as Record<string, WorkShiftAssignment[]>);

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title="Ca làm việc đã gán"
            footer={null}
            centered
            size="large"
            maskClosable={!isLoading}
            keyboard={!isLoading}
            destroyOnClose={true}
        >
            <div className="space-y-6">
                {/* Staff Info */}
                {staff && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-blue-900 mb-2">Thông tin nhân viên</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div>
                                <span className="text-blue-700 font-medium">Mã NV:</span>
                                <span className="ml-2 text-blue-600">{staff.staffCode}</span>
                            </div>
                            <div>
                                <span className="text-blue-700 font-medium">Họ tên:</span>
                                <span className="ml-2 text-blue-600">{staff.fullName}</span>
                            </div>
                            <div>
                                <span className="text-blue-700 font-medium">Chức vụ:</span>
                                <span className="ml-2 text-blue-600">{staff.position}</span>
                            </div>
                            <div>
                                <span className="text-blue-700 font-medium">Tổng ca:</span>
                                <span className="ml-2 text-blue-600">{filteredAssignments.length} ca</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Assignments List */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <LoadingSpinner />
                        <span className="ml-2 text-sm text-gray-500">Đang tải danh sách ca làm việc...</span>
                    </div>
                ) : error ? (
                    <div className="text-center py-8 text-red-600">
                        Không tải được danh sách ca làm việc.
                    </div>
                ) : filteredAssignments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <p>Nhân viên chưa có ca làm việc nào được gán</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Danh sách ca làm việc</h3>

                        {Object.entries(groupedAssignments)
                            .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
                            .map(([date, dayAssignments]) => (
                                <div key={date} className="border border-gray-200 rounded-lg">
                                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                                        <h4 className="text-sm font-medium text-gray-900">
                                            {formatDateVN(date)} ({dayAssignments.length} ca)
                                        </h4>
                                    </div>
                                    <div className="p-4 space-y-3">
                                        {dayAssignments.map((assignment) => (
                                            <div
                                                key={assignment.id}
                                                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
                                            >
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center space-x-2">
                                                                <span className="text-sm font-medium text-gray-900">
                                                                    {formatTime(assignment.startTime)} - {formatTime(assignment.endTime)}
                                                                </span>
                                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getShiftTypeColor(assignment.shiftType)}`}>
                                                                    {assignment.shiftType}
                                                                </span>
                                                            </div>
                                                            <div className="mt-1">
                                                                <p className="text-xs text-gray-500">
                                                                    Counter ID: {assignment.counterId}
                                                                </p>
                                                                {assignment.counterId && (
                                                                    counterMap[assignment.counterId] ? (
                                                                        <div className="text-xs text-blue-700">
                                                                            <strong>Quầy:</strong> {counterMap[assignment.counterId]?.counterName}<br />
                                                                            <strong>Vị trí:</strong> {counterMap[assignment.counterId]?.location}
                                                                        </div>
                                                                    ) : (
                                                                        <div className="italic text-xs text-gray-400">
                                                                            Đang tải thông tin quầy...
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-shrink-0 text-right">
                                                    <p className="text-xs text-gray-500">
                                                        ID: {assignment.id.substring(0, 8)}...
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                    </div>
                )}

                {/* Summary */}
                {filteredAssignments.length > 0 && (
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-green-900 mb-2">Tóm tắt</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <span className="text-green-700 font-medium">Tổng ca:</span>
                                <span className="ml-2 text-green-600">{filteredAssignments.length}</span>
                            </div>
                            <div>
                                <span className="text-green-700 font-medium">Số ngày:</span>
                                <span className="ml-2 text-green-600">{Object.keys(groupedAssignments).length}</span>
                            </div>
                            <div>
                                <span className="text-green-700 font-medium">Ca sáng:</span>
                                <span className="ml-2 text-green-600">
                                    {filteredAssignments.filter(a => a.shiftType === 'Sáng').length}
                                </span>
                            </div>
                            <div>
                                <span className="text-green-700 font-medium">Ca chiều:</span>
                                <span className="ml-2 text-green-600">
                                    {filteredAssignments.filter(a => a.shiftType === 'Chiều').length}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </BaseModal>
    );
}
