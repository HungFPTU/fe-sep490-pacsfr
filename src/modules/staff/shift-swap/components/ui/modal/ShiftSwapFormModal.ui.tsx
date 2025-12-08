'use client';

import React, { useState, useEffect } from 'react';
import { BaseModal } from '@/shared/components/manager';
import { Button } from '@/shared/components/ui/button.ui';
import { Select } from '@/shared/components/ui/select.ui';
import { useCreateShiftSwapRequest, useMyWorkShifts, useAvailableStaffWithShifts } from '../../../hooks';
import { useGlobalToast } from '@/core/patterns/SingletonHook';
import { Calendar, Clock, User, MapPin, ArrowRight, AlertCircle } from 'lucide-react';
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

const ShiftCard: React.FC<{ shift: StaffShift; label: string; highlighted?: boolean }> = ({ shift, label, highlighted }) => (
  <div className={`rounded-xl border-2 p-4 transition-all ${
    highlighted 
      ? 'bg-linear-to-br from-indigo-50 to-blue-50 border-indigo-200' 
      : 'bg-linear-to-br from-slate-50 to-slate-100 border-slate-200'
  }`}>
    <p className={`mb-3 text-xs font-bold tracking-wider uppercase ${
      highlighted ? 'text-indigo-600' : 'text-slate-600'
    }`}>{label}</p>
    <div className="space-y-3 text-sm">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${highlighted ? 'bg-indigo-100' : 'bg-slate-200'}`}>
          <Calendar className={`h-4 w-4 ${highlighted ? 'text-indigo-600' : 'text-slate-600'}`} />
        </div>
        <span className="text-slate-900 font-semibold">{formatDate(shift.shiftDate)}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${highlighted ? 'bg-indigo-100' : 'bg-slate-200'}`}>
          <Clock className={`h-4 w-4 ${highlighted ? 'text-indigo-600' : 'text-slate-600'}`} />
        </div>
        <div className="flex-1">
          <p className="text-slate-700 font-medium">{shift.shiftType}</p>
          <p className={`text-xs ${highlighted ? 'text-indigo-600' : 'text-slate-500'}`}>
            {shift.startTime} - {shift.endTime}
          </p>
        </div>
      </div>
      {shift.counterName && (
        <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
          <div className={`p-2 rounded-lg ${highlighted ? 'bg-indigo-100' : 'bg-slate-200'}`}>
            <MapPin className={`h-4 w-4 ${highlighted ? 'text-indigo-600' : 'text-slate-600'}`} />
          </div>
          <span className="text-slate-600 text-sm">{shift.counterName}</span>
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
      title="✨ Tạo Yêu Cầu Đổi Ca Làm Việc"
      size="large"
      footer={
        <div className="flex justify-between items-center">
          <p className="text-xs text-slate-500">Vui lòng điền đủ thông tin để gửi yêu cầu</p>
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={onClose} 
              disabled={createMutation.isPending}
              className="px-6"
            >
              Hủy
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={createMutation.isPending}
              className="bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6"
            >
              {createMutation.isPending ? '⏳ Đang gửi...' : '✓ Gửi Yêu Cầu'}
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-6 py-6 max-h-[80vh] overflow-y-auto px-2">
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent mb-3"></div>
            <p className="text-sm text-slate-600">Đang tải dữ liệu...</p>
          </div>
        )}

        {!isLoading && (
          <>
        {/* Progress Steps */}
        <div className="flex justify-between mb-8 px-2">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 ${
                step <= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {step}
              </div>
              <span className="text-xs text-center text-slate-600 text-wrap">
                {step === 1 && 'Ca của bạn'}
                {step === 2 && 'Nhân viên'}
                {step === 3 && 'Ca họ'}
                {step === 4 && 'Lý do'}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: My Shift Selection */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">1</div>
            <h3 className="text-sm font-bold text-slate-900">
              Chọn Ca Làm Việc Của Bạn
            </h3>
          </div>
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
            Chọn Nhân Viên Muốn Đổi
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
              label: `${staff.name} - ${staff.shifts?.length || 0} ca`,
            }))}
          />
          {errors.targetStaff && <p className="text-xs text-red-500">{errors.targetStaff}</p>}

          {/* Display target staff info */}
          {selectedTargetStaffData && (
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-900">
                  {selectedTargetStaffData.name}
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
              Chọn Ca Của Nhân Viên (Tùy Chọn)
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
            Lý Do Đổi Ca
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

