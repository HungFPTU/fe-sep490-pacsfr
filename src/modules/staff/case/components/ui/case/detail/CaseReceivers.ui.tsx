'use client';

import React from 'react';
import { Users, Briefcase } from 'lucide-react';

interface Receiver {
  id: string;
  name: string;
  role: string;
}

interface CaseReceiversProps {
  receivers: { $values: Receiver[] };
}

export const CaseReceivers: React.FC<CaseReceiversProps> = ({ receivers }) => {
  if (!receivers.$values || receivers.$values.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-4 h-4 text-gray-500" />
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Người tiếp nhận ({receivers.$values.length})
        </h4>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {receivers.$values.map((receiver, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-100"
          >
            <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
              <span className="text-sm font-semibold text-indigo-600">
                {receiver.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {receiver.name || 'Không xác định'}
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Briefcase className="w-3 h-3" />
                <span>{receiver.role || 'Nhân viên'}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
