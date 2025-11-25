'use client';

import React, { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { BaseModal } from '@/shared/components/manager/features/modal/BaseModal';
import { CounterForm } from '../form/CounterForm.ui';
import { useCounterById, useUpdateCounter } from '../../../hooks';
import { EyeIcon } from '@heroicons/react/24/outline';
import type { UpdateCounterRequest, CounterFormValues, Counter } from '../../../types';
import type { FormApiOf } from '@/types/types';

interface Props {
    open: boolean;
    onClose: () => void;
    counterId: string | null;
    onSuccess?: () => void;
}

export const CounterDetailModal: React.FC<Props> = ({ open, onClose, counterId, onSuccess }) => {
    const { data: counter, isLoading } = useCounterById(counterId);
    const updateMutation = useUpdateCounter();

    const form = useForm({
        defaultValues: {
            counterCode: '',
            counterName: '',
            location: '',
            counterType: '',
            maxCapacity: 0,
        } as CounterFormValues,
        onSubmit: async ({ value }: { value: CounterFormValues }) => {
            if (!counterId || !counter) return;
            try {
                const updateData: UpdateCounterRequest = {
                    ...value,
                    isActive: counter.isActive ?? true,
                };
                await updateMutation.mutateAsync({
                    id: counterId,
                    data: updateData,
                });
                onSuccess?.();
            } catch (error) {
                console.error('Error updating counter:', error);
            }
        },
    });

    useEffect(() => {
        if (open && counter) {
            form.reset({
                counterCode: counter.counterCode || '',
                counterName: counter.counterName || '',
                location: counter.location || '',
                counterType: counter.counterType || '',
                maxCapacity: counter.maxCapacity || 0,
            });
        }
    }, [open, counter]);

    const handleOk = async () => {
        if (updateMutation.isPending) {
            return;
        }
        await form.handleSubmit();
    };

    const handleCancel = () => {
        if (counter) {
            form.reset({
                counterCode: counter.counterCode || '',
                counterName: counter.counterName || '',
                location: counter.location || '',
                counterType: counter.counterType || '',
                maxCapacity: counter.maxCapacity || 0,
            });
        }
        onClose();
    };


    return (
        <BaseModal
            open={open}
            onClose={handleCancel}
            title={
                <div className="flex items-center gap-2">
                    <EyeIcon className="h-5 w-5 text-indigo-600" />
                    <span>Chi tiết quầy</span>
                </div>
            }
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Lưu"
            cancelText="Hủy"
            centered
            size="large"
            maskClosable={!updateMutation.isPending}
            keyboard={!updateMutation.isPending}
            confirmLoading={updateMutation.isPending}
        >
            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
                        <p className="text-sm text-slate-600">Đang tải dữ liệu...</p>
                    </div>
                </div>
            ) : counter ? (
                <div className="space-y-6">
                    <CounterForm 
                        form={form} 
                        isLoading={updateMutation.isPending} 
                    />

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Nhóm dịch vụ
                        </label>
                        {counter.serviceGroups?.$values && counter.serviceGroups.$values.length > 0 ? (
                            <div className="space-y-2">
                                {counter.serviceGroups.$values.map((sg) => (
                                    <div
                                        key={sg.id}
                                        className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex rounded bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800">
                                                {sg.groupName}
                                            </span>
                                            <span className="text-sm text-slate-600">
                                                {sg.currentLength} đang chờ
                                            </span>
                                        </div>
                                        {sg.status && (
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                    sg.status === 'Active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-slate-100 text-slate-800'
                                                }`}
                                            >
                                                {sg.status}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center">
                                <p className="text-sm text-slate-500">Không có nhóm dịch vụ</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <p className="text-sm text-slate-600">Không tìm thấy thông tin quầy</p>
                    </div>
                </div>
            )}
        </BaseModal>
    );
};

