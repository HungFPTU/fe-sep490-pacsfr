'use client';

import React from 'react';

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
      <div className="flex items-center space-x-2 mb-3">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <label className="text-sm font-semibold text-gray-700">
          Người tiếp nhận ({receivers.$values.length})
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {receivers.$values.map((receiver, index) => (
          <div key={index} className="flex items-center space-x-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 border border-gray-200 hover:border-gray-300 transition-colors">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-sm font-bold text-white">
                {receiver.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">
                {receiver.name || 'Không xác định'}
              </p>
              <p className="text-xs text-gray-600 flex items-center space-x-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{receiver.role || 'Nhân viên'}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

