'use client';

import React from 'react';

interface Props {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

export const ServiceProcedurePagination: React.FC<Props> = ({
    page,
    pageSize,
    total,
    totalPages,
    onPageChange,
    onPageSizeChange,
}) => {
    const startItem = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const endItem = Math.min(page * pageSize, total);

    return (
        <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 items-center justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Hiển thị <span className="font-medium text-foreground">{startItem}</span> đến{' '}
                        <span className="font-medium text-foreground">{endItem}</span> trong tổng số{' '}
                        <span className="font-medium text-foreground">{total}</span> kết quả
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-muted-foreground">Số dòng:</label>
                        <select
                            value={pageSize}
                            onChange={(e) => onPageSizeChange(Number(e.target.value))}
                            className="rounded-md border border-input px-3 py-1 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>

                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                        <button
                            onClick={() => onPageChange(page - 1)}
                            disabled={page === 1}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-muted-foreground ring-1 ring-inset ring-border hover:bg-muted focus:z-20 focus:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <span className="sr-only">Trang trước</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-foreground ring-1 ring-inset ring-border">
                            {page} / {Math.max(totalPages, 1)}
                        </span>
                        <button
                            onClick={() => onPageChange(page + 1)}
                            disabled={page === totalPages || totalPages === 0}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-muted-foreground ring-1 ring-inset ring-border hover:bg-muted focus:z-20 focus:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <span className="sr-only">Trang sau</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};
