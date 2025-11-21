'use client';

import React, { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { BaseModal } from '@/shared/components/manager/features/modal/BaseModal';
import { CounterForm } from '../form/CounterForm.ui';
import { useCreateCounter } from '../../../hooks';
import type { CreateCounterRequest } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export const CreateCounterModal: React.FC<Props> = ({ open, onClose, onSuccess }) => {
    const createMutation = useCreateCounter();

    const form = useForm({
        defaultValues: {
            counterCode: '',
            counterName: '',
            location: '',
            counterType: '',
            maxCapacity: 0,
        } as CreateCounterRequest,
        onSubmit: async ({ value }: { value: CreateCounterRequest }) => {
            try {
                await createMutation.mutateAsync(value);
                onSuccess?.();
                onClose();
            } catch (error) {
                console.error('Error creating counter:', error);
            }
        },
    });

    useEffect(() => {
        if (open) {
            form.reset({
                counterCode: '',
                counterName: '',
                location: '',
                counterType: '',
                maxCapacity: 0,
            });
        }
    }, [open]);

    const handleOk = async () => {
        if (createMutation.isPending) {
            return;
        }
        await form.handleSubmit();
    };

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title="Tạo quầy mới"
            onOk={handleOk}
            onCancel={onClose}
            okText="Tạo mới"
            cancelText="Hủy Bỏ"
            centered
            size="large"
            maskClosable={!createMutation.isPending}
            keyboard={!createMutation.isPending}
            confirmLoading={createMutation.isPending}
        >
            <CounterForm form={form} isLoading={createMutation.isPending} />
        </BaseModal>
    );
};

