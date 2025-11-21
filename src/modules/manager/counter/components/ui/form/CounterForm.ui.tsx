'use client';

import React from 'react';
import { useForm } from '@tanstack/react-form';
import { InputField } from '@/shared/components/manager/features/form/BaseForm';
import type { FormApiOf } from '@/types/types';
import type { CreateCounterRequest } from '../../../types';

interface Props {
    form: FormApiOf<CreateCounterRequest>;
    isLoading?: boolean;
}

export const CounterForm: React.FC<Props> = ({ form, isLoading = false }) => {
    return (
        <div className="space-y-4">
            <InputField<CreateCounterRequest>
                form={form}
                name="counterCode"
                label="Mã quầy"
                required
                placeholder="Nhập mã quầy"
                disabled={isLoading}
            />

            <InputField<CreateCounterRequest>
                form={form}
                name="counterName"
                label="Tên quầy"
                required
                placeholder="Nhập tên quầy"
                disabled={isLoading}
            />

            <InputField<CreateCounterRequest>
                form={form}
                name="location"
                label="Vị trí"
                required
                placeholder="Nhập vị trí quầy"
                disabled={isLoading}
            />

            <InputField<CreateCounterRequest>
                form={form}
                name="counterType"
                label="Loại quầy"
                required
                placeholder="Nhập loại quầy"
                disabled={isLoading}
            />

            <InputField<CreateCounterRequest>
                form={form}
                name="maxCapacity"
                label="Sức chứa tối đa"
                type="number"
                required
                placeholder="Nhập sức chứa"
                disabled={isLoading}
                inputProps={{
                    min: 1,
                }}
            />
        </div>
    );
};

