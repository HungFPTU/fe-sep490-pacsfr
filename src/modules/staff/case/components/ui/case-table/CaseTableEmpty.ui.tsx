'use client';

import React from 'react';

interface CaseTableEmptyProps {
  isLoading: boolean;
}

export const CaseTableEmpty: React.FC<CaseTableEmptyProps> = ({ isLoading }) => {
  if (isLoading) {
    return (
      <tr>
        <td colSpan={8} className="px-6 py-12 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mb-4"></div>
            <p className="text-sm text-gray-500">Đang tải dữ liệu...</p>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td colSpan={8} className="px-6 py-12 text-center">
        <div className="flex flex-col items-center justify-center">
          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-sm font-medium text-gray-900 mb-1">Không tìm thấy hồ sơ</h3>
          <p className="text-sm text-gray-500">Thử thay đổi bộ lọc tìm kiếm để có kết quả khác</p>
        </div>
      </td>
    </tr>
  );
};

