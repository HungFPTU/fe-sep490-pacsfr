'use client';

import React, { useState, useEffect } from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { Input } from '@/shared/components/ui/input.ui';
import { useCreateLeaveRequest } from '@/modules/manager/leave-request';
import { useGlobalToast } from '@/core/patterns/SingletonHook';
import { useAuth } from '@/modules/auth/hooks';
import { Calendar, AlertCircle, Clock } from 'lucide-react';
import { MAX_LEAVE_DAYS_PER_YEAR, LEAVE_TYPES, LEAVE_TYPE_LABELS } from '@/modules/manager/leave-request/constants';
import { convertToISODateTime, isVietnameseHoliday, getHolidayName, getHolidaysInRange } from '../../utils';
import type { LeaveType } from '@/modules/manager/leave-request/types';

interface Props {
    open: boolean;
    onClose: () => void;
    staffId?: string; // Optional, will get from auth if not provided
    onSuccess?: () => void;
}

export const CreateLeaveRequestModal: React.FC<Props> = ({
    open,
    onClose,
    staffId: propStaffId,
    onSuccess,
}) => {
    const { addToast } = useGlobalToast();
    const { user } = useAuth();
    const createMutation = useCreateLeaveRequest();

    // Get staffId from auth (localStorage) or prop
    const staffId = propStaffId || user?.id || '';

    const [leaveType, setLeaveType] = useState<LeaveType | ''>('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [reason, setReason] = useState('');
    const [errors, setErrors] = useState<{
        leaveType?: string;
        fromDate?: string;
        toDate?: string;
        reason?: string;
        staffId?: string;
    }>({});

    // Validate staffId when modal opens
    useEffect(() => {
        if (open && !staffId) {
            setErrors((prev) => ({
                ...prev,
                staffId: 'Không thể xác định thông tin nhân viên. Vui lòng đăng nhập lại.',
            }));
        } else {
            setErrors((prev) => {
                const { staffId: _, ...rest } = prev;
                return rest;
            });
        }
    }, [open, staffId]);

    const calculateDays = (from: string, to: string): { totalDays: number, holidayDates: string[] } => {
        if (!from || !to) return { totalDays: 0, holidayDates: [] };
        const fromTime = new Date(from).getTime();
        const toTime = new Date(to).getTime();
        if (toTime < fromTime) return { totalDays: 0, holidayDates: [] };

        const rawDays = Math.ceil((toTime - fromTime) / (1000 * 60 * 60 * 24)) + 1;
        const holidayDates = getHolidaysInRange(from, to);
        const totalDays = Math.max(0, rawDays - holidayDates.length);

        return { totalDays, holidayDates };
    };

    const { totalDays: days, holidayDates } = calculateDays(fromDate, toDate);

    const validate = (): boolean => {
        const newErrors: typeof errors = {};

        if (!leaveType) {
            newErrors.leaveType = 'Vui lòng chọn loại nghỉ';
        }

        if (!fromDate) {
            newErrors.fromDate = 'Vui lòng chọn ngày bắt đầu';
        } else if (isVietnameseHoliday(fromDate)) {
            const holidayName = getHolidayName(fromDate);
            newErrors.fromDate = `Không thể chọn ngày lễ: ${holidayName}`;
        }

        if (!toDate) {
            newErrors.toDate = 'Vui lòng chọn ngày kết thúc';
        } else if (isVietnameseHoliday(toDate)) {
            const holidayName = getHolidayName(toDate);
            newErrors.toDate = `Không thể chọn ngày lễ: ${holidayName}`;
        }

        if (fromDate && toDate) {
            const from = new Date(fromDate);
            const to = new Date(toDate);
            if (to < from) {
                newErrors.toDate = 'Ngày kết thúc phải sau ngày bắt đầu';
            } else {
                // Check if date range contains any holidays
                const holidaysInRange = getHolidaysInRange(fromDate, toDate);
                if (holidaysInRange.length > 0) {
                    const holidayNames = holidaysInRange.map(date => getHolidayName(date)).join(', ');
                    newErrors.toDate = `Khoảng thời gian chứa ${holidaysInRange.length} ngày lễ: ${holidayNames}`;
                }
            }

            // If user selects ONLY holidays (days = 0 but range is valid), show error
            if (days === 0 && holidayDates.length > 0) {
                const holidayError = 'Đây là ngày nghỉ , không cần nộp đơn';
                newErrors.fromDate = holidayError;
            }
        }

        if (days > MAX_LEAVE_DAYS_PER_YEAR) {
            newErrors.toDate = `Không thể xin nghỉ quá ${MAX_LEAVE_DAYS_PER_YEAR} ngày/năm`;
        }

        if (!reason.trim()) {
            newErrors.reason = 'Vui lòng nhập lý do nghỉ';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async () => {
        if (!staffId) {
            addToast({
                message: 'Không thể xác định thông tin nhân viên. Vui lòng đăng nhập lại.',
                type: 'error',
            });
            return;
        }

        if (!validate()) return;

        try {
            // Convert dates to ISO datetime format with milliseconds and Z
            const startDateISO = convertToISODateTime(fromDate);
            const endDateISO = convertToISODateTime(toDate);

            await createMutation.mutateAsync({
                staffId,
                leaveType: leaveType as LeaveType,
                startDate: startDateISO,
                endDate: endDateISO,
                reason: reason.trim(),
            });

            addToast({
                message: 'Tạo đơn xin nghỉ thành công',
                type: 'success',
            });

            onSuccess?.();
            handleClose();
        } catch (error) {
            addToast({
                message: error instanceof Error ? error.message : 'Tạo đơn xin nghỉ thất bại',
                type: 'error',
            });
        }
    };

    const handleClose = () => {
        setLeaveType('');
        setFromDate('');
        setToDate('');
        setReason('');
        setErrors({});
        onClose();
    };

    return (
        <BaseModal
            open={open}
            onClose={handleClose}
            title="Tạo Đơn Xin Nghỉ"
            onOk={handleSubmit}
            onCancel={handleClose}
            okText="Gửi Đơn"
            cancelText="Hủy"
            confirmLoading={createMutation.isPending}
            centered
            size="medium"
            maskClosable={!createMutation.isPending}
            keyboard={!createMutation.isPending}
            destroyOnClose
        >
            <div className="space-y-5">
                {/* StaffId Error */}
                {errors.staffId && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-sm text-red-800">
                            <AlertCircle className="h-4 w-4" />
                            {errors.staffId}
                        </div>
                    </div>
                )}
                {/* Info Banner */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                        <div className="text-sm text-blue-800">
                            <p className="font-medium mb-1">Lưu ý khi xin nghỉ:</p>
                            <ul className="list-disc list-inside space-y-1 text-xs">
                                <li>Tối đa {MAX_LEAVE_DAYS_PER_YEAR} ngày nghỉ phép/năm</li>
                                <li>Đơn sẽ được quản lý xem xét và duyệt</li>
                                <li>Nếu có ca làm việc, quản lý sẽ tìm người thay thế</li>
                                <li className="text-red-600 font-medium">⚠️ Không được chọn ngày lễ Việt Nam</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Leave Type */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Loại Nghỉ *
                    </label>
                    <select
                        value={leaveType}
                        onChange={(e) => {
                            setLeaveType(e.target.value as LeaveType);
                            if (errors.leaveType) setErrors((prev) => ({ ...prev, leaveType: undefined }));
                        }}
                        className={`w-full border-2 rounded-lg px-3 py-2 text-sm focus:ring-1 transition-all ${errors.leaveType
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                            : 'border-indigo-200 focus:border-indigo-500 focus:ring-indigo-100'
                            }`}
                    >
                        <option value="">-- Chọn loại nghỉ --</option>
                        {LEAVE_TYPES.map((type) => (
                            <option key={type} value={type}>
                                {LEAVE_TYPE_LABELS[type]}
                            </option>
                        ))}
                    </select>
                    {errors.leaveType && (
                        <div className="flex items-center gap-1.5 text-xs text-red-600 mt-1">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.leaveType}
                        </div>
                    )}
                </div>

                {/* From Date */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        <Calendar className="h-4 w-4 inline mr-2 text-indigo-600" />
                        Ngày Bắt Đầu Nghỉ *
                    </label>
                    <Input
                        type="date"
                        value={fromDate}
                        onChange={(e) => {
                            setFromDate(e.target.value);
                            if (errors.fromDate) setErrors((prev) => ({ ...prev, fromDate: undefined }));
                        }}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full ${errors.fromDate ? 'border-red-300' : 'border-indigo-200'}`}
                    />
                    {errors.fromDate && (
                        <div className="flex items-center gap-1.5 text-xs text-red-600 mt-1">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.fromDate}
                        </div>
                    )}
                </div>

                {/* To Date */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        <Calendar className="h-4 w-4 inline mr-2 text-indigo-600" />
                        Ngày Kết Thúc Nghỉ *
                    </label>
                    <Input
                        type="date"
                        value={toDate}
                        onChange={(e) => {
                            setToDate(e.target.value);
                            if (errors.toDate) setErrors((prev) => ({ ...prev, toDate: undefined }));
                        }}
                        min={fromDate || new Date().toISOString().split('T')[0]}
                        className={`w-full ${errors.toDate ? 'border-red-300' : 'border-indigo-200'}`}
                    />
                    {errors.toDate && (
                        <div className="flex items-center gap-1.5 text-xs text-red-600 mt-1">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.toDate}
                        </div>
                    )}
                </div>

                {/* Days Count */}
                {(days > 0 || holidayDates.length > 0) && (
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                        <div className="flex flex-col gap-1 text-sm">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-indigo-600" />
                                <span className="text-indigo-900 font-medium">
                                    Tổng số ngày nghỉ: <strong className="text-lg">{days}</strong> ngày
                                </span>
                            </div>
                            {holidayDates.length > 0 && (
                                <div className="text-xs text-indigo-700 pl-6 space-y-0.5">
                                    <p>Đã trừ {holidayDates.length} ngày lễ:</p>
                                    <ul className="list-disc list-inside">
                                        {holidayDates.map(date => {
                                            const [y, m, d] = date.split('-');
                                            return <li key={date}>Ngày {d}/{m}/{y} được nghỉ</li>;
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Reason */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Lý Do Nghỉ *
                    </label>
                    <textarea
                        value={reason}
                        onChange={(e) => {
                            setReason(e.target.value);
                            if (errors.reason) setErrors((prev) => ({ ...prev, reason: undefined }));
                        }}
                        placeholder="Ví dụ: Nghỉ ốm, việc gia đình, du lịch..."
                        className={`w-full border-2 rounded-lg px-3 py-2 text-sm focus:ring-1 transition-all resize-none ${errors.reason
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                            : 'border-indigo-200 focus:border-indigo-500 focus:ring-indigo-100'
                            }`}
                        rows={4}
                        maxLength={500}
                    />
                    {errors.reason && (
                        <div className="flex items-center gap-1.5 text-xs text-red-600 mt-1">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.reason}
                        </div>
                    )}
                    <div className="text-xs text-slate-500 mt-1">
                        {reason.length}/500 ký tự
                    </div>
                </div>
            </div>
        </BaseModal>
    );
};

