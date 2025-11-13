// Filter Options Service
// Business logic for retrieving filter options based on search type

import type { FilterOptions, SearchByType } from '../types/filter-options';
import { DEPARTMENT_FILTER_OPTIONS, PROVINCE_FILTER_OPTIONS } from '../constants/filter-options';

/**
 * Service for managing filter options
 * Provides filter data based on search type (department vs province)
 */
export class FilterOptionsService {
    /**
     * Get filter options based on search type
     * @param searchBy - 'department' for "Bộ/Ban/Ngành" or 'province' for "Tỉnh/Thành phố"
     * @returns FilterOptions object with appropriate data
     */
    static getFilterOptions(searchBy: SearchByType): FilterOptions {
        switch (searchBy) {
            case 'department':
                return DEPARTMENT_FILTER_OPTIONS;
            case 'province':
                return PROVINCE_FILTER_OPTIONS;
            default:
                // Default to department
                return DEPARTMENT_FILTER_OPTIONS;
        }
    }

    /**
     * Get implementing agencies based on search type
     */
    static getImplementingAgencies(searchBy: SearchByType) {
        return this.getFilterOptions(searchBy).implementingAgencies;
    }

    /**
     * Get fields based on search type
     */
    static getFields(searchBy: SearchByType) {
        return this.getFilterOptions(searchBy).fields;
    }

    /**
     * Get implementation levels based on search type
     */
    static getImplementationLevels(searchBy: SearchByType) {
        return this.getFilterOptions(searchBy).implementationLevels;
    }

    /**
     * Get target audiences based on search type
     */
    static getTargetAudiences(searchBy: SearchByType) {
        return this.getFilterOptions(searchBy).targetAudiences;
    }
}

