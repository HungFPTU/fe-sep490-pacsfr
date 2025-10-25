'use client';

import React from 'react';

export const EmptySearchState: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
      <div className="flex flex-col items-center justify-center">
        <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có kết quả tìm kiếm</h3>
        <p className="text-sm text-gray-500 mb-4">
          Nhập thông tin tìm kiếm và bấm &quot;Tìm kiếm&quot; để xem kết quả
        </p>
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Tip: Bạn có thể tìm kiếm theo mã hồ sơ, tên công dân, hoặc các tiêu chí khác</span>
        </div>
      </div>
    </div>
  );
};

