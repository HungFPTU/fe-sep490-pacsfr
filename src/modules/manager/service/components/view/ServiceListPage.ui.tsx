'use client';

import React, { useState } from 'react';
import { ServiceHeader } from '../ui/header/ServiceHeader.ui';
import { ServiceFilter } from '../ui/filter/ServiceFilter.ui';
import { ServiceTable } from '../ui/table/ServiceTable.ui';
import { ServicePagination } from '../ui/pagination/ServicePagination.ui';
import { CreateServiceModal } from '../ui/modal/CreateServiceModal.ui';
import { ServiceDetailModal } from '../ui/detail/ServiceDetailModal.ui';
import { ConfirmDialog } from '@/shared/components/common/ConfirmDialog';
import { useServices, useDeleteService } from '../../hooks';
import { useGlobalToast } from '@/core/patterns/SingletonHook';
import { getValuesPage, RestPaged } from '@/types/rest';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../constants';
import type { Service } from '../../types';

export const ServiceListPage: React.FC = () => {
    const toast = useGlobalToast();

    // Filter states
    const [keyword, setKeyword] = useState('');
    const [serviceGroupId, setServiceGroupId] = useState('');
    const [legalBasisId] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [page, setPage] = useState(DEFAULT_PAGE);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

    // Modal states
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [editData, setEditData] = useState<Service | null>(null);
    const [detailData, setDetailData] = useState<Service | null>(null);

    // Delete state
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [deletingService, setDeletingService] = useState<Service | null>(null);

    // Fetch data
    const { data, refetch } = useServices({
        keyword,
        serviceGroupId,
        legalBasisId,
        isActive,
        page,
        size: pageSize,
    });

    const deleteMutation = useDeleteService();

    const pageResult = data ? getValuesPage(data as RestPaged<Service>) : null;
    const services = pageResult?.items || [];
    const total = pageResult?.total || 0;
    const totalPages = pageResult?.totalPages || 1;

    // Handlers
    const handleCreateClick = () => {
        setEditData(null);
        setCreateModalOpen(true);
    };

    const handleEdit = (service: Service) => {
        setEditData(service);
        setCreateModalOpen(true);
    };

    const handleView = (service: Service) => {
        setDetailData(service);
        setDetailModalOpen(true);
    };

    const handleCloseDetailModal = () => {
        setDetailModalOpen(false);
        setDetailData(null);
    };

    const handleDelete = (service: Service) => {
        setDeletingService(service);
        setDeletingId(service.id);
        setConfirmDeleteOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deletingId) return;

        try {
            await deleteMutation.mutateAsync(deletingId);
            toast.success('Xóa dịch vụ thành công');
        } catch (error) {
            toast.error('Xóa dịch vụ thất bại');
            console.error('Delete error:', error);
        } finally {
            setConfirmDeleteOpen(false);
            setDeletingId(null);
            setDeletingService(null);
        }
    };

    const handleReset = () => {
        setKeyword('');
        setServiceGroupId('');
        setIsActive(true);
        setPage(DEFAULT_PAGE);
        refetch();
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize);
        setPage(DEFAULT_PAGE);
    };

    return (
        <div className="space-y-6 p-6">
            <ServiceHeader onCreateClick={handleCreateClick} />

            <ServiceFilter
                keyword={keyword}
                serviceGroupId={serviceGroupId}
                isActive={isActive}
                onKeywordChange={setKeyword}
                onServiceGroupIdChange={setServiceGroupId}
                onIsActiveChange={setIsActive}
                onReset={handleReset}
                onRefresh={refetch}
            />

            <ServiceTable
                services={services}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={deleteMutation.isPending}
                deletingId={deletingId}
            />

            {total > 0 && (
                <ServicePagination
                    page={page}
                    pageSize={pageSize}
                    total={total}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            )}

            <CreateServiceModal
                open={createModalOpen}
                onClose={() => {
                    setCreateModalOpen(false);
                    setEditData(null);
                }}
                initData={editData}
            />

            <ServiceDetailModal
                open={detailModalOpen}
                onClose={handleCloseDetailModal}
                service={detailData}
            />

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                open={confirmDeleteOpen}
                title="Xác nhận xóa"
                message={`Bạn có chắc chắn muốn xóa dịch vụ "${deletingService?.serviceName}"?\nHành động này không thể hoàn tác.`}
                confirmText="Xóa"
                cancelText="Hủy"
                type="danger"
                onConfirm={handleConfirmDelete}
                onCancel={() => {
                    setConfirmDeleteOpen(false);
                    setDeletingId(null);
                    setDeletingService(null);
                }}
                loading={deleteMutation.isPending}
            />
        </div>
    );
};

