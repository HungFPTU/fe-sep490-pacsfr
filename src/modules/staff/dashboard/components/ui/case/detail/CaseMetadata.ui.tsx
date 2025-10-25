'use client';

import React from 'react';
import { PaymentBadge } from '../badges';
import { PaymentConfirmButton } from './PaymentConfirmButton.ui';

interface CaseMetadataProps {
  caseId: string;
  submissionMethod: string;
  isPayment: boolean;
  guestId: string;
  serviceId: string;
}

export const CaseMetadata: React.FC<CaseMetadataProps> = ({
  caseId,
  submissionMethod,
  isPayment,
  guestId,
  serviceId,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-500 mb-0.5">Phương thức nộp hồ sơ</label>
          <p className="text-sm font-medium text-gray-900">{submissionMethod}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

