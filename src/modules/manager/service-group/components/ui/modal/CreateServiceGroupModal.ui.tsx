/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { BaseModal } from '@/shared/components/manager/modal/BaseModal';
import { InputField, TextareaField, CheckboxField } from '@/shared/components/manager/form/BaseForm';
import { FormApiOf } from '@/types/types';
import { useCreateServiceGroup, useUpdateServiceGroup } from '../../../hooks';
import type { ServiceGroup, CreateServiceGroupRequest } from '../../../types';
import { useGlobalToast } from '@core/patterns/SingletonHook';

type FormValues = {
    groupCode: string;
    groupName: string;
    description: string;
    iconUrl: string;
    displayOrder: number;
    isActive: boolean;
};

interface Props {
    open: boolean;
    onClose: () => void;
    initData?: ServiceGroup | null;
    onSuccess?: () => void;
}

export const CreateServiceGroupModal: React.FC<Props> = ({
    open,
    onClose,
    initData,
    onSuccess
}) => {
    const createMutation = useCreateServiceGroup();
    const updateMutation = useUpdateServiceGroup();
    const { addToast } = useGlobalToast();

    const toFormValues = (data?: Partial<ServiceGroup> | null): FormValues => ({
        groupCode: data?.groupCode ?? '',
        groupName: data?.groupName ?? '',
        description: data?.description ?? '',
        iconUrl: data?.iconUrl ?? '',
        displayOrder: data?.displayOrder ?? 0,
        isActive: data?.isActive ?? true,
    });

    const form = useForm({
        defaultValues: toFormValues(initData),
        onSubmit: async ({ value }) => {
            try {
                const request: CreateServiceGroupRequest = {
                    groupCode: value.groupCode,
                    groupName: value.groupName,
                    description: value.description,
                    iconUrl: value.iconUrl,
                    displayOrder: value.displayOrder,
                    isActive: value.isActive,
                };

                if (initData?.id) {
                    // Update existing service group
                    const res = await updateMutation.mutateAsync({
                        id: initData?.id ?? '',
                        request: {
                            ...request,
                            id: initData?.id ?? '',
                        },
                    });
                    if (res?.success) {
                        addToast({ message: 'Cập nhật nhóm dịch vụ thành công', type: 'success' });
                        onSuccess?.();
                        onClose();
                    } else {
                        addToast({ message: 'Cập nhật nhóm dịch vụ thất bại', type: 'error' });
                    }
                } else {
                    // Create new service group
                    const res = await createMutation.mutateAsync(request);
                    if (res?.success) {
                        addToast({ message: 'Tạo nhóm dịch vụ thành công', type: 'success' });
                        onSuccess?.();
                        onClose();
                    } else {
                        addToast({ message: 'Tạo nhóm dịch vụ thất bại', type: 'error' });
                    }
                }
            } catch (error) {
                console.error('Error saving service group:', error);
                addToast({ message: 'Đã xảy ra lỗi khi lưu nhóm dịch vụ', type: 'error' });
            }
        },
    });

    useEffect(() => {
        if (open) {
            form.reset(toFormValues(initData));
        }
    }, [open, initData?.id]);

    const handleOk = () => form.handleSubmit();

    const isLoading = createMutation.isPending || updateMutation.isPending;

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={initData?.id ? 'Cập nhật nhóm dịch vụ' : 'Tạo nhóm dịch vụ mới'}
            onOk={handleOk}
            onCancel={onClose}
            okText="Lưu"
            cancelText="Hủy"
            centered
            size="large"
            maskClosable={!isLoading}
            keyboard={!isLoading}
            confirmLoading={isLoading}
        >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputField<FormValues>
                    form={form as FormApiOf<FormValues>}
                    name="groupCode"
                    label="Mã nhóm"
                    required
                    placeholder="Nhập mã nhóm dịch vụ"
                    disabled={!!initData?.id}
                />

                <InputField<FormValues>
                    form={form as FormApiOf<FormValues>}
                    name="groupName"
                    label="Tên nhóm"
                    required
                    placeholder="Nhập tên nhóm dịch vụ"
                />

                <InputField<FormValues>
                    form={form as FormApiOf<FormValues>}
                    name="iconUrl"
                    label="URL icon"
                    required
                    placeholder="https://example.com/icon.png"
                    className="md:col-span-2"
                />

                <InputField<FormValues>
                    form={form as FormApiOf<FormValues>}
                    name="displayOrder"
                    label="Thứ tự hiển thị"
                    type="number"
                    placeholder="0"
                />

                <div className="flex items-end pb-2">
                    <CheckboxField<FormValues>
                        form={form as FormApiOf<FormValues>}
                        name="isActive"
                        label="Kích hoạt"
                    />
                </div>

                <TextareaField<FormValues>
                    className="md:col-span-2"
                    form={form as FormApiOf<FormValues>}
                    name="description"
                    label="Mô tả"
                    placeholder="Nhập mô tả nhóm dịch vụ"
                    rows={4}
                />
            </div>
        </BaseModal>
    );
};

