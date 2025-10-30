'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { useCreateWorkShift, useUpdateWorkShift, useWorkShiftForm } from '../../../hooks';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { CreateWorkShiftRequest, WorkShift } from '../../../types';
import { WorkShiftForm } from './WorkShitfForm.ui';

interface CreateWorkShiftModalProps {
  open: boolean;
  initData?: WorkShift | null;
  onSuccess?: () => void;
  onClose: () => void;
}

export function CreateWorkShiftModal({
  open,
  initData,
  onSuccess,
  onClose,
}: CreateWorkShiftModalProps) {
  const { addToast } = useGlobalToast();
  const createMutation = useCreateWorkShift();
  const updateMutation = useUpdateWorkShift();

  const isLoading = createMutation.isPending;

  const handleSubmit = async (data: CreateWorkShiftRequest) => {
    if (initData && initData.id) {
      try {
        const request = { ...data, id: initData.id };
        const res = await updateMutation.mutateAsync({ id: initData.id, request });
        if (res?.success) {
          addToast({ message: 'Cập nhật ca mới thành công', type: 'success' });
        } else {
          addToast({ message: 'Cập nhật ca mới thất bại', type: 'error' });
          return;
        }
        onClose();
      } catch (error) {
        addToast({ message: 'Có lỗi xảy ra khi lưu ca làm việc', type: 'error' });
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
      } catch (error) {
        addToast({ message: 'Có lỗi xảy ra khi lưu ca làm việc', type: 'error' });
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
