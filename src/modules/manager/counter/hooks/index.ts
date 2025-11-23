import { useQuery, useMutation, useQueryClient, useQueries } from '@tanstack/react-query';
import { counterService } from '../services/counter.service';
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import type { CreateCounterRequest, AssignStaffRequest, Counter } from '../types';

export const useCounterList = () => {
    return useQuery({
        queryKey: QUERY_KEYS.COUNTER_LIST,
        queryFn: () => counterService.getAllActive(),
        gcTime: CACHE_TIME,
        staleTime: STALE_TIME,
    });
};

export const useCounterById = (id: string | null) => {
    return useQuery({
        queryKey: id ? QUERY_KEYS.COUNTER_DETAIL(id) : ['counter', 'detail', null],
        queryFn: () => {
            if (!id) return null;
            return counterService.getById(id);
        },
        enabled: !!id,
        gcTime: CACHE_TIME,
        staleTime: STALE_TIME,
    });
};

export const useCreateCounter = () => {
    const queryClient = useQueryClient();
    const { addToast } = useGlobalToast();

    return useMutation({
        mutationFn: (data: CreateCounterRequest) => counterService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.COUNTER_BASE });
            addToast({ message: 'Tạo quầy mới thành công', type: 'success' });
        },
        onError: (error) => {
            addToast({
                message: error instanceof Error ? error.message : 'Tạo quầy thất bại',
                type: 'error',
            });
        },
    });
};

export const useServiceGroupOptions = () => {
    return useQuery({
        queryKey: ['counter', 'service-group-options'],
        queryFn: () => counterService.getAllServiceGroups(),
        gcTime: CACHE_TIME,
        staleTime: STALE_TIME,
    });
};

export const useStaffOptions = () => {
    return useQuery({
        queryKey: ['counter', 'staff-options'],
        queryFn: () => counterService.getAllStaff(),
        gcTime: CACHE_TIME,
        staleTime: STALE_TIME,
    });
};

export const useAssignStaff = () => {
    const queryClient = useQueryClient();
    const { addToast } = useGlobalToast();

    return useMutation({
        mutationFn: ({ counterId, data }: { counterId: string; data: AssignStaffRequest }) =>
            counterService.assignStaff(counterId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.COUNTER_BASE });
            addToast({ message: 'Gán nhân viên thành công', type: 'success' });
        },
        onError: (error) => {
            addToast({
                message: error instanceof Error ? error.message : 'Gán nhân viên thất bại',
                type: 'error',
            });
        },
    });
};

export function useCounterMap(counterIds: string[], enabled = true) {
    const queries = useQueries({
        queries: counterIds.map(id => ({
            queryKey: QUERY_KEYS.COUNTER_DETAIL(id),
            queryFn: () => counterService.getById(id),
            enabled: !!id && enabled,
            gcTime: CACHE_TIME,
            staleTime: STALE_TIME,
        })),
    });

    const counterMap: Record<string, Counter | undefined> = {};
    let loading = false;
    let error: Error | null = null;

    queries.forEach((res, idx) => {
        counterMap[counterIds[idx]] = res.data as Counter;
        if (res.isLoading) loading = true;
        if (res.error) error = res.error as Error;
    });

    return { counterMap, loading, error };
}