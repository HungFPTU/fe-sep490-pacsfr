'use client';

import React from 'react';

interface CasePriorityBadgeProps {
  priority: number;
  variant?: 'default' | 'compact';
}

export const CasePriorityBadge: React.FC<CasePriorityBadgeProps> = ({ 
  priority, 
  variant = 'default' 
}) => {
  const isCompact = variant === 'compact';
  
  const getBadgeConfig = () => {
    switch (priority) {
      case 0:
        return {
          label: 'Bình thường',
          bgColor: isCompact ? 'bg-gray-100' : 'bg-gray-100',
          textColor: isCompact ? 'text-gray-800' : 'text-gray-800',
          dotColor: 'bg-gray-400',
        };
      case 1:
        return {
          label: 'Ưu tiên',
          bgColor: isCompact ? 'bg-blue-100' : 'bg-blue-100',
          textColor: isCompact ? 'text-blue-800' : 'text-blue-800',
          dotColor: 'bg-blue-400',
        };
      case 2:
        return {
          label: 'Khẩn cấp',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          dotColor: 'bg-red-400',
        };
      default:
        return {
          label: 'Không xác định',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          dotColor: 'bg-gray-400',
        };
    }
  };

  const config = getBadgeConfig();

  if (isCompact) {
    return (
      <span className={`px-2 py-1 text-xs font-medium ${config.bgColor} ${config.textColor} rounded-full`}>
        {config.label}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
      <div className={`w-1.5 h-1.5 ${config.dotColor} rounded-full mr-1.5`}></div>
      {config.label}
    </span>
  );
};

