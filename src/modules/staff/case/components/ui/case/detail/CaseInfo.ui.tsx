'use client';

import React from 'react';
import { FileText, User, Briefcase, Flag } from 'lucide-react';
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
      {/* Case Code - Highlighted */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
          <FileText className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900 font-mono">{caseCode}</p>
          <p className="text-xs text-gray-500">Mã hồ sơ</p>
        </div>
      </div>

      {/* Info Items */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500">Tên công dân</p>
            <p className="text-sm font-medium text-gray-900 truncate">{guestName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <Briefcase className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500">Dịch vụ</p>
            <p className="text-sm font-medium text-gray-900">{serviceName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <Flag className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500">Mức độ ưu tiên</p>
            <PriorityBadge priority={priorityLevel} variant="dot" />
          </div>
        </div>
      </div>
    </div>
  );
};
