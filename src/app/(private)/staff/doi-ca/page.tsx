'use client';

import React, { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { Button } from '@/shared/components/ui/button.ui';
import { useMyShiftSwapRequests, useAvailableStaffWithShifts, useMyWorkShifts } from '@/modules/staff/shift-swap/hooks';
import { ShiftSwapFormModal, ShiftSwapRequestCard } from '@/modules/staff/shift-swap/components';
import { SHIFT_SWAP_STATUS_LABELS } from '@/modules/staff/shift-swap/types';
import type { ShiftSwapRequest } from '@/modules/staff/shift-swap/types';

export default function StaffShiftSwapPage() {
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>();
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ShiftSwapRequest | null>(null);

  // Fetch my shift swap requests
  const { data: requestsData, isLoading: requestsLoading, refetch: refetchRequests } = useMyShiftSwapRequests(selectedStatus);

  // Fetch my work shifts
  const { data: myShiftsData, isLoading: myShiftsLoading } = useMyWorkShifts();

  // Fetch available staff with their shifts
  const { data: staffData, isLoading: staffLoading } = useAvailableStaffWithShifts();

  // Extract data safely from API responses
  const requests = (() => {
    if (!requestsData?.data) return [];
    // RestPaged has $values or items.$values
    const values = (requestsData.data as any)?.$values || (requestsData.data as any)?.items?.$values;
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
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white p-6">
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
            requests.map((request: ShiftSwapRequest) => (
              <div
                key={request.id}
                onClick={() => handleRespond(request)}
                className="cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <ShiftSwapRequestCard
                  request={request}
                  onRespond={handleRespond}
                  isStaff={true}
                />
              </div>
            ))
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
        {selectedRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="max-h-96 max-w-2xl overflow-auto rounded-lg bg-white p-6">
              <ShiftSwapRequestCard
                request={selectedRequest}
                isStaff={true}
              />
              <button
                onClick={() => setDetailModalOpen(false)}
                className="mt-4 w-full rounded-lg border border-slate-300 py-2 text-slate-700 hover:bg-slate-50"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

