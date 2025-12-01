'use client';

import React, { useState, useEffect } from 'react';
import { BaseModal } from '@/shared/components/manager';
import { Button } from '@/shared/components/ui/button.ui';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/manager/ui/select';
import { useUpdatePaknStatus } from '../../../hooks';
import { useGlobalToast } from '@/core/patterns/SingletonHook';
import { PAKN_STATUS_LABEL, PAKN_STATUS_COLOR } from '../../../constants';
import { PaknStatus } from '../../../types';


interface Props {
  open: boolean;
  onClose: () => void;
  paknId: string | null;
  currentStatus: PaknStatus | null;
}

export const UpdateStatusModal: React.FC<Props> = ({ open, onClose, paknId, currentStatus }) => {
  const [newStatus, setNewStatus] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const updateStatusMutation = useUpdatePaknStatus();
  const toast = useGlobalToast();

  const availableStatuses = Object.keys(PAKN_STATUS_LABEL).filter(
    (status) => status !== currentStatus
  );

  useEffect(() => {
    if (open) {
      setNewStatus('');
      setNote('');
    }
  }, [open]);

  const handleSubmit = () => {
    if (!paknId || !newStatus) return;

    updateStatusMutation.mutate(
      { paknId, newStatus, note },
      {
        onSuccess: (response: any) => {
          if (response?.success === false) {
            const errorMessage = response?.message || 'Có lỗi xảy ra khi cập nhật trạng thái';
            toast.error(errorMessage);
            return;
          }
          toast.success('Cập nhật trạng thái thành công');
          onClose();
        },
        onError: (error: any) => {
          const errorMessage = error?.response?.data?.message || error?.message || 'Có lỗi xảy ra khi cập nhật trạng thái';
          toast.error(errorMessage);
        },
      }
    );
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Cập nhật trạng thái"
      size="medium"
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Hủy bỏ
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!newStatus || updateStatusMutation.isPending}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {updateStatusMutation.isPending ? 'Đang xử lý...' : 'Xác nhận'}
          </Button>
        </div>
      }
    >
      <div className="space-y-6 py-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Trạng thái hiện tại
          </label>
          <div>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold leading-5 ${
                currentStatus ? (PAKN_STATUS_COLOR[currentStatus] || 'bg-gray-100 text-gray-800') : 'bg-gray-100 text-gray-800'
              }`}
            >
              {currentStatus ? (PAKN_STATUS_LABEL[currentStatus] || currentStatus) : 'Unknown'}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Trạng thái mới <span className="text-red-500">*</span>
          </label>
          <Select
            value={newStatus}
            onValueChange={setNewStatus}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn trạng thái mới">
                {newStatus ? (PAKN_STATUS_LABEL[newStatus] || newStatus) : "Chọn trạng thái mới"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {availableStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {PAKN_STATUS_LABEL[status] || status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {availableStatuses.length === 0 && (
            <p className="text-xs text-amber-600 mt-1">
              Không thể chuyển đổi trạng thái từ trạng thái hiện tại.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Ghi chú
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full min-h-[100px] rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Nhập ghi chú (nếu có)..."
          />
        </div>
      </div>
    </BaseModal>
  );
};
