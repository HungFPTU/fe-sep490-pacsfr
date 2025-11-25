"use client";

import { useMemo, useState } from 'react';
import { usePaknCategories, usePaknList } from '../../hooks';
import { PaknListFilterBar, PaknListTableView, PaknPagination, PaknLookupCard } from '../ui';
import type { PaknListFilters } from '../../types/request';
import { PAKN_LIST_PAGE_SIZE } from '../../constants';

export const PaknListPageView: React.FC = () => {
    const [filters, setFilters] = useState<PaknListFilters>({
        keyword: '',
        status: '',
        categoryId: '',
        page: 1,
        size: PAKN_LIST_PAGE_SIZE,
    });

    const { data: categoriesData } = usePaknCategories();
    const { data: paknPage, isLoading } = usePaknList(filters);

    const handleSubmit = () => {
        setFilters((prev) => ({ ...prev, page: 1 }));
    };

    const handleReset = () => {
        setFilters({ keyword: '', status: '', categoryId: '', page: 1, size: PAKN_LIST_PAGE_SIZE });
    };

    const handlePageChange = (page: number) => {
        setFilters((prev) => ({ ...prev, page }));
    };

    return (
        <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900">Danh sách phản ánh kiến nghị</h2>
                <p className="mt-1 text-sm text-slate-600">
                    Tra cứu các phản ánh, kiến nghị đã gửi lên hệ thống để theo dõi tiến độ xử lý.
                </p>
                <div className="mt-6">
                    <PaknListFilterBar
                        keyword={filters.keyword}
                        status={filters.status}
                        categoryId={filters.categoryId}
                        onKeywordChange={(value) => setFilters((prev) => ({ ...prev, keyword: value }))}
                        onStatusChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
                        onCategoryChange={(value) => setFilters((prev) => ({ ...prev, categoryId: value }))}
                        onSubmit={handleSubmit}
                        onReset={handleReset}
                        isLoading={isLoading}
                        categories={categoriesData ?? []}
                    />
                </div>
            </div>

            <PaknListTableView items={paknPage?.items ?? []} isLoading={isLoading} />

            <PaknPagination
                page={paknPage?.page ?? filters.page}
                totalPages={paknPage?.totalPages ?? 1}
                onPageChange={handlePageChange}
            />

            <PaknLookupCard className="lg:w-1/2" />
        </div>
    );
};

