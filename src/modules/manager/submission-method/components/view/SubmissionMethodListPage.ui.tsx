'use client';

import React, { useState } from 'react';
import { useSubmissionMethods, useDeleteSubmissionMethod } from '../../hooks';
import { CreateSubmissionMethodModal } from '../ui/modal/CreateSubmissionMethodModal.ui';
import { SubmissionMethodHeader } from '../ui/header/SubmissionMethodHeader.ui';
import { SubmissionMethodFilter } from '../ui/filter/SubmissionMethodFilter.ui';
import { SubmissionMethodTable } from '../ui/table/SubmissionMethodTable.ui';
import { SubmissionMethodPagination } from '../ui/pagination/SubmissionMethodPagination.ui';
import { ConfirmDialog } from '@/shared/components/common/ConfirmDialog';
import type { SubmissionMethod } from '../../types';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { getValuesPage } from '@/types/rest';

export const SubmissionMethodListPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [isActive, setIsActive] = useState<boolean>(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [selectedSubmissionMethod, setSelectedSubmissionMethod] = useState<SubmissionMethod | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { data, isLoading, refetch } = useSubmissionMethods({
        keyword: keyword || undefined,
        isActive,
        page,
        size: pageSize,
    });

    const deleteMutation = useDeleteSubmissionMethod();
    const { addToast } = useGlobalToast();

    const handleCreate = () => {
        setSelectedSubmissionMethod(null);
        setModalOpen(true);
    };

    const handleEdit = (submissionMethod: SubmissionMethod) => {
        setSelectedSubmissionMethod(submissionMethod);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedSubmissionMethod(null);
    };

    const handleViewDetail = (submissionMethod: SubmissionMethod) => {
        setSelectedSubmissionMethod(submissionMethod);
        // For now, just open edit modal. Can create detail modal later if needed
        setModalOpen(true);
    };

    const handleDelete = (id: string) => {
        setDeletingId(id);
        setConfirmDeleteOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deletingId) return;

        try {
            await deleteMutation.mutateAsync(deletingId);
            addToast({ message: 'Xóa phương thức nộp hồ sơ thành công', type: 'success' });
            refetch();
        } catch (error) {
            console.error('Error deleting submission method:', error);
            addToast({ message: 'Xóa phương thức nộp hồ sơ thất bại', type: 'error' });
        } finally {
            setConfirmDeleteOpen(false);
            setDeletingId(null);
        }
    };

    const handleModalSuccess = () => {
        refetch();
    };

    const pageResult = data ? getValuesPage(data) : null;
    const submissionMethods = pageResult?.items || [];
    const total = pageResult?.total || 0;
    const totalPages = pageResult?.totalPages || 1;

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize);
        setPage(1);
    };

    const handleFilterChange = (filters: { keyword: string; isActive: boolean }) => {
        setKeyword(filters.keyword);
        setIsActive(filters.isActive);
        setPage(1); // Reset to first page when filters change
    };

    return (
        <div className="p-6">
            <SubmissionMethodHeader onCreateClick={handleCreate} totalCount={total} />

            <SubmissionMethodFilter
                keyword={keyword}
                onKeywordChange={(kw) => handleFilterChange({ keyword: kw, isActive })}
                isActive={isActive}
                onStatusChange={(active) => handleFilterChange({ keyword, isActive: active })}
                onRefresh={refetch}
            />

            <SubmissionMethodTable
                submissionMethods={submissionMethods}
                isLoading={isLoading}
                onView={handleViewDetail}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={deleteMutation.isPending}
            />

            {total > 0 && (
                <SubmissionMethodPagination
                    page={page}
                    pageSize={pageSize}
                    total={total}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            )}

            {/* Create/Edit Modal */}
            <CreateSubmissionMethodModal
                open={modalOpen}
                onClose={handleCloseModal}
                initData={selectedSubmissionMethod}
                onSuccess={handleModalSuccess}
            />

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                open={confirmDeleteOpen}
                onCancel={() => {
                    setConfirmDeleteOpen(false);
                    setDeletingId(null);
                }}
                onConfirm={handleConfirmDelete}
                title="Xác nhận xóa"
                message="Bạn có chắc chắn muốn xóa phương thức nộp hồ sơ này? Hành động này không thể hoàn tác."
                confirmText="Xóa"
                cancelText="Hủy"
                type="danger"
                loading={deleteMutation.isPending}
            />
        </div>
    );
};

