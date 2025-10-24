'use client';

import React, { useState } from 'react';
import { useOrgUnits, useDeleteOrgUnit } from '../../hooks';
import { CreateOrgUnitModal } from '../ui/modal/CreateOrgUnitModal.ui';
import { OrgUnitDetailModal } from '../ui/detail/OrgUnitDetailModal.ui';
import { OrgUnitHeader } from '../ui/header/OrgUnitHeader.ui';
import { OrgUnitFilter } from '../ui/filter/OrgUnitFilter.ui';
import { OrgUnitTable } from '../ui/table/OrgUnitTable.ui';
import { OrgUnitPagination } from '../ui/pagination/OrgUnitPagination.ui';
import type { OrgUnit } from '../../types';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { getValuesPage, RestPaged } from '@/types/rest';

export const OrgUnitListPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState('');
    const [isActive, setIsActive] = useState<boolean>(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedOrgUnit, setSelectedOrgUnit] = useState<OrgUnit | null>(null);

    const { data, isLoading, refetch } = useOrgUnits({
        keyword,
        isActive,
        page,
        size: 10,
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

    const handleDelete = async (id: string) => {
        if (!confirm('Bạn có chắc chắn muốn xóa cơ quan này?')) {
            return;
        }

        try {
            await deleteMutation.mutateAsync(id);
            addToast({ message: 'Xóa cơ quan thành công', type: 'success' });
            refetch();
        } catch (error) {
            console.error('Error deleting org unit:', error);
            addToast({ message: 'Xóa cơ quan thất bại', type: 'error' });
        }
    };

    const handleModalSuccess = () => {
        refetch();
    };

    const pageResult = data ? getValuesPage(data as RestPaged<OrgUnit>) : null;
    const orgUnits = pageResult?.items || [];
    const totalPages = pageResult?.totalPages || 1;

    return (
        <div className="p-6">
            <OrgUnitHeader onCreateClick={handleCreate} />

            <OrgUnitFilter
                keyword={keyword}
                onKeywordChange={setKeyword}
                isActive={isActive}
                onStatusChange={setIsActive}
            />

            <OrgUnitTable
                orgUnits={orgUnits}
                isLoading={isLoading}
                onView={handleViewDetail}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={deleteMutation.isPending}
            />

            <OrgUnitPagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />

            {/* Create/Edit Modal */}
            <CreateOrgUnitModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                initData={selectedOrgUnit}
                onSuccess={handleModalSuccess}
            />

            {/* Detail Modal */}
            <OrgUnitDetailModal
                open={detailModalOpen}
                onClose={() => setDetailModalOpen(false)}
                orgUnit={selectedOrgUnit}
            />
        </div>
    );
};

