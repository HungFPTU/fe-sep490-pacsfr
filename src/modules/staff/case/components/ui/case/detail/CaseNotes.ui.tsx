'use client';

import React from 'react';

interface CaseNotesProps {
  notes?: string;
}

export const CaseNotes: React.FC<CaseNotesProps> = ({ notes }) => {
  if (!notes) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold text-amber-800 mb-2">Ghi chú</label>
          <p className="text-sm text-amber-900 whitespace-pre-wrap leading-relaxed">{notes}</p>
        </div>
      </div>
    </div>
  );
};

