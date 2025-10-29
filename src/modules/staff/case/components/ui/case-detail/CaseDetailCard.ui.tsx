'use client';

import React from 'react';
import type { CaseData } from '../../../types/case-search';
import { CasePriorityBadge, CaseStatusBadge, CasePaymentBadge } from '../../../../dashboard/components/ui/shared';
import { CaseBasicInfo } from './CaseBasicInfo.ui';
import { CaseNotes } from './CaseNotes.ui';
import { CaseReceiverList } from './CaseReceiverList.ui';

interface CaseDetailCardProps {
  caseData: CaseData;
}

export const CaseDetailCard: React.FC<CaseDetailCardProps> = ({ caseData }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Thông tin hồ sơ
        </h3>
        <CaseStatusBadge status={caseData.currentStatus} variant="compact" />
      </div>

      {/* Basic Info */}
      <CaseBasicInfo caseData={caseData} />

      {/* Priority and Payment - Additional Info Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mức độ ưu tiên
          </label>
          <div className="mt-1">
            <CasePriorityBadge priority={caseData.priorityLevel} variant="compact" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trạng thái thanh toán
          </label>
          <div className="mt-1">
            <CasePaymentBadge isPaid={caseData.isPayment} variant="compact" />
          </div>
        </div>
      </div>

      {/* Notes */}
      <CaseNotes notes={caseData.notes} />

      {/* Receivers */}
      <CaseReceiverList receivers={caseData.receivedBy} />
    </div>
  );
};

