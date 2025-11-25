'use client';

import React, { useState } from 'react';
import { useCounterList, useDeleteCounter } from '../../hooks';
import { CounterHeader, CounterTable, CounterDetailModal, CreateCounterModal, AssignServiceGroupModal } from '../ui';

export const CounterListPage: React.FC = () => {
    const { data, isLoading, error, refetch } = useCounterList();
    const deleteMutation = useDeleteCounter();
    const [selectedCounterId, setSelectedCounterId] = useState<string | null>(null);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [assignServiceGroupModalOpen, setAssignServiceGroupModalOpen] = useState(false);
    const [assignCounterId, setAssignCounterId] = useState<string | null>(null);

    const handleView = (counterId: string) => {
        setSelectedCounterId(counterId);
        setDetailModalOpen(true);
    };

    const handleCloseDetailModal = () => {
        setDetailModalOpen(false);
        setSelectedCounterId(null);
    };

    const handleCreate = () => {
        setCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setCreateModalOpen(false);
    };

    const handleCreateSuccess = () => {
        refetch();
    };

    const handleAssignServiceGroup = (counterId: string) => {
        setAssignCounterId(counterId);
        setAssignServiceGroupModalOpen(true);
    };

    const handleCloseAssignServiceGroupModal = () => {
        setAssignServiceGroupModalOpen(false);
        setAssignCounterId(null);
    };

    const handleAssignServiceGroupSuccess = () => {
        refetch();
    };

    const handleDelete = async (counterId: string) => {
        try {
            await deleteMutation.mutateAsync(counterId);
            refetch();
        } catch (error) {
            console.error('Error deleting counter:', error);
        }
    };

    if (error) {
        return (
            <div className="min-h-screen bg-white p-6">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="mb-4 text-red-600">
                                <svg
                                    className="mx-auto h-12 w-12"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <p className="text-lg font-medium text-slate-900">
                                Không thể tải dữ liệu
                            </p>
                            <p className="mt-2 text-sm text-slate-600">
                                {error instanceof Error ? error.message : 'Đã xảy ra lỗi'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white p-6">
            <div className="mx-auto max-w-7xl space-y-6">
                <CounterHeader 
                    totalCount={data?.length || 0}
                    onCreateClick={handleCreate}
                />
                <CounterTable 
                    counters={data || []} 
                    isLoading={isLoading}
                    onView={handleView}
                    onAssignServiceGroup={handleAssignServiceGroup}
                    onDelete={handleDelete}
                    isDeleting={deleteMutation.isPending}
                />
            </div>

            <CounterDetailModal
                open={detailModalOpen}
                onClose={handleCloseDetailModal}
                counterId={selectedCounterId}
                onSuccess={handleCloseDetailModal}
            />

            <CreateCounterModal
                open={createModalOpen}
                onClose={handleCloseCreateModal}
                onSuccess={handleCreateSuccess}
            />

            <AssignServiceGroupModal
                open={assignServiceGroupModalOpen}
                onClose={handleCloseAssignServiceGroupModal}
                counterId={assignCounterId}
                onSuccess={handleAssignServiceGroupSuccess}
            />
        </div>
    );
};

