'use client';

import React, { useState } from 'react';
import { LegalDocumentHeader } from '@modules/manager/legal-document/components/ui/header/LegalDocumentHeader.ui';
import { LegalDocumentFilter } from '@modules/manager/legal-document/components/ui/filter/LegalDocumentFilter.ui';
import { LegalDocumentTable } from '@modules/manager/legal-document/components/ui/table/LegalDocumentTable.ui';
import { LegalDocumentPagination } from '@modules/manager/legal-document/components/ui/pagination/LegalDocumentPagination.ui';
import { CreateLegalDocumentModal } from '@modules/manager/legal-document/components/ui/modal/CreateLegalDocumentModal.ui';
import { LegalDocumentDetailModal } from '@modules/manager/legal-document/components/ui/detail/LegalDocumentDetailModal.ui';
import { useLegalDocuments, useDeleteLegalDocument, useLegalDocumentFilters } from '@modules/manager/legal-document/hooks';
import type { LegalDocument } from '@modules/manager/legal-document/types';

export const LegalDocumentListPage: React.FC = () => {
    const { filters, updateFilter, resetFilters } = useLegalDocumentFilters();
    const [selectedDocument, setSelectedDocument] = useState<LegalDocument | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const { data: legalDocumentsData, isLoading } = useLegalDocuments(filters);
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

    const handleDelete = async (legalDocument: LegalDocument) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa văn bản pháp luật này?')) {
            try {
                await deleteMutation.mutateAsync(legalDocument.id);
            } catch (error) {
                console.error('Error deleting legal document:', error);
            }
        }
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
        updateFilter('page', page as unknown as string | boolean);
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
                onFilterChange={updateFilter}
                onReset={resetFilters}
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

            {/* Pagination */}
            {pagination?.totalPages > 1 && (
                <LegalDocumentPagination
                    currentPage={pagination?.page || 1}
                    totalPages={pagination?.totalPages || 1}
                    hasPreviousPage={pagination?.hasPreviousPage || false}
                    hasNextPage={pagination?.hasNextPage || false}
                    onPageChange={handlePageChange}
                />
            )}

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
        </div>
    );
};
