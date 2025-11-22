'use client';

import React, { useState } from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { formatDateVN } from '@core/utils/date';
import { WorkShift } from '../../../types';
import { getOne } from '@/types/rest';
import { useWorkShiftDetail, useDeleteWorkShift } from '../../../hooks';
import { LoadingSpinner } from '@/shared/components';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { ConfirmDialog } from '@/shared/components/common/ConfirmDialog';

interface WorkShiftViewModalProps {
  open: boolean;
  onClose: () => void;
  initData: WorkShift | null;
  onEdit?: (shift: WorkShift) => void;
  onSuccess?: () => void;
}

export const WorkShiftViewModal: React.FC<WorkShiftViewModalProps> = ({
  open,
  onClose,
  initData,
  onEdit,
  onSuccess,
}) => {
  const { data, isLoading } = useWorkShiftDetail(initData?.id || '');
  const deleteMutation = useDeleteWorkShift();
  const { addToast } = useGlobalToast();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  if (!open || !initData) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const workShift = getOne(data as any) as WorkShift | undefined;

  const handleEdit = () => {
    onClose(); // Close view modal first
    onEdit?.(initData); // Trigger edit from parent
  };

  const handleDeleteClick = () => {
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteMutation.mutate(initData.id, {
      onSuccess: () => {
        addToast({ message: 'Xóa ca làm việc thành công', type: 'success' });
        onSuccess?.();
        setConfirmDeleteOpen(false);
        onClose();
      },
      onError: () => {
        addToast({ message: 'Xóa ca làm việc thất bại', type: 'error' });
        setConfirmDeleteOpen(false);
      },
    });
  };

  const handleCancelDelete = () => {
    setConfirmDeleteOpen(false);
  };

  return (
    <>
      <BaseModal
        open={open}
        onClose={onClose}
        title="Chi tiết ca làm việc"
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={handleEdit}
              className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              Chỉnh sửa
            </button>
            <button
              onClick={handleDeleteClick}
              disabled={deleteMutation.isPending}
              className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
            >
              {deleteMutation.isPending ? 'Đang xóa...' : 'Xóa'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Đóng
            </button>
          </div>
        }
        centered
        size="large"
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : workShift ? (
          <div className="px-6 py-4 space-y-3">
            <InfoRow label="Tên ca" value={initData.shiftType} />
            <InfoRow label="Ngày làm việc" value={formatDateVN(initData.shiftDate)} />
            <InfoRow label="Giờ bắt đầu" value={initData.startTime} />
            <InfoRow label="Giờ kết thúc" value={initData.endTime} />
            <InfoRow
              label="Trạng thái"
              value={
                initData.isActive ? (
                  <span className="text-green-600 font-medium">Đang hoạt động</span>
                ) : (
                  <span className="text-gray-500 font-medium">Ngừng hoạt động</span>
                )
              }
            />
            {initData.description && <InfoRow label="Ghi chú" value={initData.description} />}
            <InfoRow label="Ngày tạo" value={formatDateVN(initData.createdAt)} />
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Không tìm thấy thông tin ca làm việc</p>
          </div>
        )}
      </BaseModal>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={confirmDeleteOpen}
        title="Xác nhận xóa"
        message="Bạn có muốn xóa lịch này ?"
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        loading={deleteMutation.isPending}
      />
    </>
  );
};

const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between items-start">
    <span className="text-sm text-gray-600 font-medium w-1/3">{label}</span>
    <span className="text-sm text-gray-800 flex-1 text-right">{value}</span>
  </div>
);
