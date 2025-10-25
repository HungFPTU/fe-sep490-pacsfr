'use client';

import React from 'react';

interface Receiver {
  id: string;
  name: string;
  role: string;
}

interface CaseReceiverListProps {
  receivers: { $values: Receiver[] };
}

export const CaseReceiverList: React.FC<CaseReceiverListProps> = ({ receivers }) => {
  if (!receivers.$values || receivers.$values.length === 0) return null;

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Người tiếp nhận
      </label>
      <div className="space-y-2">
        {receivers.$values.map((receiver, index) => (
          <div key={index} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-red-600">
                {receiver.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {receiver.name || 'Không xác định'}
              </p>
              <p className="text-xs text-gray-500">
                {receiver.role || 'Nhân viên'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

