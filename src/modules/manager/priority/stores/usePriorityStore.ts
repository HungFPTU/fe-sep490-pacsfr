import { create } from 'zustand';
import type { PriorityCaseResponse, PriorityCaseFilters } from '../types';
import { priorityService } from '../services/priority.service';

interface PriorityStore {
    data: PriorityCaseResponse | null;
    filters: PriorityCaseFilters;
    isLoading: boolean;
    error: string | null;
    lastFetched: number | null;
    
    fetchPriorityData: () => Promise<void>;
    setFilters: (filters: Partial<PriorityCaseFilters>) => void;
    setData: (data: PriorityCaseResponse | null) => void;
    clearData: () => void;
}

export const usePriorityStore = create<PriorityStore>((set, get) => ({
    data: null,
    filters: {
        page: 1,
        size: 20,
    },
    isLoading: false,
    error: null,
    lastFetched: null,

    fetchPriorityData: async () => {
        const { filters } = get();
        set({ isLoading: true, error: null });
        try {
            const data = await priorityService.getPriorityCases(filters);
            set({ 
                data, 
                isLoading: false, 
                lastFetched: Date.now(),
                error: null 
            });
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Lỗi tải dữ liệu',
                isLoading: false 
            });
        }
    },

    setFilters: (newFilters) => {
        set((state) => {
            const updatedFilters = { ...state.filters };
            
            Object.entries(newFilters).forEach(([key, value]) => {
                if (value === undefined) {
                    delete updatedFilters[key as keyof PriorityCaseFilters];
                } else {
                    updatedFilters[key as keyof PriorityCaseFilters] = value as never;
                }
            });
            
            return { filters: updatedFilters };
        });
    },

    setData: (data) => set({ data }),

    clearData: () => set({ 
        data: null, 
        error: null, 
        lastFetched: null 
    }),
}));

