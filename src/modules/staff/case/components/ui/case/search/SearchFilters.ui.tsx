'use client';

import React from 'react';
import type { CaseSearchFilters } from '../../../../types/case-search';

interface SearchFiltersProps {
  filters: CaseSearchFilters;
  onFilterChange: (key: keyof CaseSearchFilters, value: string | number | undefined) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
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

      {/* Priority Level */}
      <div>
        <label htmlFor="priorityLevel" className="block text-sm font-medium text-gray-700 mb-2">
          Mức độ ưu tiên
        </label>
        <select
          id="priorityLevel"
          value={filters.priorityLevel ?? ''}
          onChange={(e) =>
            onFilterChange('priorityLevel', e.target.value ? parseInt(e.target.value) : undefined)
          }
          className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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
          className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Tất cả</option>
          <option value="Mới tiếp nhận">Mới tiếp nhận</option>
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Hoàn thành">Hoàn thành</option>
          <option value="Từ chối">Từ chối</option>
          <option value="Tạm dừng">Tạm dừng</option>
        </select>
      </div>
    </div>
  );
};

