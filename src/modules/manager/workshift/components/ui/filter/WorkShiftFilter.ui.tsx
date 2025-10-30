'use client';

import React from 'react';

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
  return (
    <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-4">
      {/* Keyword */}
      <input
        type="text"
        placeholder="Tìm theo từ khóa…"
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
      />

      {/* Counter */}
      <select
        value={counterId}
        onChange={(e) => onCounterChange(e.target.value)}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
      >
        {counterOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {/* Staff */}
      <select
        value={staffId}
        onChange={(e) => onStaffChange(e.target.value)}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
      >
        {staffOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {/* Shift Type */}
      <select
        value={shiftType}
        onChange={(e) => onShiftTypeChange(e.target.value)}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
      >
        {shiftTypeOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {/* Shift Date */}
      <input
        type="date"
        value={shiftDate}
        onChange={(e) => onShiftDateChange(e.target.value)}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
      />

      {/* From / To Time */}
      <input
        type="time"
        value={fromTime}
        onChange={(e) => onFromTimeChange(e.target.value)}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
      />
      <input
        type="time"
        value={toTime}
        onChange={(e) => onToTimeChange(e.target.value)}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
      />

      {/* Status + Actions */}
      <div className="flex gap-2">
        <select
          value={String(isActive)}
          onChange={(e) => onStatusChange(e.target.value === 'true')}
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        >
          <option value="true">Đang hoạt động</option>
          <option value="false">Ngừng hoạt động</option>
        </select>

        <button
          type="button"
          onClick={onClear}
          className="rounded-lg bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200"
          title="Xóa bộ lọc"
        >
          Xóa
        </button>
      </div>
    </div>
  );
};
