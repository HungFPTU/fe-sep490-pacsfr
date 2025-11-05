'use client';

import React from 'react';

interface LookupFormProps {
  caseId: string;
  onCaseIdChange: (value: string) => void;
  onSearch: () => void;
  onReset: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
  error?: Error | null;
}

export const LookupForm: React.FC<LookupFormProps> = ({
  caseId,
  onCaseIdChange,
  onSearch,
  onReset,
  onKeyPress,
  isLoading,
  error,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tra cứu hồ sơ</h3>

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

      {error && (
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
              <h4 className="text-sm font-bold text-red-900">Không tìm thấy hồ sơ</h4>
              <p className="text-sm text-red-700 mt-1">
                Vui lòng kiểm tra lại mã hồ sơ và thử lại.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

