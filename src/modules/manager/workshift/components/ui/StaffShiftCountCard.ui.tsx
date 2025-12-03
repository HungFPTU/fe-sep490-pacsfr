'use client';

import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { countShiftsInWeek, countShiftsInMonth } from '../../utils';
import { MAX_SHIFTS_PER_WEEK } from '../../constants';
import type { StaffWorkShift } from '../../types';

interface Props {
  staffId: string;
  staffName: string;
  staffShifts: StaffWorkShift[];
  targetDate: Date | string;
  viewMode?: 'week' | 'month';
}

export const StaffShiftCountCard: React.FC<Props> = ({
  staffId,
  staffName,
  staffShifts,
  targetDate,
  viewMode = 'week',
}) => {
  const shiftCount = viewMode === 'week' 
    ? countShiftsInWeek(staffShifts, targetDate)
    : countShiftsInMonth(staffShifts, targetDate);
  
  const maxShifts = viewMode === 'week' ? MAX_SHIFTS_PER_WEEK : 40; // Estimate for month
  
  const percentage = maxShifts > 0 ? (shiftCount / maxShifts) * 100 : 0;
  const isNearLimit = percentage >= 80;
  const isAtLimit = percentage >= 100;

  return (
    <div className={`rounded-lg border-2 p-4 transition-all ${
      isAtLimit 
        ? 'border-red-300 bg-red-50' 
        : isNearLimit 
        ? 'border-yellow-300 bg-yellow-50'
        : 'border-slate-200 bg-white'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-slate-900 mb-1">
            {staffName}
          </h4>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Calendar className="h-3.5 w-3.5" />
            <span>
              {viewMode === 'week' ? 'Tuần này' : 'Tháng này'}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${
            isAtLimit 
              ? 'text-red-600' 
              : isNearLimit 
              ? 'text-yellow-600'
              : 'text-indigo-600'
          }`}>
            {shiftCount}
          </div>
          <div className="text-xs text-slate-500">
            / {maxShifts} ca
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
        <div
          className={`h-2 rounded-full transition-all ${
            isAtLimit 
              ? 'bg-red-500' 
              : isNearLimit 
              ? 'bg-yellow-500'
              : 'bg-indigo-500'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      {/* Status message */}
      {isAtLimit && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 mt-2">
          <Clock className="h-3.5 w-3.5" />
          <span>Đã đạt giới hạn {viewMode === 'week' ? 'tuần' : 'tháng'}</span>
        </div>
      )}
      {isNearLimit && !isAtLimit && (
        <div className="flex items-center gap-1.5 text-xs text-yellow-600 mt-2">
          <Clock className="h-3.5 w-3.5" />
          <span>Gần đạt giới hạn</span>
        </div>
      )}
    </div>
  );
};

