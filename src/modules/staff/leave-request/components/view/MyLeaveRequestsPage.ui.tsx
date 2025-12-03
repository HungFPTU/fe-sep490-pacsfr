'use client';

import React, { useState } from 'react';
import { useMyLeaveRequests } from '@/modules/manager/leave-request';
import { CreateLeaveRequestModal } from '../ui/CreateLeaveRequestModal.ui';
import { getValuesPage, RestPaged } from '@/types/rest';
import {
    LEAVE_REQUEST_STATUS_LABELS,
    LEAVE_REQUEST_STATUS_COLORS,
    LEAVE_TYPE_LABELS
} from '@/modules/manager/leave-request/constants';
import { Calendar, Clock, FileText, Plus, Filter, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/shared/components/ui/button.ui';
import { formatDate, calculateDays, getLeaveRequestDates } from '@/modules/manager/leave-request/utils';
import type { LeaveRequest, LeaveRequestStatus } from '@/modules/manager/leave-request/types';

export const MyLeaveRequestsPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<LeaveRequestStatus | 'All'>('All');
    const [modalOpen, setModalOpen] = useState(false);

    const { data, isLoading, refetch } = useMyLeaveRequests({
        Page: page,
        PageSize: 10,
        Status: statusFilter === 'All' ? undefined : statusFilter,
    });

    const pageResult = data ? getValuesPage(data as RestPaged<LeaveRequest>) : null;
    const requests = pageResult?.items || [];
    const totalPages = pageResult?.totalPages || 1;

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Đơn Xin Nghỉ Của Tôi</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Quản lý và theo dõi các đơn xin nghỉ phép
                    </p>
                </div>
                <Button
                    onClick={() => setModalOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo Đơn Mới
                </Button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                    <Filter className="h-5 w-5 text-slate-400" />
                    <span className="text-sm font-medium text-slate-700">Lọc theo trạng thái:</span>
                    <div className="flex gap-2">
                        {(['All', 'Pending', 'Approved', 'Rejected'] as const).map((status) => (
                            <button
                                key={status}
                                onClick={() => {
                                    setStatusFilter(status);
                                    setPage(1);
                                }}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${statusFilter === status
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                            >
                                {status === 'All' ? 'Tất cả' : LEAVE_REQUEST_STATUS_LABELS[status]}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
                </div>
            ) : requests.length === 0 ? (
                <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                    <p className="text-slate-600 font-medium">
                        {statusFilter === 'All'
                            ? 'Bạn chưa có đơn xin nghỉ nào'
                            : `Không có đơn xin nghỉ ${LEAVE_REQUEST_STATUS_LABELS[statusFilter as LeaveRequestStatus].toLowerCase()}`
                        }
                    </p>
                    <Button
                        onClick={() => setModalOpen(true)}
                        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Tạo Đơn Mới
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {requests.map((request) => {
                        const { fromDate, toDate } = getLeaveRequestDates(request);
                        const days = calculateDays(fromDate, toDate);
                        const statusColor = LEAVE_REQUEST_STATUS_COLORS[request.status];

                        return (
                            <div
                                key={request.id}
                                className="bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                                            <Calendar className="h-6 w-6 text-indigo-600" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-base font-semibold text-slate-900">
                                                    Đơn xin nghỉ {days} ngày
                                                </h3>
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColor}`}>
                                                    {LEAVE_REQUEST_STATUS_LABELS[request.status]}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 mt-1">
                                                {request.leaveType && (
                                                    <span className="text-xs text-indigo-600 font-medium">
                                                        {LEAVE_TYPE_LABELS[request.leaveType]}
                                                    </span>
                                                )}
                                                <p className="text-sm text-slate-500">
                                                    Tạo ngày: {formatDate(request.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="h-4 w-4 text-slate-400" />
                                        <span className="text-slate-600">Từ:</span>
                                        <strong className="text-slate-900">{formatDate(fromDate)}</strong>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="h-4 w-4 text-slate-400" />
                                        <span className="text-slate-600">Đến:</span>
                                        <strong className="text-slate-900">{formatDate(toDate)}</strong>
                                    </div>
                                </div>

                                <div className="bg-slate-50 rounded-lg p-3 mb-3">
                                    <p className="text-sm text-slate-600">
                                        <strong className="text-slate-900">Lý do:</strong> {request.reason}
                                    </p>
                                </div>

                                {/* Approved with Replacement */}
                                {request.status === 'Approved' && request.replacementStaffName && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                        <div className="flex items-center gap-2 text-sm text-green-800">
                                            <AlertCircle className="h-4 w-4" />
                                            <span>
                                                <strong>Người thay thế:</strong> {request.replacementStaffName}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Rejected with Reason */}
                                {request.status === 'Rejected' && request.rejectionReason && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                        <div className="flex items-start gap-2 text-sm text-red-800">
                                            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                                            <div>
                                                <strong className="block mb-1">Lý do từ chối:</strong>
                                                <p>{request.rejectionReason}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 pt-4">
                            <Button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                variant="outline"
                                size="sm"
                            >
                                Trước
                            </Button>
                            <span className="text-sm text-slate-600">
                                Trang {page} / {totalPages}
                            </span>
                            <Button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                variant="outline"
                                size="sm"
                            >
                                Sau
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {/* Create Modal */}
            <CreateLeaveRequestModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSuccess={refetch}
            />
        </div>
    );
};

