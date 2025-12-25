'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/manager/ui/table';
import { Badge } from '@/shared/components/ui/badge.ui';
import { formatDate } from '@/shared/lib/utils';
import type { ServiceRequiredDocument } from '../../../types';

interface Props {
    documents: ServiceRequiredDocument[];
}

export const ServiceRequiredDocumentsTable: React.FC<Props> = ({ documents }) => {
    const hasData = documents.length > 0;

    return (
        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-4 py-3">
                <h3 className="text-base font-semibold text-slate-900">
                    Giấy tờ, tài liệu yêu cầu
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                    Danh sách giấy tờ bắt buộc đối với thủ tục này
                </p>
            </div>

            {!hasData && (
                <p className="px-4 py-6 text-sm text-slate-500">
                    Không có giấy tờ nào được cấu hình cho dịch vụ này.
                </p>
            )}

            {hasData && (
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50">
                            <TableHead className="w-12">#</TableHead>
                            <TableHead>Tên giấy tờ</TableHead>
                            <TableHead>Mô tả</TableHead>
                            <TableHead className="w-32 text-center">Trạng thái</TableHead>
                            <TableHead className="w-40">Ngày tạo</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {documents.map((doc, index) => (
                            <TableRow key={doc.id ?? `${doc.docTypeId}-${index}`}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>
                                    <p className="font-medium text-slate-900">
                                        {doc.docTypeName || 'Chưa xác định'}
                                    </p>

                                </TableCell>
                                <TableCell>
                                    {doc.description ? (
                                        <p className="text-sm text-slate-700">{doc.description}</p>
                                    ) : (
                                        <span className="text-sm text-slate-400">Không có mô tả</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge
                                        variant={doc.isDeleted ? 'destructive' : doc.isActive === false ? 'secondary' : 'outline'}
                                        className={
                                            doc.isDeleted
                                                ? 'bg-red-50 text-red-700 border-red-200'
                                                : doc.isActive === false
                                                    ? 'bg-slate-100 text-slate-700 border-slate-200'
                                                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        }
                                    >
                                        {doc.isDeleted
                                            ? 'Đã xóa'
                                            : doc.isActive === false
                                                ? 'Ngừng'
                                                : 'Hoạt động'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-sm text-slate-600">
                                    {formatDate(doc.createdAt)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </section>
    );
};


