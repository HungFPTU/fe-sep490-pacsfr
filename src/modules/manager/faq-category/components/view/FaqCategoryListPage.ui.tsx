'use client';

import React, { useState } from 'react';
import { useFaqCategories, useDeleteFaqCategory } from '../../hooks';
import { CreateFaqCategoryModal } from '../ui/modal/CreateFaqCategoryModal.ui';
import { FaqCategoryDetailModal } from '../ui/detail/FaqCategoryDetailModal.ui';
import { FaqCategoryHeader } from '../ui/header/FaqCategoryHeader.ui';
import { FaqCategoryFilter } from '../ui/filter/FaqCategoryFilter.ui';
import { FaqCategoryTable } from '../ui/table/FaqCategoryTable.ui';
import { FaqCategoryPagination } from '../ui/pagination/FaqCategoryPagination.ui';
import { ConfirmDialog } from '@/shared/components/common/ConfirmDialog';
import type { FaqCategory } from '../../types';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { getValuesPage } from '@/types/rest';

export const FaqCategoryListPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [isActive, setIsActive] = useState<boolean>(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [selectedFaqCategory, setSelectedFaqCategory] = useState<FaqCategory | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { data, isLoading, refetch } = useFaqCategories({
        keyword,
        isActive,
        page,
        size: pageSize,
    });

    const deleteMutation = useDeleteFaqCategory();
    const { addToast } = useGlobalToast();

    const handleCreate = () => {
        setSelectedFaqCategory(null);
        setModalOpen(true);
    };

    const handleEdit = (faqCategory: FaqCategory) => {
        setSelectedFaqCategory(faqCategory);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedFaqCategory(null);
    };

    const handleViewDetail = (faqCategory: FaqCategory) => {
        setSelectedFaqCategory(faqCategory);
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
            addToast({ message: 'Xóa danh mục câu hỏi thường gặp thành công', type: 'success' });
            refetch();
        } catch (error) {
            console.error('Error deleting FAQ category:', error);
            addToast({ message: 'Xóa danh mục câu hỏi thường gặp thất bại', type: 'error' });
        } finally {
            setConfirmDeleteOpen(false);
            setDeletingId(null);
        }
    };

    const handleModalSuccess = () => {
        refetch();
    };

    const pageResult = data ? getValuesPage(data) : null;
    const faqCategories = pageResult?.items || [];
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
            <FaqCategoryHeader onCreateClick={handleCreate} />

            <FaqCategoryFilter
                keyword={keyword}
                onKeywordChange={setKeyword}
                isActive={isActive}
                onStatusChange={setIsActive}
                onRefresh={refetch}
            />

            <FaqCategoryTable
                faqCategories={faqCategories}
                isLoading={isLoading}
                onView={handleViewDetail}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={deleteMutation.isPending}
            />

            {total > 0 && (
                <FaqCategoryPagination
                    page={page}
                    pageSize={pageSize}
                    total={total}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            )}

            {/* Create/Edit Modal */}
            <CreateFaqCategoryModal
                open={modalOpen}
                onClose={handleCloseModal}
                initData={selectedFaqCategory}
                onSuccess={handleModalSuccess}
            />

            {/* Detail Modal */}
            <FaqCategoryDetailModal
                open={detailModalOpen}
                onClose={() => setDetailModalOpen(false)}
                faqCategory={selectedFaqCategory}
            />

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                open={confirmDeleteOpen}
                title="Xác nhận xóa"
                message={`Bạn có chắc chắn muốn xóa danh mục câu hỏi thường gặp này?\nHành động này không thể hoàn tác.`}
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

