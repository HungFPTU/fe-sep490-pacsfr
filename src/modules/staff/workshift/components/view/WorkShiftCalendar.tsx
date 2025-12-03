/**
 * Luxury WorkShift Calendar Component
 * Features modern design with glassmorphism, smooth animations, and scrollable day cells
 */

'use client';

import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';
import type { WorkShift } from '../../types';
import { WorkShiftModel } from '../../models/WorkShift.model';

interface WorkShiftCalendarProps {
  workShifts: WorkShift[];
  isLoading?: boolean;
  onShiftClick?: (shift: WorkShift) => void;
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
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Group workshifts by date using domain models
  const shiftsByDate = useMemo(() => {
    const map = new Map<string, WorkShiftModel[]>();
    workShifts.forEach((shift) => {
      const model = new WorkShiftModel(shift);
      const dateKey = model.shiftDate.toISOString().split('T')[0];
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)!.push(model);
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
  const getShiftsForDate = (day: number): WorkShiftModel[] => {
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
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
  ];

  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  if (isLoading) {
    return (
      <div className="relative h-96 overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-xl">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-50/50 to-purple-50/50" />
        <div className="relative flex h-full items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600/20 border-t-indigo-600" />
            <p className="text-sm font-medium text-gray-600">Đang tải lịch làm việc...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-2xl">
      {/* Calendar Header with glassmorphism */}
      <div className="relative overflow-hidden border-b border-gray-200/50 bg-linear-to-r from-indigo-50 to-purple-50 p-5">
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-white/80 p-2.5 shadow-sm backdrop-blur-sm">
              <CalendarIcon className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {monthNames[month]} {year}
              </h2>
              <p className="text-sm text-gray-600">Lịch làm việc tháng</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousMonth}
              className="rounded-lg bg-white/80 p-2 shadow-sm backdrop-blur-sm transition-all hover:scale-105 hover:bg-white hover:shadow-md"
              aria-label="Tháng trước"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={goToToday}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
            >
              Hôm nay
            </button>
            <button
              onClick={goToNextMonth}
              className="rounded-lg bg-white/80 p-2 shadow-sm backdrop-blur-sm transition-all hover:scale-105 hover:bg-white hover:shadow-md"
              aria-label="Tháng sau"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        {/* Day names header */}
        <div className="mb-3 grid grid-cols-7 gap-2">
          {dayNames.map((dayName, idx) => (
            <div
              key={idx}
              className="text-center text-sm font-bold text-gray-700"
            >
              {dayName}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map(({ day, date }, idx) => {
            if (day === null) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="h-36 rounded-xl bg-gray-50/50"
                />
              );
            }

            const shifts = getShiftsForDate(day);
            const today = isToday(day);

            return (
              <div
                key={day}
                className={`group relative flex flex-col rounded-xl border transition-all duration-300 ${
                  today
                    ? 'border-indigo-400 bg-linear-to-br from-indigo-50 to-purple-50 shadow-lg ring-2 ring-indigo-400/30'
                    : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md'
                }`}
                style={{ height: '180px' }}
              >
                {/* Day number - fixed at top */}
                <div className="shrink-0 p-1.5">
                  <div
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                      today
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-gray-700 group-hover:bg-indigo-50'
                    }`}
                  >
                    {day}
                  </div>
                </div>

                {/* Shifts - scrollable container */}
                <div className="flex-1 overflow-y-auto px-1.5 pb-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-indigo-200 hover:[&::-webkit-scrollbar-thumb]:bg-indigo-400">
                  <div className="space-y-1">
                    {shifts.map((shiftModel) => {
                      const color = shiftModel.getDisplayColor();
                      
                      return (
                        <div
                          key={shiftModel.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onShiftClick?.(shiftModel.toData());
                          }}
                          className={`group/shift relative cursor-pointer overflow-hidden rounded-md px-2 py-1.5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md border ${
                            color === 'indigo'
                              ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold hover:bg-indigo-100'
                              : color === 'amber'
                              ? 'bg-amber-50 border-amber-200 text-amber-700 font-bold hover:bg-amber-100'
                              : color === 'purple'
                              ? 'bg-purple-50 border-purple-200 text-purple-700 font-bold hover:bg-purple-100'
                              : 'bg-gray-50 border-gray-200 text-gray-700 font-bold hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            <div className="flex-1 min-w-0">
                              <div className="truncate text-[11px] font-bold leading-tight">
                                {shiftModel.shiftType}
                              </div>
                              <div className="flex items-center gap-1 text-[10px] opacity-90 leading-tight mt-0.5">
                                <Clock className="h-2.5 w-2.5" />
                                <span className="truncate">{shiftModel.getTimeRange()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
