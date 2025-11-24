'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/manager/ui/table';
import { Badge } from '@/shared/components/ui/badge.ui';
import { formatCurrency, formatDate } from '@/shared/lib/utils';
import type { ServiceSubmissionMethodSummary } from '../../../types';

interface Props {
    methods: ServiceSubmissionMethodSummary[];
}

const formatProcessingTime = (value?: string) => {
    if (!value) return '-';
    const parsed = Date.parse(value);
    if (Number.isNaN(parsed)) {
        return value;
    }
    return formatDate(value, { year: 'numeric', month: '2-digit', day: '2-digit' });
};

export const ServiceSubmissionMethodsTable: React.FC<Props> = ({ methods }) => {
    const hasData = methods.length > 0;

    return (
        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-4 py-3">
                <h3 className="text-base font-semibold text-slate-900">
                    Phương thức nộp hồ sơ đã gán
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                    Danh sách các phương thức công dân có thể nộp hồ sơ
                </p>
            </div>

            {!hasData && (
                <p className="px-4 py-6 text-sm text-slate-500">
                    Dịch vụ chưa được gán phương thức nộp hồ sơ nào.
                </p>
            )}

            {hasData && (
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50">
                            <TableHead className="w-12">#</TableHead>
                            <TableHead>Tên phương thức</TableHead>
                            <TableHead className="w-40">Thời gian xử lý</TableHead>
                            <TableHead className="w-32 text-center">Phí</TableHead>
                            <TableHead>Mô tả</TableHead>
                            <TableHead className="w-32 text-center">Trạng thái</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {methods.map((method, index) => (
                            <TableRow key={method.id ?? index}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell className="font-medium text-slate-900">
                                    {method.submissionMethodName}
                                </TableCell>
                                <TableCell>{formatProcessingTime(method.processingTime)}</TableCell>
                                <TableCell className="text-center">
                                    {typeof method.fee === 'number'
                                        ? formatCurrency(method.fee)
                                        : 'Miễn phí'}
                                </TableCell>
                                <TableCell className="text-sm text-slate-700">
                                    {method.description || '-'}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge
                                        variant={method.isActive === false ? 'secondary' : 'outline'}
                                        className={
                                            method.isActive === false
                                                ? 'bg-slate-100 text-slate-700 border-slate-200'
                                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        }
                                    >
                                        {method.isActive === false ? 'Ngừng' : 'Hoạt động'}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </section>
    );
};


