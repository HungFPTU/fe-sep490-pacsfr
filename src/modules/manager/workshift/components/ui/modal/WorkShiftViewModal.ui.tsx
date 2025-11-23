'use client';

import React, { useState } from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { formatDateVN } from '@core/utils/date';
import { WorkShift, StaffWorkShift } from '../../../types';
import { getOne, getValuesPage, RestPaged } from '@/types/rest';
import { useWorkShiftDetail, useDeleteWorkShift, useActiveCounters, useStaffList, useAssignStaffWorkShift, useStaffWorkShifts, useDeleteStaffWorkShift } from '../../../hooks';
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
      // Only include assignments for the current work shift
      if (assignment.workShiftId === initData.id) {
        // Find counterId by matching counterName
        const counter = counters.find(c => c.counterName === assignment.counterName);
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

        {/* Assignment Table */}
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Phân Công Nhân Viên Vào Ca Làm Việc
          </h3>
          
          {isLoadingCounters || isLoadingStaffs || isLoadingStaffWorkShifts ? (
            <div className="flex items-center justify-center py-8">
              <LoadingSpinner />
              <span className="ml-2 text-sm text-gray-500">Đang tải dữ liệu...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Quầy
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Tên Nhân Sự
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Ghi chú
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Thao Tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {counters.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="border border-gray-200 px-4 py-8 text-center text-sm text-gray-500">
                        Không có quầy nào
                      </td>
                    </tr>
                  ) : (
                    counters.map((counter) => {
                      const existingAssignment = staffWorkShiftMap.get(counter.id);
                      return (
                        <AssignmentRow
                          key={counter.id}
                          counterId={counter.id}
                          counterName={counter.counterName || counter.id}
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

// Assignment Row Component
interface AssignmentRowProps {
  counterId: string;
  counterName: string;
  staffs: Array<{ id: string; fullName: string }>;
  workShiftId: string;
  workDate: string | Date;
  existingAssignment?: StaffWorkShift;
  onSuccess?: () => void;
}

const AssignmentRow: React.FC<AssignmentRowProps> = ({
  counterId,
  counterName,
  staffs,
  workShiftId,
  workDate,
  existingAssignment,
  onSuccess,
}) => {
  const [selectedStaffId, setSelectedStaffId] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false);
  const assignMutation = useAssignStaffWorkShift();
  const deleteMutation = useDeleteStaffWorkShift();
  const { addToast } = useGlobalToast();

  // Initialize selectedStaffId from existing assignment
  React.useEffect(() => {
    if (existingAssignment && !isEditing) {
      setSelectedStaffId(existingAssignment.staffId);
      setNotes(existingAssignment.notes || '');
    } else if (!existingAssignment) {
      setSelectedStaffId('');
      setNotes('');
    }
  }, [existingAssignment, isEditing]);

  const isAssigned = !!existingAssignment && !isEditing;
  const isInEditMode = isEditing && !!existingAssignment;

  const handleAssign = async () => {
    if (!selectedStaffId) {
      addToast({
        message: 'Vui lòng chọn nhân viên',
        type: 'error',
      });
      return;
    }

    try {
      const workDateStr = workDate instanceof Date
        ? workDate.toISOString()
        : new Date(workDate).toISOString();

      await assignMutation.mutateAsync({
        workShiftId: workShiftId,
        staffId: selectedStaffId,
        counterId: counterId,
        workDate: workDateStr,
        status: 'Scheduled',
        notes: notes || undefined,
      });

      addToast({
        message: 'Phân công nhân viên thành công',
        type: 'success',
      });

      // Reset form
      if (!existingAssignment) {
        setSelectedStaffId('');
        setNotes('');
      }
      setIsEditing(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error assigning staff:', error);
      
      // Check if error message indicates staff already assigned
      const errorMessage = error instanceof Error ? error.message : String(error);
      const isAlreadyAssigned = errorMessage.toLowerCase().includes('already has a work shift') ||
                                 errorMessage.toLowerCase().includes('đã được phân công');
      
      addToast({
        message: isAlreadyAssigned 
          ? 'Nhân viên đã được phân công vào một ca làm việc trước đó !!!'
          : 'Phân công nhân viên thất bại',
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

  return (
    <>
      <tr>
        <td className="border border-gray-200 px-4 py-3">
          <div className="text-sm text-gray-700 font-medium">{counterName}</div>
        </td>
        <td className="border border-gray-200 px-4 py-3">
          {isAssigned ? (
            <div className="text-sm text-gray-700 font-medium">
              {existingAssignment?.staffName || 'N/A'}
            </div>
          ) : isInEditMode ? (
            <div className="text-sm text-gray-700 font-medium">
              {existingAssignment?.staffName || 'N/A'}
            </div>
          ) : (
            <select
              value={selectedStaffId}
              onChange={(e) => setSelectedStaffId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={assignMutation.isPending}
            >
              <option value="">-- Chọn nhân viên --</option>
              {staffs.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.fullName}
                </option>
              ))}
            </select>
          )}
        </td>
        <td className="border border-gray-200 px-4 py-3">
          {isAssigned || isInEditMode ? (
            <div className="text-sm text-gray-600">
              {existingAssignment?.notes || '-'}
            </div>
          ) : (
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Nhập ghi chú (nếu có)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={assignMutation.isPending}
            />
          )}
        </td>
        <td className="border border-gray-200 px-4 py-3">
          {isAssigned ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Chỉnh sửa
            </button>
          ) : isInEditMode ? (
            <button
              onClick={handleDeleteClick}
              disabled={deleteMutation.isPending}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleteMutation.isPending ? 'Đang xử lý...' : 'Xóa '}
            </button>
          ) : (
            <button
              onClick={handleAssign}
              disabled={assignMutation.isPending || !selectedStaffId}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {assignMutation.isPending ? 'Đang xử lý...' : 'Phân Công'}
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
    </>
  );
};
