"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "../../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  buttonOther?: string | null;
  onOther?: (row: TData) => void;
  onView?: (row: TData) => void;
  onAdd?: (row: TData) => void;
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
  // Icon props
  viewIcon?: React.ReactNode;
  editIcon?: React.ReactNode;
  deleteIcon?: React.ReactNode;
  otherIcon?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  buttonOther = null,
  onOther,
  onView,
  onEdit,
  onDelete,
}: DataTableProps<TData, TValue>) {
  // Cột STT
  const indexColumn: ColumnDef<TData, unknown> = {
    id: "stt",
    header: () => "STT",
    cell: ({ row }) => row.index + 1,
    enableHiding: false,
    enableSorting: false,
  };

  // Cột hành động
  const actionsColumn: ColumnDef<TData, unknown> = {
    id: "actions",
    header: () => "Hành động",
    cell: ({ row }) => {
      const original = row.original as TData;
      return (
        <div className="flex items-center justify-end gap-2">
          {onView && (
            <button
              className="text-indigo-600 hover:text-indigo-900"
              onClick={() => onView(original)}
              title="Xem chi tiết"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          )}
          {onEdit && (
            <button
              className="text-indigo-600 hover:text-indigo-900"
              onClick={() => onEdit(original)}
              title="Chỉnh sửa"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          {buttonOther && onOther && (
            <button
              className="text-indigo-600 hover:text-indigo-900"
              onClick={() => onOther(original)}
              title={buttonOther}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v12m0 0l-4-4m4 4l4-4m-7 8h6" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              className="text-red-600 hover:text-red-900 disabled:opacity-50"
              onClick={() => onDelete(original)}
              title="Xóa"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      );
    },
    enableHiding: false,
    enableSorting: false,
  };

  // Gộp: STT + cột người dùng + Hành động
  const columnsWithExtras = [
    indexColumn,
    ...(columns as ColumnDef<TData, unknown>[]),
    actionsColumn,
  ];

  const table = useReactTable({
    data,
    columns: columnsWithExtras,
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
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells()?.map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columnsWithExtras.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
