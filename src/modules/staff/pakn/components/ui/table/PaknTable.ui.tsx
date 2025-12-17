import React from 'react';
import { Eye, Pencil } from 'lucide-react';
import type { Pakn } from '../../../types';
import { formatDate } from '@/shared/lib/utils';
import { PAKN_STATUS_LABEL, PAKN_STATUS_COLOR, getStaffAvailableTransitions } from '../../../constants';
import { Button } from '@/shared/components/ui/button.ui';

interface Props {
  items: Pakn[];
  isLoading: boolean;
  onView: (item: Pakn) => void;
  onUpdateStatus: (item: Pakn) => void;
}

export const PaknTable: React.FC<Props> = ({
  items,
  isLoading,
  onView,
  onUpdateStatus,
}) => {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow mt-4">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              Mã PAKN
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              Tiêu đề
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              Người gửi
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              Danh mục
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              Ngày gửi
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              Trạng thái
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {isLoading ? (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-center">
                Đang tải...
              </td>
            </tr>
          ) : items.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-center">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                  {item.paknCode}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  <div className="max-w-xs truncate" title={item.title}>
                    {item.title}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900">
                  {item.citizenName}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                  {item.categoryName}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                  {formatDate(item.createdAt)}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      PAKN_STATUS_COLOR[item.status] || 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {PAKN_STATUS_LABEL[item.status] || item.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onView(item)}
                      title="Xem chi tiết"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onUpdateStatus(item)}
                      title={
                        getStaffAvailableTransitions(item.status).length === 0
                          ? item.status === 'CHO_TIEP_NHAN'
                            ? 'Chưa được phân công để xử lý'
                            : 'Không thể cập nhật trạng thái (trạng thái cuối cùng)'
                          : `Cập nhật trạng thái (có ${getStaffAvailableTransitions(item.status).length} lựa chọn)`
                      }
                      disabled={getStaffAvailableTransitions(item.status).length === 0}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

