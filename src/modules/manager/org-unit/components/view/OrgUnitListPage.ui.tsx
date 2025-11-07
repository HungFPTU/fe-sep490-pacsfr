'use client';

import React, { useState } from 'react';
import { useOrgUnits, useDeleteOrgUnit } from '../../hooks';
import { CreateOrgUnitModal } from '../ui/modal/CreateOrgUnitModal.ui';
import { OrgUnitDetailModal } from '../ui/detail/OrgUnitDetailModal.ui';
import { OrgUnitHeader } from '../ui/header/OrgUnitHeader.ui';
import { OrgUnitFilter } from '../ui/filter/OrgUnitFilter.ui';
import { OrgUnitTable } from '../ui/table/OrgUnitTable.ui';
import { OrgUnitPagination } from '../ui/pagination/OrgUnitPagination.ui';
import { ConfirmDialog } from '@/shared/components/common/ConfirmDialog';
import type { OrgUnit } from '../../types';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { getValuesPage, RestPaged } from '@/types/rest';

export const OrgUnitListPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [isActive, setIsActive] = useState<boolean>(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [selectedOrgUnit, setSelectedOrgUnit] = useState<OrgUnit | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { data, refetch } = useOrgUnits({
        keyword,
        isActive,
        page,
        size: pageSize,
    });

    const deleteMutation = useDeleteOrgUnit();
    const { addToast } = useGlobalToast();

    const handleCreate = () => {
        setSelectedOrgUnit(null);
        setModalOpen(true);
    };

    const handleEdit = (orgUnit: OrgUnit) => {
        setSelectedOrgUnit(orgUnit);
        setModalOpen(true);
    };

    const handleViewDetail = (orgUnit: OrgUnit) => {
        setSelectedOrgUnit(orgUnit);
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
            addToast({ message: 'Xóa cơ quan thành công', type: 'success' });
            refetch();
        } catch (error) {
            console.error('Error deleting org unit:', error);
            addToast({ message: 'Xóa cơ quan thất bại', type: 'error' });
        } finally {
            setConfirmDeleteOpen(false);
            setDeletingId(null);
        }
    };

    const handleModalSuccess = () => {
        refetch();
    };

    const pageResult = data ? getValuesPage(data as RestPaged<OrgUnit>) : null;
    const orgUnits = pageResult?.items || [];
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
            <OrgUnitHeader onCreateClick={handleCreate} />

            <OrgUnitFilter
                keyword={keyword}
                onKeywordChange={(kw) => handleFilterChange({ keyword: kw, isActive })}
                isActive={isActive}
                onStatusChange={(active) => handleFilterChange({ keyword, isActive: active })}
                onRefresh={refetch}
            />

            <OrgUnitTable
                orgUnits={orgUnits}
                isLoading={false}
                onView={handleViewDetail}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={deleteMutation.isPending}
            />

            {total > 0 && (
                <OrgUnitPagination
                    page={page}
                    pageSize={pageSize}
                    total={total}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            )}

            {/* Create/Edit Modal */}
            <CreateOrgUnitModal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedOrgUnit(null);
                }}
                initData={selectedOrgUnit}
                onSuccess={handleModalSuccess}
            />

            {/* Detail Modal */}
            <OrgUnitDetailModal
                open={detailModalOpen}
                onClose={() => setDetailModalOpen(false)}
                orgUnit={selectedOrgUnit}
            />

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                open={confirmDeleteOpen}
                title="Xác nhận xóa"
                message={`Bạn có chắc chắn muốn xóa cơ quan này?\nHành động này không thể hoàn tác.`}
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

