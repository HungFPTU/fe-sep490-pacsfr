'use client';

import React, { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { BaseModal } from '@/shared/components/manager/features/modal/BaseModal';
import { SelectField } from '@/shared/components/manager/features/form/BaseForm';
import { useAssignServiceGroup, useServiceGroupOptions } from '../../../hooks';
import type { AssignServiceGroupRequest } from '../../../types';
import type { FormApiOf } from '@/types/types';
import { FolderIcon } from '@heroicons/react/24/outline';

interface Props {
    open: boolean;
    onClose: () => void;
    counterId: string | null;
    onSuccess?: () => void;
}

export const AssignServiceGroupModal: React.FC<Props> = ({ open, onClose, counterId, onSuccess }) => {
    const assignMutation = useAssignServiceGroup();
    const { data: serviceGroupOptions = [], isLoading: isLoadingServiceGroups } = useServiceGroupOptions();

    const form = useForm({
        defaultValues: {
            serviceGroupId: '',
            serviceType: '',
            priorityLevel: 0,
        } as AssignServiceGroupRequest,
        onSubmit: async ({ value }: { value: AssignServiceGroupRequest }) => {
            if (!counterId) return;
            try {
                await assignMutation.mutateAsync({ 
                    counterId, 
                    data: {
                        serviceGroupId: value.serviceGroupId,
                        serviceType: value.serviceType || undefined,
                        priorityLevel: value.priorityLevel || undefined,
                    }
                });
                onSuccess?.();
                onClose();
            } catch (error) {
                console.error('Error assigning service group:', error);
            }
        },
    });

    useEffect(() => {
        if (open) {
            form.reset({
                serviceGroupId: '',
                serviceType: '',
                priorityLevel: 0,
            });
        }
    }, [open]);

    const handleOk = async () => {
        if (assignMutation.isPending || !counterId) {
            return;
        }
        await form.handleSubmit();
    };

    const selectOptions = serviceGroupOptions.map((group) => ({
        label: group.groupName,
        value: group.id,
    }));

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={
                <div className="flex items-center gap-2">
                    <FolderIcon className="h-5 w-5 text-indigo-600" />
                    <span>Gán Nhóm Dịch Vụ</span>
                </div>
            }
            onOk={handleOk}
            onCancel={onClose}
            okText="Gán nhóm dịch vụ"
            cancelText="Hủy Bỏ"
            centered
            size="medium"
            maskClosable={!assignMutation.isPending}
            keyboard={!assignMutation.isPending}
            confirmLoading={assignMutation.isPending}
        >
            <div className="space-y-4">
                <SelectField<AssignServiceGroupRequest, string>
                    form={form as FormApiOf<AssignServiceGroupRequest>}
                    name="serviceGroupId"
                    label="Chọn nhóm dịch vụ"
                    required
                    placeholder="— Chọn nhóm dịch vụ —"
                    options={selectOptions}
                    disabled={assignMutation.isPending || isLoadingServiceGroups}
                />
            </div>
        </BaseModal>
    );
};

