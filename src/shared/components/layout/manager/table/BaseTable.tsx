"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  buttonOther?: string | null;
  onOther?: (row: TData) => void;
  onView?: (row: TData) => void;
  onAdd?: (row: TData) => void;
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
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
        <div className="flex items-center gap-2">
          <Button className="cursor-pointer" size="sm" variant="outline" onClick={() => onView?.(original)}>
            Xem
          </Button>
          <Button className="cursor-pointer" size="sm" variant="outline" onClick={() => onEdit?.(original)}>
            Sửa
          </Button>
          {buttonOther && <Button className="cursor-pointer" size="sm" variant="outline" onClick={() => onOther?.(original)}>
            {buttonOther}
          </Button>}
          
          <Button
            className="cursor-pointer"
            size="sm"
            variant="destructive"
            onClick={() => onDelete?.(original)}
          >
            Xóa
          </Button>
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
