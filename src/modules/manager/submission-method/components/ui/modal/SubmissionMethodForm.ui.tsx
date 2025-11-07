'use client';

import React from 'react';
import { ToggleSwitch } from '@/shared/components/manager/ui';
import {
    validateSubmissionMethodName,
    validateOtherMethodName,
    validateProcessingTime,
    validateFee,
    validateDescription,
} from '../../../utils';
import { SUBMISSION_METHOD_OPTIONS, SUBMISSION_METHOD_OPTIONS_LIST } from '../../../constants';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any;
    isLoading: boolean;
    isEdit: boolean;
}

export const SubmissionMethodForm: React.FC<Props> = ({ form, isLoading }) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Submission Method Name - Dropdown */}
                {/* Subscribe to submissionMethodName to trigger re-render when it changes */}
                <form.Field
                    name="submissionMethodName"
                    validators={{
                        onBlur: ({ value }: { value: string }) => validateSubmissionMethodName(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        const selectedMethod = (field.state.value as string) || '';
                        const isOtherSelected = selectedMethod === SUBMISSION_METHOD_OPTIONS.OTHER;

                        return (
                            <>
                                <div className="w-full md:col-span-2">
                                    <label htmlFor="submissionMethodName" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                        Tên phương thức nộp hồ sơ
                                        <span className="ml-0.5 text-red-500">*</span>
                                    </label>
                                    <select
                                        id="submissionMethodName"
                                        className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                        value={selectedMethod}
                                        onChange={(e) => {
                                            const newValue = e.target.value;
                                            console.log('[SubmissionMethodForm] submissionMethodName onChange:', newValue);
                                            field.handleChange(newValue as never);
                                            // Clear otherMethodName when switching away from "Khác"
                                            if (newValue !== SUBMISSION_METHOD_OPTIONS.OTHER) {
                                                form.setFieldValue('otherMethodName', undefined);
                                            }
                                        }}
                                        onBlur={field.handleBlur}
                                        disabled={isLoading}
                                    >
                                        <option value="">-- Chọn phương thức --</option>
                                        {SUBMISSION_METHOD_OPTIONS_LIST.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                                </div>

                                {/* Other Method Name - Only shown when "Khác" is selected */}
                                {isOtherSelected && (
                                    <form.Field
                                        name="otherMethodName"
                                        validators={{
                                            onBlur: ({ value }: { value: string | undefined }) =>
                                                validateOtherMethodName(value, selectedMethod),
                                        }}
                                    >
                                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                        {(otherField: any) => {
                                            const otherError = otherField.state.meta.errors?.[0] || otherField.state.meta.touchedErrors?.[0] || null;
                                            return (
                                                <div className="w-full md:col-span-2">
                                                    <label htmlFor="otherMethodName" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                                        Điền thông tin khác
                                                        <span className="ml-0.5 text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        id="otherMethodName"
                                                        type="text"
                                                        className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${otherError ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                                        value={(otherField.state.value as string) || ''}
                                                        onChange={(e) => otherField.handleChange(e.target.value as never)}
                                                        onBlur={otherField.handleBlur}
                                                        placeholder="Nhập tên phương thức khác"
                                                        disabled={isLoading}
                                                    />
                                                    {otherError && <div className="mt-1 text-xs text-red-600">{otherError}</div>}
                                                </div>
                                            );
                                        }}
                                    </form.Field>
                                )}
                            </>
                        );
                    }}
                </form.Field>

                {/* Processing Time */}
                <form.Field
                    name="processingTime"
                    validators={{
                        onBlur: ({ value }: { value: string }) => validateProcessingTime(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        // Convert ISO string to datetime-local format
                        const getDateTimeLocalValue = (isoString: string): string => {
                            if (!isoString) return '';
                            const date = new Date(isoString);
                            if (isNaN(date.getTime())) return '';
                            // Format: YYYY-MM-DDTHH:mm
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const day = String(date.getDate()).padStart(2, '0');
                            const hours = String(date.getHours()).padStart(2, '0');
                            const minutes = String(date.getMinutes()).padStart(2, '0');
                            return `${year}-${month}-${day}T${hours}:${minutes}`;
                        };

                        // Convert datetime-local to ISO string
                        const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = e.target.value;
                            if (!value) {
                                field.handleChange('' as never);
                                return;
                            }
                            const date = new Date(value);
                            if (!isNaN(date.getTime())) {
                                field.handleChange(date.toISOString() as never);
                            }
                        };

                        return (
                            <div className="w-full">
                                <label htmlFor="processingTime" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Thời gian xử lý
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <input
                                    id="processingTime"
                                    type="datetime-local"
                                    className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    value={getDateTimeLocalValue(field.state.value as string)}
                                    onChange={handleDateTimeChange}
                                    onBlur={field.handleBlur}
                                    disabled={isLoading}
                                    min={new Date().toISOString().slice(0, 16)}
                                />
                                {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                                <p className="mt-1 text-xs text-gray-500">
                                    Chọn ngày và giờ xử lý dự kiến
                                </p>
                            </div>
                        );
                    }}
                </form.Field>

                {/* Fee */}
                <form.Field
                    name="fee"
                    validators={{
                        onBlur: ({ value }: { value: number }) => validateFee(value),
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(field: any) => {
                        const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                        return (
                            <div className="w-full">
                                <label htmlFor="fee" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Phí (VNĐ)
                                    <span className="ml-0.5 text-red-500">*</span>
                                </label>
                                <input
                                    id="fee"
                                    type="number"
                                    min="0"
                                    step="1000"
                                    className={`w-full rounded-xl border bg-white outline-none transition h-10 px-3 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    value={field.state.value ?? 0}
                                    onChange={(e) => {
                                        const numValue = parseFloat(e.target.value) || 0;
                                        field.handleChange(numValue as never);
                                    }}
                                    onBlur={field.handleBlur}
                                    placeholder="Nhập phí"
                                    disabled={isLoading}
                                />
                                {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                                <p className="mt-1 text-xs text-gray-500">
                                    Phí phải lớn hơn hoặc bằng 0
                                </p>
                            </div>
                        );
                    }}
                </form.Field>

                {/* Description */}
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
                            <div className="w-full md:col-span-2">
                                <label htmlFor="description" className="mb-1 inline-block text-sm font-medium text-slate-700">
                                    Mô tả
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    className={`w-full rounded-xl border bg-white outline-none transition px-3 py-2 text-sm border-slate-300 focus:border-slate-500 ${error ? 'border-red-400 focus:border-red-500' : ''} ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => field.handleChange(e.target.value as never)}
                                    onBlur={field.handleBlur}
                                    placeholder="Nhập mô tả (tùy chọn)"
                                    disabled={isLoading}
                                />
                                {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                                <p className="mt-1 text-xs text-gray-500">
                                    Tối đa 1000 ký tự
                                </p>
                            </div>
                        );
                    }}
                </form.Field>
            </div>

            {/* Active Status */}
            <form.Field name="isActive">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => (
                    <ToggleSwitch
                        checked={field.state.value ?? true}
                        onChange={(checked: boolean) => field.handleChange(checked as never)}
                        label="Trạng thái kích hoạt"
                        description={field.state.value ? 'Phương thức đang hoạt động' : 'Phương thức đã ngừng hoạt động'}
                        disabled={isLoading}
                        aria-label="Trạng thái kích hoạt"
                    />
                )}
            </form.Field>
        </div>
    );
};

