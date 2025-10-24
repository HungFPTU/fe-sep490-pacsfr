'use client';

import React from 'react';
import { InputField, TextareaField, CheckboxField, SelectField } from '@/shared/components/manager/form/BaseForm';
import { FormApiOf } from '@/types/types';
import { ORG_UNIT_TYPES } from '../../../enums';
import { useDepartments } from '@/modules/manager/department/hooks';
import { getValuesPage } from '@/types/rest';

type FormValues = {
    departmentId: string;
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

export const OrgUnitForm: React.FC<Props> = ({ form, isEdit }) => {
    // Fetch departments for dropdown
    const { data: departmentsData } = useDepartments({
        keyword: '',
        isActive: true,
        page: 1,
        size: 100,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pageResult = departmentsData ? getValuesPage(departmentsData as any) : null;
    const departments = pageResult?.items || [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const departmentOptions = departments.map((dept: any) => ({
        value: dept.id,
        label: dept.name,
    }));

    const unitTypeOptions = Array.from(ORG_UNIT_TYPES);

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <form.Field
                name="departmentId"
                validators={{
                    onChange: ({ value }: { value: string }) =>
                        !value || !value.trim() ? 'Phòng ban là bắt buộc' : undefined,
                }}
            >
                {() => (
                    <SelectField<FormValues>
                        form={form as FormApiOf<FormValues>}
                        name="departmentId"
                        label="Phòng ban"
                        required
                        options={departmentOptions}
                        placeholder="Chọn phòng ban"
                    />
                )}
            </form.Field>

            <form.Field
                name="unitCode"
                validators={{
                    onChange: ({ value }: { value: string }) =>
                        !value || !value.trim() ? 'Mã cơ quan là bắt buộc' : undefined,
                }}
            >
                {() => (
                    <InputField<FormValues>
                        form={form as FormApiOf<FormValues>}
                        name="unitCode"
                        label="Mã cơ quan"
                        required
                        placeholder="Nhập mã cơ quan"
                        disabled={isEdit}
                    />
                )}
            </form.Field>

            <form.Field
                name="unitName"
                validators={{
                    onChange: ({ value }: { value: string }) =>
                        !value || !value.trim() ? 'Tên cơ quan là bắt buộc' : undefined,
                }}
            >
                {() => (
                    <InputField<FormValues>
                        form={form as FormApiOf<FormValues>}
                        name="unitName"
                        label="Tên cơ quan"
                        required
                        placeholder="Nhập tên cơ quan"
                    />
                )}
            </form.Field>

            <form.Field
                name="unitType"
                validators={{
                    onChange: ({ value }: { value: string }) =>
                        !value || !value.trim() ? 'Loại hình là bắt buộc' : undefined,
                }}
            >
                {() => (
                    <SelectField<FormValues>
                        form={form as FormApiOf<FormValues>}
                        name="unitType"
                        label="Loại hình"
                        required
                        options={unitTypeOptions}
                        placeholder="Chọn loại hình"
                    />
                )}
            </form.Field>

            <form.Field
                name="phone"
                validators={{
                    onChange: ({ value }: { value: string }) =>
                        !value || !value.trim() ? 'Số điện thoại là bắt buộc' : undefined,
                }}
            >
                {() => (
                    <InputField<FormValues>
                        form={form as FormApiOf<FormValues>}
                        name="phone"
                        label="Số điện thoại"
                        required
                        placeholder="Nhập số điện thoại"
                    />
                )}
            </form.Field>

            <form.Field
                name="email"
                validators={{
                    onChange: ({ value }: { value: string }) =>
                        !value || !value.trim() ? 'Email là bắt buộc' : undefined,
                }}
            >
                {() => (
                    <InputField<FormValues>
                        form={form as FormApiOf<FormValues>}
                        name="email"
                        label="Email"
                        required
                        type="email"
                        placeholder="Nhập email"
                    />
                )}
            </form.Field>

            <div className="flex items-end pb-2">
                <CheckboxField<FormValues>
                    form={form as FormApiOf<FormValues>}
                    name="isActive"
                    label="Kích hoạt"
                />
            </div>

            <form.Field
                name="address"
                validators={{
                    onChange: ({ value }: { value: string }) =>
                        !value || !value.trim() ? 'Địa chỉ là bắt buộc' : undefined,
                }}
            >
                {() => (
                    <TextareaField<FormValues>
                        className="md:col-span-2"
                        form={form as FormApiOf<FormValues>}
                        name="address"
                        label="Địa chỉ"
                        required
                        placeholder="Nhập địa chỉ cơ quan"
                        rows={3}
                    />
                )}
            </form.Field>
        </div>
    );
};

