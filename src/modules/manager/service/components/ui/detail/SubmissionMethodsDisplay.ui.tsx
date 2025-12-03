'use client';

import React from 'react';
import { Clock, DollarSign, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge.ui';
import { formatCurrency, formatDate } from '@/shared/lib/utils';
import type { ServiceSubmissionMethodSummary } from '../../../types';
import { cn } from '@/shared/lib/utils';

interface Props {
    methods: ServiceSubmissionMethodSummary[];
    title?: string;
    description?: string;
}

const formatProcessingTime = (value?: string) => {
    if (!value) return '-';
    try {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            return value;
        }
        return formatDate(value, { year: 'numeric', month: '2-digit', day: '2-digit' });
    } catch {
        return value;
    }
};

/**
 * SubmissionMethodsDisplay - Display submission methods as a compact, beautiful grid
 * Shows available submission methods for a service in an organized card view
 */
export const SubmissionMethodsDisplay: React.FC<Props> = ({
    methods,
    title = 'Phương thức nộp hồ sơ',
    description = 'Danh sách phương thức công dân có thể nộp hồ sơ dịch vụ này'
}) => {
    const hasData = methods && methods.length > 0;

    if (!hasData) {
        return (
            <section className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="border-b border-slate-200 px-6 py-4">
                    <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                    {description && (
                        <p className="text-sm text-slate-500 mt-1">{description}</p>
                    )}
                </div>
                <div className="flex flex-col items-center justify-center py-12 px-6">
                    <AlertCircle className="h-10 w-10 text-slate-300 mb-3" />
                    <p className="text-sm text-slate-500 text-center">
                        Dịch vụ chưa được gán phương thức nộp hồ sơ nào
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
            {/* Header */}
            <div className="border-b border-slate-200 px-6 py-4 bg-linear-to-r from-slate-50 to-slate-100">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                        {description && (
                            <p className="text-sm text-slate-500 mt-1">{description}</p>
                        )}
                    </div>
                    <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-slate-200">
                        <span className="text-xs font-semibold text-slate-600">
                            {methods.length} phương thức
                        </span>
                    </div>
                </div>
            </div>

            {/* Methods Grid */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {methods.map((method, index) => (
                        <div
                            key={method.id ?? index}
                            className={cn(
                                'relative group rounded-lg border-2 p-4 transition-all duration-200',
                                method.isActive !== false
                                    ? 'border-emerald-200 bg-emerald-50 hover:border-emerald-300 hover:shadow-md'
                                    : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:shadow-md'
                            )}
                        >
                            {/* Status Badge */}
                            <div className="absolute top-3 right-3">
                                <Badge
                                    variant={method.isActive === false ? 'secondary' : 'outline'}
                                    className={cn(
                                        'text-xs font-medium',
                                        method.isActive === false
                                            ? 'bg-slate-100 text-slate-700 border-slate-200'
                                            : 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                    )}
                                >
                                    {method.isActive === false ? 'Ngừng' : 'Hoạt động'}
                                </Badge>
                            </div>

                            {/* Method Name */}
                            <div className="mb-3 pr-20">
                                <div className="flex items-start gap-2">
                                    <CheckCircle2
                                        className={cn(
                                            'h-5 w-5 mt-0.5 shrink-0',
                                            method.isActive !== false
                                                ? 'text-emerald-600'
                                                : 'text-slate-400'
                                        )}
                                    />
                                    <h4 className="text-sm font-semibold text-slate-900 leading-tight">
                                        {method.submissionMethodName}
                                    </h4>
                                </div>
                            </div>

                            {/* Description */}
                            {method.description && (
                                <p className="text-xs text-slate-600 mb-4 line-clamp-2 pl-7">
                                    {method.description}
                                </p>
                            )}

                            {/* Metadata */}
                            <div className="space-y-2 pt-3 border-t border-slate-200 border-opacity-50">
                                {/* Processing Time */}
                                {method.processingTime && (
                                    <div className="flex items-center gap-2 text-xs">
                                        <Clock className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                                        <span className="text-slate-600">
                                            <span className="font-medium">Xử lý:</span> {formatProcessingTime(method.processingTime)}
                                        </span>
                                    </div>
                                )}

                                {/* Fee */}
                                <div className="flex items-center gap-2 text-xs">
                                    <DollarSign className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                                    <span
                                        className={cn(
                                            'font-medium',
                                            method.fee === 0 ? 'text-emerald-600' : 'text-slate-600'
                                        )}
                                    >
                                        {typeof method.fee === 'number'
                                            ? method.fee === 0
                                                ? 'Miễn phí'
                                                : formatCurrency(method.fee)
                                            : 'Miễn phí'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                {hasData && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="flex items-center justify-between text-xs text-slate-600">
                            <span>Hiển thị {methods.length} phương thức nộp hồ sơ</span>
                            <div className="flex items-center gap-2">
                                <span className="text-slate-400">●</span>
                                <span>Màu xanh = Hoạt động</span>
                                <span className="text-slate-400">●</span>
                                <span>Màu xám = Ngừng</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

