import { useQueries } from '@tanstack/react-query';
import { counterService } from '../services/counter.service';
import { COUNTER_QUERY_KEYS } from '../constants';
import { Counter } from '../types/index';

export function useCounterMap(counterIds: string[], enabled = true) {
    const queries = useQueries({
        queries: counterIds.map(id => ({
            queryKey: COUNTER_QUERY_KEYS.one(id),
            queryFn: () => counterService.getById(id),
            enabled: !!id && enabled,
            staleTime: 60 * 1000,
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