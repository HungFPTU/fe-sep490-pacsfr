'use client';

import React from 'react';
import type { CaseData, CaseDetailResponse } from '../../types/case-search';
import { CaseInfo, CaseMetadata, CaseNotes, CaseReceivers, CaseAdditionalInfo, CaseStepsProgress } from '../ui/case';

interface CaseDetailViewProps {
  caseData: CaseData | CaseDetailResponse;
  onStatusClick?: () => void;
}

export const CaseDetailView: React.FC<CaseDetailViewProps> = ({ caseData, onStatusClick }) => {
  const detailData = caseData as CaseDetailResponse;

  return (
    <div className="space-y-5">
      {/* Main Info Grid - Right column wider */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column - Basic Info (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-gray-200 p-5">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Thông tin cơ bản</h4>
          <CaseInfo
            caseCode={caseData.caseCode}
            guestName={caseData.guestName}
            serviceName={caseData.serviceName}
            priorityLevel={caseData.priorityLevel}
          />
        </div>

        {/* Right Column - Metadata (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-gray-200 p-5">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Thông tin xử lý</h4>
          <CaseMetadata
            caseId={caseData.id}
            caseCode={caseData.caseCode}
            submissionMethod={caseData.submissionMethod}
            isPayment={caseData.isPayment}
            guestId={caseData.guestId}
            serviceId={caseData.serviceId}
            currentStatus={caseData.currentStatus}
            onStatusClick={onStatusClick}
          />
        </div>
      </div>

      {/* Steps Progress */}
      {detailData.steps && (
        <CaseStepsProgress
          caseId={detailData.id}
          currentStatus={detailData.currentStatus}
          steps={detailData.steps}
          currentStep={detailData.currentStep}
        />
      )}

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
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <CaseReceivers receivers={caseData.receivedBy} />
        </div>
      )}
    </div>
  );
};
