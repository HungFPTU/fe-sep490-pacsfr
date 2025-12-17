'use client';

import React from 'react';
import { FileText, Calendar, User } from 'lucide-react';
import { formatDate } from '@/shared/lib/utils';
import type { PaknResponse } from '../../types';

interface Props {
  response: PaknResponse;
}

export const PaknResponseCard: React.FC<Props> = ({ response }) => {
  const attachments = response.attachments?.$values || [];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(response.createdAt)}</span>
            {response.staffName && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{response.staffName}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mb-3 text-sm leading-relaxed text-slate-900 whitespace-pre-wrap">
        {response.responseContent}
      </div>

      {attachments.length > 0 && (
        <div className="mt-4 border-t border-slate-200 pt-3">
          <p className="mb-2 text-xs font-medium text-slate-600">Tài liệu đính kèm:</p>
          <div className="space-y-2">
            {attachments.map((file) => (
              <a
                key={file.id}
                href={file.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
              >
                <FileText className="h-4 w-4" />
                <span className="truncate">{file.fileName}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

