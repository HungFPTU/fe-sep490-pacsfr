'use client';

import React from 'react';
import { Send, ClipboardList, Wallet, Pencil } from 'lucide-react';
import { usePaymentBill } from '../../../../hooks/usePaymentBill';
import { PaymentBadge, StatusBadge } from '../badges';
import { PaymentConfirmButton } from './PaymentConfirmButton.ui';
import { PaymentBillInfo } from './PaymentBillInfo.ui';

interface CaseMetadataProps {
  caseId: string;
  caseCode: string;
  submissionMethod: string;
  isPayment: boolean;
  guestId: string;
  serviceId: string;
  currentStatus: string;
  onStatusClick?: () => void;
}

export const CaseMetadata: React.FC<CaseMetadataProps> = ({
  caseId,
  caseCode,
  submissionMethod,
  isPayment,
  guestId,
  serviceId,
  currentStatus,
  onStatusClick,
}) => {
  const { data: bill } = usePaymentBill(caseCode, true);
  
  return (
    <div className="space-y-2">
      {/* Submission Method */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
          <Send className="w-5 h-5 text-slate-600" />
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Phương thức nộp</p>
          <p className="text-sm font-semibold text-slate-800 mt-0.5">{submissionMethod}</p>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
          <ClipboardList className="w-5 h-5 text-indigo-600" />
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1.5">Trạng thái hồ sơ</p>
          <div className="flex items-center gap-2">
            <StatusBadge status={currentStatus} showIcon />
            {onStatusClick && (
              <button
                onClick={onStatusClick}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-100 transition-colors group"
                title="Cập nhật trạng thái"
              >
                <Pencil className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-600" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Payment Status */}
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 flex items-center justify-center shrink-0 ${isPayment ? 'bg-white' : 'bg-white'}`}>
          <Wallet className={`w-5 h-5 ${isPayment ? 'text-emerald-600' : 'text-amber-600'}`} />
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1.5">Thanh toán</p>
          <PaymentBadge isPaid={isPayment} showIcon />
          
          {/* Payment Actions */}
          {!isPayment && !bill && (
            <div className="mt-3">
              <PaymentConfirmButton caseId={caseId} isPayment={isPayment} hasBill={false} />
            </div>
          )}

          {bill && !isPayment && (
            <div className="mt-3 space-y-3 p-3 bg-white rounded-lg">
              <PaymentBillInfo caseCode={caseCode} caseId={caseId} />
              <PaymentConfirmButton caseId={caseId} isPayment={false} hasBill={true} hasBillUrl={!!bill.billUrl} />
            </div>
          )}

          {isPayment && bill && (
            <div className="mt-3 p-3 bg-white rounded-lg">
              <PaymentBillInfo caseCode={caseCode} caseId={caseId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
