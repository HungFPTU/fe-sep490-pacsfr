'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import type { ShiftSwapRequest } from '../../../types';
import { SHIFT_SWAP_STATUS_LABELS, SHIFT_SWAP_STATUS_COLORS } from '../../../types';
import { Calendar, User, Clock } from 'lucide-react';

interface ShiftSwapRequestCardProps {
  request: ShiftSwapRequest;
  onRespond?: (request: ShiftSwapRequest) => void;
  onApprove?: (request: ShiftSwapRequest) => void;
  isStaff?: boolean;
  isManager?: boolean;
}

export const ShiftSwapRequestCard: React.FC<ShiftSwapRequestCardProps> = ({
  request,
  onRespond,
  onApprove,
  isStaff = true,
  isManager = false,
}) => {
  const canRespond = isStaff && request.status === 0; // Staff B chờ phản hồi
  const canApprove = isManager && request.status === 1; // Manager chờ duyệt
  const showRespond = request.targetStaffId === '' && request.status === 0; // Check if current user is target staff

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
      {request.status === 3 && request.rejectionReason && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3">
          <p className="text-xs font-medium text-red-700">Lý do từ chối:</p>
          <p className="text-sm text-red-600">{request.rejectionReason}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-slate-200">
        {canRespond && onRespond && (
          <>
            <button
              onClick={() => onRespond(request)}
              className="flex-1 rounded-lg bg-green-600 hover:bg-green-700 text-white py-2 text-sm font-medium"
            >
              Chấp nhận
            </button>
            <button
              onClick={() => onRespond({ ...request, status: 3 })}
              className="flex-1 rounded-lg bg-red-600 hover:bg-red-700 text-white py-2 text-sm font-medium"
            >
              Từ chối
            </button>
          </>
        )}

        {canApprove && onApprove && (
          <>
            <button
              onClick={() => onApprove(request)}
              className="flex-1 rounded-lg bg-green-600 hover:bg-green-700 text-white py-2 text-sm font-medium"
            >
              Duyệt
            </button>
            <button
              onClick={() => onApprove({ ...request, status: 4 })}
              className="flex-1 rounded-lg bg-red-600 hover:bg-red-700 text-white py-2 text-sm font-medium"
            >
              Từ chối
            </button>
          </>
        )}
      </div>
    </div>
  );
};

