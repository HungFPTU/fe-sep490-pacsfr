import { create } from 'zustand';
import type { QueueMonitoringData } from '../types';
import { queueService } from '../services/queue.service';

interface QueueStore {
    data: QueueMonitoringData | null;
    isLoading: boolean;
    error: string | null;
    lastFetched: number | null;
    
    fetchQueueData: () => Promise<void>;
    setData: (data: QueueMonitoringData | null) => void;
    clearData: () => void;
    startAutoRefresh: () => void;
    stopAutoRefresh: () => void;
}

let refreshInterval: NodeJS.Timeout | null = null;

export const useQueueStore = create<QueueStore>((set, get) => ({
    data: null,
    isLoading: false,
    error: null,
    lastFetched: null,

    fetchQueueData: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await queueService.getQueueMonitoring();
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

    setData: (data) => set({ data }),

    clearData: () => set({ 
        data: null, 
        error: null, 
        lastFetched: null 
    }),

    startAutoRefresh: () => {
        const { fetchQueueData } = get();
        
        if (refreshInterval) {
            clearInterval(refreshInterval);
        }
        
        fetchQueueData();
        
        refreshInterval = setInterval(() => {
            fetchQueueData();
        }, 60000);
    },

    stopAutoRefresh: () => {
        if (refreshInterval) {
            clearInterval(refreshInterval);
            refreshInterval = null;
        }
    },
}));

