'use client';

import React, { useState, useEffect } from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { useUpdateCaseStatus } from '../../../../hooks/useUpdateCaseStatus';
import { CASE_STATUSES } from '../../../../constants/case-statuses';

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
  // Find current status ID from status name
  const getCurrentStatusId = () => {
    const status = CASE_STATUSES.find(s => s.name === currentStatus);
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

  // Update newStatusId when currentStatus changes or modal opens
  useEffect(() => {
    if (open) {
      setNewStatusId(getCurrentStatusId());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, currentStatus]);

  return (
    <BaseModal
      open={open}
      onClose={handleClose}
      title="Cập nhật trạng thái hồ sơ"
      onOk={handleSubmit}
      onCancel={handleClose}
      okText="Cập nhật"
      cancelText="Hủy"
      centered
      size="medium"
      confirmLoading={updateStatusMutation.isPending}
    >
      <div className="space-y-4">
        {/* New Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trạng thái <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={newStatusId}
              onChange={(e) => setNewStatusId(e.target.value)}
              disabled={updateStatusMutation.isPending}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none bg-white pr-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
              }}
            >
              {CASE_STATUSES.map((status) => {
                const colorEmoji = status.color === 'amber' ? '🟡' : status.color === 'blue' ? '🔵' : '🟢';
                return (
                  <option 
                    key={status.id} 
                    value={status.id}
                    className="py-2"
                  >
                    {colorEmoji} {status.name} - {status.description}
                  </option>
                );
              })}
            </select>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Trạng thái hiện tại: <span className="font-medium">{currentStatus}</span>
          </p>
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lý do
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={updateStatusMutation.isPending}
            rows={3}
            placeholder="Nhập lý do cập nhật trạng thái"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
          />
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ghi chú
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={updateStatusMutation.isPending}
            rows={2}
            placeholder="Nhập ghi chú bổ sung (tùy chọn)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
          />
        </div>
      </div>
    </BaseModal>
  );
};

