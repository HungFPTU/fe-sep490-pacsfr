'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import type { ShiftSwapRequest } from '../../../types';
import { SHIFT_SWAP_STATUS_LABELS, SHIFT_SWAP_STATUS_COLORS } from '../../../types';
import { Calendar, User, Clock, CheckCircle2, XCircle } from 'lucide-react';

interface ShiftSwapRequestCardProps {
  request: ShiftSwapRequest;
  onRespond?: (request: ShiftSwapRequest) => void;
  onApprove?: (request: ShiftSwapRequest) => void;
  isTargetStaff?: boolean; // Staff có quyền trả lời (Chấp nhận/Từ chối)
  isManager?: boolean; // Manager có quyền duyệt
}

export const ShiftSwapRequestCard: React.FC<ShiftSwapRequestCardProps> = ({
  request,
  onRespond,
  onApprove,
  isTargetStaff = false,
  isManager = false,
}) => {
  // Check status using string enum
  // Target Staff (người được yêu cầu) có quyền trả lời khi status = PendingTargetResponse
  const canRespond = isTargetStaff && request.status === 'PendingTargetResponse';
  // Manager có quyền duyệt khi status = PendingManagerApproval
  const canApprove = isManager && request.status === 'PendingManagerApproval';
  const isRejectedByTarget = request.status === 'RejectedByTarget';
  const isRejectedByManager = request.status === 'RejectedByManager';

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">
            {request.requestingStaffName} → {request.targetStaffName}
          </h3>
          <p className="text-sm text-slate-600">{request.reason}</p>
        </div>
        <span
          className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold leading-5 ${
            SHIFT_SWAP_STATUS_COLORS[request.status]
          }`}
        >
          {SHIFT_SWAP_STATUS_LABELS[request.status]}
        </span>
      </div>

      {/* Shift Details */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-slate-50 p-3">
          <h4 className="mb-2 text-xs font-medium text-slate-600">CA HIỆN TẠI (Yêu cầu)</h4>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>{formatDate(request.requestingShiftDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" />
              <span>{request.requestingShiftType}</span>
            </div>
            <p className="text-slate-600">
              {request.requestingShiftStartTime} - {request.requestingShiftEndTime}
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 p-3">
          <h4 className="mb-2 text-xs font-medium text-slate-600">CA MÔI (Nhân viên B)</h4>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>{formatDate(request.targetShiftDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" />
              <span>{request.targetShiftType}</span>
            </div>
            <p className="text-slate-600">
              {request.targetShiftStartTime} - {request.targetShiftEndTime}
            </p>
          </div>
        </div>
      </div>

      {/* Status Info */}
      {(isRejectedByTarget || isRejectedByManager) && request.rejectionReason && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3">
          <p className="text-xs font-medium text-red-700">Lý do từ chối:</p>
          <p className="text-sm text-red-600">{request.rejectionReason}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-slate-200">
        {/* Target Staff chỉ có quyền trả lời khi status = PendingTargetResponse */}
        {canRespond && onRespond && (
          <>
            <button
              onClick={() => onRespond({ ...request, targetStaffAccepted: true })}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 hover:bg-green-700 text-white py-2 text-sm font-medium transition-colors"
            >
              <CheckCircle2 className="h-4 w-4" />
              Chấp nhận
            </button>
            <button
              onClick={() => onRespond({ ...request, targetStaffAccepted: false })}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 text-white py-2 text-sm font-medium transition-colors"
            >
              <XCircle className="h-4 w-4" />
              Từ chối
            </button>
          </>
        )}

        {/* Manager chỉ có quyền duyệt/từ chối khi status = PendingManagerApproval */}
        {canApprove && onApprove && (
          <>
            <button
              onClick={() => onApprove(request)}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 hover:bg-green-700 text-white py-2 text-sm font-medium transition-colors"
            >
              <CheckCircle2 className="h-4 w-4" />
              Duyệt
            </button>
            <button
              onClick={() => onApprove(request)}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 text-white py-2 text-sm font-medium transition-colors"
            >
              <XCircle className="h-4 w-4" />
              Từ chối
            </button>
          </>
        )}
      </div>
    </div>
  );
};

