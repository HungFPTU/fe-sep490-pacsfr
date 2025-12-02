'use client';

import React, { useState } from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { useConfirmPayment } from '../../../../hooks/useConfirmPayment';

interface PaymentConfirmButtonProps {
  caseId: string;
  isPayment: boolean;
  hasBill?: boolean;
  hasBillUrl?: boolean;
}

export const PaymentConfirmButton: React.FC<PaymentConfirmButtonProps> = ({ caseId, isPayment, hasBill = true, hasBillUrl = true }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const confirmPaymentMutation = useConfirmPayment();

  if (isPayment) return null; // Don't show button if already paid
  
  const isDisabled = (!hasBill || !hasBillUrl) || confirmPaymentMutation.isPending;

  const handleConfirm = async () => {
    confirmPaymentMutation.mutate(caseId);
    setShowConfirm(false);
  };

  return (
    <>
      <div className="relative group">
        <button
          onClick={() => setShowConfirm(true)}
          disabled={isDisabled}
          className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {confirmPaymentMutation.isPending ? 'Đang xử lý...' : 'Xác nhận thanh toán'}
        </button>
        
        {/* Tooltip for disabled state */}
        {(!hasBill || !hasBillUrl) && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-10">
            Hồ sơ chưa đủ điều kiện xác nhận thanh toán
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <BaseModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Xác nhận thanh toán"
        onOk={handleConfirm}
        onCancel={() => setShowConfirm(false)}
        okText={confirmPaymentMutation.isPending ? 'Đang xử lý...' : 'Xác nhận'}
        cancelText="Hủy"
        centered
        size="small"
        confirmLoading={confirmPaymentMutation.isPending}
      >
        <div className="py-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-1.964-1.333-2.732 0L3.732 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 leading-relaxed">
                Bạn có chắc chắn muốn xác nhận hồ sơ này đã thanh toán?
              </p>
              <p className="text-sm text-red-600 mt-2 font-medium">
                ⚠️ Hành động này không thể hoàn tác.
              </p>
            </div>
          </div>
        </div>
      </BaseModal>
    </>
  );
};

