'use client';

import React from 'react';

interface CaseLookupErrorProps {
  message?: string;
}

export const CaseLookupError: React.FC<CaseLookupErrorProps> = ({ message }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex">
        <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <div>
          <h4 className="text-sm font-medium text-red-800">Không tìm thấy hồ sơ</h4>
          <p className="text-sm text-red-700 mt-1">
            {message || 'Vui lòng kiểm tra lại mã hồ sơ và thử lại.'}
          </p>
        </div>
      </div>
    </div>
  );
};

