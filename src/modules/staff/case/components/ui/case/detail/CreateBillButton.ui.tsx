'use client';

import React, { useState } from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { useCreateBill } from '../../../../hooks/useCreateBill';
import { PaymentQRStorage } from '@/core/utils/storage';
import { PaymentMethod } from '../../../../types/payment';
import { useGlobalToast } from '@core/patterns/SingletonHook';

interface CreateBillButtonProps {
  caseId: string;
  isPayment: boolean;
}

export const CreateBillButton: React.FC<CreateBillButtonProps> = ({ caseId, isPayment }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>(PaymentMethod.DIRECT);
  const [billUrl, setBillUrl] = useState<string | null>(null);
  const createBillMutation = useCreateBill();
  const { addToast } = useGlobalToast();

  if (isPayment) return null; // Don't show button if already paid

  const handleCreateBill = async () => {
    // Get QR code URL from storage
    const qrCodeUrl = PaymentQRStorage.getPaymentQRUrl();
    
    if (!qrCodeUrl) {
      addToast({
        message: 'Vui lòng upload mã QR thanh toán trước!',
        type: 'error'
      });
      setShowModal(false);
      return;
    }

    createBillMutation.mutate(
      {
        caseId,
        qrCodeUrl,
        paymentMethod: selectedMethod
      },
      {
        onSuccess: (response) => {
          if (response.success && response.data?.billUrl) {
            setBillUrl(response.data.billUrl);
          }
          setShowModal(false);
        }
      }
    );
  };

  const handleViewBill = () => {
    if (billUrl) {
      window.open(billUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={createBillMutation.isPending}
        className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md mb-2"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {createBillMutation.isPending ? 'Đang tạo...' : 'Tạo hóa đơn'}
      </button>

      {/* View Bill Button */}
      {billUrl && (
        <button
          onClick={handleViewBill}
          className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all shadow-sm hover:shadow-md mb-2"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Xem hóa đơn
        </button>
      )}

      {/* Create Bill Modal */}
      <BaseModal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Tạo hóa đơn thanh toán"
        onOk={handleCreateBill}
        onCancel={() => setShowModal(false)}
        okText={createBillMutation.isPending ? 'Đang tạo...' : 'Tạo hóa đơn'}
        cancelText="Hủy"
        centered
        size="medium"
        confirmLoading={createBillMutation.isPending}
      >
        <div className="py-4 space-y-4">
          {/* Payment Method Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Phương thức thanh toán <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              {/* Direct Payment */}
              <label className="relative flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={PaymentMethod.DIRECT}
                  checked={selectedMethod === PaymentMethod.DIRECT}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 mt-0.5"
                />
                <div className="ml-3 flex-1">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-900">{PaymentMethod.DIRECT}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Thanh toán bằng tiền mặt tại quầy
                  </p>
                </div>
              </label>

              {/* Online Payment */}
              <label className="relative flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={PaymentMethod.ONLINE}
                  checked={selectedMethod === PaymentMethod.ONLINE}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 mt-0.5"
                />
                <div className="ml-3 flex-1">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-900">{PaymentMethod.ONLINE}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Thanh toán qua QR code hoặc chuyển khoản
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Info Message */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-blue-900">Lưu ý</p>
                <p className="text-xs text-blue-700 mt-1">
                  Hóa đơn sẽ được tạo tự động với mã QR thanh toán đã lưu trong hệ thống.
                </p>
              </div>
            </div>
          </div>
        </div>
      </BaseModal>
    </>
  );
};
