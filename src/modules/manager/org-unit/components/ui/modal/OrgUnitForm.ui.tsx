'use client';

import React from 'react';
import { InputField, TextareaField, CheckboxField, SelectField } from '@/shared/components/manager/form/BaseForm';
import { FormApiOf } from '@/types/types';
import { ORG_UNIT_TYPES } from '../../../enums';

type FormValues = {
    unitCode: string;
    unitName: string;
    unitType: string;
    address: string;
    phone: string;
    email: string;
    isActive: boolean;
};

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any;
    isLoading: boolean;
    isEdit: boolean;
}

export const OrgUnitForm: React.FC<Props> = ({ form, isLoading, isEdit }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="unitCode"
                label="Mã cơ quan"
                required
                placeholder="Nhập mã cơ quan"
                disabled={isEdit}
            />

            <InputField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="unitName"
                label="Tên cơ quan"
                required
                placeholder="Nhập tên cơ quan"
            />

            <SelectField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="unitType"
                label="Loại hình"
                required
                options={ORG_UNIT_TYPES}
                placeholder="Chọn loại hình"
            />

            <InputField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="phone"
                label="Số điện thoại"
                required
                placeholder="Nhập số điện thoại"
            />

            <InputField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="email"
                label="Email"
                required
                type="email"
                placeholder="Nhập email"
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
                name="address"
                label="Địa chỉ"
                required
                placeholder="Nhập địa chỉ cơ quan"
                rows={3}
            />
        </div>
    );
};

