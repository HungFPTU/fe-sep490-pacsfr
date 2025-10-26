'use client';

import React from 'react';

interface CaseNotesProps {
  notes?: string;
}

export const CaseNotes: React.FC<CaseNotesProps> = ({ notes }) => {
  if (!notes) return null;

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Ghi chú
      </label>
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-900 whitespace-pre-wrap">
          {notes}
        </p>
      </div>
    </div>
  );
};

