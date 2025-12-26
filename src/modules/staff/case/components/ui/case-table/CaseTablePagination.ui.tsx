'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationInfo {
  page: number;
  totalPages: number;
  total: number;
  size: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface CaseTablePaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}

export const CaseTablePagination: React.FC<CaseTablePaginationProps> = ({ pagination, onPageChange }) => {
  const { page, totalPages, total, size, hasNextPage, hasPreviousPage } = pagination;

  if (totalPages <= 1) return null;

  const pages: number[] = [];
  const maxVisible = 5;
  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  const end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="px-5 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
      <p className="text-sm text-gray-600">
        Hiển thị {(page - 1) * size + 1} - {Math.min(page * size, total)} / {total}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPreviousPage}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`min-w-[32px] h-8 px-2 text-sm font-medium rounded ${
              p === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-200 text-gray-700'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNextPage}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
