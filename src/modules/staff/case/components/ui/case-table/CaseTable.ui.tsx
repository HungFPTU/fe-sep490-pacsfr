'use client';

import React, { useState } from 'react';
import type { CaseData } from '../../../types/case-search';
import { CaseTableHeader } from './CaseTableHeader.ui';
import { CaseTableRow } from './CaseTableRow.ui';
import { CaseTableEmpty } from './CaseTableEmpty.ui';
import { CaseTablePagination, type PaginationInfo } from './CaseTablePagination.ui';
import type { SortField, SortDirection } from './CaseTableSortButton.ui';

interface CaseTableProps {
  cases: CaseData[];
  isLoading: boolean;
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  onViewDetail?: (caseItem: CaseData) => void;
}

export const CaseTable: React.FC<CaseTableProps> = ({
  cases,
  isLoading,
  pagination,
  onPageChange,
  onViewDetail,
}) => {
  const [sortField, setSortField] = useState<SortField>('caseCode');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700">
            Tìm thấy <span className="text-blue-600">{pagination.total}</span> kết quả
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <CaseTableHeader sortField={sortField} sortDirection={sortDirection} onSort={handleSort} />
          <tbody className="divide-y divide-gray-100">
            {isLoading || cases.length === 0 ? (
              <CaseTableEmpty isLoading={isLoading} />
            ) : (
              cases.map((caseItem, index) => (
                <CaseTableRow key={caseItem.id} caseItem={caseItem} index={index} onViewDetail={onViewDetail} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <CaseTablePagination pagination={pagination} onPageChange={onPageChange} />
    </div>
  );
};
