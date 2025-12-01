'use client';

import React, { useState } from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { formatDateVN } from '@core/utils/date';
import { WorkShift, StaffWorkShift, CounterOption } from '../../../types';
import { getOne, getValuesPage, RestPaged } from '@/types/rest';
import { useWorkShiftDetail, useDeleteWorkShift, useActiveCounters, useStaffList, useAssignStaffWorkShift, useStaffWorkShifts, useDeleteStaffWorkShift } from '../../../hooks';
import { LoadingSpinner } from '@/shared/components';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { ConfirmDialog } from '@/shared/components/common/ConfirmDialog';
import { AssignStaffModal } from './AssignStaffModal.ui';

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

  // Get counters and staffs for assignment
  const { data: countersData, isLoading: isLoadingCounters } = useActiveCounters();
  const { data: staffsData, isLoading: isLoadingStaffs } = useStaffList();
  const { data: staffWorkShiftsData, isLoading: isLoadingStaffWorkShifts } = useStaffWorkShifts();

  if (!open || !initData) return null;

  const counters = countersData || [];
  const staffs = staffsData || [];

  // Extract staff work shifts and map by counterId (using counterName to match)
  const staffWorkShifts = staffWorkShiftsData 
    ? getValuesPage(staffWorkShiftsData as RestPaged<StaffWorkShift>).items 
    : [];

  // Create a map: counterId -> StaffWorkShift for current workShiftId
  const staffWorkShiftMap = React.useMemo(() => {
    const map = new Map<string, StaffWorkShift>();
    staffWorkShifts.forEach((assignment) => {
      if (assignment.workShiftId === initData.id) {
        if (assignment.counterId) {
          map.set(assignment.counterId, assignment);
          return;
        }

        const counter = counters.find((c) => c.counterName === assignment.counterName);
        if (counter) {
          map.set(counter.id, assignment);
        }
      }
    });
    return map;
  }, [staffWorkShifts, counters, initData.id]);

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
        size="xl"
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : workShift ? (
          <div className="px-6 py-6 space-y-6">
            {/* Work Shift Information Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Thông tin ca làm việc</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <InfoCard
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  }
                  label="Loại ca"
                  value={initData.shiftType}
                  valueClassName={getShiftTypeBadgeClass(initData.shiftType)}
                />
                <InfoCard
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                  label="Ngày làm việc"
                  value={formatDateVN(initData.shiftDate)}
                />
                <InfoCard
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  }
                  label="Giờ bắt đầu"
                  value={initData.startTime}
                />
                <InfoCard
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  label="Giờ kết thúc"
                  value={initData.endTime}
                />
              </div>

              <div className="mt-4 pt-4 border-t border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Trạng thái</span>
                  </div>
                  {initData.isActive ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Đang hoạt động
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                      <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
                      Ngừng hoạt động
                    </span>
                  )}
                </div>
              </div>

              {initData.description && (
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <div>
                      <span className="text-sm font-medium text-gray-700 block mb-1">Ghi chú</span>
                      <p className="text-sm text-gray-600">{initData.description}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-blue-200">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Ngày tạo: {formatDateVN(initData.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">Không tìm thấy thông tin ca làm việc</p>
          </div>
        )}

        {/* Assignment Table */}
        <div className="px-6 pb-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Phân Công Nhân Viên Vào Ca Làm Việc
                </h3>
              </div>
            </div>
          
            {isLoadingCounters || isLoadingStaffs || isLoadingStaffWorkShifts ? (
              <div className="flex items-center justify-center py-12">
                <LoadingSpinner />
                <span className="ml-3 text-sm text-gray-600 font-medium">Đang tải dữ liệu...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Quầy
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Tên Nhân Sự
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Ghi chú
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Thao Tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {counters.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                              </svg>
                            </div>
                            <p className="text-sm font-medium text-gray-500">Không có quầy nào</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      counters.map((counter) => {
                        const existingAssignment = staffWorkShiftMap.get(counter.id);
                        return (
                          <AssignmentRow
                            key={counter.id}
                            counter={counter}
                            staffs={staffs}
                            workShiftId={initData.id}
                            workDate={initData.shiftDate}
                            existingAssignment={existingAssignment}
                            onSuccess={onSuccess}
                          />
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
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

// Info Card Component
interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, label, value, valueClassName = '' }) => (
  <div className="bg-white rounded-lg p-4 border border-blue-100 shadow-sm">
    <div className="flex items-center gap-2 mb-2">
      <div className="text-blue-600">{icon}</div>
      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</span>
    </div>
    <div className={`text-base font-semibold text-gray-900 ${valueClassName}`}>
      {value}
    </div>
  </div>
);

// Get badge class for shift type
const getShiftTypeBadgeClass = (shiftType: string): string => {
  switch (shiftType) {
    case 'Sáng':
      return 'text-green-700';
    case 'Chiều':
      return 'text-yellow-700';
    case 'Cả ngày':
      return 'text-blue-700';
    default:
      return 'text-gray-700';
  }
};

// Assignment Row Component
interface AssignmentRowProps {
  counter: CounterOption;
  staffs: Array<{ id: string; fullName: string }>;
  workShiftId: string;
  workDate: string | Date;
  existingAssignment?: StaffWorkShift;
  onSuccess?: () => void;
}

const AssignmentRow: React.FC<AssignmentRowProps> = ({
  counter,
  staffs,
  workShiftId,
  workDate,
  existingAssignment,
  onSuccess,
}) => {
  const [selectedStaffId, setSelectedStaffId] = useState<string>(existingAssignment?.staffId || '');
  const [notes, setNotes] = useState<string>(existingAssignment?.notes || '');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false);
  const [assignModalOpen, setAssignModalOpen] = useState<boolean>(false);
  const assignMutation = useAssignStaffWorkShift();
  const deleteMutation = useDeleteStaffWorkShift();
  const { addToast } = useGlobalToast();

  React.useEffect(() => {
    if (existingAssignment && !isEditing) {
      setSelectedStaffId(existingAssignment.staffId);
      setNotes(existingAssignment.notes || '');
    }

    if (!existingAssignment) {
      setIsEditing(false);
      setSelectedStaffId('');
      setNotes('');
    }
  }, [existingAssignment, isEditing]);

  const handleUpdateAssignment = async () => {
    if (!selectedStaffId) {
      addToast({
        message: 'Vui lòng chọn nhân viên',
        type: 'error',
      });
      return;
    }

    try {
      const workDateStr =
        workDate instanceof Date ? workDate.toISOString() : new Date(workDate).toISOString();

      await assignMutation.mutateAsync({
        workShiftId,
        staffId: selectedStaffId,
        counterId: counter.id,
        workDate: workDateStr,
        status: 'Scheduled',
        notes: notes || undefined,
      });

      addToast({
        message: 'Cập nhật phân công thành công',
        type: 'success',
      });
      setIsEditing(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error assigning staff:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      const isAlreadyAssigned =
        errorMessage.toLowerCase().includes('already has a work shift') ||
        errorMessage.toLowerCase().includes('đã được phân công');

      addToast({
        message: isAlreadyAssigned
          ? 'Nhân viên đã được phân công vào ca khác'
          : 'Cập nhật phân công thất bại',
        type: 'error',
      });
    }
  };

  const handleDeleteClick = () => {
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!existingAssignment?.id) return;

    try {
      await deleteMutation.mutateAsync(existingAssignment.id);
      addToast({
        message: 'Xóa nhân viên khỏi ca làm việc thành công',
        type: 'success',
      });
      setConfirmDeleteOpen(false);
      setIsEditing(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error deleting staff work shift:', error);
      addToast({
        message: 'Xóa nhân viên khỏi ca làm việc thất bại',
        type: 'error',
      });
      setConfirmDeleteOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDeleteOpen(false);
  };

  const counterGroups = counter.serviceGroups?.$values || [];
  const isAssigned = !!existingAssignment;

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">{counter.counterName || counter.id}</div>
              <div className="text-xs text-gray-500">{counter.location || 'Chưa cập nhật vị trí'}</div>
              {counterGroups.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {counterGroups.map((group) => (
                    <span
                      key={`${counter.id}-${group.id}`}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-orange-50 text-orange-700"
                    >
                      {group.groupName}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          {isAssigned && !isEditing ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {existingAssignment?.staffName || counter.staffName || 'N/A'}
              </span>
            </div>
          ) : isAssigned && isEditing ? (
            <select
              value={selectedStaffId}
              onChange={(e) => setSelectedStaffId(e.target.value)}
              className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              disabled={assignMutation.isPending}
            >
              <option value="">-- Chọn nhân viên --</option>
              {staffs.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.fullName}
                </option>
              ))}
            </select>
          ) : (
            <span className="text-sm text-gray-500 italic">Chưa có nhân sự</span>
          )}
        </td>
        <td className="px-6 py-4">
          {isAssigned && !isEditing ? (
            <div className="text-sm text-gray-600 max-w-md">
              {existingAssignment?.notes ? (
                <span className="inline-flex items-center gap-1">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  {existingAssignment.notes}
                </span>
              ) : (
                <span className="text-gray-400 italic">Không có ghi chú</span>
              )}
            </div>
          ) : isAssigned && isEditing ? (
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Nhập ghi chú (nếu có)"
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              disabled={assignMutation.isPending}
            />
          ) : (
            <span className="text-sm text-gray-400 italic">Không có ghi chú</span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {isAssigned && !isEditing ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white text-sm font-semibold rounded-lg hover:bg-yellow-600 transition-all shadow-sm hover:shadow"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Chỉnh sửa
              </button>
              <button
                onClick={handleDeleteClick}
                disabled={deleteMutation.isPending}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-all shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleteMutation.isPending ? 'Đang xóa...' : 'Xóa'}
              </button>
            </div>
          ) : isAssigned && isEditing ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleUpdateAssignment}
                disabled={assignMutation.isPending || !selectedStaffId}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {assignMutation.isPending ? 'Đang lưu...' : 'Lưu'}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setSelectedStaffId(existingAssignment?.staffId || '');
                  setNotes(existingAssignment?.notes || '');
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-300 transition-all"
              >
                Hủy
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAssignModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-sm hover:shadow"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Phân Công
            </button>
          )}
        </td>
      </tr>
      {confirmDeleteOpen && (
        <ConfirmDialog
          open={confirmDeleteOpen}
          title="Xác nhận xóa"
          message="Bạn có muốn xóa nhân viên khỏi quầy hiện tại ?"
          confirmText="Xác nhận"
          cancelText="Hủy"
          type="danger"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          loading={deleteMutation.isPending}
        />
      )}
      <AssignStaffModal
        open={assignModalOpen}
        onClose={() => setAssignModalOpen(false)}
        counterId={counter.id}
        counterName={counter.counterName || counter.id}
        workShiftId={workShiftId}
        workDate={workDate}
        onSuccess={() => {
          setAssignModalOpen(false);
          onSuccess?.();
        }}
      />
    </>
  );
};
