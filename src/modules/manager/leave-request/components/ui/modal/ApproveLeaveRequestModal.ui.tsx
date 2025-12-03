'use client';

import React, { useState, useEffect } from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { useApproveLeaveRequest, useAvailableReplacements } from '../../../hooks';
import { useGlobalToast } from '@/core/patterns/SingletonHook';
import { Loader2, AlertCircle, CheckCircle2, User, Calendar } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { formatDateWithWeekday, calculateDays, getLeaveRequestDates } from '../../../utils';
import type { LeaveRequest, AvailableStaff } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    leaveRequest: LeaveRequest;
    onSuccess?: () => void;
}

export const ApproveLeaveRequestModal: React.FC<Props> = ({
    open,
    onClose,
    leaveRequest,
    onSuccess,
}) => {
    const { addToast } = useGlobalToast();
    const approveMutation = useApproveLeaveRequest();
    const [selectedReplacementId, setSelectedReplacementId] = useState<string>('');

    // Fetch available replacements
    const { data: replacementsData, isLoading: isLoadingReplacements } = useAvailableReplacements(
        open ? leaveRequest.id : ''
    );

    const availableStaff = replacementsData || [];
    const needsReplacement = availableStaff.length > 0;

    useEffect(() => {
        if (open) {
            setSelectedReplacementId('');
        }
    }, [open]);

    const handleApprove = async () => {
        if (needsReplacement && !selectedReplacementId) {
            addToast({
                message: 'Vui lòng chọn người thay thế',
                type: 'error',
            });
            return;
        }

        try {
            await approveMutation.mutateAsync({
                leaveRequestId: leaveRequest.id,
                replacementStaffId: selectedReplacementId || undefined,
            });

            addToast({
                message: 'Duyệt đơn xin nghỉ thành công',
                type: 'success',
            });

            onSuccess?.();
            onClose();
        } catch (error) {
            addToast({
                message: error instanceof Error ? error.message : 'Duyệt đơn thất bại',
                type: 'error',
            });
        }
    };

    const { fromDate, toDate } = getLeaveRequestDates(leaveRequest);
    const days = calculateDays(fromDate, toDate);

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title="Duyệt Đơn Xin Nghỉ"
            onOk={handleApprove}
            onCancel={onClose}
            okText="Duyệt Đơn"
            cancelText="Hủy"
            confirmLoading={approveMutation.isPending}
            centered
            size="large"
            maskClosable={!approveMutation.isPending}
            keyboard={!approveMutation.isPending}
        >
            <div className="space-y-5">
                {/* Leave Request Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-blue-900 mb-3">Thông tin đơn nghỉ</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-blue-600" />
                            <span className="text-blue-700">Nhân viên:</span>
                            <strong className="text-blue-900">{leaveRequest.staffName} ({leaveRequest.staffCode})</strong>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-blue-600" />
                            <span className="text-blue-700">Từ:</span>
                            <strong className="text-blue-900">{formatDateWithWeekday(fromDate)}</strong>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-blue-600" />
                            <span className="text-blue-700">Đến:</span>
                            <strong className="text-blue-900">{formatDateWithWeekday(toDate)}</strong>
                        </div>
                        <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-blue-600" />
                            <span className="text-blue-700">Tổng:</span>
                            <strong className="text-blue-900">{days} ngày</strong>
                        </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-blue-200">
                        <p className="text-sm text-blue-700">
                            <strong>Lý do:</strong> {leaveRequest.reason}
                        </p>
                    </div>
                </div>

                {/* Replacement Selection */}
                {isLoadingReplacements ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-5 w-5 animate-spin text-indigo-600 mr-2" />
                        <span className="text-sm text-slate-600">Đang tìm người thay thế...</span>
                    </div>
                ) : needsReplacement ? (
                    <div className="space-y-3">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex items-start gap-2">
                                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
                                <div className="text-sm text-yellow-800">
                                    <p className="font-semibold mb-1">Cần chọn người thay thế</p>
                                    <p>Nhân viên này có ca làm việc trong thời gian nghỉ. Vui lòng chọn người thay thế.</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-slate-900 mb-3">
                                Chọn người thay thế ({availableStaff.length} nhân viên khả dụng)
                            </h4>
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {availableStaff.map((staff) => (
                                    <label
                                        key={staff.staffId}
                                        className={cn(
                                            "flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all",
                                            selectedReplacementId === staff.staffId
                                                ? "border-indigo-500 bg-indigo-50"
                                                : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                                        )}
                                    >
                                        <input
                                            type="radio"
                                            name="replacement"
                                            value={staff.staffId}
                                            checked={selectedReplacementId === staff.staffId}
                                            onChange={(e) => setSelectedReplacementId(e.target.value)}
                                            className="sr-only"
                                        />
                                        <div className="shrink-0">
                                            {selectedReplacementId === staff.staffId ? (
                                                <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                                            ) : (
                                                <div className="h-5 w-5 rounded-full border-2 border-slate-300" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-slate-900">
                                                {staff.fullName}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {staff.staffCode} • {staff.position}
                                            </p>
                                            {staff.isAssignedToOtherCounter && (
                                                <p className="text-xs text-amber-600 mt-1">
                                                    ⚠ Đang được phân công ở quầy khác
                                                </p>
                                            )}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-sm text-green-800">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <p>
                                <strong>Không cần người thay thế.</strong> Nhân viên không có ca làm việc trong thời gian nghỉ.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </BaseModal>
    );
};

