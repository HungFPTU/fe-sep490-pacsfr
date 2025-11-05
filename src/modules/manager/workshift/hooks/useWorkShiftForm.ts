import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import type { WorkShift, CreateWorkShiftRequest } from '../types';

export interface WorkShiftFormValues {
  counterId: string;
  staffId: string;
  shiftDate: string;
  shiftType: string;
  startTime: string;
  endTime: string;
  description?: string;
  isActive: boolean;
}

interface UseWorkShiftFormProps {
  initData?: WorkShift | null;
  open: boolean;
  onSubmit: (data: CreateWorkShiftRequest) => Promise<void>;
  onSuccess?: () => void;
  onClose: () => void;
}

const toFormValues = (data?: WorkShift | null): WorkShiftFormValues => ({
  counterId: data?.counterId ?? '',
  staffId: data?.staffId ?? '',
  shiftDate: data?.shiftDate ? new Date(data.shiftDate).toISOString().split('T')[0] : '',
  shiftType: data?.shiftType ?? '',
  startTime: data?.startTime ?? '',
  endTime: data?.endTime ?? '',
  description: data?.description ?? '',
  isActive: data?.isActive ?? true,
});

function toRequest(values: WorkShiftFormValues): CreateWorkShiftRequest {
  return {
    counterId: values.counterId,
    staffId: values.staffId,
    shiftDate: values.shiftDate,
    shiftType: values.shiftType,
    startTime: values.startTime,
    endTime: values.endTime,
    description: values.description || '',
  };
}

export const useWorkShiftForm = ({
  open,
  initData,
  onSubmit,
  onSuccess,
}: UseWorkShiftFormProps) => {
  const { addToast } = useGlobalToast();

  const form = useForm({
    defaultValues: toFormValues(initData),
    onSubmit: async ({ value }) => {
      // Final validation before submit
      if (!value.shiftType?.trim()) {
        addToast({ message: 'Vui lòng nhập tên ca', type: 'error' });
        return;
      }
      if (!value.startTime?.trim()) {
        addToast({ message: 'Vui lòng nhập giờ bắt đầu', type: 'error' });
        return;
      }
      if (!value.endTime?.trim()) {
        addToast({ message: 'Vui lòng nhập giờ kết thúc', type: 'error' });
        return;
      }

      try {
        const request = toRequest(value);
        await onSubmit(request);
        onSuccess?.();
      } catch (error) {
        console.error('Form submission error:', error);
        addToast({
          message: 'Có lỗi xảy ra khi lưu thông tin ca làm việc',
          type: 'error',
        });
      }
    },
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (open) {
      form.reset(toFormValues(initData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initData?.id]);

  return { form };
};
