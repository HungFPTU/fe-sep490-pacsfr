'use client';

import React from 'react';

interface TableSortButtonProps {
  field: string;
  currentSortField: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
  children: React.ReactNode;
}

export const TableSortButton: React.FC<TableSortButtonProps> = ({
  field,
  currentSortField,
  sortDirection,
  onSort,
  children,
}) => {
  const isActive = currentSortField === field;

  return (
    <button
      onClick={() => onSort(field)}
      className="flex items-center space-x-1 text-left font-semibold text-gray-900 hover:text-red-600 transition-colors group"
    >
      <span>{children}</span>
      <div className="flex flex-col">
        <svg
          className={`w-3 h-3 transition-colors ${
            isActive && sortDirection === 'asc'
              ? 'text-red-600'
              : 'text-gray-400 group-hover:text-gray-600'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
        <svg
          className={`w-3 h-3 transition-colors -mt-1 ${
            isActive && sortDirection === 'desc'
              ? 'text-red-600'
              : 'text-gray-400 group-hover:text-gray-600'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" />
        </svg>
      </div>
    </button>
  );
};

