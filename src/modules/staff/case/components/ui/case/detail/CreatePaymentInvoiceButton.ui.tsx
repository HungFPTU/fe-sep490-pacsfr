'use client';

import React, { useState } from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { useCreatePayment } from '../../../../hooks/useCreatePayment';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { PaymentQRStorage } from '@/core/utils/storage';

interface CreatePaymentInvoiceButtonProps {
  caseId: string;
  isPayment: boolean;
}

export const CreatePaymentInvoiceButton: React.FC<CreatePaymentInvoiceButtonProps> = ({ caseId, isPayment }) => {
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [showQRUploadModal, setShowQRUploadModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'online' | 'direct' | null>(null);
  const createPaymentMutation = useCreatePayment();
  const { addToast } = useGlobalToast();

  if (isPayment) return null; // Don't show button if already paid

  const handlePaymentMethodSelect = (method: 'online' | 'direct') => {
    setSelectedMethod(method);
    
    if (method === 'online') {
      // Check if QR code URL exists
      const qrCodeUrl = PaymentQRStorage.getPaymentQRUrl();
      if (!qrCodeUrl) {
        // Show modal asking to upload QR code
        setShowPaymentMethodModal(false);
        setShowQRUploadModal(true);
      } else {
        // Proceed with online payment
        handleCreateInvoice(method, qrCodeUrl);
      }
    } else {
      // Direct payment - proceed directly
      handleCreateInvoice(method, '');
    }
  };

  const handleCreateInvoice = async (method: 'online' | 'direct', qrCodeUrl: string) => {
    const paymentMethodMap = {
      online: 'Chuyển tiền',
      direct: 'Thanh toán trực tiếp'
    };

    createPaymentMutation.mutate({
      caseId,
      qrCodeUrl: method === 'online' ? qrCodeUrl : '',
      paymentMethod: paymentMethodMap[method],
    });

    setShowPaymentMethodModal(false);
  };



  return (
    <>
      <button
        onClick={() => setShowPaymentMethodModal(true)}
        disabled={createPaymentMutation.isPending}
        className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {createPaymentMutation.isPending ? 'Đang xử lý...' : 'Tạo hóa đơn'}
      </button>

      {/* Payment Method Selection Modal */}
      <BaseModal
        open={showPaymentMethodModal}
        onClose={() => setShowPaymentMethodModal(false)}
        title="Chọn phương thức thanh toán"
        cancelText="Hủy"
        footer={null}
        centered
        size="small"
      >
        <div className="py-4 space-y-3">
          <button
            onClick={() => handlePaymentMethodSelect('online')}
            disabled={createPaymentMutation.isPending}
            className="w-full flex items-start space-x-4 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mt-0.5">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-900">Thanh toán trực tuyến</p>
              <p className="text-xs text-gray-600">Sử dụng mã QR thanh toán</p>
            </div>
          </button>

          <button
            onClick={() => handlePaymentMethodSelect('direct')}
            disabled={createPaymentMutation.isPending}
            className="w-full flex items-start space-x-4 p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mt-0.5">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-900">Thanh toán trực tiếp</p>
              <p className="text-xs text-gray-600">Thanh toán khi khách hàng tới</p>
            </div>
          </button>
        </div>
      </BaseModal>

      {/* QR Code Upload Required Modal */}
      <BaseModal
        open={showQRUploadModal}
        onClose={() => setShowQRUploadModal(false)}
        title="Mã thanh toán chưa được cấu hình"
        okText="Đóng"
        cancelText="Hủy"
        centered
        size="small"
        footer={
          <button
            onClick={() => setShowQRUploadModal(false)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Đóng
          </button>
        }
      >
        <div className="py-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 4v2M7 9h10M7 13h10M7 17h10" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 leading-relaxed">
                Để sử dụng phương thức thanh toán trực tuyến, bạn cần upload mã QR thanh toán trước.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Vui lòng liên hệ người quản lý để cấu hình mã thanh toán.
              </p>
            </div>
          </div>
        </div>
      </BaseModal>
    </>
  );
};
