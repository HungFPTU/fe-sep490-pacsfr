'use client';

import React from 'react';

interface CaseSearchEmptyStateProps {
  variant: 'no-search' | 'filter-warning' | 'error';
  message?: string;
}

export const CaseSearchEmptyState: React.FC<CaseSearchEmptyStateProps> = ({ 
  variant, 
  message 
}) => {
  if (variant === 'no-search') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <div className="flex flex-col items-center justify-center">
          <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có kết quả tìm kiếm</h3>
          <p className="text-sm text-gray-500 mb-4">
            Nhập thông tin tìm kiếm và bấm &quot;Tìm kiếm&quot; để xem kết quả
          </p>
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Tip: Bạn có thể tìm kiếm theo mã hồ sơ, tên công dân, hoặc các tiêu chí khác</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'filter-warning') {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-800">Bộ lọc đã thay đổi</h4>
            <p className="text-sm text-blue-700 mt-1">
              Bạn đã thay đổi bộ lọc tìm kiếm. Bấm &quot;Tìm kiếm lại&quot; để áp dụng các thay đổi mới.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'error') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-red-800">Lỗi tìm kiếm</h4>
            <p className="text-sm text-red-700 mt-1">
              {message || 'Có lỗi xảy ra khi tìm kiếm hồ sơ. Vui lòng thử lại.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

