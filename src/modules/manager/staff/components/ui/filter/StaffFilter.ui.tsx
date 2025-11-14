'use client';

import React, { useState, useEffect } from 'react';
import { StaffFilters } from '../../../types';
import { cn } from '@/shared/lib/utils';
import { getFilterOptions } from '../../../utils';
import { ManagerFilterBar } from '@/shared/components/manager/ui';

interface StaffFilterProps {
    filters: StaffFilters;
    onFilterChange: (filters: StaffFilters) => void;
}

export function StaffFilter({ filters, onFilterChange }: StaffFilterProps) {
    const filterOptions = getFilterOptions();

    // Local state for filter inputs (not triggering API)
    const [localFilters, setLocalFilters] = useState<StaffFilters>({
        SearchTerm: filters.SearchTerm || '',
        IsActive: filters.IsActive,
        RoleType: filters.RoleType || '',
    });

    // Sync local filters when props change (e.g., reset from parent)
    useEffect(() => {
        setLocalFilters({
            SearchTerm: filters.SearchTerm || '',
            IsActive: filters.IsActive,
            RoleType: filters.RoleType || '',
        });
    }, [filters]);

    const handleApplyFilters = () => {
        // Apply filters - trigger API call
        onFilterChange(localFilters);
    };

    const handleResetFilters = () => {
        const resetFilters: StaffFilters = {
            SearchTerm: '',
            IsActive: undefined,
            RoleType: '',
        };
        setLocalFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    return (
        <div className="mb-4">
            <ManagerFilterBar
                searchValue={localFilters.SearchTerm || ''}
                onSearchChange={(value: string) => setLocalFilters((prev) => ({ ...prev, SearchTerm: value }))}
                onSubmit={handleApplyFilters}
                onReset={handleResetFilters}
                searchPlaceholder="Tìm kiếm theo tên, mã, email..."
            >
                <div className="w-full shrink-0 sm:w-[180px]">
                    <select
                        value={localFilters.IsActive === undefined ? '' : String(localFilters.IsActive)}
                        onChange={(e) =>
                            setLocalFilters((prev) => ({
                                ...prev,
                                IsActive: e.target.value === '' ? undefined : e.target.value === 'true',
                            }))
                        }
                        className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                            "disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                    >
                        {filterOptions.status.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full shrink-0 sm:w-[180px]">
                    <select
                        value={localFilters.RoleType || ''}
                        onChange={(e) => setLocalFilters((prev) => ({ ...prev, RoleType: e.target.value || '' }))}
                        className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                            "disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                    >
                        {filterOptions.roleType.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </ManagerFilterBar>
        </div>
    );
}
