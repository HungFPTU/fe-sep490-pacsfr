'use client';

import React from 'react';
import { Button } from '@heroui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
    currentPage: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    onPageChange: (page: number) => void;
}

export const LegalDocumentPagination: React.FC<Props> = ({
    currentPage,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    onPageChange,
}) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-between px-6 py-3 bg-white border-t border-slate-200">
            <div className="flex items-center text-sm text-slate-700">
                <span>Trang {currentPage} của {totalPages}</span>
            </div>

            <div className="flex items-center space-x-2">
                {/* Previous Button */}
                <Button
                    size="sm"
                    variant="light"
                    color="primary"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={!hasPreviousPage}
                    startContent={<ChevronLeft className="h-4 w-4" />}
                >
                    Trước
                </Button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                    {pageNumbers.map((page) => (
                        <Button
                            key={page}
                            size="sm"
                            variant={page === currentPage ? "solid" : "light"}
                            color={page === currentPage ? "primary" : "default"}
                            onClick={() => onPageChange(page)}
                            className="min-w-8 h-8"
                        >
                            {page}
                        </Button>
                    ))}
                </div>

                {/* Next Button */}
                <Button
                    size="sm"
                    variant="light"
                    color="primary"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={!hasNextPage}
                    endContent={<ChevronRight className="h-4 w-4" />}
                >
                    Sau
                </Button>
            </div>
        </div>
    );
};
