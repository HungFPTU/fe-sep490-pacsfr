'use client';

import React from 'react';
import { ObjectValue } from '@tanstack/react-form';
import { InputField, SelectField, CheckboxField } from '@/shared/components/manager/form/BaseForm';
import { StaffFormValues } from '../../../hooks/useStaffForm';
import { ROLE_TYPE_OPTIONS, STAFF_POSITION_OPTIONS } from '../../../constants';
import { useOrgUnits } from '@/modules/manager/org-unit/hooks';
import { getValuesPage, RestPaged } from '@/types/rest';
import { FormApiOf } from '@/types/types';
import { OrgUnit } from '@/modules/manager/org-unit';

interface StaffFormProps {
    form: FormApiOf<StaffFormValues>;
    isLoading: boolean;
    isEdit: boolean;
}

export function StaffForm({ form, isLoading, isEdit }: StaffFormProps) {
    // Fetch org units for dropdown
    const { data: orgUnitsData } = useOrgUnits({ isActive: true });
    const orgUnits = getValuesPage(orgUnitsData as RestPaged<OrgUnit>);

    const orgUnitOptions = orgUnits.items?.map((unit: OrgUnit) => ({
        value: unit.id as string,
        label: unit.unitName,
    })) as { value: string; label: string }[];

    return (
        <div className="space-y-4">
            {/* Org Unit */}
            <form.Field
                name="orgUnitId"
                validators={{
                    onBlur: ({ value }: { value: string }) =>
                        !value || !value.trim() ? 'Cơ quan là bắt buộc' : undefined,
                }}
            >
                {() => (
                    <SelectField<StaffFormValues>
                        form={form}
                        name="orgUnitId"
                        label="Cơ quan"
                        required
                        options={orgUnitOptions}
                        placeholder="Vui lòng chọn cơ quan"
                        disabled={isLoading}
                    />
                )}
            </form.Field>

            {/* Staff Code & Full Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field
                    name="staffCode"
                    validators={{
                        onBlur: ({ value }: { value: string }) =>
                            !value || !value.trim() ? 'Mã nhân viên là bắt buộc' : undefined,
                    }}
                >
                    {() => (
                        <InputField<StaffFormValues>
                            form={form}
                            name="staffCode"
                            label="Mã nhân viên"
                            required
                            placeholder="Vui lòng nhập mã nhân viên"
                            disabled={isLoading || isEdit}
                        />
                    )}
                </form.Field>

                <form.Field
                    name="fullName"
                    validators={{
                        onBlur: ({ value }: { value: string }) =>
                            !value || !value.trim() ? 'Họ tên là bắt buộc' : undefined,
                    }}
                >
                    {() => (
                        <InputField<StaffFormValues>
                            form={form}
                            name="fullName"
                            label="Họ và tên"
                            required
                            placeholder="Vui lòng nhập họ và tên"
                            disabled={isLoading}
                        />
                    )}
                </form.Field>
            </div>

            {/* Username & Password (only for create) */}
            {!isEdit && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <form.Field
                        name="username"
                        validators={{
                            onBlur: ({ value }: { value: string }) =>
                                !value || !value.trim() ? 'Tên đăng nhập là bắt buộc' : undefined,
                        }}
                    >
                        {() => (
                            <InputField<StaffFormValues>
                                form={form}
                                name="username"
                                label="Tên đăng nhập"
                                required
                                placeholder="Vui lòng nhập tên đăng nhập"
                                disabled={isLoading}
                            />
                        )}
                    </form.Field>

                    <form.Field
                        name="password"
                        validators={{
                            onBlur: ({ value }: { value: ObjectValue<never, StaffFormValues, "password"> }) =>
                                !value || !value.trim() ? 'Mật khẩu là bắt buộc' : undefined,
                        }}
                    >
                        {() => (
                            <InputField<StaffFormValues>
                                form={form}
                                name="password"
                                label="Mật khẩu"
                                required
                                type="password"
                                placeholder="Vui lòng nhập mật khẩu"
                                disabled={isLoading}
                            />
                        )}
                    </form.Field>
                </div>
            )}

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field
                    name="email"
                    validators={{
                        onBlur: ({ value }: { value: string }) => {
                            if (!value || !value.trim()) return 'Email là bắt buộc';
                            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email không hợp lệ';
                            return undefined;
                        },
                    }}
                >
                    {() => (
                        <InputField<StaffFormValues>
                            form={form}
                            name="email"
                            label="Email"
                            required
                            type="email"
                            placeholder="Vui lòng nhập email"
                            disabled={isLoading}
                        />
                    )}
                </form.Field>

                <form.Field
                    name="phone"
                    validators={{
                        onBlur: ({ value }: { value: string }) => {
                            if (!value || !value.trim()) return 'Số điện thoại là bắt buộc';
                            if (!/^[0-9]{10,11}$/.test(value)) return 'Số điện thoại không hợp lệ';
                            return undefined;
                        },
                    }}
                >
                    {() => (
                        <InputField<StaffFormValues>
                            form={form}
                            name="phone"
                            label="Số điện thoại"
                            required
                            placeholder="Vui lòng nhập số điện thoại (10-11 số)"
                            disabled={isLoading}
                        />
                    )}
                </form.Field>
            </div>

            {/* Position & Role Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field
                    name="position"
                    validators={{
                        onBlur: ({ value }: { value: string }) =>
                            !value || !value.trim() ? 'Chức vụ là bắt buộc' : undefined,
                    }}
                >
                    {() => (
                        <SelectField<StaffFormValues>
                            form={form}
                            name="position"
                            label="Chức vụ"
                            required
                            options={STAFF_POSITION_OPTIONS}
                            placeholder="Vui lòng chọn chức vụ"
                            disabled={isLoading}
                        />
                    )}
                </form.Field>

                <form.Field
                    name="roleType"
                    validators={{
                        onBlur: ({ value }: { value: string }) =>
                            !value || !value.trim() ? 'Vai trò là bắt buộc' : undefined,
                    }}
                >
                    {() => (
                        <SelectField<StaffFormValues>
                            form={form}
                            name="roleType"
                            label="Vai trò"
                            required
                            options={ROLE_TYPE_OPTIONS}
                            placeholder="Vui lòng chọn vai trò"
                            disabled={isLoading}
                        />
                    )}
                </form.Field>
            </div>

            {/* Specialization */}
            <form.Field name="specialization">
                {() => (
                    <InputField<StaffFormValues>
                        form={form}
                        name="specialization"
                        label="Chuyên môn"
                        placeholder="Vui lòng nhập chuyên môn"
                        disabled={isLoading}
                    />
                )}
            </form.Field>

            {/* Is Active (only for edit) */}
            {isEdit && (
                <form.Field name="isActive">
                    {() => (
                        <CheckboxField<StaffFormValues>
                            form={form}
                            name="isActive"
                            label="Trạng thái hoạt động"
                            disabled={isLoading}
                        />
                    )}
                </form.Field>
            )}
        </div>
    );
}

