'use client';

import React from 'react';
import { FileText, Calendar, AlertCircle } from 'lucide-react';
import {
    validateSubmissionMethodName,
    validateDescription,
} from '../../../utils';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any;
    isLoading: boolean;
    isEdit: boolean;
}

export const SubmissionMethodForm: React.FC<Props> = ({ form, isLoading }) => {
    return (
        <div className="space-y-6">
            {/* Submission Method Name */}
            <form.Field
                name="submissionMethodName"
                validators={{
                    onBlur: ({ value }: { value: string }) => validateSubmissionMethodName(value),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(field: any) => {
                    const error = field.state.meta.errors?.[0] || field.state.meta.touchedErrors?.[0] || null;
                    return (
                        <div className="space-y-2">
                            <label htmlFor="submissionMethodName" className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                                <FileText className="h-4 w-4 text-indigo-600" />
                                Tên phương thức nộp hồ sơ
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="submissionMethodName"
                                type="text"
                                className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-sm transition-colors outline-none placeholder-slate-400 ${error
                                    ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-100'
                                    : 'border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100'
                                    } ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                placeholder="Ví dụ: Nộp trực tiếp tại cơ quan"
                                disabled={isLoading}
                            />
                            {error && (
                                <div className="flex items-center gap-1.5 text-xs text-red-600">
                                    <AlertCircle className="h-3.5 w-3.5" />
                                    {error}
                                </div>
                            )}
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
                    const charCount = ((field.state.value as string) || '').length;

                    return (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                                    <FileText className="h-4 w-4 text-indigo-600" />
                                    Mô tả
                                </label>
                                <span className="text-xs text-slate-500">{charCount}/500</span>
                            </div>
                            <textarea
                                id="description"
                                rows={4}
                                maxLength={500}
                                className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-sm transition-colors outline-none placeholder-slate-400 resize-none ${error
                                    ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-100'
                                    : 'border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100'
                                    } ${isLoading ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                value={(field.state.value as string) || ''}
                                onChange={(e) => field.handleChange(e.target.value as never)}
                                onBlur={field.handleBlur}
                                placeholder="Mô tả chi tiết về phương thức nộp hồ sơ này (tùy chọn)"
                                disabled={isLoading}
                            />
                            {error && (
                                <div className="flex items-center gap-1.5 text-xs text-red-600">
                                    <AlertCircle className="h-3.5 w-3.5" />
                                    {error}
                                </div>
                            )}
                        </div>
                    );
                }}
            </form.Field>
        </div>
    );
};

