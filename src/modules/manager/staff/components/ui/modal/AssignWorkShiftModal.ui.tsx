'use client';

import React, { useState, useEffect } from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { LoadingSpinner } from '@/shared/components/common';
import { useWorkShifts } from '@modules/manager/workshift';
import { useAssignWorkShift } from '../../../hooks';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { Staff } from '../../../types';
import { WorkShift } from '@modules/manager/workshift/types';

interface AssignWorkShiftModalProps {
    open: boolean;
    onClose: () => void;
    staff: Staff | null;
    onSuccess?: () => void;
}

// Helper function to format time
const formatTime = (timeString: string): string => {
    if (!timeString) return '';
    // If timeString is already in HH:mm format, return as is
    if (timeString.includes(':')) return timeString;
    // If it's a full date, extract time part
    const date = new Date(timeString);
    return date.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};

export function AssignWorkShiftModal({
    open,
    onClose,
    staff,
    onSuccess
}: AssignWorkShiftModalProps) {
    const [selectedWorkShiftId, setSelectedWorkShiftId] = useState<string>('');
    const { addToast } = useGlobalToast();

    // Get all active work shifts
    const { data: workShiftsData, isLoading: isLoadingWorkShifts, error: workShiftsError } = useWorkShifts({
        isActive: true,
        page: 1,
        size: 100
    });

    // Debug logging
    React.useEffect(() => {
        console.log('AssignWorkShiftModal - workShiftsData:', workShiftsData);
        console.log('AssignWorkShiftModal - isLoadingWorkShifts:', isLoadingWorkShifts);
        console.log('AssignWorkShiftModal - workShiftsError:', workShiftsError);
    }, [workShiftsData, isLoadingWorkShifts, workShiftsError]);

    // Extract work shifts from API response with robust shape handling
    const workShifts: WorkShift[] = (() => {
        type DotNetArray<T> = { $id?: string; $values?: T[] };
        type RestManyLike<T> = { items?: T[] | DotNetArray<T>; $values?: T[] };

        const rawUnknown: unknown = workShiftsData?.data as unknown;
        if (!rawUnknown) return [];
        if (Array.isArray(rawUnknown)) return rawUnknown as WorkShift[];

        const obj = rawUnknown as RestManyLike<WorkShift>;
        if (Array.isArray(obj.items)) return obj.items as WorkShift[];
        if (obj.items && Array.isArray((obj.items as DotNetArray<WorkShift>).$values)) {
            return (obj.items as DotNetArray<WorkShift>).$values as WorkShift[];
        }
        if (Array.isArray(obj.$values)) return obj.$values as WorkShift[];
        return [];
    })();

    // Assign work shift mutation
    const assignWorkShiftMutation = useAssignWorkShift();

    // Reset form when modal opens/closes
    useEffect(() => {
        if (open && staff) {
            // Pre-select current work shift if exists (staff might not have workShift property)
            setSelectedWorkShiftId('');
        } else {
            setSelectedWorkShiftId('');
        }
    }, [open, staff]);

    const handleSubmit = async () => {
        if (!staff || !selectedWorkShiftId) {
            addToast({
                message: 'Vui lòng chọn ca làm việc',
                type: 'error'
            });
            return;
        }

        try {
            await assignWorkShiftMutation.mutateAsync({
                staffId: staff.id,
                data: { workShiftId: selectedWorkShiftId }
            });

            addToast({
                message: 'Gán ca làm việc thành công',
                type: 'success'
            });

            onSuccess?.();
            onClose();
        } catch (error) {
            console.error('Error assigning work shift:', error);
            addToast({
                message: 'Gán ca làm việc thất bại',
                type: 'error'
            });
        }
    };

    const isLoading = isLoadingWorkShifts || assignWorkShiftMutation.isPending;

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title="Gán ca làm việc"
            onOk={handleSubmit}
            onCancel={onClose}
            okText={isLoading ? 'Đang xử lý...' : 'Gán ca'}
            cancelText="Hủy"
            centered
            size="medium"
            maskClosable={!isLoading}
            keyboard={!isLoading}
            confirmLoading={isLoading}
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
                                <span className="text-blue-700 font-medium">Ca hiện tại:</span>
                                <span className="ml-2 text-blue-600">Chưa có</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Work Shift Selection */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Chọn ca làm việc <span className="text-red-500">*</span>
                        </label>

                        {isLoadingWorkShifts ? (
                            <div className="flex items-center justify-center py-8">
                                <LoadingSpinner />
                                <span className="ml-2 text-sm text-gray-500">Đang tải danh sách ca làm việc...</span>
                            </div>
                        ) : workShiftsError ? (
                            <div className="text-center py-8">
                                <div className="text-red-500 mb-2">
                                    <p className="font-medium">Lỗi tải danh sách ca làm việc</p>
                                    <p className="text-sm">{workShiftsError.message || 'Vui lòng thử lại sau'}</p>
                                </div>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="text-blue-500 hover:text-blue-700 text-sm underline"
                                >
                                    Tải lại trang
                                </button>
                            </div>
                        ) : workShifts.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <p>Không có ca làm việc nào khả dụng</p>
                            </div>
                        ) : (
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {workShifts.map((workShift: WorkShift) => (
                                    <div
                                        key={workShift.id}
                                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedWorkShiftId === workShift.id
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                        onClick={() => setSelectedWorkShiftId(workShift.id)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="radio"
                                                        name="workShift"
                                                        value={workShift.id}
                                                        checked={selectedWorkShiftId === workShift.id}
                                                        onChange={() => setSelectedWorkShiftId(workShift.id)}
                                                        className="text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-900">
                                                            {workShift.shiftType}
                                                        </h4>
                                                        <p className="text-xs text-gray-500">
                                                            {formatTime(workShift.startTime)} - {formatTime(workShift.endTime)}
                                                        </p>
                                                        {workShift.description && (
                                                            <p className="text-xs text-gray-400 mt-1">
                                                                {workShift.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${workShift.isActive
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {workShift.isActive ? 'Hoạt động' : 'Ngừng hoạt động'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Selected Work Shift Info */}
                {selectedWorkShiftId && workShifts.length > 0 && (
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-green-900 mb-2">Ca làm việc đã chọn</h3>
                        {(() => {
                            const selectedWorkShift = workShifts.find((ws: WorkShift) => ws.id === selectedWorkShiftId);
                            return selectedWorkShift ? (
                                <div className="text-sm text-green-700">
                                    <p><strong>Tên ca:</strong> {selectedWorkShift.shiftType}</p>
                                    <p><strong>Thời gian:</strong> {formatTime(selectedWorkShift.startTime)} - {formatTime(selectedWorkShift.endTime)}</p>
                                    {selectedWorkShift.description && (
                                        <p><strong>Mô tả:</strong> {selectedWorkShift.description}</p>
                                    )}
                                </div>
                            ) : null;
                        })()}
                    </div>
                )}
            </div>
        </BaseModal>
    );
}