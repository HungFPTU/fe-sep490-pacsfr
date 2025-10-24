'use client';

import React, { useState } from 'react';
import { useServiceGroups, useDeleteServiceGroup } from '../../hooks';
import { CreateServiceGroupModal } from '../ui/modal/CreateServiceGroupModal.ui';
import { ServiceGroupDetailModal } from '../ui/detail/ServiceGroupDetailModal.ui';
import { ServiceGroupHeader } from '../ui/header/ServiceGroupHeader.ui';
import { ServiceGroupFilter } from '../ui/filter/ServiceGroupFilter.ui';
import { ServiceGroupTable } from '../ui/table/ServiceGroupTable.ui';
import { ServiceGroupPagination } from '../ui/pagination/ServiceGroupPagination.ui';
import { ConfirmDialog } from '@/shared/components/common/ConfirmDialog';
import type { ServiceGroup } from '../../types';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { getValuesPage } from '@/types/rest';

export const ServiceGroupListPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [isActive, setIsActive] = useState<boolean>(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<ServiceGroup | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { data, isLoading, refetch } = useServiceGroups({
        keyword,
        isActive,
        page,
        size: pageSize,
    });

    const deleteMutation = useDeleteServiceGroup();
    const { addToast } = useGlobalToast();

    const handleCreate = () => {
        setSelectedGroup(null);
        setModalOpen(true);
    };

    const handleEdit = (group: ServiceGroup) => {
        setSelectedGroup(group);
        setModalOpen(true);
    };

    const handleViewDetail = (group: ServiceGroup) => {
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
            addToast({ message: 'Xóa nhóm dịch vụ thành công', type: 'success' });
            refetch();
        } catch (error) {
            console.error('Error deleting service group:', error);
            addToast({ message: 'Xóa nhóm dịch vụ thất bại', type: 'error' });
        } finally {
            setConfirmDeleteOpen(false);
            setDeletingId(null);
        }
    };

    const handleModalSuccess = () => {
        refetch();
    };

    const pageResult = data ? getValuesPage(data) : null;
    const serviceGroups = pageResult?.items || [];
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
            <ServiceGroupHeader onCreateClick={handleCreate} />

            <ServiceGroupFilter
                keyword={keyword}
                onKeywordChange={setKeyword}
                isActive={isActive}
                onStatusChange={setIsActive}
            />

            <ServiceGroupTable
                groups={serviceGroups}
                isLoading={isLoading}
                onView={handleViewDetail}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={deleteMutation.isPending}
            />

            {total > 0 && (
                <ServiceGroupPagination
                    page={page}
                    pageSize={pageSize}
                    total={total}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            )}

            {/* Create/Edit Modal */}
            <CreateServiceGroupModal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedGroup(null);
                }}
                initData={selectedGroup}
                onSuccess={handleModalSuccess}
            />

            {/* Detail Modal */}
            <ServiceGroupDetailModal
                open={detailModalOpen}
                onClose={() => setDetailModalOpen(false)}
                serviceGroup={selectedGroup}
            />

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                open={confirmDeleteOpen}
                title="Xác nhận xóa"
                message={`Bạn có chắc chắn muốn xóa nhóm dịch vụ này?\nHành động này không thể hoàn tác.`}
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

