'use client';

import React from 'react';
import { ManagerFilterBar } from '@/shared/components/manager/ui';
import { cn } from '@/shared/lib/utils';

type Opt = { value: string; label: string };

interface Props {
  // text
  keyword: string;
  onKeywordChange: (keyword: string) => void;

  // status
  isActive: boolean;
  onStatusChange: (isActive: boolean) => void;

  // counter
  counterId: string;
  onCounterChange: (id: string) => void;
  counterOptions: Opt[];

  // staff
  staffId: string;
  onStaffChange: (id: string) => void;
  staffOptions: Opt[];

  // shift type
  shiftType: string;
  onShiftTypeChange: (t: string) => void;
  shiftTypeOptions: Opt[];

  // date & time
  shiftDate: string; // YYYY-MM-DD
  onShiftDateChange: (v: string) => void;
  fromTime: string; // HH:mm
  onFromTimeChange: (v: string) => void;
  toTime: string; // HH:mm
  onToTimeChange: (v: string) => void;

  // utility
  onClear: () => void;
}

export const WorkShiftFilter: React.FC<Props> = ({
  keyword,
  onKeywordChange,
  isActive,
  onStatusChange,
  counterId,
  onCounterChange,
  counterOptions,
  staffId,
  onStaffChange,
  staffOptions,
  shiftType,
  onShiftTypeChange,
  shiftTypeOptions,
  shiftDate,
  onShiftDateChange,
  fromTime,
  onFromTimeChange,
  toTime,
  onToTimeChange,
  onClear,
}) => {
  const inputClass =
    'flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <div className="mb-4 space-y-3">
      <ManagerFilterBar
        searchValue={keyword}
        onSearchChange={(value: string) => onKeywordChange(value)}
        onSubmit={() => onKeywordChange(keyword)}
        onReset={onClear}
        searchPlaceholder="Tìm theo từ khóa…"
      >
        <div className="w-full shrink-0 sm:w-[200px]">
          <select
            value={counterId}
            onChange={(e) => onCounterChange(e.target.value)}
            className={inputClass}
          >
            {counterOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full shrink-0 sm:w-[200px]">
          <select
            value={staffId}
            onChange={(e) => onStaffChange(e.target.value)}
            className={inputClass}
          >
            {staffOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full shrink-0 sm:w-[180px]">
          <select
            value={shiftType}
            onChange={(e) => onShiftTypeChange(e.target.value)}
            className={inputClass}
          >
            {shiftTypeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full shrink-0 sm:w-[180px]">
          <select
            value={String(isActive)}
            onChange={(e) => onStatusChange(e.target.value === 'true')}
            className={inputClass}
          >
            <option value="true">Đang hoạt động</option>
            <option value="false">Ngừng hoạt động</option>
          </select>
        </div>

        <div className="w-full shrink-0 sm:w-[180px]">
          <input
            type="date"
            value={shiftDate}
            onChange={(e) => onShiftDateChange(e.target.value)}
            className={cn(inputClass, 'px-2')}
          />
        </div>

        <div className="flex w-full shrink-0 items-center gap-2 sm:w-[220px]">
          <input
            type="time"
            value={fromTime}
            onChange={(e) => onFromTimeChange(e.target.value)}
            className={cn(inputClass, 'px-2')}
          />
          <input
            type="time"
            value={toTime}
            onChange={(e) => onToTimeChange(e.target.value)}
            className={cn(inputClass, 'px-2')}
          />
        </div>
      </ManagerFilterBar>
    </div>
  );
};
