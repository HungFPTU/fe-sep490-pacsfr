'use client';

import React from 'react';
import { CaseTableSortButton, type SortField, type SortDirection } from './CaseTableSortButton.ui';

interface CaseTableHeaderProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export const CaseTableHeader: React.FC<CaseTableHeaderProps> = ({
  sortField,
  sortDirection,
  onSort,
}) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <CaseTableSortButton
            field="caseCode"
            currentSortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
          >
            Mã hồ sơ
          </CaseTableSortButton>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <CaseTableSortButton
            field="guestName"
            currentSortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
          >
            Tên công dân
          </CaseTableSortButton>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <CaseTableSortButton
            field="serviceName"
            currentSortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
          >
            Dịch vụ
          </CaseTableSortButton>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <CaseTableSortButton
            field="priorityLevel"
            currentSortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
          >
            Mức độ ưu tiên
          </CaseTableSortButton>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <CaseTableSortButton
            field="currentStatus"
            currentSortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
          >
            Trạng thái
          </CaseTableSortButton>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Thanh toán
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Thao tác
        </th>
      </tr>
    </thead>
  );
};

