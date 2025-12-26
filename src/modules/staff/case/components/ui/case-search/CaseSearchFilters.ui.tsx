'use client';

import React, { useState } from 'react';
import { Search, RotateCcw, AlertCircle } from 'lucide-react';
import type { CaseSearchFilters as FilterType } from '../../../types/case-search';
import { useCaseStatuses } from '../../../hooks/useCaseStatuses';
import { useServices } from '../../../hooks/useServices';

interface CaseSearchFiltersProps {
  filters: FilterType;
  onFilterChange: (key: keyof FilterType, value: string | number | undefined) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onSearch: () => void;
  onReset: () => void;
  isLoading?: boolean;
}

export const CaseSearchFilters: React.FC<CaseSearchFiltersProps> = ({
  filters,
  onFilterChange,
  onKeyPress,
  onSearch,
  onReset,
  isLoading = false,
}) => {
  const { data: caseStatuses = [] } = useCaseStatuses();
  const { data: services = [] } = useServices();
  const [dateError, setDateError] = useState<string | null>(null);

  // Validate dates
  const validateDates = (from?: string, to?: string): string | null => {
    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      if (fromDate > toDate) {
        return 'Ngày bắt đầu không thể lớn hơn ngày kết thúc';
      }
    }
    return null;
  };

  const handleFromDateChange = (value: string) => {
    onFilterChange('fromDate', value || undefined);
    const error = validateDates(value, filters.toDate);
    setDateError(error);
  };

  const handleToDateChange = (value: string) => {
    onFilterChange('toDate', value || undefined);
    const error = validateDates(filters.fromDate, value);
    setDateError(error);
  };

  const handleSearch = () => {
    if (dateError) return;
    onSearch();
  };

  const handleReset = () => {
    setDateError(null);
    onReset();
  };

  const inputClass = "w-full h-9 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500";
  const labelClass = "block text-xs font-medium text-gray-600 mb-1.5";

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Single row filters */}
      <div className="flex flex-wrap items-end gap-3">
        {/* Case Code */}
        <div className="w-45">
          <label className={labelClass}>Mã hồ sơ</label>
          <input
            type="text"
            value={filters.caseCode || ''}
            onChange={(e) => onFilterChange('caseCode', e.target.value || undefined)}
            onKeyPress={onKeyPress}
            placeholder="Nhập mã hồ sơ..."
            className={inputClass}
          />
        </div>

        {/* Guest Name */}
        <div className="w-45">
          <label className={labelClass}>Tên công dân</label>
          <input
            type="text"
            value={filters.guestName || ''}
            onChange={(e) => onFilterChange('guestName', e.target.value || undefined)}
            onKeyPress={onKeyPress}
            placeholder="Nhập tên công dân..."
            className={inputClass}
          />
        </div>

        {/* Service */}
        <div className="w-48">
          <label className={labelClass}>Dịch vụ</label>
          <select
            value={filters.serviceId || ''}
            onChange={(e) => onFilterChange('serviceId', e.target.value || undefined)}
            className={`${inputClass} bg-white`}
          >
            <option value="">Tất cả dịch vụ</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>{service.serviceName}</option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="w-32">
          <label className={labelClass}>Trạng thái</label>
          <select
            value={filters.caseStatus || ''}
            onChange={(e) => onFilterChange('caseStatus', e.target.value || undefined)}
            className={`${inputClass} bg-white`}
          >
            <option value="">Tất cả</option>
            {caseStatuses.map((status) => (
              <option key={status.code} value={status.code}>{status.name}</option>
            ))}
          </select>
        </div>

        {/* From Date */}
        <div className="w-36">
          <label className={labelClass}>Từ ngày</label>
          <input
            type="date"
            value={filters.fromDate || ''}
            onChange={(e) => handleFromDateChange(e.target.value)}
            max={filters.toDate || undefined}
            className={`${inputClass} ${dateError ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
        </div>

        {/* To Date */}
        <div className="w-36">
          <label className={labelClass}>Đến ngày</label>
          <input
            type="date"
            value={filters.toDate || ''}
            onChange={(e) => handleToDateChange(e.target.value)}
            min={filters.fromDate || undefined}
            className={`${inputClass} ${dateError ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSearch}
            disabled={isLoading || !!dateError}
            className="inline-flex items-center gap-2 h-9 px-4 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Search className="h-4 w-4" />
            {isLoading ? 'Đang tìm...' : 'Tìm kiếm'}
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 h-9 px-3 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50"
          >
            <RotateCcw className="h-4 w-4" />
            Làm mới
          </button>
        </div>
      </div>

      {/* Date validation error */}
      {dateError && (
        <div className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          {dateError}
        </div>
      )}
    </div>
  );
};
