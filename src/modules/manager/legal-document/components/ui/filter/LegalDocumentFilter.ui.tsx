'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/shared/lib/utils';
import { LegalDocumentService } from '../../../services/legal-document.service';
import type { LegalDocumentFilters } from '../../../types';
import { ManagerFilterBar } from '@/shared/components/manager/ui';

interface Props {
    filters: LegalDocumentFilters;
    onFilterChange: (filters: LegalDocumentFilters) => void;
}

export const LegalDocumentFilter: React.FC<Props> = ({
    filters,
    onFilterChange,
}) => {
    const documentTypeOptions = LegalDocumentService.getDocumentTypeOptions();
    const documentStatusOptions = LegalDocumentService.getDocumentStatusOptions();

    // Local state for filter inputs (not triggering API)
    const [localFilters, setLocalFilters] = useState<LegalDocumentFilters>({
        keyword: filters.keyword || '',
        documentType: filters.documentType || '',
        status: filters.status || '',
        isActive: filters.isActive !== undefined ? filters.isActive : undefined,
    });

    // Sync local filters when props change (e.g., reset from parent)
    useEffect(() => {
        setLocalFilters({
            keyword: filters.keyword || '',
            documentType: filters.documentType || '',
            status: filters.status || '',
            isActive: filters.isActive !== undefined ? filters.isActive : undefined,
        });
    }, [filters]);

    const handleApplyFilters = () => {
        // Apply filters - trigger API call with page reset to 1
        onFilterChange({
            ...localFilters,
            page: 1,
            size: filters.size || 10,
        });
    };

    const handleResetFilters = () => {
        const resetFilters: LegalDocumentFilters = {
            keyword: '',
            documentType: '',
            status: '',
            isActive: undefined,
            page: 1,
            size: filters.size || 10,
        };
        setLocalFilters({
            keyword: '',
            documentType: '',
            status: '',
            isActive: undefined,
        });
        onFilterChange(resetFilters);
    };

    return (
        <div className="mb-4">
            <ManagerFilterBar
                searchValue={localFilters.keyword || ''}
                onSearchChange={(value: string) => setLocalFilters((prev) => ({ ...prev, keyword: value }))}
                onSubmit={handleApplyFilters}
                onReset={handleResetFilters}
                searchPlaceholder="Tìm theo số văn bản, tên..."
            >
                <div className="w-full shrink-0 sm:w-[190px]">
                    <select
                        value={localFilters.documentType || ''}
                        onChange={(e) => setLocalFilters((prev) => ({ ...prev, documentType: e.target.value }))}
                        className={cn(
                            'flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors',
                            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                            'disabled:cursor-not-allowed disabled:opacity-50',
                        )}
                    >
                        <option value="">Tất cả loại văn bản</option>
                        {documentTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full shrink-0 sm:w-[190px]">
                    <select
                        value={localFilters.status || ''}
                        onChange={(e) => setLocalFilters((prev) => ({ ...prev, status: e.target.value }))}
                        className={cn(
                            'flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors',
                            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                            'disabled:cursor-not-allowed disabled:opacity-50',
                        )}
                    >
                        <option value="">Tất cả trạng thái</option>
                        {documentStatusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full shrink-0 sm:w-[170px]">
                    <select
                        value={localFilters.isActive === undefined ? '' : String(localFilters.isActive)}
                        onChange={(e) =>
                            setLocalFilters((prev) => ({
                                ...prev,
                                isActive: e.target.value === '' ? undefined : e.target.value === 'true',
                            }))
                        }
                        className={cn(
                            'flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors',
                            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                            'disabled:cursor-not-allowed disabled:opacity-50',
                        )}
                    >
                        <option value="">Tất cả</option>
                        <option value="true">Hoạt động</option>
                        <option value="false">Không hoạt động</option>
                    </select>
                </div>
            </ManagerFilterBar>
        </div>
    );
};
