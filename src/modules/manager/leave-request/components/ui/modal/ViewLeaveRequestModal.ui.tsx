'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import {
    LEAVE_REQUEST_STATUS_LABELS,
    LEAVE_REQUEST_STATUS_COLORS,
    LEAVE_TYPE_LABELS
} from '../../../constants';
import { Calendar, User, Clock, FileText, CheckCircle, XCircle, AlertCircle, Mail, Loader2 } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/components/manager/ui/avatar';
import { formatDateWithWeekday, formatDateTime, calculateDays, getLeaveRequestDates } from '../../../utils';
import { useLeaveRequestDetail } from '../../../hooks';

interface Props {
    open: boolean;
    onClose: () => void;
    leaveRequestId: string;
}

export const ViewLeaveRequestModal: React.FC<Props> = ({
    open,
    onClose,
    leaveRequestId,
}) => {
    // Fetch leave request detail from API
    const { data: leaveRequest, isLoading, error } = useLeaveRequestDetail(
        open ? leaveRequestId : ''
    );

    if (!leaveRequest) {
        return (
            <BaseModal
                open={open}
                onClose={onClose}
                title="Chi Tiết Đơn Xin Nghỉ"
                size="large"
                footer={null}
            >
                <div className="flex items-center justify-center py-12">
                    {isLoading ? (
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                            <p className="text-sm text-slate-600">Đang tải thông tin...</p>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center gap-3 text-red-600">
                            <AlertCircle className="h-8 w-8" />
                            <p className="text-sm">Không thể tải thông tin đơn nghỉ</p>
                        </div>
                    ) : (
                        <p className="text-sm text-slate-600">Không tìm thấy thông tin đơn nghỉ</p>
                    )}
                </div>
            </BaseModal>
        );
    }

    const { fromDate, toDate } = getLeaveRequestDates(leaveRequest);
    const days = calculateDays(fromDate, toDate);
    const statusColor = LEAVE_REQUEST_STATUS_COLORS[leaveRequest.status];

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title="Chi Tiết Đơn Xin Nghỉ"
            size="large"
            footer={null}
        >
            <div className="space-y-6">
                {/* Status Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                            Đơn xin nghỉ {days} ngày
                        </h3>
                        {leaveRequest.leaveType && (
                            <p className="text-sm text-indigo-600 mt-1">
                                {LEAVE_TYPE_LABELS[leaveRequest.leaveType]}
                            </p>
                        )}
                    </div>
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${statusColor}`}>
                        {LEAVE_REQUEST_STATUS_LABELS[leaveRequest.status]}
                    </span>
                </div>

                {/* Staff Information */}
                <div className="bg-linear-to-br from-indigo-50 to-slate-50 rounded-lg p-5 border border-indigo-100">
                    <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <User className="h-4 w-4 text-indigo-600" />
                        Thông Tin Nhân Viên
                    </h4>
                    <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="shrink-0">
                            <Avatar className="h-16 w-16 border-2 border-indigo-200 shadow-sm">
                                <AvatarImage
                                    src={leaveRequest.staffAvatarUrl}
                                    alt={leaveRequest.staffName || 'Nhân viên'}
                                />
                                <AvatarFallback className="bg-indigo-100 text-indigo-700 font-semibold text-lg">
                                    {leaveRequest.staffName
                                        ? leaveRequest.staffName
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')
                                            .toUpperCase()
                                            .slice(0, 2)
                                        : leaveRequest.staffCode || 'NV'}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        {/* Staff Details */}
                        <div className="flex-1 space-y-3">
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Họ và tên</p>
                                <p className="text-base font-semibold text-slate-900">
                                    {leaveRequest.staffName || 'N/A'}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">Mã nhân viên</p>
                                    <p className="text-sm font-medium text-slate-700">
                                        {leaveRequest.staffCode || 'N/A'}
                                    </p>
                                </div>

                                {leaveRequest.staffEmail && (
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Email</p>
                                        <div className="flex items-center gap-1.5">
                                            <Mail className="h-3.5 w-3.5 text-slate-400" />
                                            <p className="text-sm font-medium text-slate-700">
                                                {leaveRequest.staffEmail}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Leave Period */}
                <div className="bg-indigo-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-indigo-600" />
                        Thời Gian Nghỉ
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-slate-600">Từ ngày:</span>
                            <p className="font-medium text-slate-900 mt-1 flex items-center gap-2">
                                <Calendar className="h-3.5 w-3.5 text-indigo-600" />
                                {formatDateWithWeekday(fromDate)}
                            </p>
                        </div>
                        <div>
                            <span className="text-slate-600">Đến ngày:</span>
                            <p className="font-medium text-slate-900 mt-1 flex items-center gap-2">
                                <Calendar className="h-3.5 w-3.5 text-indigo-600" />
                                {formatDateWithWeekday(toDate)}
                            </p>
                        </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-indigo-200">
                        <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-indigo-600" />
                            <span className="text-slate-600">Tổng số ngày nghỉ:</span>
                            <strong className="text-indigo-900 text-lg">{days} ngày</strong>
                        </div>
                    </div>
                </div>

                {/* Reason */}
                <div>
                    <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-indigo-600" />
                        Lý Do Nghỉ
                    </h4>
                    <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-sm text-slate-700 whitespace-pre-wrap">
                            {leaveRequest.reason}
                        </p>
                    </div>
                </div>

                {/* Approved Information */}
                {leaveRequest.status === 'Approved' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
                        {leaveRequest.approverName && (
                            <div className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-green-900 mb-1">
                                        Người Duyệt
                                    </h4>
                                    <p className="text-sm text-green-800">
                                        {leaveRequest.approverName}
                                    </p>
                                    {leaveRequest.approvedAt && (
                                        <p className="text-xs text-green-700 mt-1">
                                            Vào lúc: {formatDateTime(leaveRequest.approvedAt)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                        {leaveRequest.replacementStaffName && (
                            <div className="pt-3 border-t border-green-200">
                                <div className="flex items-start gap-3">
                                    <User className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                                    <div className="flex-1">
                                        <h4 className="text-sm font-semibold text-green-900 mb-1">
                                            Người Thay Thế
                                        </h4>
                                        <p className="text-sm text-green-800">
                                            {leaveRequest.replacementStaffName}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Rejected with Reason */}
                {leaveRequest.status === 'Rejected' && leaveRequest.rejectionReason && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <XCircle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-red-900 mb-2">
                                    Lý Do Từ Chối
                                </h4>
                                <p className="text-sm text-red-800 whitespace-pre-wrap">
                                    {leaveRequest.rejectionReason}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Metadata */}
                <div className="pt-4 border-t border-slate-200">
                    <div className="grid grid-cols-2 gap-4 text-xs text-slate-500">
                        <div>
                            <span className="block mb-1">Ngày tạo:</span>
                            <span className="font-medium text-slate-700">
                                {formatDateTime(leaveRequest.createdAt)}
                            </span>
                        </div>
                        {leaveRequest.modifiedAt && (
                            <div>
                                <span className="block mb-1">Ngày cập nhật:</span>
                                <span className="font-medium text-slate-700">
                                    {formatDateTime(leaveRequest.modifiedAt)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </BaseModal>
    );
};

