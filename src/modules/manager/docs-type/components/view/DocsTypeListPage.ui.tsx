'use client';

import React, { useState } from 'react';
import { useDocsTypes, useDeleteDocsType } from '../../hooks';
import { CreateDocsTypeModal } from '../ui/modal/CreateDocsTypeModal.ui';
import { DocsTypeDetailModal } from '../ui/detail/DocsTypeDetailModal.ui';
import { DocsTypeHeader } from '../ui/header/DocsTypeHeader.ui';
import { DocsTypeFilter } from '../ui/filter/DocsTypeFilter.ui';
import { DocsTypeTable } from '../ui/table/DocsTypeTable.ui';
import { DocsTypePagination } from '../ui/pagination/DocsTypePagination.ui';
import { ConfirmDialog } from '@/shared/components/common/ConfirmDialog';
import type { DocsType } from '../../types';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { getValuesPage } from '@/types/rest';

export const DocsTypeListPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [groupId, setGroupId] = useState('');
    const [isActive, setIsActive] = useState<boolean>(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [selectedDocsType, setSelectedDocsType] = useState<DocsType | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { data, isLoading, refetch } = useDocsTypes({
        keyword,
        groupId: groupId || undefined,
        isActive,
        page,
        size: pageSize,
    });

    const deleteMutation = useDeleteDocsType();
    const { addToast } = useGlobalToast();

    const handleCreate = () => {
        setSelectedDocsType(null);
        setModalOpen(true);
    };

    const handleEdit = (docsType: DocsType) => {
        setSelectedDocsType(docsType);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedDocsType(null);
    };

    const handleViewDetail = (docsType: DocsType) => {
        setSelectedDocsType(docsType);
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
            addToast({ message: 'Xóa loại văn bản thành công', type: 'success' });
            refetch();
        } catch (error) {
            console.error('Error deleting docs type:', error);
            addToast({ message: 'Xóa loại văn bản thất bại', type: 'error' });
        } finally {
            setConfirmDeleteOpen(false);
            setDeletingId(null);
        }
    };

    const handleModalSuccess = () => {
        refetch();
    };

    const pageResult = data ? getValuesPage(data) : null;
    const docsTypes = pageResult?.items || [];
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
            <DocsTypeHeader onCreateClick={handleCreate} />

            <DocsTypeFilter
                keyword={keyword}
                onKeywordChange={setKeyword}
                groupId={groupId}
                onGroupIdChange={setGroupId}
                isActive={isActive}
                onStatusChange={setIsActive}
            />

            <DocsTypeTable
                docsTypes={docsTypes}
                isLoading={isLoading}
                onView={handleViewDetail}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={deleteMutation.isPending}
            />

            {total > 0 && (
                <DocsTypePagination
                    page={page}
                    pageSize={pageSize}
                    total={total}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            )}

            {/* Create/Edit Modal */}
            <CreateDocsTypeModal
                open={modalOpen}
                onClose={handleCloseModal}
                initData={selectedDocsType}
                onSuccess={handleModalSuccess}
            />

            {/* Detail Modal */}
            <DocsTypeDetailModal
                open={detailModalOpen}
                onClose={() => setDetailModalOpen(false)}
                docsType={selectedDocsType}
            />

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                open={confirmDeleteOpen}
                title="Xác nhận xóa"
                message={`Bạn có chắc chắn muốn xóa loại văn bản này?\nHành động này không thể hoàn tác.`}
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

