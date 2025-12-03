'use client';

import React from 'react';
import { StaffFormValues } from '../../../hooks/useStaffForm';
import { ROLE_TYPE_OPTIONS, STAFF_POSITION_OPTIONS } from '../../../constants';
import { useOrgUnits } from '@/modules/manager/org-unit/hooks';
import { getValuesPage, RestPaged } from '@/types/rest';
import { FormApiOf } from '@/types/types';
import { OrgUnit } from '@/modules/manager/org-unit';
import { validateOrgUnit, validateStaffCode, validateFullName, validateUsername, validatePassword, validateEmail, validatePhone, validatePosition, validateRoleType, validateSpecialization } from '../../../utils';
import { useServiceGroups } from '../../../hooks';
import { X } from 'lucide-react';

interface StaffFormProps {
    form: FormApiOf<StaffFormValues>;
    isLoading: boolean;
    isEdit: boolean;
}



// ==================== Component ====================

export function StaffForm({ form, isLoading, isEdit }: StaffFormProps) {
    // Fetch org units for dropdown
    const { data: orgUnitsData } = useOrgUnits({ isActive: true });
    const orgUnits = getValuesPage(orgUnitsData as RestPaged<OrgUnit>);

    const orgUnitOptions = orgUnits.items?.map((unit: OrgUnit) => ({
        value: unit.id as string,
        label: unit.unitName,
    })) as { value: string; label: string }[];

    // Fetch service groups for dropdown
    const { data: serviceGroupsData, isLoading: isLoadingServiceGroups } = useServiceGroups();
    const serviceGroups = serviceGroupsData || [];

    return (
        <div className="space-y-4">
            {/* Org Unit */}
            <form.Field
                name="orgUnitId"
                validators={{
                    onBlur: ({ value }: { value: string }) => validateOrgUnit(value),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="orgUnitId" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Cơ quan
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <select
                                id="orgUnitId"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                disabled={isLoading}
                            >
                                <option value="">Vui lòng chọn cơ quan</option>
                                {orgUnitOptions.map((option) => (
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

            {/* Staff Code & Full Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field name="staffCode">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        return (
                            <div className="w-full">
                                <label htmlFor="staffCode" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Mã nhân viên
                                </label>
                                <input
                                    id="staffCode"
                                    type="text"
                                    className="w-full rounded-xl border bg-slate-100 outline-none transition h-10 px-3 text-sm border-slate-300 cursor-not-allowed"
                                    value={isEdit ? (field.state.value as string) ?? '' : ''}
                                    placeholder={isEdit ? '' : 'Mã sẽ được tự động sinh'}
                                    disabled={true}
                                />
                            </div>
                        );
                    }}
                </form.Field>

                <form.Field
                    name="fullName"
                    validators={{
                        onBlur: ({ value }: { value: string }) => validateFullName(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full">
                                <label htmlFor="fullName" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Họ và tên
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <input
                                    id="fullName"
                                    type="text"
                                    className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    placeholder="Vui lòng nhập họ và tên"
                                    disabled={isLoading}
                                />
                                {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                            </div>
                        );
                    }}
                </form.Field>
            </div>

            {/* Username & Password (only for create) */}
            {!isEdit && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <form.Field
                        name="username"
                        validators={{
                            onBlur: ({ value }: { value: string }) => validateUsername(value),
                        }}
                    >
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {(field: any) => {
                            const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                            return (
                                <div className="w-full">
                                    <label htmlFor="username" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                        Tên đăng nhập
                                        <span className="ml-0.5 text-red-500">*</span>
                                    </label>
                                    <input
                                        id="username"
                                        type="text"
                                        className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                        value={(field.state.value as string) || ''}
                                        onChange={(e) => field.handleChange(e.target.value as never)}
                                        onBlur={field.handleBlur}
                                        placeholder="Vui lòng nhập tên đăng nhập"
                                        disabled={isLoading}
                                    />
                                    {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                                </div>
                            );
                        }}
                    </form.Field>

                    <form.Field
                        name="password"
                        validators={{
                            onBlur: ({ value }: { value: string | undefined }) => validatePassword(value),
                        }}
                    >
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {(field: any) => {
                            const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                            return (
                                <div className="w-full">
                                    <label htmlFor="password" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                        Mật khẩu
                                        <span className="ml-0.5 text-red-500">*</span>
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                        value={(field.state.value as string) || ''}
                                        onChange={(e) => field.handleChange(e.target.value as never)}
                                        onBlur={field.handleBlur}
                                        placeholder="Vui lòng nhập mật khẩu"
                                        disabled={isLoading}
                                    />
                                    {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                                </div>
                            );
                        }}
                    </form.Field>
                </div>
            )}

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                    placeholder="Vui lòng nhập email"
                                    disabled={isLoading}
                                />
                                {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                            </div>
                        );
                    }}
                </form.Field>

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
                                    placeholder="Vui lòng nhập số điện thoại (10-11 số)"
                                    maxLength={11}
                                    disabled={isLoading}
                                />
                                {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                            </div>
                        );
                    }}
                </form.Field>
            </div>

            {/* Position & Role Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field
                    name="position"
                    validators={{
                        onBlur: ({ value }: { value: string }) => validatePosition(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full">
                                <label htmlFor="position" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Chức vụ
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <select
                                    id="position"
                                    className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    disabled={isLoading}
                                >
                                    <option value="">Vui lòng chọn chức vụ</option>
                                    {STAFF_POSITION_OPTIONS.map((option) => (
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

                <form.Field
                    name="roleType"
                    validators={{
                        onBlur: ({ value }: { value: string }) => validateRoleType(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full">
                                <label htmlFor="roleType" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Vai trò
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <select
                                    id="roleType"
                                    className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    disabled={isLoading}
                                >
                                    <option value="">Vui lòng chọn vai trò</option>
                                    {ROLE_TYPE_OPTIONS.map((option) => (
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
            </div>

            {/* Specialization */}
            <form.Field
                name="specialization"
                validators={{
                    onBlur: ({ value }: { value: string | undefined }) => validateSpecialization(value),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="specialization" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Chuyên môn
                            </label>
                            <input
                                id="specialization"
                                type="text"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                placeholder="Vui lòng nhập chuyên môn"
                                disabled={isLoading}
                            />
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            {/* Service Groups (only for create) */}
            {!isEdit && (
                <form.Field name="serviceGroupIds">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const selectedIds = (field.state.value as string[]) || [];
                        const selectedServiceGroups = serviceGroups.filter((sg) => selectedIds.includes(sg.id));
                        const availableServiceGroups = serviceGroups.filter((sg) => !selectedIds.includes(sg.id));

                        const handleAddServiceGroup = (serviceGroupId: string) => {
                            if (!selectedIds.includes(serviceGroupId)) {
                                field.handleChange([...selectedIds, serviceGroupId] as never);
                            }
                        };

                        const handleRemoveServiceGroup = (serviceGroupId: string) => {
                            field.handleChange(selectedIds.filter((id: string) => id !== serviceGroupId) as never);
                        };

                        return (
                            <div className="w-full">
                                <label className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Nhóm dịch vụ (Chuyên môn)
                                </label>
                                <div className="space-y-2">
                                    <select
                                        className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${isLoading || isLoadingServiceGroups ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                        value=""
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                handleAddServiceGroup(e.target.value);
                                                e.target.value = '';
                                            }
                                        }}
                                        disabled={isLoading || isLoadingServiceGroups}
                                    >
                                        <option value="">Chọn nhóm dịch vụ để thêm</option>
                                        {availableServiceGroups.map((sg) => (
                                            <option key={sg.id} value={sg.id}>
                                                {sg.groupName}
                                            </option>
                                        ))}
                                    </select>
                                    {selectedServiceGroups.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {selectedServiceGroups.map((sg) => (
                                                <span
                                                    key={sg.id}
                                                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800 border border-orange-200"
                                                >
                                                    {sg.groupName}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveServiceGroup(sg.id)}
                                                        className="hover:text-orange-900 focus:outline-none"
                                                        disabled={isLoading}
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    }}
                </form.Field>
            )}

            {/* Is Active (only for edit) */}
            {isEdit && (
                <form.Field name="isActive">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => (
                        <div className="flex items-center space-x-2">
                            <input
                                id="isActive"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                checked={field.state.value ?? false}
                                onChange={(e) => field.handleChange(e.target.checked as never)}
                                disabled={isLoading}
                            />
                            <label htmlFor="isActive" className="text-sm font-medium text-slate-700">
                                Trạng thái hoạt động
                            </label>
                        </div>
                    )}
                </form.Field>
            )}
        </div>
    );
}
