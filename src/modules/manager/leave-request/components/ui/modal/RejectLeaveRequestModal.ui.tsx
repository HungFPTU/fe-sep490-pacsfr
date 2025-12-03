'use client';

import React, { useState } from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { useRejectLeaveRequest } from '../../../hooks';
import { useGlobalToast } from '@/core/patterns/SingletonHook';
import { AlertCircle, User, Calendar } from 'lucide-react';
import { formatDate, getLeaveRequestDates } from '../../../utils';
import type { LeaveRequest } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    leaveRequest: LeaveRequest;
    onSuccess?: () => void;
}

export const RejectLeaveRequestModal: React.FC<Props> = ({
    open,
    onClose,
    leaveRequest,
    onSuccess,
}) => {
    const { addToast } = useGlobalToast();
    const rejectMutation = useRejectLeaveRequest();
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');

    const handleReject = async () => {
        if (!reason.trim()) {
            setError('Vui lòng nhập lý do từ chối');
            return;
        }

        try {
            await rejectMutation.mutateAsync({
                leaveRequestId: leaveRequest.id,
                rejectionReason: reason.trim(),
            });

            addToast({
                message: 'Từ chối đơn xin nghỉ thành công',
                type: 'success',
            });

            onSuccess?.();
            handleClose();
        } catch (error) {
            addToast({
                message: error instanceof Error ? error.message : 'Từ chối đơn thất bại',
                type: 'error',
            });
        }
    };

    const handleClose = () => {
        setReason('');
        setError('');
        onClose();
    };

    const { fromDate, toDate } = getLeaveRequestDates(leaveRequest);

    return (
        <BaseModal
            open={open}
            onClose={handleClose}
            title="Từ Chối Đơn Xin Nghỉ"
            onOk={handleReject}
            onCancel={handleClose}
            okText="Xác Nhận Từ Chối"
            cancelText="Hủy"
            confirmLoading={rejectMutation.isPending}
            centered
            size="medium"
            maskClosable={!rejectMutation.isPending}
            keyboard={!rejectMutation.isPending}
            destroyOnClose
        >
            <div className="space-y-5">
                {/* Leave Request Info */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-red-900 mb-3">Thông tin đơn nghỉ</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-red-600" />
                            <span className="text-red-700">Nhân viên:</span>
                            <strong className="text-red-900">{leaveRequest.staffName} ({leaveRequest.staffCode})</strong>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-red-600" />
                            <span className="text-red-700">Thời gian:</span>
                            <strong className="text-red-900">
                                {formatDate(fromDate)} - {formatDate(toDate)}
                            </strong>
                        </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-red-200">
                        {leaveRequest.rejectionReason ? (
                            <p className="text-sm text-red-700">
                                <strong>Lý do từ chối:</strong> {leaveRequest.rejectionReason}
                            </p>
                        ) : (
                            <p className="text-sm text-red-700">
                                <strong>Lý do nghỉ:</strong> {leaveRequest.reason}
                            </p>
                        )}
                    </div>
                </div>

                {/* Warning */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
                        <div className="text-sm text-yellow-800">
                            <p className="font-semibold mb-1">Lưu ý khi từ chối</p>
                            <p>Nhân viên sẽ nhận được thông báo từ chối kèm lý do. Vui lòng nhập lý do rõ ràng.</p>
                        </div>
                    </div>
                </div>

                {/* Rejection Reason */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Lý Do Từ Chối *
                    </label>
                    <textarea
                        value={leaveRequest.rejectionReason}
                        onChange={(e) => {
                            setReason(e.target.value);
                            if (error) setError('');
                        }}
                        placeholder="Ví dụ: Thiếu nhân sự thay thế, thời gian không phù hợp..."
                        className={`w-full border-2 rounded-lg px-3 py-2 text-sm focus:ring-1 transition-all resize-none ${error
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                            : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
                            }`}
                        rows={4}
                        maxLength={500}
                    />
                    {error && (
                        <div className="flex items-center gap-1.5 text-xs text-red-600 mt-2">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {error}
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

