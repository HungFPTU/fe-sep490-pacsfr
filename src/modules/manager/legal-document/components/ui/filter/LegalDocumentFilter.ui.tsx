'use client';

import React from 'react';
// Removed Input import - using native HTML input
// Removed unused imports - using native HTML elements
import { LegalDocumentService } from '../../../services/legal-document.service';
import type { LegalDocumentFilters } from '../../../types';

interface Props {
    filters: LegalDocumentFilters;
    onFilterChange: (field: keyof LegalDocumentFilters, value: string | boolean) => void;
    onReset: () => void;
}

export const LegalDocumentFilter: React.FC<Props> = ({
    filters,
    onFilterChange,
    // onReset,
}) => {
    const documentTypeOptions = LegalDocumentService.getDocumentTypeOptions();
    const documentStatusOptions = LegalDocumentService.getDocumentStatusOptions();

    const handleKeywordChange = (value: string) => {
        onFilterChange('keyword', value);
        onFilterChange('page', 1 as unknown as string | boolean);
    };

    const handleDocumentTypeChange = (value: string) => {
        onFilterChange('documentType', value);
        onFilterChange('page', 1 as unknown as string | boolean);
    };

    const handleStatusChange = (value: string) => {
        onFilterChange('status', value);
        onFilterChange('page', 1 as unknown as string | boolean);
    };

    const handleActiveChange = (value: string) => {
        const isActive = value === 'true' ? true : value === 'false' ? false : undefined;
        onFilterChange('isActive', isActive as unknown as string | boolean);
        onFilterChange('page', 1 as unknown as string | boolean);
    };

    // Removed hasActiveFilters - not needed with simple reset button

    return (
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {/* Keyword Search */}
                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Tìm kiếm
                    </label>
                    <input
                        type="text"
                        value={filters.keyword || ''}
                        onChange={(e) => handleKeywordChange(e.target.value)}
                        placeholder="Tìm theo số văn bản, tên..."
                        className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                </div>

                {/* Document Type Filter */}
                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Loại văn bản
                    </label>
                    <select
                        value={filters.documentType || ''}
                        onChange={(e) => handleDocumentTypeChange(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                        <option value="">Tất cả loại văn bản</option>
                        {documentTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status Filter */}
                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Trạng thái
                    </label>
                    <select
                        value={filters.status || ''}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                        <option value="">Tất cả trạng thái</option>
                        {documentStatusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Active Status Filter */}
                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        Trạng thái hoạt động
                    </label>
                    <select
                        value={filters.isActive !== undefined ? filters.isActive.toString() : ''}
                        onChange={(e) => handleActiveChange(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                        <option value="">Tất cả</option>
                        <option value="true">Hoạt động</option>
                        <option value="false">Không hoạt động</option>
                    </select>
                </div>
            </div>

            {/* Reset Button */}
            {/* <div className="flex items-end">
                <button
                    onClick={onReset}
                    className="w-full rounded-lg border border-red-200 bg-gradient-to-r from-red-50 to-red-100 px-4 py-2.5 text-sm font-semibold text-red-700 shadow-sm hover:from-red-100 hover:to-red-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 ease-in-out"
                >
                    <span className="flex items-center justify-center gap-2">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Đặt lại bộ lọc
                    </span>
                </button>
            </div> */}
        </div>
    );
};
