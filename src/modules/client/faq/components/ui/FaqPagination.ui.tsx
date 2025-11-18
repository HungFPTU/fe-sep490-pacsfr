'use client';

import React from 'react';

interface FaqPaginationProps {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    isLoading?: boolean;
}

export const FaqPagination: React.FC<FaqPaginationProps> = ({
    currentPage,
    totalPages,
    totalRecords,
    pageSize,
    onPageChange,
    onPageSizeChange,
    isLoading = false,
}) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                    Tổng số {totalPages} Trang, {totalRecords} bản ghi.
                    Chuyển tới Trang {currentPage} Hiển thị {pageSize} Bản ghi/1 Trang
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Trang</label>
                        <select
                            value={currentPage}
                            onChange={(e) => onPageChange(Number(e.target.value))}
                            disabled={isLoading || totalPages === 0}
                            className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {Array.from({ length: totalPages }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    Trang {i + 1}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Hiển thị</label>
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                onPageSizeChange(Number(e.target.value));
                                onPageChange(1); // Reset to first page when changing page size
                            }}
                            disabled={isLoading}
                            className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

