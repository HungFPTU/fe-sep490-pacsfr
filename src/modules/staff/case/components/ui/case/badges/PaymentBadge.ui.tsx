'use client';

import React from 'react';

interface PaymentBadgeProps {
  isPaid: boolean;
  showIcon?: boolean;
}

export const PaymentBadge: React.FC<PaymentBadgeProps> = ({ isPaid, showIcon = false }) => {
  if (showIcon) {
    return isPaid ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Đã thanh toán
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        Chưa thanh toán
      </span>
    );
  }

  return isPaid ? (
    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
      Đã thanh toán
    </span>
  ) : (
    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
      Chưa thanh toán
    </span>
  );
};

