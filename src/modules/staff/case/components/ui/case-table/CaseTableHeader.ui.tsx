'use client';

import React from 'react';
import { CaseTableSortButton, type SortField, type SortDirection } from './CaseTableSortButton.ui';

interface CaseTableHeaderProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export const CaseTableHeader: React.FC<CaseTableHeaderProps> = ({ sortField, sortDirection, onSort }) => {
  const thClass = "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  
  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        <th className={thClass}>
          <CaseTableSortButton field="caseCode" currentSortField={sortField} sortDirection={sortDirection} onSort={onSort}>
            Mã hồ sơ
          </CaseTableSortButton>
        </th>
        <th className={thClass}>
          <CaseTableSortButton field="guestName" currentSortField={sortField} sortDirection={sortDirection} onSort={onSort}>
            Công dân
          </CaseTableSortButton>
        </th>
        <th className={thClass}>
          <CaseTableSortButton field="serviceName" currentSortField={sortField} sortDirection={sortDirection} onSort={onSort}>
            Dịch vụ
          </CaseTableSortButton>
        </th>
        <th className={thClass}>
          <CaseTableSortButton field="priorityLevel" currentSortField={sortField} sortDirection={sortDirection} onSort={onSort}>
            Ưu tiên
          </CaseTableSortButton>
        </th>
        <th className={thClass}>
          <CaseTableSortButton field="currentStatus" currentSortField={sortField} sortDirection={sortDirection} onSort={onSort}>
            Trạng thái
          </CaseTableSortButton>
        </th>
        <th className={thClass}>Thanh toán</th>
        <th className={thClass}>Thao tác</th>
      </tr>
    </thead>
  );
};
