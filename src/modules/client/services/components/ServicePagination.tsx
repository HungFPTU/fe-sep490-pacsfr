"use client";

import { Button } from "@heroui/react";

interface ServicePaginationProps {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    onPageChange: (page: number) => void;
    className?: string;
}

export const ServicePagination: React.FC<ServicePaginationProps> = ({
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    onPageChange,
    className = "",
}) => {
    if (totalPages <= 1) {
        return null;
    }

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

            if (startPage > 1) {
                pages.push(1);
                if (startPage > 2) {
                    pages.push("...");
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    pages.push("...");
                }
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className={`flex justify-center items-center gap-2 ${className}`}>
            {/* Previous Button */}
            <Button
                variant="light"
                size="sm"
                isDisabled={!hasPreviousPage}
                onClick={() => onPageChange(currentPage - 1)}
                startContent={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                }
            >
                Trước
            </Button>

            {/* Page Numbers */}
            <div className="flex gap-1">
                {getPageNumbers().map((page, index) => (
                    <div key={index}>
                        {page === "..." ? (
                            <span className="px-3 py-2 text-gray-500">...</span>
                        ) : (
                            <Button
                                variant={page === currentPage ? "solid" : "light"}
                                color={page === currentPage ? "primary" : "default"}
                                size="sm"
                                onClick={() => onPageChange(page as number)}
                                className="min-w-[40px]"
                            >
                                {page}
                            </Button>
                        )}
                    </div>
                ))}
            </div>

            {/* Next Button */}
            <Button
                variant="light"
                size="sm"
                isDisabled={!hasNextPage}
                onClick={() => onPageChange(currentPage + 1)}
                endContent={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                }
            >
                Sau
            </Button>
        </div>
    );
};