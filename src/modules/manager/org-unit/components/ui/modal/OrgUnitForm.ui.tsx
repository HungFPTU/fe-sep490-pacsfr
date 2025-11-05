'use client';

import React from 'react';
import { ToggleSwitch } from '@/shared/components/manager/ui';
import { FormApiOf } from '@/types/types';
import { ORG_UNIT_TYPES } from '../../../enums';
import { useDepartments } from '@/modules/manager/department/hooks';
import { getValuesPage } from '@/types/rest';
import {
    validateDepartmentId,
    validateUnitCode,
    validateUnitName,
    validateUnitType,
    validatePhone,
    validateEmail,
    validateAddress,
} from '../../../utils';

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

export const OrgUnitForm: React.FC<Props> = ({ form, isLoading, isEdit }) => {
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
            {/* Department */}
            <form.Field
                name="departmentId"
                validators={{
                    onBlur: ({ value }: { value: string }) => validateDepartmentId(value),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="departmentId" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Phòng ban
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <select
                                id="departmentId"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                disabled={isLoading}
                            >
                                <option value="">Chọn phòng ban</option>
                                {departmentOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            {/* Unit Code */}
            <form.Field
                name="unitCode"
                validators={{
                    onBlur: ({ value }: { value: string }) => validateUnitCode(value),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="unitCode" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Mã cơ quan
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <input
                                id="unitCode"
                                type="text"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isEdit || isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                placeholder="Nhập mã cơ quan"
                                disabled={isEdit || isLoading}
                            />
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            {/* Unit Name */}
            <form.Field
                name="unitName"
                validators={{
                    onBlur: ({ value }: { value: string }) => validateUnitName(value),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="unitName" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Tên cơ quan
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <input
                                id="unitName"
                                type="text"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                placeholder="Nhập tên cơ quan"
                                disabled={isLoading}
                            />
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            {/* Unit Type */}
            <form.Field
                name="unitType"
                validators={{
                    onBlur: ({ value }: { value: string }) => validateUnitType(value),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="unitType" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Loại hình
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <select
                                id="unitType"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                disabled={isLoading}
                            >
                                <option value="">Chọn loại hình</option>
                                {unitTypeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            {/* Phone */}
            <form.Field
                name="phone"
                validators={{
                    onBlur: ({ value }: { value: string }) => validatePhone(value),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="phone" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Số điện thoại
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => {
                                    // Only allow numbers
                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                    field.handleChange(value as never);
                                }}
                                onBlur={field.handleBlur}
                                placeholder="Nhập số điện thoại (10-11 số)"
                                maxLength={11}
                                disabled={isLoading}
                            />
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            {/* Email */}
            <form.Field
                name="email"
                validators={{
                    onBlur: ({ value }: { value: string }) => validateEmail(value),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="email" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Email
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                placeholder="Nhập email"
                                disabled={isLoading}
                            />
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            {/* Address */}
            <div className="md:col-span-2">
                <form.Field
                    name="address"
                    validators={{
                        onBlur: ({ value }: { value: string }) => validateAddress(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full">
                                <label htmlFor="address" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Địa chỉ
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <textarea
                                    id="address"
                                    className={`w-full rounded-xl border bg-white outline-none transition p-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    placeholder="Nhập địa chỉ cơ quan"
                                    rows={3}
                                    disabled={isLoading}
                                />
                                {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                            </div>
                        );
                    }}
                </form.Field>
            </div>

            {/* Is Active */}
            <form.Field name="isActive">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => (
                    <ToggleSwitch
                        checked={field.state.value ?? false}
                        onChange={(value: boolean) => {
                            field.handleChange(value);
                        }}
                        label="Kích hoạt đơn vị"
                        description={field.state.value ? 'Hiển thị công khai' : 'Ẩn khỏi danh sách'}
                        disabled={isLoading}
                        aria-label="Kích hoạt đơn vị"
                    />
                )}
            </form.Field>
        </div>
    );
};
