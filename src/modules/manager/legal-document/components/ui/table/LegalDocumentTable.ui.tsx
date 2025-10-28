'use client';

import React from 'react';
import { DataTable } from '@/shared/components/manager';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@heroui/react';
import type { LegalDocument } from '../../../types';

interface Props {
    legalDocuments: LegalDocument[];
    isLoading: boolean;
    onView: (legalDocument: LegalDocument) => void;
    onEdit: (legalDocument: LegalDocument) => void;
    onDelete: (legalDocument: LegalDocument) => void;
    onDownload?: (legalDocument: LegalDocument) => void;
}

export const LegalDocumentTable: React.FC<Props> = ({
    legalDocuments,
    isLoading,
    onView,
    onEdit,
    onDelete,
    onDownload,
}) => {
    const columns: ColumnDef<LegalDocument>[] = [
        {
            accessorKey: 'documentNumber',
            header: 'Số văn bản',
            cell: ({ row }) => (
                <div className="font-medium text-slate-900">
                    {row.getValue('documentNumber')}
                </div>
            ),
        },
        {
            accessorKey: 'name',
            header: 'Tên văn bản',
            cell: ({ row }) => (
                <div className="max-w-[300px] truncate" title={row.getValue('name')}>
                    {row.getValue('name')}
                </div>
            ),
        },
        {
            accessorKey: 'documentType',
            header: 'Loại văn bản',
            cell: ({ row }) => (
                <Badge color="primary" variant="flat" size="sm">
                    {row.getValue('documentType')}
                </Badge>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Trạng thái',
            cell: ({ row }) => {
                const status = row.getValue('status') as string;
                const getStatusColor = (status: string) => {
                    switch (status) {
                        case 'Draft': return 'warning';
                        case 'Published': return 'success';
                        case 'Effective': return 'primary';
                        case 'Expired': return 'danger';
                        case 'Cancelled': return 'default';
                        default: return 'default';
                    }
                };

                return (
                    <Badge color={getStatusColor(status)} variant="flat" size="sm">
                        {status}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'issueDate',
            header: 'Ngày ban hành',
            cell: ({ row }) => {
                const date = row.getValue('issueDate') as string;
                return new Date(date).toLocaleDateString('vi-VN');
            },
        },
        {
            accessorKey: 'effectiveDate',
            header: 'Ngày hiệu lực',
            cell: ({ row }) => {
                const date = row.getValue('effectiveDate') as string;
                return new Date(date).toLocaleDateString('vi-VN');
            },
        },
        {
            accessorKey: 'isActive',
            header: 'Hoạt động',
            cell: ({ row }) => (
                <Badge
                    color={row.getValue('isActive') ? 'success' : 'danger'}
                    variant="flat"
                    size="sm"
                >
                    {row.getValue('isActive') ? 'Hoạt động' : 'Không hoạt động'}
                </Badge>
            ),
        },
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    return (
        <DataTable
            columns={columns}
            data={legalDocuments}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            buttonOther={onDownload ? "Tải xuống" : null}
            onOther={onDownload}
        />
    );
};
