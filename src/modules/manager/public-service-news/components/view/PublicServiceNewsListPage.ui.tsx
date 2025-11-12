'use client';

import React, { useState } from 'react';
import { usePublicServiceNewsList, useDeletePublicServiceNews } from '../../hooks';
import { PublicServiceNewsHeader, PublicServiceNewsFilter, PublicServiceNewsTable, PublicServiceNewsPagination, PublicServiceNewsDetailModal, CreatePublicServiceNewsModal } from '../ui';
import type { PublicServiceNews } from '../../types';
import { ConfirmDialog } from '@/shared/components/common/ConfirmDialog';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { getValuesPage } from '@/types/rest';

const DEFAULT_PAGE_SIZE = 10;

export const PublicServiceNewsListPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [keyword, setKeyword] = useState('');
    const [serviceId, setServiceId] = useState('');
    const [newsCategoryId, setNewsCategoryId] = useState('');
    const [staffId, setStaffId] = useState('');
    const [isPublished, setIsPublished] = useState<boolean>(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [selectedNews, setSelectedNews] = useState<PublicServiceNews | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { data, isLoading, refetch } = usePublicServiceNewsList({
        keyword,
        serviceId,
        newsCategoryId,
        staffId,
        isPublished,
        page,
        size: pageSize,
    });

    const deleteMutation = useDeletePublicServiceNews();
    const { addToast } = useGlobalToast();

    const handleFiltersApply = (filters: {
        keyword: string;
        serviceId: string;
        newsCategoryId: string;
        staffId: string;
        isPublished: boolean;
    }) => {
        setKeyword(filters.keyword);
        setServiceId(filters.serviceId);
        setNewsCategoryId(filters.newsCategoryId);
        setStaffId(filters.staffId);
        setIsPublished(filters.isPublished);
        setPage(1);
        refetch();
    };

    const handleReset = () => {
        setKeyword('');
        setServiceId('');
        setNewsCategoryId('');
        setStaffId('');
        setIsPublished(true);
        setPage(1);
        refetch();
    };

    const handleCreate = () => {
        setSelectedNews(null);
        setModalOpen(true);
    };

    const handleEdit = (news: PublicServiceNews) => {
        setSelectedNews(news);
        setModalOpen(true);
    };

    const handleViewDetail = (news: PublicServiceNews) => {
        setSelectedNews(news);
        setDetailModalOpen(true);
    };

    const handleDelete = (id: string, news?: PublicServiceNews) => {
        setDeletingId(id);
        setSelectedNews(news ?? null);
        setConfirmDeleteOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deletingId) return;
        try {
            await deleteMutation.mutateAsync(deletingId);
            addToast({ message: 'Xóa tin tức dịch vụ công thành công', type: 'success' });
            refetch();
        } catch (error) {
            console.error('Error deleting public service news:', error);
            addToast({ message: 'Xóa tin tức dịch vụ công thất bại', type: 'error' });
        } finally {
            setConfirmDeleteOpen(false);
            setDeletingId(null);
        }
    };

    const handleModalSuccess = () => {
        refetch();
    };

    const pageResult = data ? getValuesPage(data) : null;
    const items = pageResult?.items || [];
    const total = pageResult?.total || 0;
    const totalPages = pageResult?.totalPages || 0;

    return (
        <div className="p-6 space-y-4">
            <PublicServiceNewsHeader onCreateClick={handleCreate} />

            <PublicServiceNewsFilter
                keyword={keyword}
                serviceId={serviceId}
                newsCategoryId={newsCategoryId}
                staffId={staffId}
                isPublished={isPublished}
                onApply={handleFiltersApply}
                onReset={handleReset}
            />

            <PublicServiceNewsTable
                items={items}
                isLoading={isLoading}
                onView={handleViewDetail}
                onEdit={handleEdit}
                onDelete={(id) => handleDelete(id)}
                isDeleting={deleteMutation.isPending}
            />

            {total > 0 && (
                <PublicServiceNewsPagination
                    page={page}
                    pageSize={pageSize}
                    total={total}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    onPageSizeChange={(size) => {
                        setPageSize(size);
                        setPage(1);
                    }}
                />
            )}

            <CreatePublicServiceNewsModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                initData={selectedNews}
                onSuccess={handleModalSuccess}
            />

            <PublicServiceNewsDetailModal
                open={detailModalOpen}
                onClose={() => setDetailModalOpen(false)}
                news={selectedNews}
            />

            <ConfirmDialog
                open={confirmDeleteOpen}
                title="Xác nhận xóa"
                message={`Bạn có chắc chắn muốn xóa tin tức "${selectedNews?.title ?? ''}"?\nHành động này không thể hoàn tác.`}
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
