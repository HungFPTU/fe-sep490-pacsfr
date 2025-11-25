'use client';

import React from 'react';
import type { CaseSearchFilters as FilterType } from '../../../types/case-search';
import { useCaseStatuses } from '../../../hooks/useCaseStatuses';
import { useServices } from '../../../hooks/useServices';

interface CaseSearchFiltersProps {
  filters: FilterType;
  onFilterChange: (key: keyof FilterType, value: string | number | undefined) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const CaseSearchFilters: React.FC<CaseSearchFiltersProps> = ({
  filters,
  onFilterChange,
  onKeyPress,
}) => {
  const { data: caseStatuses = [] } = useCaseStatuses();
  const { data: services = [] } = useServices();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Case Code */}
      <div>
        <label htmlFor="caseCode" className="block text-sm font-medium text-gray-700 mb-2">
          Mã hồ sơ
        </label>
        <input
          id="caseCode"
          type="text"
          value={filters.caseCode || ''}
          onChange={(e) => onFilterChange('caseCode', e.target.value || undefined)}
          onKeyPress={onKeyPress}
          placeholder="Nhập mã hồ sơ..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
      </div>

      {/* Guest ID */}
      <div>
        <label htmlFor="guestId" className="block text-sm font-medium text-gray-700 mb-2">
          ID Công dân
        </label>
        <input
          id="guestId"
          type="text"
          value={filters.guestId || ''}
          onChange={(e) => onFilterChange('guestId', e.target.value || undefined)}
          onKeyPress={onKeyPress}
          placeholder="Nhập ID công dân..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
      </div>

      {/* Service */}
      <div>
        <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700 mb-2">
          Dịch vụ
        </label>
        <select
          id="serviceId"
          value={filters.serviceId || ''}
          onChange={(e) => onFilterChange('serviceId', e.target.value || undefined)}
          className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Tất cả</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.serviceName}
            </option>
          ))}
        </select>
      </div>

      {/* Case Status */}
      <div>
        <label htmlFor="caseStatus" className="block text-sm font-medium text-gray-700 mb-2">
          Trạng thái
        </label>
        <select
          id="caseStatus"
          value={filters.caseStatus || ''}
          onChange={(e) => onFilterChange('caseStatus', e.target.value || undefined)}
          className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Tất cả</option>
          {caseStatuses.map((status) => (
            <option key={status.code} value={status.code}>
              {status.name}
            </option>
          ))}
        </select>
      </div>

      {/* Staff ID */}
      <div>
        <label htmlFor="staffId" className="block text-sm font-medium text-gray-700 mb-2">
          ID Nhân viên
        </label>
        <input
          id="staffId"
          type="text"
          value={filters.staffId || ''}
          onChange={(e) => onFilterChange('staffId', e.target.value || undefined)}
          onKeyPress={onKeyPress}
          placeholder="Nhập ID nhân viên..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
      </div>


      {/* Page Size */}
      <div>
        <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
          Số lượng/trang
        </label>
        <select
          id="size"
          value={filters.size || 20}
          onChange={(e) => onFilterChange('size', parseInt(e.target.value))}
          className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
  );
};

