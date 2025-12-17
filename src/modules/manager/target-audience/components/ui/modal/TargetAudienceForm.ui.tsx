'use client';

import React from 'react';
import { ToggleSwitch } from '@/shared/components/manager/ui';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any;
    isLoading: boolean;
    isEdit: boolean;
}

export const TargetAudienceForm: React.FC<Props> = ({ form, isLoading, isEdit }) => {
    return (
        <div className="grid grid-cols-1 gap-4">
            {/* Name */}
            <div>
                <form.Field
                    name="name"
                    validators={{
                        onBlur: ({ value }: { value: string }) => {
                            if (!value?.trim()) {
                                return 'Vui lòng nhập tên đối tượng';
                            }
                            return undefined;
                        },
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full">
                                <label htmlFor="name" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Tên đối tượng
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    placeholder="Nhập tên đối tượng"
                                    disabled={isLoading}
                                />
                                {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                            </div>
                        );
                    }}
                </form.Field>
            </div>

            {/* Description */}
            <div>
                <form.Field
                    name="description"
                    validators={{
                        onBlur: ({ value }: { value: string }) => {
                            if (!value?.trim()) {
                                return 'Vui lòng nhập mô tả';
                            }
                            return undefined;
                        },
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full">
                                <label htmlFor="description" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Mô tả
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    className={`w-full rounded-xl border bg-white outline-none transition p-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    placeholder="Nhập mô tả đối tượng"
                                    rows={4}
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
                        label="Kích hoạt đối tượng"
                        description={field.state.value ? 'Hiển thị công khai' : 'Ẩn khỏi danh sách'}
                        disabled={isLoading}
                        aria-label="Kích hoạt đối tượng"
                    />
                )}
            </form.Field>
        </div>
    );
};

