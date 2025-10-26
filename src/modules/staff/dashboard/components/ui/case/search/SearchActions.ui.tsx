'use client';

import React from 'react';

interface SearchActionsProps {
  isLoading: boolean;
  hasChanges: boolean;
  searchEnabled: boolean;
  onSearch: () => void;
  onReset: () => void;
}

export const SearchActions: React.FC<SearchActionsProps> = ({
  isLoading,
  hasChanges,
  searchEnabled,
  onSearch,
  onReset,
}) => {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onSearch}
        disabled={isLoading}
        className={`px-6 py-2 text-white rounded-lg transition-colors ${
          hasChanges ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'
        } disabled:bg-gray-400 disabled:cursor-not-allowed`}
      >
        {isLoading ? 'Đang tìm...' : hasChanges ? 'Tìm kiếm lại' : 'Tìm kiếm'}
      </button>

      <button
        onClick={onReset}
        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
      >
        Làm mới
      </button>

      {searchEnabled && !hasChanges && (
        <div className="flex items-center text-sm text-green-600">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Đã tìm kiếm
        </div>
      )}

      {hasChanges && searchEnabled && (
        <div className="flex items-center text-sm text-blue-600">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          Có thay đổi bộ lọc
        </div>
      )}
    </div>
  );
};

