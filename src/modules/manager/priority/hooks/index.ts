import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { usePriorityStore } from '../stores/usePriorityStore';
import { priorityService } from '../services/priority.service';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import type { UpdatePriorityRequest } from '../types';

export const usePriorityCases = () => {
    const { data, isLoading, error, filters, fetchPriorityData, setFilters } = usePriorityStore();

    useEffect(() => {
        fetchPriorityData();
    }, [
        filters.page, 
        filters.priorityLevel, 
        filters.caseStatus, 
        filters.caseCode,
        filters.guestId,
        filters.serviceId,
        filters.staffId,
        filters.fromDate,
        filters.toDate,
    ]);

    return {
        data,
        isLoading,
        error,
        filters,
        setFilters,
        refetch: fetchPriorityData,
    };
};

export const useUpdatePriority = () => {
    const { fetchPriorityData } = usePriorityStore();
    const { addToast } = useGlobalToast();

    return useMutation({
        mutationFn: (data: UpdatePriorityRequest) => priorityService.updatePriority(data),
        onSuccess: () => {
            addToast({ message: 'Cập nhật mức độ ưu tiên thành công', type: 'success' });
            fetchPriorityData();
        },
        onError: (error) => {
            addToast({ 
                message: error instanceof Error ? error.message : 'Cập nhật thất bại', 
                type: 'error' 
            });
        },
    });
};

