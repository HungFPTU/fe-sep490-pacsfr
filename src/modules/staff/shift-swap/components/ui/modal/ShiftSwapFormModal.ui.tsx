'use client';

import React, { useState, useEffect } from 'react';
import { BaseModal } from '@/shared/components/manager';
import { Button } from '@/shared/components/ui/button.ui';
import { Select } from '@/shared/components/ui/select.ui';
import { useCreateShiftSwapRequest, useMyWorkShifts, useAvailableStaffWithShifts } from '../../../hooks';
import { useGlobalToast } from '@/core/patterns/SingletonHook';
import { Calendar, Clock, User, MapPin } from 'lucide-react';
import { formatDate } from '@/shared/lib/utils';

interface StaffShift {
  id: string;
  staffId: string;
  shiftDate: string;
  shiftType: string;
  startTime: string;
  endTime: string;
  counterName?: string;
}

interface StaffInfo {
  id: string;
  name: string;
  code: string;
  shifts?: StaffShift[];
}

interface ShiftSwapFormModalProps {
  open: boolean;
  onClose: () => void;
  myShifts: StaffShift[];
  availableStaff: StaffInfo[];
  onSuccess?: () => void;
  isLoading?: boolean;
}

const ShiftCard: React.FC<{ shift: StaffShift; label: string }> = ({ shift, label }) => (
  <div className="rounded-lg bg-linear-to-br from-slate-50 to-slate-100 p-4 border border-slate-200">
    <p className="mb-3 text-sm font-semibold text-slate-600">{label}</p>
    <div className="space-y-2 text-sm">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-indigo-500" />
        <span className="text-slate-900 font-medium">{formatDate(shift.shiftDate)}</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-indigo-500" />
        <span className="text-slate-900">
          {shift.shiftType} · {shift.startTime} - {shift.endTime}
        </span>
      </div>
      {shift.counterName && (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-indigo-500" />
          <span className="text-slate-600">{shift.counterName}</span>
        </div>
      )}
    </div>
  </div>
);

export const ShiftSwapFormModal: React.FC<ShiftSwapFormModalProps> = ({
  open,
  onClose,
  myShifts: initialMyShifts,
  availableStaff: initialAvailableStaff,
  onSuccess,
  isLoading: externalLoading = false,
}) => {
  const [selectedMyShift, setSelectedMyShift] = useState('');
  const [selectedTargetStaff, setSelectedTargetStaff] = useState('');
  const [selectedTargetShift, setSelectedTargetShift] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch data from API when modal opens
  const { data: myShiftsData, isLoading: myShiftsLoading } = useMyWorkShifts();
  const { data: staffData, isLoading: staffLoading } = useAvailableStaffWithShifts();

  // Use fetched data or fallback to props
  const myShifts = myShiftsData && myShiftsData.length > 0 
    ? myShiftsData 
    : (Array.isArray(initialMyShifts) ? initialMyShifts : []);
  const availableStaff = staffData && staffData.length > 0 
    ? staffData 
    : (Array.isArray(initialAvailableStaff) ? initialAvailableStaff : []);

  const isLoading = externalLoading || myShiftsLoading || staffLoading;

  const createMutation = useCreateShiftSwapRequest();
  const toast = useGlobalToast();

  // Helper function to get target staff shifts (must be defined early)
  const getTargetStaffShifts = (): StaffShift[] => {
    const targetStaff = availableStaff.find((s) => s.id === selectedTargetStaff);
    if (!targetStaff?.shifts) return [];
    return Array.isArray(targetStaff.shifts) ? targetStaff.shifts : [];
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      handleReset();
    }
  }, [open]);

  const selectedMyShiftData = myShifts.find((s) => s.id === selectedMyShift);
  const selectedTargetStaffData = availableStaff.find((s) => s.id === selectedTargetStaff);
  const selectedTargetShiftData = selectedTargetStaffData?.shifts?.find(
    (s) => s.id === selectedTargetShift
  );

  const targetStaffShifts = getTargetStaffShifts();

  const handleReset = () => {
    setSelectedMyShift('');
    setSelectedTargetStaff('');
    setSelectedTargetShift('');
    setReason('');
    setErrors({});
  };

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};

    if (!selectedMyShift) newErrors.myShift = 'Vui lòng chọn ca của bạn';
    if (!selectedTargetStaff) newErrors.targetStaff = 'Vui lòng chọn nhân viên';
    if (!reason.trim()) newErrors.reason = 'Vui lòng nhập lý do đổi ca';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await createMutation.mutateAsync({
        myStaffWorkShiftId: selectedMyShift,
        targetStaffId: selectedTargetStaff,
        targetStaffWorkShiftId: selectedTargetShift || undefined,
        reason: reason.trim(),
      });
      toast.success('Yêu cầu đổi ca đã được gửi thành công');
      handleReset();
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Không thể gửi yêu cầu. Vui lòng thử lại');
    }
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Tạo Yêu Cầu Đổi Ca"
      size="large"
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={createMutation.isPending}>
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={createMutation.isPending}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {createMutation.isPending ? 'Đang gửi...' : 'Gửi Yêu Cầu'}
          </Button>
        </div>
      }
    >
      <div className="space-y-6 py-4 max-h-[80vh] overflow-y-auto">
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
          </div>
        )}

        {!isLoading && (
          <>
        {/* Step 1: My Shift Selection */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">
            1️⃣ Chọn Ca Làm Việc Của Bạn
          </h3>
          <Select
            value={selectedMyShift}
            onChange={(e) => {
              setSelectedMyShift(e.target.value);
              setSelectedTargetShift(''); // Reset target shift
              setErrors({ ...errors, myShift: '' });
            }}
            options={myShifts.map((shift) => ({
              value: shift.id,
              label: `${shift.shiftType} - ${formatDate(shift.shiftDate)} (${shift.startTime} - ${shift.endTime})`,
            }))}
          />
          {errors.myShift && <p className="text-xs text-red-500">{errors.myShift}</p>}

          {/* Display selected shift details */}
          {selectedMyShiftData && (
            <ShiftCard shift={selectedMyShiftData} label="Ca của bạn" />
          )}
        </div>

        {/* Step 2: Target Staff Selection */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">
            2️⃣ Chọn Nhân Viên Muốn Đổi
          </h3>
          <Select
            value={selectedTargetStaff}
            onChange={(e) => {
              setSelectedTargetStaff(e.target.value);
              setSelectedTargetShift(''); // Reset target shift
              setErrors({ ...errors, targetStaff: '' });
            }}
            options={availableStaff.map((staff) => ({
              value: staff.id,
              label: `${staff.name} (${staff.code}) - ${staff.shifts?.length || 0} ca`,
            }))}
          />
          {errors.targetStaff && <p className="text-xs text-red-500">{errors.targetStaff}</p>}

          {/* Display target staff info */}
          {selectedTargetStaffData && (
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-900">
                  {selectedTargetStaffData.name} ({selectedTargetStaffData.code})
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Có {targetStaffShifts.length} ca làm việc
              </p>
            </div>
          )}
        </div>

        {/* Step 3: Target Shift Selection (Optional) */}
        {targetStaffShifts.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">
              3️⃣ Chọn Ca Của Nhân Viên (Tùy Chọn)
            </h3>
            <p className="text-xs text-slate-600">
              Nếu không chọn, nhân viên có thể chọn ca nào cũng được
            </p>
            <Select
              value={selectedTargetShift}
              onChange={(e) => {
                setSelectedTargetShift(e.target.value);
              }}
              options={[
                { value: '', label: 'Không chỉ định ca cụ thể' },
                ...targetStaffShifts.map((shift) => ({
                  value: shift.id,
                  label: `${shift.shiftType} - ${formatDate(shift.shiftDate)} (${shift.startTime} - ${shift.endTime})`,
                })),
              ]}
            />

            {/* Display target shift details */}
            {selectedTargetShiftData && (
              <ShiftCard shift={selectedTargetShiftData} label="Ca của nhân viên" />
            )}
          </div>
        )}

        {/* Step 4: Reason */}
        <div className="space-y-3 border-t border-slate-200 pt-4">
          <h3 className="text-sm font-semibold text-slate-900">
            4️⃣ Lý Do Đổi Ca
          </h3>
          <textarea
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setErrors({ ...errors, reason: '' });
            }}
            placeholder="Nhập lý do muốn đổi ca..."
            className="w-full min-h-[100px] rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            disabled={createMutation.isPending}
          />
          <p className="text-xs text-slate-500">
            {reason.length} / 500 ký tự
          </p>
          {errors.reason && <p className="text-xs text-red-500">{errors.reason}</p>}
        </div>

        {/* Summary */}
        {selectedMyShiftData && selectedTargetStaffData && (
          <div className="rounded-lg bg-indigo-50 border border-indigo-200 p-4 space-y-2">
            <p className="text-sm font-medium text-indigo-900">📋 Tóm Tắt Yêu Cầu:</p>
            <ul className="text-sm text-indigo-800 space-y-1 list-disc list-inside">
              <li>Bạn đang có: {selectedMyShiftData.shiftType} ({formatDate(selectedMyShiftData.shiftDate)})</li>
              <li>Muốn đổi với: {selectedTargetStaffData.name}</li>
              {selectedTargetShiftData && (
                <li>Nhận ca: {selectedTargetShiftData.shiftType} ({formatDate(selectedTargetShiftData.shiftDate)})</li>
              )}
            </ul>
          </div>
        )}
          </>
        )}
      </div>
    </BaseModal>
  );
};

