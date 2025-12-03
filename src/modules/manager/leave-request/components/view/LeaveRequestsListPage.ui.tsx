'use client';

import React, { useState } from 'react';
import { useLeaveRequests } from '../../hooks';
import { ApproveLeaveRequestModal } from '../ui/modal/ApproveLeaveRequestModal.ui';
import { RejectLeaveRequestModal } from '../ui/modal/RejectLeaveRequestModal.ui';
import { ViewLeaveRequestModal } from '../ui/modal/ViewLeaveRequestModal.ui';
import { getValuesPage, RestPaged } from '@/types/rest';
import {
    LEAVE_REQUEST_STATUS_LABELS,
    LEAVE_REQUEST_STATUS_COLORS
} from '../../constants';
import { Calendar, Filter, Loader2, FileText, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Button } from '@/shared/components/ui/button.ui';
import { formatDate, calculateDays, getLeaveRequestDates } from '../../utils';
import type { LeaveRequest, LeaveRequestStatus } from '../../types';

export const LeaveRequestsListPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<LeaveRequestStatus | 'All'>('Pending');
    const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
    const [approveModalOpen, setApproveModalOpen] = useState(false);
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);

    const { data, isLoading, refetch } = useLeaveRequests({
        Page: page,
        PageSize: 10,
        Status: statusFilter === 'All' ? undefined : statusFilter,
    });

    const pageResult = data ? getValuesPage(data as RestPaged<LeaveRequest>) : null;
    const requests = pageResult?.items || [];
    const totalPages = pageResult?.totalPages || 1;

    const handleApprove = (request: LeaveRequest) => {
        setSelectedRequest(request);
        setApproveModalOpen(true);
    };

    const handleReject = (request: LeaveRequest) => {
        setSelectedRequest(request);
        setRejectModalOpen(true);
    };

    const handleView = (request: LeaveRequest) => {
        setSelectedRequest(request);
        setViewModalOpen(true);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Quản Lý Đơn Xin Nghỉ</h1>
                <p className="text-sm text-slate-500 mt-1">
                    Duyệt và quản lý đơn xin nghỉ của nhân viên
                </p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                    <Filter className="h-5 w-5 text-slate-400" />
                    <span className="text-sm font-medium text-slate-700">Lọc theo trạng thái:</span>
                    <div className="flex gap-2">
                        {(['Pending', 'Approved', 'Rejected', 'All'] as const).map((status) => (
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
                        Không có đơn xin nghỉ nào
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                                        Nhân viên
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                                        Thời gian nghỉ
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                                        Số ngày
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                                        Lý do
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                                        Trạng thái
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700 uppercase">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {requests.map((request) => {
                                    const { fromDate, toDate } = getLeaveRequestDates(request);
                                    const days = calculateDays(fromDate, toDate);
                                    const statusColor = LEAVE_REQUEST_STATUS_COLORS[request.status];

                                    return (
                                        <tr key={request.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-900">
                                                        {request.staffName}
                                                    </p>
                                                    <p className="text-xs text-slate-500">
                                                        {request.staffCode}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-slate-700">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                                        {formatDate(fromDate)}
                                                    </div>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                                        {formatDate(toDate)}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {days} ngày
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-slate-700 line-clamp-2 max-w-xs">
                                                    {request.reason}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusColor}`}>
                                                    {LEAVE_REQUEST_STATUS_LABELS[request.status]}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    {request.status === 'Pending' && (
                                                        <>
                                                            <Button
                                                                onClick={() => handleApprove(request)}
                                                                size="sm"
                                                                className="bg-green-600 hover:bg-green-700 text-white"
                                                            >
                                                                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                                                Duyệt
                                                            </Button>
                                                            <Button
                                                                onClick={() => handleReject(request)}
                                                                size="sm"
                                                                variant="outline"
                                                                className="border-red-300 text-red-600 hover:bg-red-50"
                                                            >
                                                                <XCircle className="h-3.5 w-3.5 mr-1" />
                                                                Từ chối
                                                            </Button>
                                                        </>
                                                    )}
                                                    <Button
                                                        onClick={() => handleView(request)}
                                                        size="sm"
                                                        variant="outline"
                                                        className="text-slate-600"
                                                    >
                                                        <Eye className="h-3.5 w-3.5 mr-1" />
                                                        Xem
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
                            <p className="text-sm text-slate-600">
                                Trang {page} / {totalPages}
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    variant="outline"
                                    size="sm"
                                >
                                    Trước
                                </Button>
                                <Button
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    variant="outline"
                                    size="sm"
                                >
                                    Sau
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Modals */}
            {selectedRequest && (
                <>
                    <ApproveLeaveRequestModal
                        open={approveModalOpen}
                        onClose={() => {
                            setApproveModalOpen(false);
                            setSelectedRequest(null);
                        }}
                        leaveRequest={selectedRequest}
                        onSuccess={refetch}
                    />
                    <RejectLeaveRequestModal
                        open={rejectModalOpen}
                        onClose={() => {
                            setRejectModalOpen(false);
                            setSelectedRequest(null);
                        }}
                        leaveRequest={selectedRequest}
                        onSuccess={refetch}
                    />
                    <ViewLeaveRequestModal
                        open={viewModalOpen}
                        onClose={() => {
                            setViewModalOpen(false);
                            setSelectedRequest(null);
                        }}
                        leaveRequestId={selectedRequest?.id || ''}
                    />
                </>
            )}
        </div>
    );
};

