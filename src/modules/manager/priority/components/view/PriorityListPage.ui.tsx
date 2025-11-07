'use client';

import React, { useState } from 'react';
import { usePriorityCases } from '../../hooks';
import { 
    PriorityHeader, 
    PriorityTable, 
    PriorityFilter,
    PriorityPagination,
    UpdatePriorityModal
} from '../ui';
import type { PriorityCase } from '../../types';

export const PriorityListPage: React.FC = () => {
    const { data, isLoading, error, filters, setFilters, refetch } = usePriorityCases();
    const [selectedCase, setSelectedCase] = useState<PriorityCase | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleFilter = (newFilters: {
        caseCode?: string;
        priorityLevel?: number;
        caseStatus?: string;
    }) => {
        setFilters({ ...newFilters, page: 1 });
    };

    const handlePageChange = (page: number) => {
        setFilters({ page });
    };

    const handleCardClick = (priorityCase: PriorityCase) => {
        setSelectedCase(priorityCase);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedCase(null);
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
                            <p className="mt-2 text-sm text-slate-600">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const totalCases = data?.total || 0;
    const priorityCases = data?.items.filter(c => c.priorityLevel === 1).length || 0;
    const completedCases = data?.items.filter(c => c.currentStatus === 'Hoàn thành').length || 0;

    return (
        <div className="min-h-screen bg-white p-6">
            <div className="mx-auto max-w-7xl space-y-6">
                <PriorityHeader
                    totalCases={totalCases}
                    priorityCases={priorityCases}
                    completedCases={completedCases}
                />

                <PriorityFilter onFilter={handleFilter} />

                {isLoading && !data ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
                            <p className="text-sm text-slate-600">Đang tải dữ liệu...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <PriorityTable
                            cases={data?.items || []}
                            isLoading={isLoading}
                            onCardClick={handleCardClick}
                        />

                        {data && data.totalPages > 1 && (
                            <PriorityPagination
                                currentPage={filters.page}
                                totalPages={data.totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}

                <UpdatePriorityModal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    priorityCase={selectedCase}
                />
            </div>
        </div>
    );
};

