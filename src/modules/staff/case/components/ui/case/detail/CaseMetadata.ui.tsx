'use client';

import React from 'react';
import { PaymentBadge, StatusBadge } from '../badges';
import { PaymentConfirmButton } from './PaymentConfirmButton.ui';

interface CaseMetadataProps {
  caseId: string;
  submissionMethod: string;
  isPayment: boolean;
  guestId: string;
  serviceId: string;
  currentStatus: string;
  onStatusClick?: () => void;
}

export const CaseMetadata: React.FC<CaseMetadataProps> = ({
  caseId,
  submissionMethod,
  isPayment,
  guestId,
  serviceId,
  currentStatus,
  onStatusClick,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-500 mb-0.5">Phương thức nộp hồ sơ</label>
          <p className="text-sm font-medium text-gray-900">{submissionMethod}</p>
        </div>
      </div>

      {/* Status and Update Button */}
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
          <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Trạng thái hồ sơ</label>
          <div className="flex items-center gap-2">
            <StatusBadge status={currentStatus} showIcon />
            {onStatusClick && (
              <div className="relative group">
                <button
                  onClick={onStatusClick}
                  className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <svg 
                    className="w-4 h-4 text-gray-600 group-hover:text-indigo-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                {/* Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-10">
                  Cập nhật trạng thái hồ sơ
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-0.5">Trạng thái thanh toán</label>
            <PaymentBadge isPaid={isPayment} showIcon />
          </div>
        </div>
        
        {!isPayment && (
          <div className="pt-2">
            <PaymentConfirmButton caseId={caseId} isPayment={isPayment} />
          </div>
        )}
      </div>

      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
        <label className="block text-xs font-medium text-gray-500 mb-2">ID Công dân</label>
        <p className="text-xs font-mono text-gray-700 break-all">{guestId}</p>
      </div>

      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
        <label className="block text-xs font-medium text-gray-500 mb-2">ID Dịch vụ</label>
        <p className="text-xs font-mono text-gray-700 break-all">{serviceId}</p>
      </div>
    </div>
  );
};

