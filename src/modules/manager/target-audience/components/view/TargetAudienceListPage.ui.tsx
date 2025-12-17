'use client';

import React, { useState } from 'react';
import { useTargetAudiences, useDeleteTargetAudience } from '../../hooks';
import { CreateTargetAudienceModal } from '../ui/modal/CreateTargetAudienceModal.ui';
import { TargetAudienceDetailModal } from '../ui/detail/TargetAudienceDetailModal.ui';
import { TargetAudienceHeader } from '../ui/header/TargetAudienceHeader.ui';
import { TargetAudienceFilter } from '../ui/filter/TargetAudienceFilter.ui';
import { TargetAudienceTable } from '../ui/table/TargetAudienceTable.ui';
import { TargetAudiencePagination } from '../ui/pagination/TargetAudiencePagination.ui';
import { ConfirmDialog } from '@/shared/components/common/ConfirmDialog';
import type { TargetAudience } from '../../types';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { getValuesPage } from '@/types/rest';

export const TargetAudienceListPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [isActive, setIsActive] = useState<boolean>(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [selectedTargetAudience, setSelectedTargetAudience] = useState<TargetAudience | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { data, isLoading, refetch } = useTargetAudiences({
        keyword,
        isActive,
        page,
        size: pageSize,
    });

    const deleteMutation = useDeleteTargetAudience();
    const { addToast } = useGlobalToast();

    const handleCreate = () => {
        setSelectedTargetAudience(null);
        setModalOpen(true);
    };

    const handleEdit = (targetAudience: TargetAudience) => {
        setSelectedTargetAudience(targetAudience);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedTargetAudience(null);
    };

    const handleViewDetail = (targetAudience: TargetAudience) => {
        setSelectedTargetAudience(targetAudience);
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
            addToast({ message: 'Xóa đối tượng thành công', type: 'success' });
            refetch();
        } catch (error) {
            console.error('Error deleting TargetAudience:', error);
            addToast({ message: 'Xóa đối tượng thất bại', type: 'error' });
        } finally {
            setConfirmDeleteOpen(false);
            setDeletingId(null);
        }
    };

    const handleModalSuccess = () => {
        refetch();
    };

    const handleFilterApply = (filters: { keyword: string; isActive: boolean }) => {
        setKeyword(filters.keyword);
        setIsActive(filters.isActive);
        setPage(1); // Reset to first page when filtering
    };

    const handleFilterReset = () => {
        setKeyword('');
        setIsActive(true);
        setPage(1);
        refetch();
    };

    const pageResult = data ? getValuesPage(data) : null;
    const targetAudiences = pageResult?.items || [];
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
            <TargetAudienceHeader onCreateClick={handleCreate} />

            <TargetAudienceFilter
                keyword={keyword}
                isActive={isActive}
                onApply={handleFilterApply}
                onReset={handleFilterReset}
            />

            <TargetAudienceTable
                targetAudiences={targetAudiences}
                isLoading={isLoading}
                onView={handleViewDetail}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={deleteMutation.isPending}
            />

            {total > 0 && (
                <TargetAudiencePagination
                    page={page}
                    pageSize={pageSize}
                    total={total}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            )}

            {/* Create/Edit Modal */}
            <CreateTargetAudienceModal
                open={modalOpen}
                onClose={handleCloseModal}
                initData={selectedTargetAudience}
                onSuccess={handleModalSuccess}
            />

            {/* Detail Modal */}
            <TargetAudienceDetailModal
                open={detailModalOpen}
                onClose={() => setDetailModalOpen(false)}
                targetAudience={selectedTargetAudience}
            />

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                open={confirmDeleteOpen}
                title="Xác nhận xóa"
                message={`Bạn có chắc chắn muốn xóa đối tượng này?\nHành động này không thể hoàn tác.`}
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

