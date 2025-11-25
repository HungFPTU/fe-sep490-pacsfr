'use client';

import React from 'react';
import { usePaymentBill } from '../../../../hooks/usePaymentBill';
import { formatDateTimeVN } from '@core/utils/date';

interface PaymentBillInfoProps {
  caseCode: string;
}

export const PaymentBillInfo: React.FC<PaymentBillInfoProps> = ({ caseCode }) => {
  const { data: bill, isLoading } = usePaymentBill(caseCode, true);

  if (!bill) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
        <div className="space-y-3">
          {/* Bill Code */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-0.5">Mã hóa đơn</label>
              <p className="text-sm font-semibold text-gray-900">{bill.billCode}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-0.5">Phương thức thanh toán</label>
              <p className="text-sm font-medium text-gray-900">{bill.paymentMethod}</p>
            </div>
          </div>

          {/* Created Date */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mt-0.5">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-0.5">Ngày thanh toán</label>
              <p className="text-sm font-medium text-gray-900">{formatDateTimeVN(bill.createdAt)}</p>
            </div>
          </div>

          {/* Download Bill Button */}
          {bill.billUrl && (
            <div className="pt-2">
              <a
                href={bill.billUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Tải hóa đơn
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
