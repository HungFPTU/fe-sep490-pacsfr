'use client';

import React from 'react';

interface StatusBadgeProps {
  status: string;
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, showIcon = false }) => {
  const statusConfig: Record<string, { bg: string; text: string; icon: string }> = {
    'Mới tiếp nhận': {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    'Đang xử lý': {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    'Hoàn thành': {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    'Từ chối': {
      bg: 'bg-red-100',
      text: 'text-red-800',
      icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    'Tạm dừng': {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      icon: 'M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  };

  const config = statusConfig[status] || statusConfig['Tạm dừng'];

  if (showIcon) {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={config.icon} />
        </svg>
        {status}
      </span>
    );
  }

  return (
    <span className={`px-2 py-1 text-xs font-medium ${config.bg} ${config.text} rounded-full`}>
      {status}
    </span>
  );
};

