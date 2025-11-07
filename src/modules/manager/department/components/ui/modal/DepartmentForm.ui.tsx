'use client';

import React from 'react';
import { ToggleSwitch } from '@/shared/components/manager/ui';
import { DEPARTMENT_LEVELS } from '../../../enums';
import { useServiceGroups } from '@/modules/manager/service-group/hooks';
import { getValuesPage, RestPaged } from '@/types/rest';
import { ServiceGroup } from '@/modules/manager/service-group/types';
import {
    validateServiceGroupId,
    validateCode,
    validateName,
    validateDescription,
    validateLevelOrder,
} from '../../../utils';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any;
    isLoading: boolean;
    isEdit: boolean;
}

export const DepartmentForm: React.FC<Props> = ({ form, isLoading, isEdit }) => {
    // Fetch service groups for dropdown
    const { data: serviceGroupsData } = useServiceGroups({
        keyword: '',
        isActive: true,
        page: 1,
        size: 100,
    });

    const pageResult = serviceGroupsData ? getValuesPage(serviceGroupsData as RestPaged<ServiceGroup>) : null;
    const serviceGroups = pageResult?.items || [];

    const serviceGroupOptions = serviceGroups.map((sg: ServiceGroup) => ({
        value: sg.id,
        label: sg.groupName,
    }));

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Service Group */}
            <form.Field
                name="serviceGroupId"
                validators={{
                    onBlur: ({ value }: { value: string }) => validateServiceGroupId(value),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="serviceGroupId" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Nhóm dịch vụ
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <select
                                id="serviceGroupId"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                disabled={isLoading}
                            >
                                <option value="">Chọn nhóm dịch vụ</option>
                                {serviceGroupOptions.map((option) => (
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

            {/* Code */}
            <form.Field
                name="code"
                validators={{
                    onBlur: ({ value }: { value: string }) => validateCode(value),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="code" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Mã phòng ban
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <input
                                id="code"
                                type="text"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isEdit || isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                placeholder="Nhập mã phòng ban"
                                disabled={isEdit || isLoading}
                            />
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            {/* Name */}
            <form.Field
                name="name"
                validators={{
                    onBlur: ({ value }: { value: string }) => validateName(value),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="name" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Tên phòng ban
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                placeholder="Nhập tên phòng ban"
                                disabled={isLoading}
                            />
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            {/* Level Order */}
            <form.Field
                name="levelOrder"
                validators={{
                    onBlur: ({ value }: { value: number | string }) => validateLevelOrder(value),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="levelOrder" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Cấp độ
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <select
                                id="levelOrder"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={String(field.state.value || '')}
                                onChange={(e) => field.handleChange(parseInt(e.target.value, 10) as never)}
                                onBlur={field.handleBlur}
                                disabled={isLoading}
                            >
                                <option value="">Chọn cấp độ</option>
                                {DEPARTMENT_LEVELS.map((level) => (
                                    <option key={level.value} value={level.value}>
                                        {level.label}
                                    </option>
                                ))}
                            </select>
                            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                        </div>
                    );
                }}
            </form.Field>

            {/* Description */}
            <div className="md:col-span-2">
                <form.Field
                    name="description"
                    validators={{
                        onBlur: ({ value }: { value: string | undefined }) => validateDescription(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full">
                                <label htmlFor="description" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Mô tả
                                </label>
                                <textarea
                                    id="description"
                                    className={`w-full rounded-xl border bg-white outline-none transition p-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    placeholder="Nhập mô tả phòng ban"
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
                        label="Kích hoạt phòng ban"
                        description={field.state.value ? 'Hiển thị công khai' : 'Ẩn khỏi danh sách'}
                        disabled={isLoading}
                        aria-label="Kích hoạt phòng ban"
                    />
                )}
            </form.Field>
        </div>
    );
};
