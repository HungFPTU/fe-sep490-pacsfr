'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { LoadingSpinner } from '@/shared/components';
import { useAvailableStaff, useAssignStaffWorkShift } from '../../../hooks';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import type { AvailableStaff } from '../../../types';

interface AssignStaffModalProps {
  open: boolean;
  onClose: () => void;
  counterId: string;
  counterName: string;
  workShiftId: string;
  workDate: string | Date;
  onSuccess?: () => void;
}

export const AssignStaffModal: React.FC<AssignStaffModalProps> = ({
  open,
  onClose,
  counterId,
  counterName,
  workShiftId,
  workDate,
  onSuccess,
}) => {
  const { data, isLoading } = useAvailableStaff(counterId, workShiftId, open);
  const assignMutation = useAssignStaffWorkShift();
  const { addToast } = useGlobalToast();
  const [note, setNote] = useState('');

  const staffList = useMemo(() => data ?? [], [data]);

  const handleAssign = async (staff: AvailableStaff) => {
    try {
      const workDateString =
        workDate instanceof Date ? workDate.toISOString() : new Date(workDate).toISOString();

      await assignMutation.mutateAsync({
        workShiftId,
        staffId: staff.staffId,
        counterId,
        workDate: workDateString,
        status: 'Scheduled',
        notes: note || undefined,
      });

      addToast({
        message: `Đã phân công ${staff.fullName} cho ${counterName}`,
        type: 'success',
      });
      setNote('');
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error assigning staff:', error);
      addToast({
        message: 'Phân công nhân sự thất bại',
        type: 'error',
      });
    }
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Phân công nhân sự"
      footer={
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Đóng
          </button>
        </div>
      }
      size="large"
    >
      <div className="space-y-4">
        <div className="text-sm text-gray-600">
          Quầy đang chọn: <span className="font-semibold text-gray-900">{counterName}</span>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ghi chú (tùy chọn)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows={2}
            placeholder="Nhập ghi chú cho lần phân công này (nếu có)"
            disabled={assignMutation.isPending}
          />
        </div>

        <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">Danh sách nhân sự phù hợp</span>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <LoadingSpinner />
              <span className="ml-2 text-sm text-gray-600">Đang tải dữ liệu...</span>
            </div>
          ) : staffList.length === 0 ? (
            <div className="py-10 text-center text-sm text-gray-500">
              Không tìm thấy nhân sự phù hợp cho quầy này
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Nhân sự
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Chuyên môn
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Trạng thái
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {staffList.map((staff) => {
                    const serviceGroups = staff.serviceGroups?.$values || [];
                    return (
                      <tr key={staff.staffId} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
                              {staff.avatarUrl ? (
                                <Image
                                  src={staff.avatarUrl}
                                  alt={staff.fullName}
                                  width={48}
                                  height={48}
                                  className="w-12 h-12 object-cover"
                                />
                              ) : (
                                <span className="text-indigo-600 font-semibold text-lg">
                                  {staff.fullName.charAt(0).toUpperCase()}
                                </span>
                              )}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">
                                {staff.fullName}
                              </div>
                              <div className="text-xs text-gray-500">
                                {staff.staffCode} • {staff.position}
                              </div>
                              <div className="text-xs text-gray-500">{staff.phone}</div>
                              <div className="text-xs text-gray-500">{staff.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            {serviceGroups.length === 0 ? (
                              <span className="text-xs text-gray-400 italic">
                                Chưa có dữ liệu
                              </span>
                            ) : (
                              serviceGroups.map((group) => (
                                <span
                                  key={`${staff.staffId}-${group.serviceGroupId}`}
                                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-orange-50 text-orange-700"
                                >
                                  {group.groupName}
                                  {group.proficiencyLevel && (
                                    <span className="text-[10px] text-orange-500">
                                      ({group.proficiencyLevel})
                                    </span>
                                  )}
                                </span>
                              ))
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          {staff.isAssignedToOtherCounter ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                              Đã phân công quầy khác
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                              Sẵn sàng
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleAssign(staff)}
                            disabled={staff.isAssignedToOtherCounter || assignMutation.isPending}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {assignMutation.isPending ? 'Đang xử lý...' : 'Phân công'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </BaseModal>
  );
};

