// Hook for Filter Options
// React integration for filter options service

import { useMemo } from 'react';
import { FilterOptionsService } from '../services/filter-options.service';
import type { SearchByType } from '../types/filter-options';

/**
 * Hook to get filter options based on search type
 * @param searchBy - 'department' or 'province'
 * @returns FilterOptions object
 */
export const useFilterOptions = (searchBy: SearchByType = 'department') => {
    return useMemo(() => {
        return FilterOptionsService.getFilterOptions(searchBy);
    }, [searchBy]);
};

/**
 * Hook to get implementing agencies based on search type
 */
export const useImplementingAgencies = (searchBy: SearchByType = 'department') => {
    return useMemo(() => {
        return FilterOptionsService.getImplementingAgencies(searchBy);
    }, [searchBy]);
};

/**
 * Hook to get fields based on search type
 */
export const useFields = (searchBy: SearchByType = 'department') => {
    return useMemo(() => {
        return FilterOptionsService.getFields(searchBy);
    }, [searchBy]);
};

/**
 * Hook to get implementation levels based on search type
 */
export const useImplementationLevels = (searchBy: SearchByType = 'department') => {
    return useMemo(() => {
        return FilterOptionsService.getImplementationLevels(searchBy);
    }, [searchBy]);
};

/**
 * Hook to get target audiences based on search type
 */
export const useTargetAudiences = (searchBy: SearchByType = 'department') => {
    return useMemo(() => {
        return FilterOptionsService.getTargetAudiences(searchBy);
    }, [searchBy]);
};

