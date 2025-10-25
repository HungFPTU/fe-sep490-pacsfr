'use client';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/manager/ui/table';
import type { CaseData } from '../../../../types/case-search';
import { getCaseTableColumns } from './CaseTableColumns';

interface CaseTableProps {
  data: CaseData[];
  onViewDetail?: (caseItem: CaseData) => void;
}

export function CaseTable({ data, onViewDetail }: CaseTableProps) {
  const columns = getCaseTableColumns(onViewDetail);

  // Add STT column
  const columnsWithSTT = [
    {
      id: 'stt',
      header: () => 'STT',
      cell: ({ row }: { row: { index: number } }) => row.index + 1,
      enableHiding: false,
      enableSorting: false,
    },
    ...columns,
  ];

  const table = useReactTable({
    data,
    columns: columnsWithSTT,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups()?.map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells()?.map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columnsWithSTT.length} className="h-24 text-center">
                Không có dữ liệu
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

