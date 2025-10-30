'use client';

import { ColumnDef } from '@tanstack/react-table';
import type { CaseData } from '../../../../types/case-search';
import { PriorityBadge, StatusBadge, PaymentBadge } from '../badges';

export const getCaseTableColumns = (
  onViewDetail?: (caseItem: CaseData) => void
): ColumnDef<CaseData>[] => [
  {
    id: 'caseCode',
    header: 'Mã hồ sơ',
    accessorKey: 'caseCode',
    cell: ({ row }) => {
      const caseItem = row.original;
      return (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8">
            <div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center">
              <svg
                className="h-4 w-4 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
          <div className="ml-3">
            <div className="text-sm font-mono font-medium text-gray-900">{caseItem.caseCode}</div>
            <div className="text-xs text-gray-500">ID: {caseItem.id.slice(0, 8)}...</div>
          </div>
        </div>
      );
    },
  },
  {
    id: 'guestName',
    header: 'Tên công dân',
    accessorKey: 'guestName',
    cell: ({ row }) => {
      const caseItem = row.original;
      return (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">
                {caseItem.guestName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">{caseItem.guestName}</div>
          </div>
        </div>
      );
    },
  },
  {
    id: 'serviceName',
    header: 'Dịch vụ',
    accessorKey: 'serviceName',
    cell: ({ row }) => {
      return <div className="text-sm text-gray-900 font-medium">{row.original.serviceName}</div>;
    },
  },
  {
    id: 'priorityLevel',
    header: 'Mức độ ưu tiên',
    accessorKey: 'priorityLevel',
    cell: ({ row }) => {
      return <PriorityBadge priority={row.original.priorityLevel} variant="dot" />;
    },
  },
  {
    id: 'currentStatus',
    header: 'Trạng thái',
    accessorKey: 'currentStatus',
    cell: ({ row }) => {
      return <StatusBadge status={row.original.currentStatus} showIcon />;
    },
  },
  {
    id: 'isPayment',
    header: 'Thanh toán',
    accessorKey: 'isPayment',
    cell: ({ row }) => {
      return <PaymentBadge isPaid={row.original.isPayment} showIcon />;
    },
  },
  {
    id: 'actions',
    header: 'Hành động',
    cell: ({ row }) => {
      const caseItem = row.original;
      return (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onViewDetail?.(caseItem)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            Xem chi tiết
          </button>
        </div>
      );
    },
    enableHiding: false,
    enableSorting: false,
  },
];

