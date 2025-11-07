'use client';

import React from 'react';

interface CaseLookupSearchBarProps {
  caseId: string;
  isLoading: boolean;
  onCaseIdChange: (value: string) => void;
  onSearch: () => void;
  onReset: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const CaseLookupSearchBar: React.FC<CaseLookupSearchBarProps> = ({
  caseId,
  isLoading,
  onCaseIdChange,
  onSearch,
  onReset,
  onKeyPress,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Tra cứu hồ sơ
      </h3>

      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="caseId" className="block text-sm font-medium text-gray-700 mb-2">
            Mã hồ sơ
          </label>
          <input
            id="caseId"
            type="text"
            value={caseId}
            onChange={(e) => onCaseIdChange(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Nhập mã hồ sơ để tra cứu..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div className="flex items-end gap-2">
          <button
            onClick={onSearch}
            disabled={!caseId.trim() || isLoading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Đang tìm...' : 'Tìm kiếm'}
          </button>

          <button
            onClick={onReset}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Làm mới
          </button>
        </div>
      </div>
    </div>
  );
};

