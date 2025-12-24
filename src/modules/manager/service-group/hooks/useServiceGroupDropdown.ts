/**
 * Service Group Dropdown Hook
 * Example of using Zustand + React Query hybrid for auto-refreshing dropdowns
 */

'use client'; 

import { useDropdownData } from '@/shared/hooks';
import { getValuesPage } from '@/types/rest';
import { serviceGroupApi } from '../api/service-group.api';
import type { ServiceGroup } from '../types';

/**
 * Hook for fetching service groups as dropdown options
 * Auto-refreshes when serviceGroup is invalidated via useFormDataStore
 */
export const useServiceGroupDropdown = () => {
    return useDropdownData<ServiceGroup[]>(
        'serviceGroup',
        async () => {
            const response = await serviceGroupApi.getList({
                page: 1,
                size: 1000,
            });
            const { items } = getValuesPage(response.data);
            return items as ServiceGroup[];
        },
        {
            staleTime: 5 * 60 * 1000, // 5 minutes
        }
    );
};
