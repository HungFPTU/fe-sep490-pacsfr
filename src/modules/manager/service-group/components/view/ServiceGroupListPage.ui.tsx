'use client';

import React, { useState } from 'react';
import { useServiceGroups, useDeleteServiceGroup } from '../../hooks';
import { CreateServiceGroupModal } from '../ui/modal/CreateServiceGroupModal.ui';
import { ServiceGroupDetailModal } from '../ui/detail/ServiceGroupDetailModal.ui';
import { ServiceGroupHeader } from '../ui/header/ServiceGroupHeader.ui';
import { ServiceGroupFilter } from '../ui/filter/ServiceGroupFilter.ui';
import { ServiceGroupTable } from '../ui/table/ServiceGroupTable.ui';
import { ServiceGroupPagination } from '../ui/pagination/ServiceGroupPagination.ui';
import type { ServiceGroup } from '../../types';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { getValuesPage } from '@/types/rest';

export const ServiceGroupListPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState('');
    const [isActive, setIsActive] = useState<boolean>(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<ServiceGroup | null>(null);

    const { data, isLoading, refetch } = useServiceGroups({
        keyword,
        isActive,
        page,
        size: 10,
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

    const handleDelete = async (id: string) => {
        if (!confirm('Bạn có chắc chắn muốn xóa nhóm dịch vụ này?')) {
            return;
        }

        try {
            await deleteMutation.mutateAsync(id);
            addToast({ message: 'Xóa nhóm dịch vụ thành công', type: 'success' });
            refetch();
        } catch (error) {
            console.error('Error deleting service group:', error);
            addToast({ message: 'Xóa nhóm dịch vụ thất bại', type: 'error' });
        }
    };

    const handleModalSuccess = () => {
        refetch();
    };

    const pageResult = data ? getValuesPage(data) : null;
    const serviceGroups = pageResult?.items || [];
    const totalPages = pageResult?.totalPages || 1;

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

            <ServiceGroupPagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />

            {/* Create/Edit Modal */}
            <CreateServiceGroupModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                initData={selectedGroup}
                onSuccess={handleModalSuccess}
            />

            {/* Detail Modal */}
            <ServiceGroupDetailModal
                open={detailModalOpen}
                onClose={() => setDetailModalOpen(false)}
                serviceGroup={selectedGroup}
            />
        </div>
    );
};

