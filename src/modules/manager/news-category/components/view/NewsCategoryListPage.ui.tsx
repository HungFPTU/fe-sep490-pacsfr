'use client';

import React, { useState } from 'react';
import { useNewsCategories, useDeleteNewsCategory } from '../../hooks';
import { CreateNewsCategoryModal } from '../ui/modal/CreateNewsCategoryModal.ui';
import { NewsCategoryDetailModal } from '../ui/detail/NewsCategoryDetailModal.ui';
import { NewsCategoryHeader } from '../ui/header/NewsCategoryHeader.ui';
import { NewsCategoryFilter } from '../ui/filter/NewsCategoryFilter.ui';
import { NewsCategoryTable } from '../ui/table/NewsCategoryTable.ui';
import { NewsCategoryPagination } from '../ui/pagination/NewsCategoryPagination.ui';
import { ConfirmDialog } from '@/shared/components/common/ConfirmDialog';
import type { NewsCategory } from '../../types';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { getValuesPage } from '@/types/rest';

export const NewsCategoryListPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [isActive, setIsActive] = useState<boolean>(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [selectedNewsCategory, setSelectedNewsCategory] = useState<NewsCategory | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { data, isLoading, refetch } = useNewsCategories({
        keyword,
        isActive,
        page,
        size: pageSize,
    });

    const deleteMutation = useDeleteNewsCategory();
    const { addToast } = useGlobalToast();

    const handleCreate = () => {
        setSelectedNewsCategory(null);
        setModalOpen(true);
    };

    const handleEdit = (newsCategory: NewsCategory) => {
        setSelectedNewsCategory(newsCategory);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedNewsCategory(null);
    };

    const handleViewDetail = (newsCategory: NewsCategory) => {
        setSelectedNewsCategory(newsCategory);
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
            addToast({ message: 'Xóa danh mục tin tức thành công', type: 'success' });
            refetch();
        } catch (error) {
            console.error('Error deleting news category:', error);
            addToast({ message: 'Xóa danh mục tin tức thất bại', type: 'error' });
        } finally {
            setConfirmDeleteOpen(false);
            setDeletingId(null);
        }
    };

    const handleModalSuccess = () => {
        refetch();
    };

    const pageResult = data ? getValuesPage(data) : null;
    const newsCategories = pageResult?.items || [];
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
            <NewsCategoryHeader onCreateClick={handleCreate} />

            <NewsCategoryFilter
                keyword={keyword}
                onKeywordChange={setKeyword}
                isActive={isActive}
                onStatusChange={setIsActive}
                onRefresh={refetch}
            />

            <NewsCategoryTable
                newsCategories={newsCategories}
                isLoading={isLoading}
                onView={handleViewDetail}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={deleteMutation.isPending}
            />

            {total > 0 && (
                <NewsCategoryPagination
                    page={page}
                    pageSize={pageSize}
                    total={total}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            )}

            <CreateNewsCategoryModal
                open={modalOpen}
                onClose={handleCloseModal}
                initData={selectedNewsCategory}
                onSuccess={handleModalSuccess}
            />

            <NewsCategoryDetailModal
                open={detailModalOpen}
                onClose={() => setDetailModalOpen(false)}
                newsCategory={selectedNewsCategory}
            />

            <ConfirmDialog
                open={confirmDeleteOpen}
                title="Xác nhận xóa"
                message={`Bạn có chắc chắn muốn xóa danh mục tin tức "${selectedNewsCategory?.categoryName}"?\nHành động này không thể hoàn tác.`}
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

