'use client';

import React from 'react';
import type { CaseData } from '../../../types/case-search';
import { CasePriorityBadge, CaseStatusBadge, CasePaymentBadge } from '../../../../dashboard/components/ui/shared';

interface CaseTableRowProps {
  caseItem: CaseData;
  index: number;
  onViewDetail?: (caseItem: CaseData) => void;
}

export const CaseTableRow: React.FC<CaseTableRowProps> = ({ 
  caseItem, 
  index,
  onViewDetail 
}) => {
  return (
    <tr 
      className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
    >
      {/* Case Code */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8">
            <div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center">
              <svg className="h-4 w-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="ml-3">
            <div className="text-sm font-mono font-medium text-gray-900">
              {caseItem.caseCode}
            </div>
            <div className="text-xs text-gray-500">
              ID: {caseItem.id.slice(0, 8)}...
            </div>
          </div>
        </div>
      </td>

      {/* Guest Name */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">
                {caseItem.guestName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">
              {caseItem.guestName}
            </div>
          </div>
        </div>
      </td>

      {/* Service Name */}
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900 font-medium">
          {caseItem.serviceName}
        </div>
      </td>

      {/* Priority */}
      <td className="px-6 py-4 whitespace-nowrap">
        <CasePriorityBadge priority={caseItem.priorityLevel} />
      </td>

      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <CaseStatusBadge status={caseItem.currentStatus} />
      </td>

      {/* Payment */}
      <td className="px-2 py-4 whitespace-nowrap">
        <CasePaymentBadge isPaid={caseItem.isPayment} />
      </td>

      {/* Actions */}
      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => onViewDetail?.(caseItem)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 transition-colors"
          >
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Xem chi tiết
          </button>
        </div>
      </td>
    </tr>
  );
};

