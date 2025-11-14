'use client';

import React from 'react';
import { ServiceType, SERVICE_TYPE_OPTIONS } from '../../enums';
import { cn } from '@/shared/lib/utils';

interface ServiceTypeFilterProps {
    selectedType: ServiceType | null;
    onTypeChange: (type: ServiceType | null) => void;
}

export const ServiceTypeFilter: React.FC<ServiceTypeFilterProps> = ({
    selectedType,
    onTypeChange,
}) => {
    return (
        <div className="mb-8 flex items-center justify-center gap-4">
            <button
                onClick={() => onTypeChange(null)}
                className={cn(
                    'rounded-lg px-6 py-3 text-sm font-semibold transition-colors',
                    selectedType === null
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
            >
                Tất cả
            </button>
            {SERVICE_TYPE_OPTIONS.map((option) => {
                const IconComponent = option.icon;
                return (
                    <button
                        key={option.value}
                        onClick={() => onTypeChange(option.value)}
                        className={cn(
                            'flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors',
                            selectedType === option.value
                                ? 'bg-red-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        )}
                    >
                        <IconComponent className="h-5 w-5" />
                        <span>{option.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

