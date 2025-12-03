'use client';

import React from 'react';
import { ToggleSwitch } from '@/shared/components/manager/ui';
import {
    validateGroupCode,
    validateGroupName,
    validateDescription,
} from '../../../utils';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any;
    isLoading: boolean;
    isEdit: boolean;
}

export const DocsTypeGroupForm: React.FC<Props> = ({ form, isLoading, isEdit }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Group Code */}
            <form.Field name="groupCode">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    return (
                        <div className="w-full">
                            <label htmlFor="groupCode" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Mã nhóm hồ sơ
                            </label>
                            <input
                                id="groupCode"
                                type="text"
                                className="w-full rounded-xl border bg-slate-100 outline-none transition h-10 px-3 text-sm border-slate-300 cursor-not-allowed"
                                value={(field.state.value as string) || ''}
                                placeholder="Mã sẽ được tự động sinh"
                                disabled={true}
                            />
                        </div>
                    );
                }}
            </form.Field>

            {/* Group Name */}
            <form.Field
                name="groupName"
                validators={{
                    onBlur: ({ value }: { value: string }) => validateGroupName(value),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="w-full">
                            <label htmlFor="groupName" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                Tên nhóm hồ sơ
                                <span className="ml-0.5 text-red-500">*</span>
                            </label>
                            <input
                                id="groupName"
                                type="text"
                                className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                placeholder="Nhập tên nhóm hồ sơ"
                                disabled={isLoading}
                            />
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
                                    placeholder="Nhập mô tả nhóm hồ sơ"
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
                        label="Kích hoạt nhóm hồ sơ"
                        description={field.state.value ? 'Hiển thị công khai' : 'Ẩn khỏi danh sách'}
                        disabled={isLoading}
                        aria-label="Kích hoạt nhóm hồ sơ"
                    />
                )}
            </form.Field>
        </div>
    );
};

