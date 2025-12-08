'use client';

import React, { useState } from 'react';
import { Filter, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/shared/components/ui/button.ui';
import { useShiftSwapList, useApproveShiftSwap } from '@/modules/staff/shift-swap/hooks';
import { ShiftSwapRequestCard } from '@/modules/staff/shift-swap/components';
import { SHIFT_SWAP_STATUS_LABELS } from '@/modules/staff/shift-swap/types';
import { useGlobalToast } from '@/core/patterns/SingletonHook';
import type { ShiftSwapRequest } from '@/modules/staff/shift-swap/types';

export default function ManagerShiftSwapPage() {
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(1); // Mặc định chờ duyệt
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectingId, setRejectingId] = useState<string | null>(null);

  // Fetch requests
  const { data: requestsData, isLoading, refetch } = useShiftSwapList({
    status: selectedStatus,
    page: 1,
    size: 20,
  });

  const approveMutation = useApproveShiftSwap();
  const toast = useGlobalToast();

  const requests = requestsData?.items || [];

  const handleApprove = async (request: ShiftSwapRequest) => {
    try {
      await approveMutation.mutateAsync({
        id: request.id,
        data: {
          shiftSwapRequestId: request.id,
          approve: true,
        },
      });
      toast.success('Yêu cầu đã được duyệt. Ca làm việc đã được hoán đổi!');
      refetch();
    } catch (error) {
      console.error(error);
      toast.error('Không thể duyệt yêu cầu');
    }
  };

  const handleReject = async (request: ShiftSwapRequest) => {
    if (!rejectionReason.trim()) {
      toast.error('Vui lòng nhập lý do từ chối');
      return;
    }

    try {
      await approveMutation.mutateAsync({
        id: request.id,
        data: {
          shiftSwapRequestId: request.id,
          approve: false,
          rejectionReason: rejectionReason,
        },
      });
      toast.success('Yêu cầu đã bị từ chối');
      setRejectingId(null);
      setRejectionReason('');
      refetch();
    } catch (error) {
      console.error(error);
      toast.error('Không thể từ chối yêu cầu');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Duyệt Yêu Cầu Đổi Ca</h1>
          <p className="mt-2 text-slate-600">
            Xem và duyệt/từ chối các yêu cầu đổi ca từ nhân viên
          </p>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-600">Chờ Duyệt</p>
            <p className="mt-1 text-2xl font-bold text-indigo-600">
              {requests.filter((r) => r.status === 1).length}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-600">Đã Duyệt</p>
            <p className="mt-1 text-2xl font-bold text-green-600">
              {requests.filter((r) => r.status === 2).length}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-600">Từ Chối</p>
            <p className="mt-1 text-2xl font-bold text-red-600">
              {requests.filter((r) => r.status === 3 || r.status === 4).length}
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6 flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={selectedStatus ?? ''}
            onChange={(e) => setSelectedStatus(e.target.value ? Number(e.target.value) : undefined)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">Tất cả trạng thái</option>
            {Object.entries(SHIFT_SWAP_STATUS_LABELS).map(([status, label]) => (
              <option key={status} value={status}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
            </div>
          ) : requests.length === 0 ? (
            <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
              <p className="text-slate-600">Không có yêu cầu với trạng thái này</p>
            </div>
          ) : (
            requests.map((request) => (
              <div key={request.id} className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="mb-4">
                  <ShiftSwapRequestCard
                    request={request}
                    isManager={true}
                  />
                </div>

                {/* Manager Actions */}
                {request.status === 1 && (
                  <div className="space-y-3 border-t border-slate-200 pt-4">
                    {rejectingId === request.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          placeholder="Nhập lý do từ chối..."
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setRejectingId(null);
                              setRejectionReason('');
                            }}
                            className="flex-1 rounded-lg border border-slate-300 py-2 text-slate-700 hover:bg-slate-50"
                          >
                            Hủy
                          </button>
                          <button
                            onClick={() => handleReject(request)}
                            disabled={approveMutation.isPending}
                            className="flex-1 rounded-lg bg-red-600 hover:bg-red-700 text-white py-2 disabled:opacity-50"
                          >
                            {approveMutation.isPending ? 'Đang xử lý...' : 'Xác Nhận Từ Chối'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(request)}
                          disabled={approveMutation.isPending}
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 hover:bg-green-700 text-white py-2 disabled:opacity-50"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Duyệt
                        </button>
                        <button
                          onClick={() => setRejectingId(request.id)}
                          disabled={approveMutation.isPending}
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-red-600 text-red-600 hover:bg-red-50 py-2 disabled:opacity-50"
                        >
                          <XCircle className="h-4 w-4" />
                          Từ Chối
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

