'use client';

import React, { useState } from 'react';
import { useFaqs, useDeleteFaq } from '../../hooks';
import { CreateFaqModal } from '../ui/modal/CreateFaqModal.ui';
import { FaqDetailModal } from '../ui/detail/FaqDetailModal.ui';
import { FaqHeader } from '../ui/header/FaqHeader.ui';
import { FaqFilter } from '../ui/filter/FaqFilter.ui';
import { FaqTable } from '../ui/table/FaqTable.ui';
import { FaqPagination } from '../ui/pagination/FaqPagination.ui';
import { ConfirmDialog } from '@/shared/components/common/ConfirmDialog';
import type { Faq } from '../../types';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { getValuesPage } from '@/types/rest';

export const FaqListPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [serviceId, setServiceId] = useState('');
    const [faqCategoryId, setFaqCategoryId] = useState('');
    const [isActive, setIsActive] = useState<boolean>(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [selectedFaq, setSelectedFaq] = useState<Faq | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { data, isLoading, refetch } = useFaqs({
        keyword,
        serviceId: serviceId || undefined,
        faqCategoryId: faqCategoryId || undefined,
        isActive,
        page,
        size: pageSize,
    });

    const deleteMutation = useDeleteFaq();
    const { addToast } = useGlobalToast();

    const handleCreate = () => {
        setSelectedFaq(null);
        setModalOpen(true);
    };

    const handleEdit = (faq: Faq) => {
        setSelectedFaq(faq);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedFaq(null);
    };

    const handleViewDetail = (faq: Faq) => {
        setSelectedFaq(faq);
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
            addToast({ message: 'Xóa câu hỏi thường gặp thành công', type: 'success' });
            refetch();
        } catch (error) {
            console.error('Error deleting FAQ:', error);
            addToast({ message: 'Xóa câu hỏi thường gặp thất bại', type: 'error' });
        } finally {
            setConfirmDeleteOpen(false);
            setDeletingId(null);
        }
    };

    const handleModalSuccess = () => {
        refetch();
    };

    const handleFilterApply = (filters: { keyword: string; serviceId: string; faqCategoryId: string; isActive: boolean }) => {
        setKeyword(filters.keyword);
        setServiceId(filters.serviceId);
        setFaqCategoryId(filters.faqCategoryId);
        setIsActive(filters.isActive);
        setPage(1); // Reset to first page when filtering
    };

    const handleFilterReset = () => {
        setKeyword('');
        setServiceId('');
        setFaqCategoryId('');
        setIsActive(true);
        setPage(1);
        refetch();
    };

    const pageResult = data ? getValuesPage(data) : null;
    const faqs = pageResult?.items || [];
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
            <FaqHeader onCreateClick={handleCreate} />

            <FaqFilter
                keyword={keyword}
                serviceId={serviceId}
                faqCategoryId={faqCategoryId}
                isActive={isActive}
                onApply={handleFilterApply}
                onReset={handleFilterReset}
            />

            <FaqTable
                faqs={faqs}
                isLoading={isLoading}
                onView={handleViewDetail}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={deleteMutation.isPending}
            />

            {total > 0 && (
                <FaqPagination
                    page={page}
                    pageSize={pageSize}
                    total={total}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            )}

            {/* Create/Edit Modal */}
            <CreateFaqModal
                open={modalOpen}
                onClose={handleCloseModal}
                initData={selectedFaq}
                onSuccess={handleModalSuccess}
            />

            {/* Detail Modal */}
            <FaqDetailModal
                open={detailModalOpen}
                onClose={() => setDetailModalOpen(false)}
                faq={selectedFaq}
            />

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                open={confirmDeleteOpen}
                title="Xác nhận xóa"
                message={`Bạn có chắc chắn muốn xóa câu hỏi thường gặp này?\nHành động này không thể hoàn tác.`}
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

