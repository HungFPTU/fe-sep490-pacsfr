'use client';

import React, { useState, useMemo } from 'react';
import { useFaqList, useFaqCategoryList } from '../../hooks';
import { FaqFilter, FaqList, FaqPagination } from '../ui';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../constants';
import type { FaqFilters, FaqCategoryFilters } from '../../types';

export const FaqPageView: React.FC = () => {
    // Filter state
    const [keyword, setKeyword] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [page, setPage] = useState(DEFAULT_PAGE);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

    // Active filters for API calls
    const [activeFilters, setActiveFilters] = useState<FaqFilters>({
        keyword: '',
        faqCategoryId: '',
        isActive: true,
        page: DEFAULT_PAGE,
        size: DEFAULT_PAGE_SIZE,
    });

    // FAQ Category filters (always fetch all active categories)
    const categoryFilters: FaqCategoryFilters = useMemo(
        () => ({
            keyword: '',
            isActive: true,
            page: 1,
            size: 100, // Get all categories
        }),
        []
    );

    // Data fetching
    const { data: faqData, isLoading: isFaqLoading, refetch } = useFaqList(activeFilters);
    const { data: categoryData, isLoading: isCategoryLoading } = useFaqCategoryList(categoryFilters);

    // Process data
    const pageResult = faqData ? faqData : null;
    const faqs = pageResult?.items || [];
    const totalPages = pageResult?.totalPages || 1;
    const totalRecords = pageResult?.total || 0;

    const categories = categoryData?.items || [];

    // Handlers
    const handleSearch = () => {
        setActiveFilters({
            keyword: keyword.trim(),
            faqCategoryId: selectedCategoryId || undefined,
            isActive: true,
            page: 1,
            size: pageSize,
        });
        setPage(1);
        refetch();
    };

    const handleReset = () => {
        setKeyword('');
        setSelectedCategoryId('');
        setPage(DEFAULT_PAGE);
        setPageSize(DEFAULT_PAGE_SIZE);
        setActiveFilters({
            keyword: '',
            faqCategoryId: '',
            isActive: true,
            page: DEFAULT_PAGE,
            size: DEFAULT_PAGE_SIZE,
        });
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        setActiveFilters((prev) => ({
            ...prev,
            page: newPage,
        }));
    };

    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize);
        setActiveFilters((prev) => ({
            ...prev,
            size: newSize,
            page: 1,
        }));
        setPage(1);
    };

    return (
        <div className="min-h-screen bg-white">
            <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-6 sm:mb-8">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                            Câu hỏi thường gặp
                        </h1>
                    </div>

                    {/* Filter */}
                    <div className="mb-8">
                        <FaqFilter
                            keyword={keyword}
                            onKeywordChange={setKeyword}
                            selectedCategoryId={selectedCategoryId}
                            onCategoryChange={setSelectedCategoryId}
                            categories={categories}
                            isLoading={isFaqLoading || isCategoryLoading}
                            onSearch={handleSearch}
                            onReset={handleReset}
                        />
                    </div>

                    {/* FAQ List */}
                    <div className="mb-8">
                        <FaqList
                            faqs={faqs}
                            isLoading={isFaqLoading}
                        />
                    </div>

                    {/* Pagination */}
                    {totalPages > 0 && (
                        <FaqPagination
                            currentPage={page}
                            totalPages={totalPages}
                            totalRecords={totalRecords}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                            onPageSizeChange={handlePageSizeChange}
                            isLoading={isFaqLoading}
                        />
                    )}
                </div>
            </main>
        </div>
    );
};

