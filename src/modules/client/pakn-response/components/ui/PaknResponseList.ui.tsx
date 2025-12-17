'use client';

import React from 'react';
import { usePaknResponsesByCode } from '../../hooks';
import { PaknResponseCard } from './PaknResponseCard.ui';
import { Loader2 } from 'lucide-react';

interface Props {
  paknCode: string;
}

export const PaknResponseList: React.FC<Props> = ({ paknCode }) => {
  const { data, isLoading } = usePaknResponsesByCode(paknCode);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    );
  }

  const responses = data?.items || [];

  if (responses.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
        <p className="text-sm text-slate-600">Chưa có phản hồi nào cho PAKN này.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {responses.map((response) => (
        <PaknResponseCard key={response.id} response={response} />
      ))}
    </div>
  );
};

