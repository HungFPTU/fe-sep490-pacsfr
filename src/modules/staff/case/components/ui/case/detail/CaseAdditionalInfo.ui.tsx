'use client';

import React from 'react';

interface CaseAdditionalInfoProps {
  estimatedCompletionDate?: string;
  totalFee?: number;
  staffName?: string;
}

export const CaseAdditionalInfo: React.FC<CaseAdditionalInfoProps> = ({
  estimatedCompletionDate,
  totalFee,
  staffName,
}) => {
  if (!estimatedCompletionDate && !totalFee && !staffName) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {estimatedCompletionDate && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <label className="block text-xs font-medium text-blue-700 mb-0.5">
                Dự kiến hoàn thành
              </label>
              <p className="text-sm font-bold text-blue-900">
                {new Date(estimatedCompletionDate).toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      )}

      {totalFee !== undefined && (
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-200">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <label className="block text-xs font-medium text-emerald-700 mb-0.5">Tổng phí</label>
              <p className="text-sm font-bold text-emerald-900">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(totalFee)}
              </p>
            </div>
          </div>
        </div>
      )}

      {staffName && (
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg p-4 border border-violet-200">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <label className="block text-xs font-medium text-violet-700 mb-0.5">
                Nhân viên xử lý
              </label>
              <p className="text-sm font-bold text-violet-900">{staffName}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

