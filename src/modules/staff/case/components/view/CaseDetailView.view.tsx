'use client';

import React from 'react';
import type { CaseData, CaseDetailResponse } from '../../types/case-search';
import { CaseInfo, CaseMetadata, CaseNotes, CaseReceivers, CaseAdditionalInfo } from '../ui/case';

interface CaseDetailViewProps {
  caseData: CaseData | CaseDetailResponse;
  onStatusClick?: () => void;
}

export const CaseDetailView: React.FC<CaseDetailViewProps> = ({ caseData, onStatusClick }) => {
  const detailData = caseData as CaseDetailResponse;
  
  return (
    <div className="space-y-6">
      {/* Main Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Basic Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <CaseInfo
            caseCode={caseData.caseCode}
            guestName={caseData.guestName}
            serviceName={caseData.serviceName}
            priorityLevel={caseData.priorityLevel}
          />
        </div>

        {/* Right Column - Metadata */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <CaseMetadata
            caseId={caseData.id}
            submissionMethod={caseData.submissionMethod}
            isPayment={caseData.isPayment}
            guestId={caseData.guestId}
            serviceId={caseData.serviceId}
            currentStatus={caseData.currentStatus}
            onStatusClick={onStatusClick}
          />
        </div>
      </div>

      {/* Additional Info Cards */}
      {(detailData.estimatedCompletionDate || detailData.totalFee || detailData.staffName) && (
        <CaseAdditionalInfo
          estimatedCompletionDate={detailData.estimatedCompletionDate}
          totalFee={detailData.totalFee}
          staffName={detailData.staffName}
        />
      )}

      {/* Notes */}
      {caseData.notes && <CaseNotes notes={caseData.notes} />}

      {/* Receivers */}
      {caseData.receivedBy?.$values && caseData.receivedBy.$values.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <CaseReceivers receivers={caseData.receivedBy} />
        </div>
      )}
    </div>
  );
};

