'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { useCreateWorkShift, useUpdateWorkShift, useWorkShiftForm } from '../../../hooks';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { CreateWorkShiftRequest, UpdateWorkShiftRequest, WorkShift } from '../../../types';
import { WorkShiftForm } from './WorkShitfForm.ui';

import { validateDuplicateShift } from '../../../utils/validation';
import { isHoliday } from '../../../utils';

interface CreateWorkShiftModalProps {
  open: boolean;
  initData?: WorkShift | null;
  existingShifts?: WorkShift[];
  onSuccess?: () => void;
  onClose: () => void;
}

export function CreateWorkShiftModal({
  open,
  initData,
  existingShifts = [],
  onSuccess,
  onClose,
}: CreateWorkShiftModalProps) {
  const { addToast } = useGlobalToast();
  const createMutation = useCreateWorkShift();
  const updateMutation = useUpdateWorkShift();

  const isLoading = createMutation.isPending;

  const handleSubmit = async (data: CreateWorkShiftRequest) => {
    // Validate duplicate shift on the same day
    if (!initData && existingShifts.length > 0) {
      const duplicateError = validateDuplicateShift(
        data.shiftDate,
        data.shiftType,
        existingShifts
      );

      if (duplicateError) {
        addToast({
          message: duplicateError,
          type: 'error',
        });
        return;
      }
    }

    // Validate holiday
    const dateToCheck = typeof data.shiftDate === 'string' ? data.shiftDate : new Date(data.shiftDate).toISOString();
    if (isHoliday(dateToCheck)) {
      addToast({
        message: 'Đây là ngày nghỉ không thể tạo ca làm việc',
        type: 'error',
      });
      return;
    }

    if (initData && initData.id) {
      try {
        // Lấy ngày giờ tử WS hiện tại 
        const dateStr = typeof data.shiftDate === 'string'
          ? data.shiftDate
          : new Date(data.shiftDate).toISOString().split('T')[0];
        const [year, month, day] = dateStr.split('-');
        const dateObj = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)));
        const shiftDateISO = dateObj.toISOString();


        const request: UpdateWorkShiftRequest = {
          id: initData.id,
          counterId: '3fa85f64-5717-4562-b3fc-2c963f66afa6', //Cái này fix cứng nha thầy Tài
          shiftDate: shiftDateISO,
          startTime: data.startTime,
          endTime: data.endTime,
          shiftType: data.shiftType,
          description: data.description,
        };

        const res = await updateMutation.mutateAsync({ id: initData.id, request });
        if (res?.success) {
          addToast({ message: 'Cập nhật ca mới thành công', type: 'success' });
        } else {
          addToast({ message: 'Cập nhật ca mới thất bại', type: 'error' });
          return;
        }
        onClose();
      } catch (error: any) {
        // Extract error message from backend
        const errorMessage = error?.message ||
          error?.response?.data?.message ||
          error?.response?.data?.title ||
          'Có lỗi xảy ra khi cập nhật ca làm việc';

        addToast({
          message: errorMessage,
          type: 'error'
        });
        console.error('Submit error:', error);
      }
      return;
    } else {
      try {
        const res = await createMutation.mutateAsync(data);
        if (res?.success) {
          addToast({ message: 'Tạo ca mới thành công', type: 'success' });
        } else {
          addToast({ message: 'Tạo ca mới thất bại', type: 'error' });
          return;
        }
        onClose();
      } catch (error: any) {
        // Extract error message from backend
        const errorMessage = error?.message ||
          error?.response?.data?.message ||
          error?.response?.data?.title ||
          'Có lỗi xảy ra khi lưu ca làm việc';

        addToast({
          message: errorMessage,
          type: 'error'
        });
        console.error('Submit error:', error);
      }
    }
  };

  const { form } = useWorkShiftForm({
    open,
    initData: initData || null,
    onSubmit: handleSubmit,
    onClose,
    onSuccess,
  });

  const handleOk = async () => {
    await form.handleSubmit();
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={initData ? 'Chỉnh sửa ca làm việc' : 'Tạo ca làm việc mới'}
      onOk={handleOk}
      onCancel={onClose}
      okText="Xác nhận"
      cancelText="Hủy"
      confirmLoading={isLoading}
      centered
      size="large"
      maskClosable={!isLoading}
      keyboard={!isLoading}
      destroyOnClose={true}
    >
      <WorkShiftForm form={form} isLoading={isLoading} isEdit={false} />
    </BaseModal>
  );
}
