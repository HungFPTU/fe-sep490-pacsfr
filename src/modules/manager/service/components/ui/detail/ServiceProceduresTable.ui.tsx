'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/manager/ui/table';
import { Badge } from '@/shared/components/ui/badge.ui';
import { formatDate } from '@/shared/lib/utils';
import type { ServiceProcedureStep } from '../../../types';

interface Props {
    procedures: ServiceProcedureStep[];
}

export const ServiceProceduresTable: React.FC<Props> = ({ procedures }) => {
    const sortedProcedures = [...procedures].sort((a, b) => (a.stepNumber ?? 0) - (b.stepNumber ?? 0));
    const hasData = sortedProcedures.length > 0;

    return (
        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-4 py-3">
                <h3 className="text-base font-semibold text-slate-900">
                    Trình tự thực hiện
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                    Các bước xử lý hồ sơ cho dịch vụ
                </p>
            </div>

            {!hasData && (
                <p className="px-4 py-6 text-sm text-slate-500">
                    Chưa cấu hình trình tự thực hiện cho dịch vụ này.
                </p>
            )}

            {hasData && (
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50">
                            <TableHead className="w-20 text-center">Bước</TableHead>
                            <TableHead>Tên bước</TableHead>
                            <TableHead>Mô tả</TableHead>
                            <TableHead className="w-48">Đơn vị thực hiện</TableHead>
                            <TableHead className="w-40">Thời gian</TableHead>
                            <TableHead className="w-40">Ghi chú</TableHead>
                            <TableHead className="w-32 text-center">Trạng thái</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedProcedures.map((procedure) => (
                            <TableRow key={procedure.id}>
                                <TableCell className="text-center font-semibold text-indigo-600">
                                    {procedure.stepNumber}
                                </TableCell>
                                <TableCell className="font-medium text-slate-900">
                                    {procedure.stepName}
                                    {procedure.createdAt && (
                                        <p className="text-xs text-slate-500">
                                            Tạo ngày: {formatDate(procedure.createdAt)}
                                        </p>
                                    )}
                                </TableCell>
                                <TableCell className="text-sm text-slate-700">
                                    {procedure.stepDescription || '-'}
                                </TableCell>
                                <TableCell className="text-sm text-slate-700">
                                    {procedure.responsibleUnit || '-'}
                                </TableCell>
                                <TableCell className="text-sm text-slate-700">
                                    {procedure.processingTime || '-'}
                                </TableCell>
                                <TableCell className="text-sm text-slate-700">
                                    {procedure.notes || '-'}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge
                                        variant={procedure.isActive === false ? 'secondary' : 'outline'}
                                        className={
                                            procedure.isActive === false
                                                ? 'bg-slate-100 text-slate-700 border-slate-200'
                                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        }
                                    >
                                        {procedure.isActive === false ? 'Ngừng' : 'Hoạt động'}
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


