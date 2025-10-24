'use client';

import React from 'react';

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const OrgUnitPagination: React.FC<Props> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    if (totalPages <= 1) return null;

    return (
        <div className="mt-4 flex items-center justify-center gap-2">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-slate-300 px-3 py-1 text-sm disabled:opacity-50 hover:bg-slate-50"
            >
                Trước
            </button>
            <span className="text-sm text-slate-600">
                Trang {currentPage} / {totalPages}
            </span>
            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-slate-300 px-3 py-1 text-sm disabled:opacity-50 hover:bg-slate-50"
            >
                Sau
            </button>
        </div>
    );
};

