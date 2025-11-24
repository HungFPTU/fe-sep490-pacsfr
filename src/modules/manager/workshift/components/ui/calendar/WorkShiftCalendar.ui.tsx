'use client';

import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { formatDateVN } from '@core/utils/date';
import type { WorkShift } from '../../../types';
import { getShiftTypeColors } from '../../../constants';

interface WorkShiftCalendarProps {
  workShifts: WorkShift[];
  isLoading?: boolean;
  onShiftClick: (shift: WorkShift) => void;
}

export const WorkShiftCalendar: React.FC<WorkShiftCalendarProps> = ({
  workShifts,
  isLoading = false,
  onShiftClick,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get first day of month and number of days
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, etc.

  // Group workshifts by date
  const shiftsByDate = useMemo(() => {
    const map = new Map<string, WorkShift[]>();
    workShifts.forEach((shift) => {
      const dateKey = new Date(shift.shiftDate).toISOString().split('T')[0];
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)!.push(shift);
    });
    return map;
  }, [workShifts]);

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get shifts for a specific date
  const getShiftsForDate = (day: number): WorkShift[] => {
    const date = new Date(year, month, day);
    const dateKey = date.toISOString().split('T')[0];
    return shiftsByDate.get(dateKey) || [];
  };

  // Check if date is today
  const isToday = (day: number): boolean => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const days: Array<{ day: number | null; date: Date | null }> = [];

    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ day: null, date: null });
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ day, date: new Date(year, month, day) });
    }

    return days;
  }, [year, month, daysInMonth, startingDayOfWeek]);

  const monthNames = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ];

  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96 bg-white rounded-lg border border-gray-200">
        <div className="text-gray-500">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm max-w-6xl mx-auto">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-4 h-4 text-indigo-600" />
          <h2 className="text-base font-semibold text-gray-900">
            {monthNames[month]} {year}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousMonth}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Tháng trước"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={goToToday}
            className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Hôm nay
          </button>
          <button
            onClick={goToNextMonth}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Tháng sau"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-3">
        {/* Day names header */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {dayNames.map((dayName, idx) => (
            <div
              key={idx}
              className="text-center text-xs font-semibold text-gray-600 py-1"
            >
              {dayName}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map(({ day, date }, idx) => {
            if (day === null) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="h-32 bg-gray-50 rounded border border-transparent"
                />
              );
            }

            const shifts = getShiftsForDate(day);
            const today = isToday(day);

            return (
              <div
                key={day}
                className={`h-32 border rounded p-1 overflow-y-auto transition-colors ${
                  today
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div
                  className={`text-xs font-medium mb-1 ${
                    today ? 'text-indigo-700' : 'text-gray-700'
                  }`}
                >
                  {day}
                </div>
                <div className="space-y-1">
                  {shifts.map((shift) => {
                    const colors = getShiftTypeColors(shift.shiftType);
                    return (
                      <div
                        key={shift.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onShiftClick(shift);
                        }}
                        className={`text-xs px-1.5 py-1 rounded ${colors.bg} ${colors.text} cursor-pointer ${colors.hover} transition-colors truncate`}
                        title={`${shift.shiftType} - ${shift.startTime} - ${shift.endTime}`}
                      >
                        <div className="font-medium truncate text-xs">{shift.shiftType}</div>
                        <div className={`text-[10px] ${colors.textLight} truncate`}>
                          {shift.startTime} - {shift.endTime}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

