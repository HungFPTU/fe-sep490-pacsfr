/**
 * Dropdown Data Hooks
 * React Query hooks that integrate with Zustand refresh triggers
 * for auto-refreshing dropdown data in Manager forms
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { useDropdownRefreshTrigger, type DropdownKey } from '../stores';

// Dropdown query key factory
export const DROPDOWN_QUERY_KEYS = {
  base: ['dropdown'] as const,
  byKey: (key: DropdownKey, trigger: number) => ['dropdown', key, trigger] as const,
};

// Cache times for dropdowns (longer since they change less frequently)
const DROPDOWN_CACHE_TIME = 10 * 60 * 1000; // 10 minutes
const DROPDOWN_STALE_TIME = 5 * 60 * 1000; // 5 minutes

interface DropdownOption {
  value: string;
  label: string;
  [key: string]: unknown;
}

type DropdownFetcher<T = DropdownOption[]> = () => Promise<T>;

/**
 * Generic dropdown hook factory
 * Creates a hook that auto-refreshes when the corresponding Zustand trigger changes
 *
 * @example
 * const useServiceGroupDropdown = createDropdownHook('serviceGroup', fetchServiceGroups);
 */
export function createDropdownHook<T = DropdownOption[]>(
  key: DropdownKey,
  fetcher: DropdownFetcher<T>,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  }
) {
  return function useDropdown() {
    const refreshTrigger = useDropdownRefreshTrigger(key);

    return useQuery({
      queryKey: DROPDOWN_QUERY_KEYS.byKey(key, refreshTrigger),
      queryFn: fetcher,
      staleTime: options?.staleTime ?? DROPDOWN_STALE_TIME,
      gcTime: options?.gcTime ?? DROPDOWN_CACHE_TIME,
      enabled: options?.enabled ?? true,
    });
  };
}

/**
 * Inline dropdown hook for one-off usage
 * Use when you don't need a reusable hook
 *
 * @example
 * const { data: serviceGroups } = useDropdownData('serviceGroup', fetchServiceGroups);
 */
export function useDropdownData<T = DropdownOption[]>(
  key: DropdownKey,
  fetcher: DropdownFetcher<T>,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  }
) {
  const refreshTrigger = useDropdownRefreshTrigger(key);

  return useQuery({
    queryKey: DROPDOWN_QUERY_KEYS.byKey(key, refreshTrigger),
    queryFn: fetcher,
    staleTime: options?.staleTime ?? DROPDOWN_STALE_TIME,
    gcTime: options?.gcTime ?? DROPDOWN_CACHE_TIME,
    enabled: options?.enabled ?? true,
  });
}
