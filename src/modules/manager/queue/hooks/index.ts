import { useEffect } from 'react';
import { useQueueStore } from '../stores/useQueueStore';

export const useQueueMonitoring = () => {
    const { data, isLoading, error, fetchQueueData, startAutoRefresh, stopAutoRefresh } = useQueueStore();

    useEffect(() => {
        startAutoRefresh();

        return () => {
            stopAutoRefresh();
        };
    }, [startAutoRefresh, stopAutoRefresh]);

    return {
        data,
        isLoading,
        error,
        refetch: fetchQueueData,
    };
};

