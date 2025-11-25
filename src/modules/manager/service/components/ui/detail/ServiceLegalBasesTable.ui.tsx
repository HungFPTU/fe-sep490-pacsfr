'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/manager/ui/table';
import { Badge } from '@/shared/components/ui/badge.ui';
import { formatDate } from '@/shared/lib/utils';
import type { ServiceLegalBasis } from '../../../types';
import { LegalDocumentService } from '@/modules/manager/legal-document/services/legal-document.service';

interface Props {
    legalBases: ServiceLegalBasis[];
}

const statusStyleMap: Record<string, string> = {
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    EFFECTIVE: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    PUBLISHED: 'bg-blue-50 text-blue-700 border-blue-200',
    EXPIRED: 'bg-red-50 text-red-700 border-red-200',
};

export const ServiceLegalBasesTable: React.FC<Props> = ({ legalBases }) => {
    const hasData = legalBases.length > 0;

    return (
        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-4 py-3">
                <h3 className="text-base font-semibold text-slate-900">
                    Căn cứ pháp lý
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                    Danh sách văn bản quy định liên quan đến dịch vụ
                </p>
            </div>

            {!hasData && (
                <p className="px-4 py-6 text-sm text-slate-500">
                    Không có thông tin căn cứ pháp lý.
                </p>
            )}

            {hasData && (
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50">
                            <TableHead className="w-12">#</TableHead>
                            <TableHead>Tên văn bản</TableHead>
                            <TableHead className="w-44">Số/Ký hiệu</TableHead>
                            <TableHead className="w-40">Loại văn bản</TableHead>
                            <TableHead className="w-40">Ngày ban hành</TableHead>
                            <TableHead className="w-40">Ngày hiệu lực</TableHead>
                            <TableHead className="w-40">Trạng thái</TableHead>
                            <TableHead className="w-32 text-center">Tệp đính kèm</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {legalBases.map((legalBasis, index) => {
                            const docTypeLabel = legalBasis.documentType
                                ? LegalDocumentService.formatDocumentType(legalBasis.documentType)
                                : '-';
                            const statusLabel = legalBasis.status
                                ? LegalDocumentService.formatDocumentStatus(legalBasis.status)
                                : '-';
                            const statusClass = legalBasis.status
                                ? statusStyleMap[legalBasis.status] ?? 'bg-slate-100 text-slate-700 border-slate-200'
                                : 'bg-slate-100 text-slate-700 border-slate-200';

                            return (
                                <TableRow key={`${legalBasis.legislationDocumentId}-${index}`}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>
                                        <p className="font-semibold text-slate-900">
                                            {legalBasis.name}
                                        </p>
                                        {legalBasis.issueBody && (
                                            <p className="text-xs text-slate-500">
                                                Cơ quan ban hành: {legalBasis.issueBody}
                                            </p>
                                        )}
                                    </TableCell>
                                    <TableCell>{legalBasis.documentNumber}</TableCell>
                                    <TableCell>{docTypeLabel}</TableCell>
                                    <TableCell>{formatDate(legalBasis.issueDate)}</TableCell>
                                    <TableCell>{formatDate(legalBasis.effectiveDate)}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={statusClass}>
                                            {statusLabel}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {legalBasis.fileUrl ? (
                                            <a
                                                href={legalBasis.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-indigo-600 text-sm font-medium hover:underline"
                                            >
                                                Tải xuống
                                            </a>
                                        ) : (
                                            <span className="text-sm text-slate-400">Không có</span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            )}
        </section>
    );
};


