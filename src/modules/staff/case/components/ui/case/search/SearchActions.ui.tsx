'use client';

import React from 'react';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

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
        className="px-5 py-2 text-white rounded-lg transition-colors bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Đang tìm...' : hasChanges ? 'Tìm kiếm lại' : 'Tìm kiếm'}
      </button>

      <button
        onClick={onReset}
        className="px-5 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
      >
        Làm mới
      </button>

      {searchEnabled && !hasChanges && (
        <div className="flex items-center text-sm text-green-600">
          <CheckCircleIcon className="w-4 h-4 mr-1" />
          Đã tìm kiếm
        </div>
      )}

      {hasChanges && searchEnabled && (
        <div className="flex items-center text-sm text-amber-600">
          <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
          Có thay đổi bộ lọc
        </div>
      )}
    </div>
  );
};
