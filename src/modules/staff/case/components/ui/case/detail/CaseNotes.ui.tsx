'use client';

import React from 'react';
import { StickyNote } from 'lucide-react';

interface CaseNotesProps {
  notes?: string;
}

export const CaseNotes: React.FC<CaseNotesProps> = ({ notes }) => {
  if (!notes) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
          <StickyNote className="w-4 h-4 text-amber-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-1.5">Ghi chú</p>
          <p className="text-sm text-amber-900 whitespace-pre-wrap leading-relaxed">{notes}</p>
        </div>
      </div>
    </div>
  );
};
