"use client";

import { Button } from "@heroui/react";

interface PaginationData {
    page: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    total: number;
    size: number;
}

interface ServicePaginationProps {
    pagination: PaginationData;
    onPageChange: (page: number) => void;
    className?: string;
    variant?: "default" | "compact";
}

export const ServicePagination: React.FC<ServicePaginationProps> = ({
    pagination,
    onPageChange,
    className = "",
    variant = "default",
}) => {
    const { page, totalPages, hasPreviousPage, hasNextPage, total, size } = pagination;

    if (totalPages <= 1) {
        return null;
    }

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = variant === "compact" ? 5 : 7;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (page > 3) {
                pages.push("...");
            }

            // Show pages around current page
            const start = Math.max(2, page - 1);
            const end = Math.min(totalPages - 1, page + 1);

            for (let i = start; i <= end; i++) {
                if (i !== 1 && i !== totalPages) {
                    pages.push(i);
                }
            }

            if (page < totalPages - 2) {
                pages.push("...");
            }

            // Always show last page
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    if (variant === "compact") {
        return (
            <div className={`flex items-center justify-between ${className}`}>
                <div className="text-sm text-gray-700">
                    Hiển thị {((page - 1) * size) + 1} - {Math.min(page * size, total)} trong tổng số {total} kết quả
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="light"
                        size="sm"
                        onClick={() => onPageChange(page - 1)}
                        disabled={!hasPreviousPage}
                        className="px-3 py-1"
                    >
                        Trước
                    </Button>

                    <span className="text-sm text-gray-700 px-3">
                        Trang {page} / {totalPages}
                    </span>

                    <Button
                        variant="light"
                        size="sm"
                        onClick={() => onPageChange(page + 1)}
                        disabled={!hasNextPage}
                        className="px-3 py-1"
                    >
                        Sau
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex items-center justify-between ${className}`}>
            <div className="text-sm text-gray-700">
                Hiển thị {((page - 1) * size) + 1} - {Math.min(page * size, total)} trong tổng số {total} kết quả
            </div>

            <div className="flex items-center space-x-1">
                <Button
                    variant="light"
                    size="sm"
                    onClick={() => onPageChange(page - 1)}
                    disabled={!hasPreviousPage}
                    className="px-3 py-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Button>

                {pageNumbers.map((pageNum, index) => (
                    <div key={index}>
                        {pageNum === "..." ? (
                            <span className="px-3 py-2 text-gray-500">...</span>
                        ) : (
                            <Button
                                variant={pageNum === page ? "solid" : "light"}
                                color={pageNum === page ? "primary" : "default"}
                                size="sm"
                                onClick={() => onPageChange(pageNum as number)}
                                className={`px-3 py-2 ${pageNum === page
                                    ? "bg-red-600 text-white"
                                    : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                {pageNum}
                            </Button>
                        )}
                    </div>
                ))}

                <Button
                    variant="light"
                    size="sm"
                    onClick={() => onPageChange(page + 1)}
                    disabled={!hasNextPage}
                    className="px-3 py-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Button>
            </div>
        </div>
    );
};
