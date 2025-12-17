'use client';

import React, { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { formatDate } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button.ui';
import { useMyShiftSwapRequests, useAvailableStaffWithShifts, useMyWorkShifts } from '@/modules/staff/shift-swap/hooks';
import { ShiftSwapFormModal, ShiftSwapRequestCard } from '@/modules/staff/shift-swap/components';
import { SHIFT_SWAP_STATUS_LABELS, SHIFT_SWAP_STATUS_COLORS } from '@/modules/staff/shift-swap/types';
import type { ShiftSwapRequest } from '@/modules/staff/shift-swap/types';
import { useAuthStore } from '@/modules/auth/stores/useAuthStore';

export default function StaffShiftSwapPage() {
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ShiftSwapRequest | null>(null);

  // Get current user from auth store
  const { user } = useAuthStore();
  const currentStaffId = user?.id;

  // Fetch my shift swap requests
  const { data: requestsData, isLoading: requestsLoading, refetch: refetchRequests, error: requestsError } = useMyShiftSwapRequests();

  // Fetch my work shifts
  const { data: myShiftsData, isLoading: myShiftsLoading } = useMyWorkShifts();

  // Fetch available staff with their shifts
  const { data: staffData, isLoading: staffLoading } = useAvailableStaffWithShifts();

  // Debug logging
  React.useEffect(() => {
    console.log('Shift Swap Page Debug:', {
      requestsData,
      requestsLoading,
      requestsError,
      myShiftsData,
      staffData,
    });
  }, [requestsData, requestsLoading, requestsError, myShiftsData, staffData]);

  // Extract data safely from API responses
  const requests = (() => {
    if (!requestsData?.data) {
      console.log('No requestsData or requestsData.data');
      return [];
    }
    // RestPaged has $values or items.$values
    const values = (requestsData.data as any)?.$values || (requestsData.data as any)?.items?.$values;
    console.log('Extracted values from requestsData:', values);
    return Array.isArray(values) ? values : [];
  })();
  const myShifts = Array.isArray(myShiftsData) ? myShiftsData : [];
  const availableStaff = Array.isArray(staffData) ? staffData : [];

  const handleRespond = (request: ShiftSwapRequest) => {
    setSelectedRequest(request);
    setDetailModalOpen(true);
  };

  const handleFormSuccess = () => {
    refetchRequests();
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Đổi Ca Làm Việc</h1>
          <p className="mt-2 text-slate-600">
            Tạo yêu cầu đổi ca với đồng nghiệp hoặc xem yêu cầu của bạn
          </p>
        </div>

        {/* Action Bar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button
            onClick={() => setFormModalOpen(true)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Plus className="h-4 w-4" />
            Tạo Yêu Cầu Đổi Ca
          </Button>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              value={selectedStatus ?? ''}
              onChange={(e) => setSelectedStatus(e.target.value || undefined)}
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
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {requestsLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
            </div>
          ) : requests.length === 0 ? (
            <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
              <p className="text-slate-600">
                {selectedStatus !== undefined
                  ? 'Không có yêu cầu với trạng thái này'
                  : 'Bạn chưa có yêu cầu đổi ca nào'}
              </p>
            </div>
          ) : (
            requests.map((request: ShiftSwapRequest) => {
              // Check if current staff is the target staff (người được yêu cầu)
              const isTargetStaff = currentStaffId === request.targetStaffId;
              
              return (
                <div
                  key={request.id}
                  onClick={() => handleRespond(request)}
                  className="cursor-pointer transition-transform hover:scale-[1.02]"
                >
                  <ShiftSwapRequestCard
                    request={request}
                    onRespond={handleRespond}
                    isTargetStaff={isTargetStaff}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Modals */}
        <ShiftSwapFormModal
          open={formModalOpen}
          onClose={() => setFormModalOpen(false)}
          myShifts={myShifts}
          availableStaff={availableStaff}
          onSuccess={handleFormSuccess}
          isLoading={myShiftsLoading || staffLoading}
        />

        {/* Detail Modal */}
        {detailModalOpen && selectedRequest && (() => {
          // Check if current staff is the target staff
          const isTargetStaff = currentStaffId === selectedRequest.targetStaffId;
          
          return (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
              onClick={() => setDetailModalOpen(false)}
            >
              <div 
                className="max-h-screen max-w-2xl overflow-auto rounded-lg bg-white p-6 shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-4">
                  <h2 className="text-lg font-bold text-slate-900">Chi Tiết Yêu Cầu</h2>
                  <button
                    onClick={() => setDetailModalOpen(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                </div>

                {/* Status Badge */}
                <div className="mb-6">
                  <span
                    className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold leading-5 ${
                      SHIFT_SWAP_STATUS_COLORS[selectedRequest.status]
                    }`}
                  >
                    {SHIFT_SWAP_STATUS_LABELS[selectedRequest.status]}
                  </span>
                </div>

                {/* Request Info */}
                <div className="space-y-6 mb-6">
                  {/* Requesting Staff */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 mb-2">Yêu Cầu Từ</h3>
                    <p className="text-slate-900 font-medium">{selectedRequest.requestingStaffName}</p>
                    <p className="text-sm text-slate-600">{selectedRequest.requestingStaffCode}</p>
                  </div>

                  {/* Reason */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 mb-2">Lý Do</h3>
                    <p className="text-slate-600">{selectedRequest.reason}</p>
                  </div>

                  {/* Shift Comparison */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-slate-50 p-4">
                      <h4 className="mb-3 text-xs font-medium text-slate-600">CA HIỆN TẠI (Yêu Cầu)</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-slate-500">Ngày</p>
                          <p className="font-medium text-slate-900">{formatDate(selectedRequest.requestingShiftDate)}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Ca</p>
                          <p className="font-medium text-slate-900">{selectedRequest.requestingShiftType}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Giờ</p>
                          <p className="font-medium text-slate-900">{selectedRequest.requestingShiftStartTime} - {selectedRequest.requestingShiftEndTime}</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-4">
                      <h4 className="mb-3 text-xs font-medium text-slate-600">CA MỚI (Nhân Viên B)</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-slate-500">Ngày</p>
                          <p className="font-medium text-slate-900">{formatDate(selectedRequest.targetShiftDate)}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Ca</p>
                          <p className="font-medium text-slate-900">{selectedRequest.targetShiftType}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Giờ</p>
                          <p className="font-medium text-slate-900">{selectedRequest.targetShiftStartTime} - {selectedRequest.targetShiftEndTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Target Staff */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 mb-2">Nhân Viên Thay Thế</h3>
                    <p className="text-slate-900 font-medium">{selectedRequest.targetStaffName}</p>
                    <p className="text-sm text-slate-600">{selectedRequest.targetStaffCode}</p>
                  </div>

                  {/* Rejection Reason */}
                  {(selectedRequest.status === 'RejectedByTarget' || selectedRequest.status === 'RejectedByManager') && selectedRequest.rejectionReason && (
                    <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                      <p className="text-xs font-medium text-red-700 mb-1">Lý do từ chối:</p>
                      <p className="text-sm text-red-600">{selectedRequest.rejectionReason}</p>
                    </div>
                  )}
                </div>

                {/* Footer - Action Buttons */}
                {/* Buttons chỉ hiển thị khi: target staff = current staff AND status = PendingTargetResponse */}
                <div className="border-t border-slate-200 pt-4 flex gap-2">
                  {isTargetStaff && selectedRequest.status === 'PendingTargetResponse' && (
                    <>
                      <button
                        onClick={() => {
                          // Handle accept
                          console.log('Accept request:', selectedRequest.id);
                          setDetailModalOpen(false);
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 hover:bg-green-700 text-white py-2 text-sm font-medium transition-colors"
                      >
                        ✓ Chấp nhận
                      </button>
                      <button
                        onClick={() => {
                          // Handle reject
                          console.log('Reject request:', selectedRequest.id);
                          setDetailModalOpen(false);
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 text-white py-2 text-sm font-medium transition-colors"
                      >
                        ✕ Từ chối
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setDetailModalOpen(false)}
                    className="flex-1 rounded-lg border border-slate-300 py-2 text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

