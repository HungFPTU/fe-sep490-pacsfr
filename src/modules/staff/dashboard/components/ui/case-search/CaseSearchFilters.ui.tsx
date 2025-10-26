'use client';

import React from 'react';
import type { CaseSearchFilters as FilterType } from '../../../types/case-search';

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

      {/* Service ID */}
      <div>
        <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700 mb-2">
          ID Dịch vụ
        </label>
        <input
          id="serviceId"
          type="text"
          value={filters.serviceId || ''}
          onChange={(e) => onFilterChange('serviceId', e.target.value || undefined)}
          onKeyPress={onKeyPress}
          placeholder="Nhập ID dịch vụ..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
      </div>

      {/* Priority Level */}
      <div>
        <label htmlFor="priorityLevel" className="block text-sm font-medium text-gray-700 mb-2">
          Mức độ ưu tiên
        </label>
        <select
          id="priorityLevel"
          value={filters.priorityLevel ?? ''}
          onChange={(e) => onFilterChange('priorityLevel', e.target.value ? parseInt(e.target.value) : undefined)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        >
          <option value="">Tất cả</option>
          <option value="0">Bình thường</option>
          <option value="1">Ưu tiên</option>
          <option value="2">Khẩn cấp</option>
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        >
          <option value="">Tất cả</option>
          <option value="Mới tiếp nhận">Mới tiếp nhận</option>
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Hoàn thành">Hoàn thành</option>
          <option value="Từ chối">Từ chối</option>
          <option value="Tạm dừng">Tạm dừng</option>
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

      {/* From Date */}
      <div>
        <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 mb-2">
          Từ ngày
        </label>
        <input
          id="fromDate"
          type="datetime-local"
          value={filters.fromDate || ''}
          onChange={(e) => onFilterChange('fromDate', e.target.value || undefined)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
      </div>

      {/* To Date */}
      <div>
        <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 mb-2">
          Đến ngày
        </label>
        <input
          id="toDate"
          type="datetime-local"
          value={filters.toDate || ''}
          onChange={(e) => onFilterChange('toDate', e.target.value || undefined)}
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
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

