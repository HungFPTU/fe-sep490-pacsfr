'use client';

import React, { useState, useMemo } from 'react';
import { StaffHeader } from '../ui/header/StaffHeader.ui';
import { StaffFilter } from '../ui/filter/StaffFilter.ui';
import { StaffTable } from '../ui/table/StaffTable.ui';
import { StaffPagination } from '../ui/pagination/StaffPagination.ui';
import { CreateStaffModal } from '../ui/modal/CreateStaffModal.ui';
import { AssignDepartmentModal } from '../ui/modal/AssignDepartmentModal.ui';
import { StaffDetailModal } from '../ui/detail/StaffDetailModal.ui';
import { ConfirmDialog } from '@/shared/components/common/ConfirmDialog';
import { useStaffs, useDeleteStaff } from '../../hooks';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { Staff, StaffFilters } from '../../types';
import { STAFF_TABLE_DEFAULT_PAGE_SIZE } from '../../constants';

export function StaffListPage() {
    const { addToast } = useGlobalToast();
    const [filters, setFilters] = useState<StaffFilters>({
        SearchTerm: '',
        IsActive: undefined,
        RoleType: '',
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(STAFF_TABLE_DEFAULT_PAGE_SIZE);

    // Modals state
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [assignDeptModalOpen, setAssignDeptModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Fetch data with pagination
    const { data, isLoading, refetch } = useStaffs({
        ...filters,
        Page: currentPage,
        PageSize: pageSize,
    });
    const deleteMutation = useDeleteStaff();

    // Parse RestMany<Staff> response
    const staffList = useMemo(() => {
        if (!data?.success || !data.data) return [];

        // API trả về RestMany<Staff> với data.$values array
        if (data.data && '$values' in data.data && Array.isArray(data.data.$values)) {
            return data.data.$values.map((item: Staff & { $id?: string; $ref?: string }) => {
                // Loại bỏ các metadata fields như $id, $ref
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { $id, $ref, ...staff } = item;
                return staff as Staff;
            });
        }

        return [];
    }, [data]);

    // Server-side pagination - no need for client-side slicing
    const paginatedData = staffList;

    // Get total count from server response (if available)
    const totalItems = (data?.data && 'total' in data.data)
        ? (data.data as { total: number }).total
        : staffList.length;

    // Handlers
    const handleCreate = () => {
        setSelectedStaff(null);
        setCreateModalOpen(true);
    };


    const handleView = (staff: Staff) => {
        setSelectedStaff(staff);
        setDetailModalOpen(true);
    };

    const handleDelete = (staff: Staff) => {
        setDeletingId(staff.id);
        setSelectedStaff(staff);
        setConfirmDeleteOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deletingId) return;

        try {
            const res = await deleteMutation.mutateAsync(deletingId);
            if (res?.success) {
                addToast({ message: 'Xóa nhân viên thành công', type: 'success' });
                refetch();
            } else {
                addToast({ message: 'Xóa nhân viên thất bại', type: 'error' });
            }
        } catch (error) {
            console.error('Error deleting staff:', error);
            addToast({ message: 'Xóa nhân viên thất bại', type: 'error' });
        } finally {
            setConfirmDeleteOpen(false);
            setDeletingId(null);
            setSelectedStaff(null);
        }
    };

    const handleAssignDepartment = (staff: Staff) => {
        setSelectedStaff(staff);
        setAssignDeptModalOpen(true);
    };


    const handleModalSuccess = () => {
        refetch();
    };

    const handleFilterChange = (newFilters: StaffFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    return (
        <div className="p-6 space-y-6">
            <StaffHeader onCreateClick={handleCreate} />
            <StaffFilter filters={filters} onFilterChange={handleFilterChange} onRefresh={refetch} />
            <StaffTable
                data={paginatedData}
                onView={handleView}
                onDelete={handleDelete}
                onAssignDepartment={handleAssignDepartment}
                onRefresh={refetch}
                isLoading={isLoading}
            />
            <StaffPagination
                currentPage={currentPage}
                pageSize={pageSize}
                totalItems={totalItems}
                onPageChange={setCurrentPage}
                onPageSizeChange={(size) => {
                    setPageSize(size);
                    setCurrentPage(1);
                }}
            />

            {/* Modals */}
            <CreateStaffModal
                open={createModalOpen}
                onClose={() => {
                    setCreateModalOpen(false);
                    setSelectedStaff(null);
                }}
                initData={selectedStaff}
                onSuccess={handleModalSuccess}
            />

            <AssignDepartmentModal
                open={assignDeptModalOpen}
                onClose={() => {
                    setAssignDeptModalOpen(false);
                    setSelectedStaff(null);
                }}
                staff={selectedStaff}
                onSuccess={handleModalSuccess}
            />

            <StaffDetailModal
                open={detailModalOpen}
                onClose={() => {
                    setDetailModalOpen(false);
                    setSelectedStaff(null);
                }}
                staffId={selectedStaff?.id || null}
            />

            <ConfirmDialog
                open={confirmDeleteOpen}
                title="Xác nhận xóa"
                message={`Bạn có chắc chắn muốn xóa nhân viên "${selectedStaff?.fullName}"?\nHành động này không thể hoàn tác.`}
                confirmText="Xóa"
                cancelText="Hủy"
                type="danger"
                onConfirm={handleConfirmDelete}
                onCancel={() => {
                    setConfirmDeleteOpen(false);
                    setDeletingId(null);
                    setSelectedStaff(null);
                }}
                loading={deleteMutation.isPending}
            />
        </div>
    );
}

