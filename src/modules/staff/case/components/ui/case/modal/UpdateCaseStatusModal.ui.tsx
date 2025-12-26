'use client';

import React, { useState, useEffect } from 'react';
import { ClipboardList, MessageSquare, StickyNote, AlertCircle } from 'lucide-react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { useUpdateCaseStatus } from '../../../../hooks/useUpdateCaseStatus';
import { useGetCaseStatuses } from '../../../../hooks/useGetCaseStatuses';

interface UpdateCaseStatusModalProps {
  open: boolean;
  onClose: () => void;
  caseId: string | null;
  currentStatus: string;
  onSuccess?: () => void;
}

export const UpdateCaseStatusModal: React.FC<UpdateCaseStatusModalProps> = ({
  open,
  onClose,
  caseId,
  currentStatus,
  onSuccess,
}) => {
  const { data: caseStatuses = [], isLoading: isLoadingStatuses } = useGetCaseStatuses();
  
  const getCurrentStatusId = () => {
    const status = caseStatuses.find(s => s.name === currentStatus);
    return status?.id || '';
  };

  const [newStatusId, setNewStatusId] = useState(getCurrentStatusId());
  const [reason, setReason] = useState('');
  const [note, setNote] = useState('');

  const updateStatusMutation = useUpdateCaseStatus();
  const { addToast } = useGlobalToast();

  const handleSubmit = async () => {
    if (!caseId) {
      addToast({ message: 'Không tìm thấy ID hồ sơ', type: 'error' });
      return;
    }

    if (!newStatusId.trim()) {
      addToast({ message: 'Vui lòng chọn trạng thái mới', type: 'error' });
      return;
    }

    if (!reason.trim()) {
      addToast({ message: 'Vui lòng nhập lý do', type: 'error' });
      return;
    }

    try {
      const res = await updateStatusMutation.mutateAsync({
        id: caseId,
        data: {
          newStatusId: newStatusId.trim(),
          reason: reason.trim(),
          note: note.trim(),
        },
      });

      if (res?.success) {
        addToast({ message: 'Cập nhật trạng thái thành công', type: 'success' });
        onSuccess?.();
        handleClose();
      }
    } catch (error) {
      console.error('Error updating case status:', error);
      addToast({ message: 'Đã xảy ra lỗi khi cập nhật trạng thái', type: 'error' });
    }
  };

  const handleClose = () => {
    setNewStatusId(getCurrentStatusId());
    setReason('');
    setNote('');
    onClose();
  };

  useEffect(() => {
    if (open) {
      setNewStatusId(getCurrentStatusId());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, currentStatus]);

  useEffect(() => {
    if (newStatusId && newStatusId !== getCurrentStatusId()) {
      const selectedStatus = caseStatuses.find(s => s.id === newStatusId);
      if (selectedStatus) {
        setReason(selectedStatus.name);
      }
    }
  }, [newStatusId]);

  const labelClass = "block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5";
  const inputClass = "w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:cursor-not-allowed";

  return (
    <BaseModal
      open={open}
      onClose={handleClose}
      title="Cập nhật trạng thái"
      onOk={handleSubmit}
      onCancel={handleClose}
      okText="Cập nhật"
      cancelText="Hủy"
      centered
      size="medium"
      confirmLoading={updateStatusMutation.isPending}
    >
      <div className="space-y-5">
        {/* Current Status Info */}
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center shrink-0">
            <AlertCircle className="w-4 h-4 text-slate-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Trạng thái hiện tại</p>
            <p className="text-sm font-semibold text-gray-900">{currentStatus}</p>
          </div>
        </div>

        {/* New Status */}
        <div>
          <label className={labelClass}>
            <ClipboardList className="w-3.5 h-3.5 inline mr-1" />
            Trạng thái mới <span className="text-red-500">*</span>
          </label>
          <select
            value={newStatusId}
            onChange={(e) => setNewStatusId(e.target.value)}
            disabled={updateStatusMutation.isPending}
            className={`${inputClass} bg-white appearance-none cursor-pointer`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
              backgroundPosition: 'right 0.75rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.25em 1.25em',
            }}
          >
            {caseStatuses
              .filter(status => status.name !== 'Đã tiếp nhận' && status.name !== 'Đang xử lý')
              .map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
          </select>
        </div>

        {/* Reason */}
        <div>
          <label className={labelClass}>
            <MessageSquare className="w-3.5 h-3.5 inline mr-1" />
            Lý do <span className="text-red-500">*</span>
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={updateStatusMutation.isPending}
            rows={3}
            placeholder="Nhập lý do cập nhật trạng thái..."
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Note */}
        <div>
          <label className={labelClass}>
            <StickyNote className="w-3.5 h-3.5 inline mr-1" />
            Ghi chú (tùy chọn)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={updateStatusMutation.isPending}
            rows={2}
            placeholder="Nhập ghi chú bổ sung..."
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>
    </BaseModal>
  );
};
