import { useQuery, useMutation } from "@tanstack/react-query";
import { useQueueStore } from "./stores/useQueueStore";
import { queueService } from "./services/queue.service";
import { useGlobalToast } from "@core/patterns/SingletonHook";
// import type { Counter } from "./types";
import React from "react";

/**
 * Simple Queue Hook - TanStack Query + Zustand + Service
 * Service handles business logic, Hook handles UI state
 */
export function useQueue() {
    const { counters, overview, setOverview, updateCounter } = useQueueStore();
    const { addToast } = useGlobalToast();

    // Overview query - Service handles data fetching
    const overviewQuery = useQuery({
        queryKey: ["queue", "overview"],
        queryFn: async () => {
            const data = await queueService.getOverview();
            setOverview(data); // Sync to Zustand store
            return data;
        },
        refetchInterval: 5000,
        staleTime: 0,
    });

    // Call next mutation - Service handles business logic
    const callNextMutation = useMutation({
        mutationFn: async (counterId: string) => {
            return queueService.callNext(counterId);
        },
        onSuccess: (data, counterId) => {
            // Hook handles UI state updates
            updateCounter(counterId, { current: data.current });
            addToast({ message: "Đã gọi số tiếp theo", type: "success" });
        },
        onError: (error) => {
            addToast({
                message: error instanceof Error ? error.message : "Lỗi gọi số tiếp theo",
                type: "error"
            });
        },
    });

    // Complete mutation
    const completeMutation = useMutation({
        mutationFn: async (counterId: string) => {
            return queueService.completeCurrent(counterId);
        },
        onSuccess: (data, counterId) => {
            updateCounter(counterId, { current: data.current });
            addToast({ message: "Đã hoàn tất", type: "success" });
        },
        onError: (error) => {
            addToast({
                message: error instanceof Error ? error.message : "Lỗi hoàn tất",
                type: "error"
            });
        },
    });

    // Skip mutation
    const skipMutation = useMutation({
        mutationFn: async (counterId: string) => {
            return queueService.skipCurrent(counterId);
        },
        onSuccess: (data, counterId) => {
            updateCounter(counterId, { current: data.current });
            addToast({ message: "Đã bỏ qua", type: "warning" });
        },
        onError: (error) => {
            addToast({
                message: error instanceof Error ? error.message : "Lỗi bỏ qua",
                type: "error"
            });
        },
    });

    return {
        // Data (prefer TanStack Query, fallback to Zustand)
        overview: overviewQuery.data || overview,
        counters: overviewQuery.data?.counters || counters,

        // Loading states
        isLoading: overviewQuery.isLoading,

        // Error states
        error: overviewQuery.error,

        // Actions
        callNext: callNextMutation.mutateAsync,
        complete: completeMutation.mutateAsync,
        skip: skipMutation.mutateAsync,
        refresh: () => overviewQuery.refetch(),

        // Mutation states
        isCallNextPending: callNextMutation.isPending,
        isCompletePending: completeMutation.isPending,
        isSkipPending: skipMutation.isPending,

        // Service utilities
        getElapsedMinutes: queueService.getElapsedMinutes,
        getElapsedSeconds: queueService.getElapsedSeconds,
    };
}

// Staff-specific hook
export function useStaffQueue(counterId: string) {
    const queue = useQueue();

    // Find current counter
    const currentCounter = React.useMemo(() => {
        return queue.counters.find(c => c.id === counterId) || null;
    }, [queue.counters, counterId]);

    // Staff-specific actions
    const staffActions = {
        callNext: () => queue.callNext(counterId),
        complete: () => queue.complete(counterId),
        skip: () => queue.skip(counterId),
    };

    return {
        ...queue,
        currentCounter,
        ...staffActions,
    };
}

// Citizen-specific hook (read-only)
export function useCitizenQueue() {
    const { overview, counters, isLoading, error, refresh, getElapsedMinutes } = useQueue();

    return {
        overview,
        counters,
        isLoading,
        error,
        refresh,
        getElapsedMinutes,
    };
}

