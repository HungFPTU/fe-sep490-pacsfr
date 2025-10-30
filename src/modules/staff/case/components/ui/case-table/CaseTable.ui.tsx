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
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Kết quả tìm kiếm
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Tìm thấy <span className="font-medium text-red-600">{pagination.total}</span> hồ sơ
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center px-3 py-1 bg-white rounded-full border border-gray-200">
              <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-sm text-gray-600">Bảng dữ liệu</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <CaseTableHeader
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading || cases.length === 0 ? (
              <CaseTableEmpty isLoading={isLoading} />
            ) : (
              cases.map((caseItem, index) => (
                <CaseTableRow
                  key={caseItem.id}
                  caseItem={caseItem}
                  index={index}
                  onViewDetail={onViewDetail}
                />
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

