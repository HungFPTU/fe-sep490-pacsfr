'use client';

import React from 'react';
import type { CaseData } from '../../types/case-search';
import { CaseTable, TablePagination } from '../ui/case';

interface PaginationInfo {
  page: number;
  totalPages: number;
  total: number;
  size: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface CaseListViewProps {
  cases: CaseData[];
  isLoading: boolean;
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  onSizeChange?: (size: number) => void;
  onViewDetail?: (caseItem: CaseData) => void;
}

export const CaseListView: React.FC<CaseListViewProps> = ({
  cases,
  isLoading,
  pagination,
  onPageChange,
  onSizeChange,
  onViewDetail,
}) => {
  return (
    <div className="space-y-4">
      {/* Table Header */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Kết quả tìm kiếm</h3>
              <p className="text-sm text-gray-600 mt-1">
                Tìm thấy <span className="font-medium text-blue-600">{pagination.total}</span> hồ sơ
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center px-3 py-1 bg-white rounded-full border border-gray-200">
                <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span className="text-sm text-gray-600">Bảng dữ liệu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="px-6 py-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-sm text-gray-500">Đang tải dữ liệu...</p>
            </div>
          </div>
        ) : cases.length === 0 ? (
          // Empty State
          <div className="px-6 py-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-sm font-medium text-gray-900 mb-1">Không tìm thấy hồ sơ</h3>
              <p className="text-sm text-gray-500">Thử thay đổi bộ lọc tìm kiếm để có kết quả khác</p>
            </div>
          </div>
        ) : (
          // Table with Data
          <CaseTable data={cases} onViewDetail={onViewDetail} />
        )}
      </div>

      {/* Pagination */}
      {!isLoading && cases.length > 0 && (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <TablePagination pagination={pagination} onPageChange={onPageChange} onSizeChange={onSizeChange} />
        </div>
      )}
    </div>
  );
};
