'use client';

import React, { useState } from 'react';
import { useDocsTypeGroups, useDeleteDocsTypeGroup } from '../../hooks';
import { CreateDocsTypeGroupModal } from '../ui/modal/CreateDocsTypeGroupModal.ui';
import { DocsTypeGroupDetailModal } from '../ui/detail/DocsTypeGroupDetailModal.ui';
import { DocsTypeGroupHeader } from '../ui/header/DocsTypeGroupHeader.ui';
import { DocsTypeGroupFilter } from '../ui/filter/DocsTypeGroupFilter.ui';
import { DocsTypeGroupTable } from '../ui/table/DocsTypeGroupTable.ui';
import { DocsTypeGroupPagination } from '../ui/pagination/DocsTypeGroupPagination.ui';
import { ConfirmDialog } from '@/shared/components/common/ConfirmDialog';
import type { DocsTypeGroup } from '../../types';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { getValuesPage } from '@/types/rest';

export const DocsTypeGroupListPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [isActive, setIsActive] = useState<boolean>(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<DocsTypeGroup | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { data, isLoading, refetch } = useDocsTypeGroups({
        keyword,
        isActive,
        page,
        size: pageSize,
    });

    const deleteMutation = useDeleteDocsTypeGroup();
    const { addToast } = useGlobalToast();

    const handleCreate = () => {
        setSelectedGroup(null);
        setModalOpen(true);
    };

    const handleEdit = (group: DocsTypeGroup) => {
        setSelectedGroup(group);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedGroup(null);
    };

    const handleViewDetail = (group: DocsTypeGroup) => {
        setSelectedGroup(group);
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
            addToast({ message: 'Xóa nhóm hồ sơ thành công', type: 'success' });
            refetch();
        } catch (error) {
            console.error('Error deleting docs type group:', error);
            addToast({ message: 'Xóa nhóm hồ sơ thất bại', type: 'error' });
        } finally {
            setConfirmDeleteOpen(false);
            setDeletingId(null);
        }
    };

    const handleModalSuccess = () => {
        refetch();
    };

    const pageResult = data ? getValuesPage(data) : null;
    const docsTypeGroups = pageResult?.items || [];
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
            <DocsTypeGroupHeader onCreateClick={handleCreate} />

            <DocsTypeGroupFilter
                keyword={keyword}
                onKeywordChange={setKeyword}
                isActive={isActive}
                onStatusChange={setIsActive}
            />

            <DocsTypeGroupTable
                groups={docsTypeGroups}
                isLoading={isLoading}
                onView={handleViewDetail}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={deleteMutation.isPending}
            />

            {total > 0 && (
                <DocsTypeGroupPagination
                    page={page}
                    pageSize={pageSize}
                    total={total}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            )}

            {/* Create/Edit Modal */}
            <CreateDocsTypeGroupModal
                open={modalOpen}
                onClose={handleCloseModal}
                initData={selectedGroup}
                onSuccess={handleModalSuccess}
            />

            {/* Detail Modal */}
            <DocsTypeGroupDetailModal
                open={detailModalOpen}
                onClose={() => setDetailModalOpen(false)}
                docsTypeGroup={selectedGroup}
            />

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                open={confirmDeleteOpen}
                title="Xác nhận xóa"
                message={`Bạn có chắc chắn muốn xóa nhóm hồ sơ này?\nHành động này không thể hoàn tác.`}
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

