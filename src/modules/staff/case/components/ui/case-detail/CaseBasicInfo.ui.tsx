'use client';

import React from 'react';
import type { CaseData } from '../../../types/case-search';

interface CaseBasicInfoProps {
  caseData: CaseData;
}

export const CaseBasicInfo: React.FC<CaseBasicInfoProps> = ({ caseData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mã hồ sơ
          </label>
          <p className="text-sm text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded-lg">
            {caseData.caseCode}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tên công dân
          </label>
          <p className="text-sm text-gray-900">
            {caseData.guestName}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dịch vụ
          </label>
          <p className="text-sm text-gray-900">
            {caseData.serviceName}
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phương thức nộp hồ sơ
          </label>
          <p className="text-sm text-gray-900">
            {caseData.submissionMethod}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ID Công dân
          </label>
          <p className="text-sm text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded-lg">
            {caseData.guestId}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ID Dịch vụ
          </label>
          <p className="text-sm text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded-lg">
            {caseData.serviceId}
          </p>
        </div>
      </div>
    </div>
  );
};

