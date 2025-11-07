'use client';

import React, { useState } from 'react';
import { useTemplates, useDeleteTemplate } from '../../hooks';
import { CreateTemplateModal } from '../ui/modal/CreateTemplateModal.ui';
import { TemplateDetailModal } from '../ui/detail/TemplateDetailModal.ui';
import { TemplateHeader } from '../ui/header/TemplateHeader.ui';
import { TemplateFilter } from '../ui/filter/TemplateFilter.ui';
import { TemplateTable } from '../ui/table/TemplateTable.ui';
import { TemplatePagination } from '../ui/pagination/TemplatePagination.ui';
import { ConfirmDialog } from '@/shared/components/common/ConfirmDialog';
import type { Template } from '../../types';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { getValuesPage } from '@/types/rest';

export const TemplateListPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [docsTypeId, setDocsTypeId] = useState('');
    const [isActive, setIsActive] = useState<boolean>(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { data, isLoading, refetch } = useTemplates({
        keyword: keyword || undefined,
        docsTypeId: docsTypeId || undefined,
        isActive,
        page,
        size: pageSize,
    });

    const deleteMutation = useDeleteTemplate();
    const { addToast } = useGlobalToast();

    const handleCreate = () => {
        setSelectedTemplate(null);
        setModalOpen(true);
    };

    const handleEdit = (template: Template) => {
        setSelectedTemplate(template);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedTemplate(null);
    };

    const handleViewDetail = (template: Template) => {
        setSelectedTemplate(template);
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
            addToast({ message: 'Xóa template thành công', type: 'success' });
            refetch();
        } catch (error) {
            console.error('Error deleting template:', error);
            addToast({ message: 'Xóa template thất bại', type: 'error' });
        } finally {
            setConfirmDeleteOpen(false);
            setDeletingId(null);
        }
    };

    const handleModalSuccess = () => {
        refetch();
    };

    const pageResult = data ? getValuesPage(data) : null;
    // Map API response fields (sampleCode/sampleName) to Template type (templateCode/templateName)
    const templates = (pageResult?.items || []).map((template: Template) => ({
        ...template,
        templateCode: template.templateCode ?? (template as unknown as { sampleCode?: string }).sampleCode ?? '',
        templateName: template.templateName ?? (template as unknown as { sampleName?: string }).sampleName ?? '',
    }));
    const total = pageResult?.total || 0;
    const totalPages = pageResult?.totalPages || 1;

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize);
        setPage(1);
    };

    return (
        <div className="p-6">
            <TemplateHeader onCreateClick={handleCreate} totalCount={total} />

            <TemplateFilter
                keyword={keyword}
                onKeywordChange={setKeyword}
                docsTypeId={docsTypeId}
                onDocsTypeIdChange={setDocsTypeId}
                isActive={isActive}
                onStatusChange={setIsActive}
                onRefresh={refetch}
            />

            <TemplateTable
                templates={templates}
                isLoading={isLoading}
                onView={handleViewDetail}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={deleteMutation.isPending}
            />

            {total > 0 && (
                <TemplatePagination
                    page={page}
                    pageSize={pageSize}
                    total={total}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            )}

            {/* Create/Edit Modal */}
            <CreateTemplateModal
                open={modalOpen}
                onClose={handleCloseModal}
                initData={selectedTemplate}
                onSuccess={handleModalSuccess}
            />

            {/* Detail Modal */}
            <TemplateDetailModal
                open={detailModalOpen}
                onClose={() => setDetailModalOpen(false)}
                template={selectedTemplate}
            />

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                open={confirmDeleteOpen}
                title="Xác nhận xóa"
                message={`Bạn có chắc chắn muốn xóa template này?\nHành động này không thể hoàn tác.`}
                confirmText="Xóa"
                cancelText="Hủy"
                type="danger"
                onConfirm={handleConfirmDelete}
                onCancel={() => {
                    setConfirmDeleteOpen(false);
                    setDeletingId(null);
                }}
                loading={deleteMutation.isPending}
            />
        </div>
    );
};

