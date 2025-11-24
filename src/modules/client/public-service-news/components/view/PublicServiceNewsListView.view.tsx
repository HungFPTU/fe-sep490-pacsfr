'use client';

import React, { useMemo, useState } from 'react';
import { usePublicServiceNewsList } from '../../hooks';
import { PublicServiceNewsFilter } from '../form/PublicServiceNewsFilter.ui';
import { PublicServiceNewsList } from '../display/PublicServiceNewsList.ui';
import {
    PUBLIC_SERVICE_NEWS_DEFAULT_PAGE,
    PUBLIC_SERVICE_NEWS_DEFAULT_PAGE_SIZE,
} from '../../constants';

const Pagination = ({
    page,
    totalPages,
    onPageChange,
}: {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="mt-8 flex justify-center gap-2">
            <button
                onClick={() => onPageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Trước
            </button>
            {pages.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                        pageNumber === page ? 'bg-red-600 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    {pageNumber}
                </button>
            ))}
            <button
                onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Sau
            </button>
        </div>
    );
};

export const PublicServiceNewsListView: React.FC = () => {
    const [filters, setFilters] = useState({
        keyword: '',
        page: PUBLIC_SERVICE_NEWS_DEFAULT_PAGE,
        size: PUBLIC_SERVICE_NEWS_DEFAULT_PAGE_SIZE,
    });

    const [activeFilters, setActiveFilters] = useState(filters);

    const { data, isLoading } = usePublicServiceNewsList({
        ...activeFilters,
        isPublished: true,
    });

    const newsItems = data?.items ?? [];
    const totalPages = data?.totalPages ?? 1;
    const currentPage = data?.page ?? activeFilters.page;

    const handleSearch = () => {
        setActiveFilters({ ...filters, page: 1 });
    };

    const handleReset = () => {
        const defaultFilters = {
            keyword: '',
            page: PUBLIC_SERVICE_NEWS_DEFAULT_PAGE,
            size: PUBLIC_SERVICE_NEWS_DEFAULT_PAGE_SIZE,
        };
        setFilters(defaultFilters);
        setActiveFilters(defaultFilters);
    };

    const handlePageChange = (page: number) => {
        setActiveFilters((prev) => ({ ...prev, page }));
    };

    return (
        <section className="space-y-4 sm:space-y-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Tin tức dịch vụ công</h1>
                <p className="mt-2 text-sm sm:text-base text-gray-600">Cập nhật thông tin mới nhất về dịch vụ công và thủ tục hành chính.</p>
            </div>

            <PublicServiceNewsFilter
                keyword={filters.keyword}
                onKeywordChange={(value) => setFilters((prev) => ({ ...prev, keyword: value }))}
                onSearch={handleSearch}
                onReset={handleReset}
            />

            <PublicServiceNewsList items={newsItems} isLoading={isLoading} />

            <Pagination page={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </section>
    );
};

