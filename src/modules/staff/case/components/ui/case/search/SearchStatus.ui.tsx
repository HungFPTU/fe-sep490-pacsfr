'use client';

import React from 'react';

interface SearchStatusProps {
  error?: Error | null;
  hasChanges: boolean;
  searchEnabled: boolean;
}

export const SearchStatus: React.FC<SearchStatusProps> = ({ error, hasChanges, searchEnabled }) => {
  if (error) {
    return (
      <div className="mt-4 bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 rounded-lg p-4 shadow-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-1.964-1.333-2.732 0L3.732 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <h4 className="text-sm font-bold text-red-900">Lỗi tìm kiếm</h4>
            <p className="text-sm text-red-700 mt-1">
              Có lỗi xảy ra khi tìm kiếm hồ sơ. Vui lòng thử lại.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (hasChanges && searchEnabled) {
    return (
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
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

  return null;
};

