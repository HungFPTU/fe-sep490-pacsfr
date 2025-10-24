'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/manager/modal/BaseModal';
import { ServiceForm } from './ServiceForm.ui';
import { useServiceForm } from '../../../hooks/useServiceForm';
import { useCreateService, useUpdateService } from '../../../hooks';
import { useGlobalToast } from '@/core/patterns/SingletonHook';
import type { Service, CreateServiceRequest, UpdateServiceRequest } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    initData?: Service | null;
}

export const CreateServiceModal: React.FC<Props> = ({
    open,
    onClose,
    initData,
}) => {
    const toast = useGlobalToast();
    const createMutation = useCreateService();
    const updateMutation = useUpdateService();

    const handleSubmit = async (data: CreateServiceRequest | UpdateServiceRequest) => {
        try {
            let res;
            if ('id' in data) {
                // Update
                res = await updateMutation.mutateAsync({
                    id: data.id,
                    request: data,
                });
                if (res?.success) {
                    toast.success('Cập nhật dịch vụ thành công');
                } else {
                    toast.error('Cập nhật dịch vụ thất bại');
                    return;
                }
            } else {
                // Create
                res = await createMutation.mutateAsync(data);
                if (res?.success) {
                    toast.success('Tạo dịch vụ mới thành công');
                } else {
                    toast.error('Tạo dịch vụ mới thất bại');
                    return;
                }
            }
            onClose();
        } catch (error) {
            toast.error('Có lỗi xảy ra khi lưu dịch vụ');
            console.error('Submit error:', error);
        }
    };

    const { form, isEdit } = useServiceForm({
        initData,
        onSubmit: handleSubmit,
        open,
    });

    const isLoading = createMutation.isPending || updateMutation.isPending;

    const handleOk = async () => {
        await form.handleSubmit();
    };

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={isEdit ? 'Chỉnh sửa dịch vụ' : 'Tạo dịch vụ mới'}
            onOk={handleOk}
            onCancel={onClose}
            okText={isEdit ? 'Cập nhật' : 'Tạo mới'}
            cancelText="Hủy"
            confirmLoading={isLoading}
            centered
            size="large"
            destroyOnClose={true}
        >
            <ServiceForm form={form} isLoading={isLoading} isEdit={isEdit} />
        </BaseModal>
    );
};

