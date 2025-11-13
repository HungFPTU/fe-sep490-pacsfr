'use client';

import React, { useMemo, useState } from 'react';
import { useServiceProcedures, useDeleteServiceProcedure } from '../../hooks';
import { ServiceProcedureHeader } from '../ui/header/ServiceProcedureHeader.ui';
import { ServiceProcedureFilter } from '../ui/filter/ServiceProcedureFilter.ui';
import { ServiceProcedureTable } from '../ui/table/ServiceProcedureTable.ui';
import { ServiceProcedurePagination } from '../ui/pagination/ServiceProcedurePagination.ui';
import { CreateServiceProcedureModal } from '../ui/modal/CreateServiceProcedureModal.ui';
import { ServiceProcedureDetailModal } from '../ui/detail/ServiceProcedureDetailModal.ui';
import { ConfirmDialog } from '@/shared/components/common/ConfirmDialog';
import { getValuesPage } from '@/types/rest';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import type { ServiceProcedure } from '../../types';

export const ServiceProcedureListPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [serviceId, setServiceId] = useState('');
    const [isActive, setIsActive] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedProcedure, setSelectedProcedure] = useState<ServiceProcedure | null>(null);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { data, isLoading, refetch } = useServiceProcedures({
        keyword,
        serviceId,
        isActive,
        page,
        size: pageSize,
    });

    const deleteMutation = useDeleteServiceProcedure();
    const { addToast } = useGlobalToast();

    const pageResult = useMemo(() => (data ? getValuesPage<ServiceProcedure>(data) : null), [data]);
    const serviceProcedures = pageResult?.items || [];
    const total = pageResult?.total || 0;
    const totalPages = pageResult?.totalPages || 0;

    const handleCreate = () => {
        setSelectedProcedure(null);
        setModalOpen(true);
    };

    const handleEdit = (procedure: ServiceProcedure) => {
        setSelectedProcedure(procedure);
        setModalOpen(true);
    };

    const handleView = (procedure: ServiceProcedure) => {
        setSelectedProcedure(procedure);
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
            addToast({ message: 'Xóa quy trình dịch vụ thành công', type: 'success' });
            refetch();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Xóa quy trình dịch vụ thất bại';
            addToast({ message, type: 'error' });
        } finally {
            setConfirmDeleteOpen(false);
            setDeletingId(null);
        }
    };

    const handleFilterApply = ({ keyword: kw, serviceId: sid, isActive: active }: { keyword: string; serviceId: string; isActive: boolean }) => {
        setKeyword(kw);
        setServiceId(sid);
        setIsActive(active);
        setPage(1);
    };

    return (
        <div className="p-6">
            <ServiceProcedureHeader onCreateClick={handleCreate} totalCount={total} />

            <ServiceProcedureFilter
                keyword={keyword}
                onKeywordChange={(kw) => handleFilterApply({ keyword: kw, serviceId, isActive })}
                serviceId={serviceId}
                onServiceIdChange={(sid) => handleFilterApply({ keyword, serviceId: sid, isActive })}
                isActive={isActive}
                onStatusChange={(active) => handleFilterApply({ keyword, serviceId, isActive: active })}
                onRefresh={refetch}
            />

            <ServiceProcedureTable
                serviceProcedures={serviceProcedures}
                isLoading={isLoading}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={deleteMutation.isPending}
            />

            {total > 0 && (
                <ServiceProcedurePagination
                    page={page}
                    pageSize={pageSize}
                    total={total}
                    totalPages={totalPages}
                    onPageChange={(newPage) => setPage(newPage)}
                    onPageSizeChange={(size) => {
                        setPageSize(size);
                        setPage(1);
                    }}
                />
            )}

            <CreateServiceProcedureModal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedProcedure(null);
                }}
                initData={selectedProcedure}
                onSuccess={refetch}
            />

            <ServiceProcedureDetailModal
                open={detailModalOpen}
                onClose={() => {
                    setDetailModalOpen(false);
                    setSelectedProcedure(null);
                }}
                serviceProcedure={selectedProcedure}
            />

            <ConfirmDialog
                open={confirmDeleteOpen}
                onCancel={() => {
                    setConfirmDeleteOpen(false);
                    setDeletingId(null);
                }}
                onConfirm={handleConfirmDelete}
                title="Xác nhận xóa"
                message="Bạn có chắc chắn muốn xóa quy trình dịch vụ này? Hành động này không thể hoàn tác."
                confirmText="Xóa"
                cancelText="Hủy"
                type="danger"
                loading={deleteMutation.isPending}
            />
        </div>
    );
};
