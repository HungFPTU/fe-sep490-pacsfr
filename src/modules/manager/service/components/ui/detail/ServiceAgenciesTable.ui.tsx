'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/manager/ui/table';
import { Badge } from '@/shared/components/ui/badge.ui';
import type { ServiceAgency } from '../../../types';

interface Props {
    agencies: ServiceAgency[];
}

export const ServiceAgenciesTable: React.FC<Props> = ({ agencies }) => {
    const hasData = agencies.length > 0;

    return (
        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-4 py-3">
                <h3 className="text-base font-semibold text-slate-900">
                    Cơ quan thực hiện
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                    Các đơn vị chịu trách nhiệm xử lý hồ sơ
                </p>
            </div>

            {!hasData && (
                <p className="px-4 py-6 text-sm text-slate-500">
                    Chưa có cơ quan nào được gán cho dịch vụ này.
                </p>
            )}

            {hasData && (
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50">
                            <TableHead className="w-12">#</TableHead>
                            <TableHead>Tên cơ quan</TableHead>
                            <TableHead>Mô tả</TableHead>
                            <TableHead className="w-32 text-center">Trạng thái</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {agencies.map((agency, index) => (
                            <TableRow key={agency.id ?? index}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell className="font-medium text-slate-900">
                                    {agency.agencyName}
                                    {agency.id && (
                                        <p className="text-xs text-slate-500">
                                            ID: {agency.id}
                                        </p>
                                    )}
                                </TableCell>
                                <TableCell className="text-sm text-slate-700">
                                    {agency.description || '-'}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge
                                        variant={agency.isActive === false ? 'secondary' : 'outline'}
                                        className={
                                            agency.isActive === false
                                                ? 'bg-slate-100 text-slate-700 border-slate-200'
                                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        }
                                    >
                                        {agency.isActive === false ? 'Ngừng' : 'Hoạt động'}
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


