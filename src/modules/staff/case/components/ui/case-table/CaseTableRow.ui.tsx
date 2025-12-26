'use client';

import React from 'react';
import { FileText, Eye } from 'lucide-react';
import type { CaseData } from '../../../types/case-search';
import { CasePriorityBadge, CaseStatusBadge, CasePaymentBadge } from '../../../../dashboard/components/ui/shared';

interface CaseTableRowProps {
  caseItem: CaseData;
  index: number;
  onViewDetail?: (caseItem: CaseData) => void;
}

export const CaseTableRow: React.FC<CaseTableRowProps> = ({ caseItem, index, onViewDetail }) => {
  return (
    <tr className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-mono font-medium text-gray-900">{caseItem.caseCode}</span>
        </div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="text-sm text-gray-900">{caseItem.guestName}</span>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm text-gray-700 line-clamp-1">{caseItem.serviceName}</span>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <CasePriorityBadge priority={caseItem.priorityLevel} />
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <CaseStatusBadge status={caseItem.currentStatus} />
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <CasePaymentBadge isPaid={caseItem.isPayment} />
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <button 
          onClick={() => onViewDetail?.(caseItem)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded text-blue-700 bg-blue-50 hover:bg-blue-100"
        >
          <Eye className="w-3.5 h-3.5" />
          Xem
        </button>
      </td>
    </tr>
  );
};
