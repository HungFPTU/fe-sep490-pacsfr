/**
 * Form Data Store - Zustand
 * Manages refresh triggers for dropdown data across Manager form modals
 * When a related entity (e.g. ServiceGroup) is created/updated,
 * trigger refresh so dropdowns in other forms auto-refresh
 */

import { create } from 'zustand';

/**
 * Dropdown keys for entities commonly used in form dropdowns
 */
export type DropdownKey =
  | 'serviceGroup'
  | 'faqCategory'
  | 'newsCategory'
  | 'department'
  | 'orgUnit'
  | 'docsType'
  | 'docsTypeGroup'
  | 'submissionMethod'
  | 'legalDocument'
  | 'paknCategory'
  | 'targetAudience'
  | 'workshift'
  | 'counter'
  | 'template'
  | 'service'
  | 'publicServiceNews'
  | 'requiredDocument'
  | 'serviceProcedure'
  | 'staff'
  | 'faq'
  | 'pakn';

interface FormDataStore {
  /**
   * Map of dropdown key -> timestamp of last invalidation
   * Used as part of React Query queryKey to trigger refetch
   */
  refreshTriggers: Partial<Record<DropdownKey, number>>;
  
  /**
   * Invalidate a single dropdown, triggering refetch
   */
  invalidate: (key: DropdownKey) => void;
  
  /**
   * Invalidate multiple dropdowns at once
   */
  invalidateMultiple: (keys: DropdownKey[]) => void;
  
  /**
   * Get current refresh trigger for a key (for use in queryKey)
   */
  getRefreshTrigger: (key: DropdownKey) => number;
  
  /**
   * Reset all triggers
   */
  resetAll: () => void;
}

export const useFormDataStore = create<FormDataStore>((set, get) => ({
  refreshTriggers: {},
  
  invalidate: (key) => {
    set((state) => ({
      refreshTriggers: {
        ...state.refreshTriggers,
        [key]: Date.now(),
      },
    }));
  },
  
  invalidateMultiple: (keys) => {
    const timestamp = Date.now();
    set((state) => ({
      refreshTriggers: {
        ...state.refreshTriggers,
        ...Object.fromEntries(keys.map((k) => [k, timestamp])),
      },
    }));
  },
  
  getRefreshTrigger: (key) => {
    return get().refreshTriggers[key] ?? 0;
  },
  
  resetAll: () => {
    set({ refreshTriggers: {} });
  },
}));

/**
 * Selector hook for getting a specific refresh trigger
 * Usage: const trigger = useDropdownRefreshTrigger('serviceGroup');
 */
export const useDropdownRefreshTrigger = (key: DropdownKey) => {
  return useFormDataStore((state) => state.refreshTriggers[key] ?? 0);
};

/**
 * Action hook for invalidating dropdowns
 * Usage: const { invalidate } = useDropdownInvalidate();
 *        invalidate('serviceGroup');
 */
export const useDropdownInvalidate = () => {
  const invalidate = useFormDataStore((state) => state.invalidate);
  const invalidateMultiple = useFormDataStore((state) => state.invalidateMultiple);
  
  return { invalidate, invalidateMultiple };
};
