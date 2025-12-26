'use client';

import React from 'react';
import { Calendar, Banknote, UserCheck } from 'lucide-react';

interface CaseAdditionalInfoProps {
  estimatedCompletionDate?: string;
  totalFee?: number;
  staffName?: string;
}

export const CaseAdditionalInfo: React.FC<CaseAdditionalInfoProps> = ({
  estimatedCompletionDate,
  totalFee,
  staffName,
}) => {
  if (!estimatedCompletionDate && !totalFee && !staffName) return null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {estimatedCompletionDate && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Dự kiến hoàn thành</p>
              <p className="text-sm font-semibold text-gray-900">{formatDate(estimatedCompletionDate)}</p>
            </div>
          </div>
        </div>
      )}

      {totalFee !== undefined && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
              <Banknote className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Tổng phí</p>
              <p className="text-sm font-semibold text-gray-900">{formatCurrency(totalFee)}</p>
            </div>
          </div>
        </div>
      )}

      {staffName && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Nhân viên xử lý</p>
              <p className="text-sm font-semibold text-gray-900">{staffName}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
