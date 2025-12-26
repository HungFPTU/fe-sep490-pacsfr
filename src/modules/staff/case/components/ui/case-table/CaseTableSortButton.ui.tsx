'use client';

import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export type SortField = 'caseCode' | 'guestName' | 'serviceName' | 'priorityLevel' | 'currentStatus' | 'submissionMethod';
export type SortDirection = 'asc' | 'desc';

interface CaseTableSortButtonProps {
  field: SortField;
  currentSortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  children: React.ReactNode;
}

export const CaseTableSortButton: React.FC<CaseTableSortButtonProps> = ({
  field, currentSortField, sortDirection, onSort, children,
}) => {
  const isActive = currentSortField === field;

  return (
    <button onClick={() => onSort(field)} className="flex items-center gap-1 text-gray-500 hover:text-gray-900">
      <span>{children}</span>
      <div className="flex flex-col -space-y-1">
        <ChevronUp className={`h-3 w-3 ${isActive && sortDirection === 'asc' ? 'text-blue-600' : 'text-gray-300'}`} />
        <ChevronDown className={`h-3 w-3 ${isActive && sortDirection === 'desc' ? 'text-blue-600' : 'text-gray-300'}`} />
      </div>
    </button>
  );
};
