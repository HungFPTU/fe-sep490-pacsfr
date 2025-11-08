'use client';

import React, { useMemo, useState } from 'react';
import { useRequiredDocuments, useDeleteRequiredDocument } from '../../hooks';
import { RequiredDocumentHeader, RequiredDocumentFilter, RequiredDocumentTable, RequiredDocumentPagination, CreateRequiredDocumentModal, RequiredDocumentDetailModal } from '../ui';
import type { RequiredDocument } from '../../types';
import { getValuesPage } from '@/types/rest';
import { ConfirmDialog } from '@/shared/components/common/ConfirmDialog';
import { useGlobalToast } from '@core/patterns/SingletonHook';

export const RequiredDocumentListPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [serviceId, setServiceId] = useState('');
    const [docTypeId, setDocTypeId] = useState('');
    const [isActive, setIsActive] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<RequiredDocument | null>(null);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { data, isLoading, refetch } = useRequiredDocuments({
        keyword,
        serviceId,
        docTypeId,
        isActive,
        page,
        size: pageSize,
    });

    const deleteMutation = useDeleteRequiredDocument();
    const { addToast } = useGlobalToast();

    const pageResult = useMemo(() => (data ? getValuesPage<RequiredDocument>(data) : null), [data]);
    const requiredDocuments = pageResult?.items || [];
    const total = pageResult?.total || 0;
    const totalPages = pageResult?.totalPages || 0;

    const handleOpenCreate = () => {
        setSelectedDocument(null);
        setModalOpen(true);
    };

    const handleEdit = (document: RequiredDocument) => {
        setSelectedDocument(document);
        setModalOpen(true);
    };

    const handleView = (document: RequiredDocument) => {
        setSelectedDocument(document);
        setDetailModalOpen(true);
    };

    const handleDelete = (id: string) => {
        setDeletingId(id);
        setConfirmDeleteOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deletingId) return;
        try {
            await deleteMutation.mutateAsync(deletingId);
            addToast({ message: 'Xóa tài liệu yêu cầu thành công', type: 'success' });
            refetch();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Không thể xóa tài liệu yêu cầu';
            addToast({ message, type: 'error' });
        } finally {
            setConfirmDeleteOpen(false);
            setDeletingId(null);
        }
    };

    const handleApplyFilters = ({ keyword: newKeyword, serviceId: newServiceId, docTypeId: newDocTypeId, isActive: newStatus }: { keyword: string; serviceId: string; docTypeId: string; isActive: boolean }) => {
        setKeyword(newKeyword);
        setServiceId(newServiceId);
        setDocTypeId(newDocTypeId);
        setIsActive(newStatus);
        setPage(1);
    };

    return (
        <div className="space-y-6 p-6">
            <RequiredDocumentHeader onCreateClick={handleOpenCreate} totalCount={total} />

            <RequiredDocumentFilter
                keyword={keyword}
                serviceId={serviceId}
                docTypeId={docTypeId}
                isActive={isActive}
                onApply={handleApplyFilters}
                onReset={refetch}
            />

            <RequiredDocumentTable
                requiredDocuments={requiredDocuments}
                isLoading={isLoading}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={deleteMutation.isPending}
            />

            <RequiredDocumentPagination
                page={page}
                pageSize={pageSize}
                total={total}
                totalPages={totalPages}
                onPageChange={(nextPage) => setPage(Math.max(1, Math.min(nextPage, totalPages || 1)))}
                onPageSizeChange={(size) => {
                    setPageSize(size);
                    setPage(1);
                }}
            />

            <CreateRequiredDocumentModal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedDocument(null);
                }}
                initData={selectedDocument}
                onSuccess={refetch}
            />

            <RequiredDocumentDetailModal
                open={detailModalOpen}
                onClose={() => {
                    setDetailModalOpen(false);
                    setSelectedDocument(null);
                }}
                document={selectedDocument}
            />

            <ConfirmDialog
                open={confirmDeleteOpen}
                onCancel={() => {
                    setConfirmDeleteOpen(false);
                    setDeletingId(null);
                }}
                onConfirm={handleConfirmDelete}
                title="Xóa tài liệu yêu cầu"
                message="Bạn có chắc chắn muốn xóa tài liệu này? Hành động không thể hoàn tác."
                confirmText="Xóa"
                cancelText="Hủy"
                type="danger"
                loading={deleteMutation.isPending}
            />
        </div>
    );
};

