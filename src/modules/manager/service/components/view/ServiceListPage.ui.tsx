'use client';

import React, { useState } from 'react';
import { ServiceHeader } from '../ui/header/ServiceHeader.ui';
import { ServiceFilter } from '../ui/filter/ServiceFilter.ui';
import { ServiceTable } from '../ui/table/ServiceTable.ui';
import { ServicePagination } from '../ui/pagination/ServicePagination.ui';
import { CreateServiceModal } from '../ui/modal/CreateServiceModal.ui';
import { ServiceDetailModal } from '../ui/detail/ServiceDetailModal.ui';
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
    const [editData, setEditData] = useState<Service | null>(null);
    const [detailData, setDetailData] = useState<Service | null>(null);

    // Delete state
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Fetch data
    const { data, isLoading } = useServices({
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

    const handleDelete = async (service: Service) => {
        if (!window.confirm(`Bạn có chắc chắn muốn xóa dịch vụ "${service.serviceName}"?`)) {
            return;
        }

        setDeletingId(service.id);
        try {
            await deleteMutation.mutateAsync(service.id);
            toast.success('Xóa dịch vụ thành công');
        } catch (error) {
            toast.error('Xóa dịch vụ thất bại');
            console.error('Delete error:', error);
        } finally {
            setDeletingId(null);
        }
    };

    const handleReset = () => {
        setKeyword('');
        setServiceGroupId('');
        setIsActive(true);
        setPage(DEFAULT_PAGE);
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
            />

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
                </div>
            ) : (
                <>
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
                </>
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
                onClose={() => setDetailModalOpen(false)}
                service={detailData}
            />
        </div>
    );
};

