import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Counter, QueueOverview } from "../types";

interface QueueState {
    // State
    counters: Counter[];
    overview: QueueOverview | null;
    selectedCounterId: string | null;
    lastUpdated: string | null;

    // Actions
    setCounters: (counters: Counter[]) => void;
    setOverview: (overview: QueueOverview) => void;
    updateCounter: (counterId: string, updates: Partial<Counter>) => void;
    setSelectedCounter: (counterId: string | null) => void;
    updateLastUpdated: () => void;
    reset: () => void;
}

export const useQueueStore = create<QueueState>()(
    devtools(
        (set, get) => ({
            // Initial state
            counters: [],
            overview: null,
            selectedCounterId: null,
            lastUpdated: null,

            // Actions
            setCounters: (counters) => {
                set({
                    counters,
                    lastUpdated: new Date().toISOString(),
                });
            },

            setOverview: (overview) => {
                set({
                    overview,
                    counters: overview.counters,
                    lastUpdated: new Date().toISOString(),
                });
            },

            updateCounter: (counterId, updates) => {
                const { counters } = get();
                const updatedCounters = counters.map(counter =>
                    counter.id === counterId
                        ? { ...counter, ...updates }
                        : counter
                );
                set({
                    counters: updatedCounters,
                    lastUpdated: new Date().toISOString(),
                });
            },

            setSelectedCounter: (counterId) => {
                set({ selectedCounterId: counterId });
            },

            updateLastUpdated: () => {
                set({ lastUpdated: new Date().toISOString() });
            },

            reset: () => {
                set({
                    counters: [],
                    overview: null,
                    selectedCounterId: null,
                    lastUpdated: null,
                });
            },
        }),
        {
            name: "queue-store",
        }
    )
);
