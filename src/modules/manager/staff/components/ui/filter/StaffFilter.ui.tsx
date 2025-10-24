'use client';

import React from 'react';
import { ROLE_TYPE_OPTIONS, BOOLEAN_OPTIONS } from '../../../constants';
import { StaffFilters } from '../../../types';
import { Search } from 'lucide-react';

interface StaffFilterProps {
    filters: StaffFilters;
    onFilterChange: (filters: StaffFilters) => void;
}

export function StaffFilter({ filters, onFilterChange }: StaffFilterProps) {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFilterChange({ ...filters, SearchTerm: e.target.value });
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        onFilterChange({
            ...filters,
            IsActive: value === '' ? undefined : value === 'true',
        });
    };

    const handleRoleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange({ ...filters, RoleType: e.target.value || undefined });
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên, mã, email..."
                        value={filters.SearchTerm || ''}
                        onChange={handleSearchChange}
                        className="w-full h-10 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Status Filter */}
                <select
                    value={filters.IsActive === undefined ? '' : String(filters.IsActive)}
                    onChange={handleStatusChange}
                    className="h-10 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    {BOOLEAN_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* Role Type Filter */}
                <select
                    value={filters.RoleType || ''}
                    onChange={handleRoleTypeChange}
                    className="h-10 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="">Tất cả vai trò</option>
                    {ROLE_TYPE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

