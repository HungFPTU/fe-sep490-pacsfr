'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SHIFT_TYPE_TIMES, SHIFT_TYPE_DOT_COLORS } from '../../../constants';

interface ShiftTypeOption {
  value: string;
  label: string;
  startTime: string;
  endTime: string;
  dotColor: string;
}

const SHIFT_OPTIONS: ShiftTypeOption[] = [
  {
    value: 'Sáng',
    label: 'Ca Sáng',
    startTime: '07:00',
    endTime: '11:30',
    dotColor: 'bg-green-500',
  },
  {
    value: 'Chiều',
    label: 'Ca Chiều',
    startTime: '13:00',
    endTime: '17:30',
    dotColor: 'bg-yellow-500',
  },
  // {
  //   value: 'Cả ngày',
  //   label: 'Cả Ngày',
  //   startTime: '07:00',
  //   endTime: '17:30',
  //   dotColor: 'bg-blue-500',
  // },
];

interface ShiftTypeSelectProps {
  value?: string;
  onChange: (value: string) => void;
  onTimeChange?: (startTime: string, endTime: string) => void;
  disabled?: boolean;
  placeholder?: string;
  error?: string | null;
  label?: string;
  required?: boolean;
}

export const ShiftTypeSelect: React.FC<ShiftTypeSelectProps> = ({
  value,
  onChange,
  onTimeChange,
  disabled = false,
  placeholder = 'Chọn loại ca làm việc',
  error,
  label,
  required,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = SHIFT_OPTIONS.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option: ShiftTypeOption) => {
    onChange(option.value);
    onTimeChange?.(option.startTime, option.endTime);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="mb-1 inline-block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            w-full rounded-xl border bg-white outline-none transition
            border-slate-300 focus:border-slate-500
            ${error ? 'border-red-400 focus:border-red-500' : ''}
            ${disabled ? 'bg-slate-100 cursor-not-allowed' : 'cursor-pointer'}
            h-10 px-3 text-sm
            flex items-center justify-between
          `}
        >
          <span className="flex items-center gap-2">
            {selectedOption ? (
              <>
                <span className={`w-2 h-2 rounded-full ${selectedOption.dotColor}`}></span>
                <span>
                  {selectedOption.label}: {selectedOption.startTime} - {selectedOption.endTime}
                </span>
              </>
            ) : (
              <span className="text-slate-400">{placeholder}</span>
            )}
          </span>
          <svg
            className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded-xl shadow-lg overflow-hidden">
            {SHIFT_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                className={`
                  w-full px-3 py-2.5 text-left text-sm
                  hover:bg-slate-50 transition-colors
                  flex items-center gap-2
                  ${value === option.value ? 'bg-blue-50' : ''}
                `}
              >
                <span className={`w-2 h-2 rounded-full ${option.dotColor}`}></span>
                <span>
                  {option.label}: {option.startTime} - {option.endTime}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
    </div>
  );
};

