'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { StaffForm } from './StaffForm.ui';
import { useStaffForm } from '../../../hooks/useStaffForm';
import { useCreateStaff, useAssignServiceGroups } from '../../../hooks';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { CreateStaffRequest, Staff } from '../../../types';

interface CreateStaffModalProps {
  open: boolean;
  onClose: () => void;
  initData?: Staff | null;
  onSuccess?: () => void;
}

export function CreateStaffModal({ open, onClose, initData, onSuccess }: CreateStaffModalProps) {
  const { addToast } = useGlobalToast();
  const createMutation = useCreateStaff();
  const assignServiceGroupsMutation = useAssignServiceGroups();

  const isLoading = createMutation.isPending || assignServiceGroupsMutation.isPending;


  const { form } = useStaffForm({
    open,
    initData: initData || null,
    onSubmit: async (data: CreateStaffRequest) => {
      // Create staff first
      const res = await createMutation.mutateAsync(data);
      if (res?.success && res.data) {
        const createdStaffId = (res.data as Staff).id;

        // Get serviceGroupIds from form state
        const serviceGroupIds = (form.state.values.serviceGroupIds || []) as string[];

        // If service groups are selected, assign them
        if (serviceGroupIds.length > 0 && createdStaffId) {
          try {
            await assignServiceGroupsMutation.mutateAsync({
              staffId: createdStaffId,
              data: {
                serviceGroups: serviceGroupIds.map((id: string) => ({
                  serviceGroupId: id,
                  isActive: true,
                })),
              },
            });
          } catch (assignError) {
            console.error('Error assigning service groups:', assignError);
            // Staff is created but service groups assignment failed
            addToast({
              message: 'Nhân viên đã được tạo nhưng gán chuyên môn thất bại',
              type: 'warning',
            });
          }
        }

        addToast({ message: 'Tạo nhân viên mới thành công', type: 'success' });
        onClose();
        onSuccess?.();
      } else {
        addToast({ message: 'Tạo nhân viên mới thất bại', type: 'error' });
      }
    },
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
      title="Tạo nhân viên mới"
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
      <StaffForm form={form} isLoading={isLoading} isEdit={false} />
    </BaseModal>
  );
}
