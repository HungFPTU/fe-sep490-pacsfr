'use client';

import React from 'react';
import { PriorityBadge } from '../badges';

interface CaseInfoProps {
  caseCode: string;
  guestName: string;
  serviceName: string;
  priorityLevel: number;
}

export const CaseInfo: React.FC<CaseInfoProps> = ({
  caseCode,
  guestName,
  serviceName,
  priorityLevel,
}) => {
  return (
    <div className="space-y-4">
      <div className="pb-3 border-b border-gray-200">
        {/* Case Code */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{caseCode}</h3>
            <p className="text-xs text-gray-500">Mã hồ sơ</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-0.5">Tên công dân</label>
            <p className="text-sm font-medium text-gray-900">{guestName}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mt-0.5">
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-0.5">Dịch vụ</label>
            <p className="text-sm font-medium text-gray-900">{serviceName}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-1.964-1.333-2.732 0L3.732 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-0.5">Mức độ ưu tiên</label>
            <PriorityBadge priority={priorityLevel} variant="dot" />
          </div>
        </div>
      </div>
    </div>
  );
};

