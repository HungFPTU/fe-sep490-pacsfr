'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { formatDateVN } from '@core/utils/date';
import { Counter, Staff, WorkShift } from '../../../types';
import { getOne } from '@/types/rest';
import { useWorkShiftDetail } from '../../../hooks';
import { LoadingSpinner } from '@/shared/components';

interface WorkShiftViewModalProps {
  open: boolean;
  onClose: () => void;
  initData: WorkShift | null;
  counters?: Counter[];
  staffs?: Staff[];
}

export const WorkShiftViewModal: React.FC<WorkShiftViewModalProps> = ({
  open,
  onClose,
  initData,
  counters = [],
  staffs = [],
}) => {
  const { data, isLoading } = useWorkShiftDetail(initData?.id || '');

  if (!open || !initData) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const workShift = getOne(data as any) as WorkShift | undefined;

  const counterName =
    counters.find((c) => c.id === initData.counterId)?.counterName ||
    counters.find((c) => c.id === initData.counterId)?.counterCode ||
    '—';
  const staffName =
    staffs.find((s) => s.id === initData.staffId)?.fullName ||
    staffs.find((s) => s.id === initData.staffId)?.username ||
    '—';

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Chi tiết ca làm việc"
      footer={null}
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
          <InfoRow label="Quầy làm việc" value={counterName} />
          <InfoRow label="Nhân viên" value={staffName} />
          {initData.description && <InfoRow label="Ghi chú" value={initData.description} />}
          <InfoRow label="Ngày tạo" value={formatDateVN(initData.createdAt)} />
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">Không tìm thấy thông tin ca làm việc</p>
        </div>
      )}
    </BaseModal>
  );
};

const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between items-start">
    <span className="text-sm text-gray-600 font-medium w-1/3">{label}</span>
    <span className="text-sm text-gray-800 flex-1 text-right">{value}</span>
  </div>
);
