'use client';

import React from 'react';

interface PriorityBadgeProps {
  priority: number;
  variant?: 'default' | 'dot';
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, variant = 'default' }) => {
  const configs = {
    0: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-800',
      dot: 'bg-emerald-400',
      label: 'Bình thường',
    },
    1: {
      bg: 'bg-amber-100',
      text: 'text-amber-800',
      dot: 'bg-amber-400',
      label: 'Ưu tiên',
    },
    2: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      dot: 'bg-red-400',
      label: 'Khẩn cấp',
    },
  };

  const config = configs[priority as keyof typeof configs] || {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    dot: 'bg-gray-400',
    label: 'Không xác định',
  };

  if (variant === 'dot') {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <div className={`w-1.5 h-1.5 ${config.dot} rounded-full mr-1.5`}></div>
        {config.label}
      </span>
    );
  }

  return (
    <span className={`px-2 py-1 text-xs font-medium ${config.bg} ${config.text} rounded-full`}>
      {config.label}
    </span>
  );
};

