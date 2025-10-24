'use client';

import React, { useState } from 'react';
import { useDepartments, useDeleteDepartment } from '../../hooks';
import { CreateDepartmentModal } from '../ui/modal/CreateDepartmentModal.ui';
import { DepartmentDetailModal } from '../ui/detail/DepartmentDetailModal.ui';
import { DepartmentHeader } from '../ui/header/DepartmentHeader.ui';
import { DepartmentFilter } from '../ui/filter/DepartmentFilter.ui';
import { DepartmentTable } from '../ui/table/DepartmentTable.ui';
import { DepartmentPagination } from '../ui/pagination/DepartmentPagination.ui';
import type { Department } from '../../types';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { getValuesPage, RestPaged } from '@/types/rest';

export const DepartmentListPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState('');
    const [isActive, setIsActive] = useState<boolean>(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

    const { data, isLoading, refetch } = useDepartments({
        keyword,
        isActive,
        page,
        size: 10,
    });

    const deleteMutation = useDeleteDepartment();
    const { addToast } = useGlobalToast();

    const handleCreate = () => {
        setSelectedDepartment(null);
        setModalOpen(true);
    };

    const handleEdit = (department: Department) => {
        setSelectedDepartment(department);
        setModalOpen(true);
    };

    const handleViewDetail = (department: Department) => {
        setSelectedDepartment(department);
        setDetailModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bạn có chắc chắn muốn xóa phòng ban này?')) {
            return;
        }

        try {
            await deleteMutation.mutateAsync(id);
            addToast({ message: 'Xóa phòng ban thành công', type: 'success' });
            refetch();
        } catch (error) {
            console.error('Error deleting department:', error);
            addToast({ message: 'Xóa phòng ban thất bại', type: 'error' });
        }
    };

    const handleModalSuccess = () => {
        refetch();
    };

    const pageResult = data ? getValuesPage(data as RestPaged<Department>) : null;
    const departments = pageResult?.items || [];
    const totalPages = pageResult?.totalPages || 1;

    return (
        <div className="p-6">
            <DepartmentHeader onCreateClick={handleCreate} />

            <DepartmentFilter
                keyword={keyword}
                onKeywordChange={setKeyword}
                isActive={isActive}
                onStatusChange={setIsActive}
            />

            <DepartmentTable
                departments={departments}
                isLoading={isLoading}
                onView={handleViewDetail}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={deleteMutation.isPending}
            />

            <DepartmentPagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />

            {/* Create/Edit Modal */}
            <CreateDepartmentModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                initData={selectedDepartment}
                onSuccess={handleModalSuccess}
            />

            {/* Detail Modal */}
            <DepartmentDetailModal
                open={detailModalOpen}
                onClose={() => setDetailModalOpen(false)}
                department={selectedDepartment}
            />
        </div>
    );
};

