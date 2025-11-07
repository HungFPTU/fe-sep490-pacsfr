'use client';

import React, { useState } from 'react';
import { LegalDocumentHeader } from '@modules/manager/legal-document/components/ui/header/LegalDocumentHeader.ui';
import { LegalDocumentFilter } from '@modules/manager/legal-document/components/ui/filter/LegalDocumentFilter.ui';
import { LegalDocumentTable } from '@modules/manager/legal-document/components/ui/table/LegalDocumentTable.ui';
import { LegalDocumentPagination } from '@modules/manager/legal-document/components/ui/pagination/LegalDocumentPagination.ui';
import { CreateLegalDocumentModal } from '@modules/manager/legal-document/components/ui/modal/CreateLegalDocumentModal.ui';
import { LegalDocumentDetailModal } from '@modules/manager/legal-document/components/ui/detail/LegalDocumentDetailModal.ui';
import { ConfirmDialog } from '@/shared/components/common/ConfirmDialog';
import { useLegalDocuments, useDeleteLegalDocument, useLegalDocumentFilters } from '@modules/manager/legal-document/hooks';
import type { LegalDocument } from '@modules/manager/legal-document/types';

export const LegalDocumentListPage: React.FC = () => {
    const { filters, setFilters } = useLegalDocumentFilters();
    const [selectedDocument, setSelectedDocument] = useState<LegalDocument | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [documentToDelete, setDocumentToDelete] = useState<LegalDocument | null>(null);

    const { data: legalDocumentsData, isLoading, refetch } = useLegalDocuments(filters);
    const deleteMutation = useDeleteLegalDocument();

    const legalDocuments = legalDocumentsData?.data?.items?.$values || [];
    const pagination = legalDocumentsData?.data || {
        page: 1,
        totalPages: 1,
        hasPreviousPage: false,
        hasNextPage: false,
        total: 0,
    };

    const handleCreateNew = () => {
        setSelectedDocument(null);
        setIsCreateModalOpen(true);
    };

    const handleView = (legalDocument: LegalDocument) => {
        setSelectedDocument(legalDocument);
        setIsDetailModalOpen(true);
    };

    const handleEdit = (legalDocument: LegalDocument) => {
        setSelectedDocument(legalDocument);
        setIsEditModalOpen(true);
    };

    const handleDelete = (legalDocument: LegalDocument) => {
        setDocumentToDelete(legalDocument);
        setIsDeleteConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (documentToDelete) {
            try {
                await deleteMutation.mutateAsync(documentToDelete.id);
                setIsDeleteConfirmOpen(false);
                setDocumentToDelete(null);
            } catch (error) {
                console.error('Error deleting legal document:', error);
            }
        }
    };

    const handleCancelDelete = () => {
        setIsDeleteConfirmOpen(false);
        setDocumentToDelete(null);
    };

    const handleDownload = (legalDocument: LegalDocument) => {
        // TODO: Implement download functionality
        console.log('Download legal document:', legalDocument);
    };

    const handleCreateSuccess = () => {
        setIsCreateModalOpen(false);
        setSelectedDocument(null);
    };

    const handleEditSuccess = () => {
        setIsEditModalOpen(false);
        setSelectedDocument(null);
    };

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    const handlePageSizeChange = (size: number) => {
        // Reset to page 1 when changing page size
        setFilters({ ...filters, size, page: 1 });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <LegalDocumentHeader
                onCreateNew={handleCreateNew}
                totalCount={pagination?.total || 0}
            />

            {/* Filter */}
            <LegalDocumentFilter
                filters={filters}
                onFilterChange={setFilters}
                onRefresh={refetch}
            />

            {/* Table */}
            <LegalDocumentTable
                legalDocuments={legalDocuments}
                isLoading={isLoading}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onDownload={handleDownload}
            />

            {/* Pagination - Updated with new props */}
            <LegalDocumentPagination
                page={pagination?.page || 1}
                pageSize={filters.size || 10}
                total={pagination?.total || 0}
                totalPages={pagination?.totalPages || 1}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />

            {/* Modals */}
            <CreateLegalDocumentModal
                open={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={handleCreateSuccess}
            />

            <CreateLegalDocumentModal
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                initData={selectedDocument}
                onSuccess={handleEditSuccess}
            />

            <LegalDocumentDetailModal
                open={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                legalDocument={selectedDocument}
            />

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                open={isDeleteConfirmOpen}
                title="Xóa văn bản pháp luật"
                message={`Bạn có chắc chắn muốn xóa văn bản pháp luật "${documentToDelete?.name}"?\n\nHành động này không thể hoàn tác.`}
                confirmText="Xóa"
                cancelText="Hủy"
                type="danger"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                loading={deleteMutation.isPending}
            />
        </div>
    );
};
