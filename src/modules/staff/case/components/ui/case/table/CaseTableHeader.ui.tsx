'use client';

import React from 'react';
import { TableSortButton } from './TableSortButton.ui';

interface CaseTableHeaderProps {
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
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
          <TableSortButton
            field="caseCode"
            currentSortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
          >
            Mã hồ sơ
          </TableSortButton>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <TableSortButton
            field="guestName"
            currentSortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
          >
            Tên công dân
          </TableSortButton>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <TableSortButton
            field="serviceName"
            currentSortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
          >
            Dịch vụ
          </TableSortButton>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <TableSortButton
            field="priorityLevel"
            currentSortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
          >
            Mức độ ưu tiên
          </TableSortButton>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <TableSortButton
            field="currentStatus"
            currentSortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
          >
            Trạng thái
          </TableSortButton>
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

