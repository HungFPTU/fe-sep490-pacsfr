'use client';

import React, { useMemo } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
} from '@heroui/react';
import { Eye, Pencil, Trash2, CalendarClock, User2, Store } from 'lucide-react';
import { formatDateVN } from '@core/utils/date';
import { Counter, Staff, WorkShift } from '../../../types';

type Key = React.Key;

interface WorkShiftTableProps {
  data: WorkShift[];
  isLoading?: boolean;

  counters?: Counter[];
  staffs?: Staff[];

  // Actions
  onView?: (shift: WorkShift) => void;
  onEdit?: (shift: WorkShift) => void;
  onDelete?: (shift: WorkShift) => void;
}

export const WorkShiftTable: React.FC<WorkShiftTableProps> = ({
  data,
  isLoading = false,
  counters = [],
  staffs = [],
  onView,
  onEdit,
  onDelete,
}) => {
  const columns = useMemo(
    () =>
      [
        { key: 'shiftType', label: 'TÊN CA' },
        { key: 'shiftDate', label: 'NGÀY LÀM' },
        { key: 'startTime', label: 'GIỜ BẮT ĐẦU' },
        { key: 'endTime', label: 'GIỜ KẾT THÚC' },
        { key: 'status', label: 'TRẠNG THÁI' },
        { key: 'counter', label: 'QUẦY' },
        { key: 'staff', label: 'NHÂN VIÊN' },
        { key: 'actions', label: 'THAO TÁC' },
      ] as { key: Key; label: string }[],
    [],
  );

  const counterMap = useMemo(() => {
    const m = new Map<string, string>();
    counters.forEach((c) => m.set(c.id, c.counterName || c.counterCode || c.id));
    return m;
  }, [counters]);

  const staffMap = useMemo(() => {
    const m = new Map<string, string>();
    staffs.forEach((s) => m.set(s.id, s.fullName || s.username || s.id));
    return m;
  }, [staffs]);

  const renderCell = (ws: WorkShift, columnKey: Key) => {
    switch (columnKey) {
      case 'shiftType':
        return (
          <div className="flex items-center gap-2">
            <CalendarClock className="w-4 h-4 text-slate-500" />
            <span className="font-medium text-sm">{ws.shiftType}</span>
          </div>
        );

      case 'shiftDate':
        return <span className="text-sm text-gray-700">{formatDateVN(ws.shiftDate)}</span>;

      case 'startTime':
        return <span className="text-sm text-slate-700">{ws.startTime}</span>;

      case 'endTime':
        return <span className="text-sm text-slate-700">{ws.endTime}</span>;

      case 'status':
        return (
          <Chip size="sm" variant="flat" color={ws.isActive ? 'success' : 'default'}>
            {ws.isActive ? 'Đang hoạt động' : 'Ngừng hoạt động'}
          </Chip>
        );

      case 'counter': {
        const name = ws.counterId ? counterMap.get(ws.counterId) : undefined;
        return (
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-slate-500" />
            <span className="text-sm">{name || <i className="text-slate-400">Chưa gán</i>}</span>
          </div>
        );
      }

      case 'staff': {
        const name = ws.staffId ? staffMap.get(ws.staffId) : undefined;
        return (
          <div className="flex items-center gap-2">
            <User2 className="w-4 h-4 text-slate-500" />
            <span className="text-sm">{name || <i className="text-slate-400">Chưa gán</i>}</span>
          </div>
        );
      }

      case 'actions':
        return (
          <div className="flex items-center gap-1 justify-end">
            {onView && (
              <Tooltip content="Xem chi tiết">
                <button
                  onClick={() => onView(ws)}
                  className="p-2 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-blue-600" />
                </button>
              </Tooltip>
            )}
            {onEdit && (
              <Tooltip content="Chỉnh sửa">
                <button
                  onClick={() => onEdit(ws)}
                  className="p-2 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Pencil className="w-4 h-4 text-amber-600" />
                </button>
              </Tooltip>
            )}
            {onDelete && (
              <Tooltip content="Xóa">
                <button
                  onClick={() => onDelete(ws)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </Tooltip>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <Table
        aria-label="Bảng ca làm việc"
        classNames={{
          wrapper: 'shadow-none',
          th: 'bg-gray-50 text-gray-700 font-semibold text-xs',
          td: 'text-sm',
        }}
      >
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={data} isLoading={isLoading} emptyContent="Không có dữ liệu ca làm việc">
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
