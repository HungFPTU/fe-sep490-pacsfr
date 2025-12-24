/**
 * Counter Display Types - Barrel Export
 */

// Response types
export * from './response';

// Request types
export * from './request';

// Legacy types for backward compatibility with mock data
export type CounterStatus = 'active' | 'inactive' | 'busy';

export type CounterDisplayItem = {
    id: string;
    counterCode: string;
    counterName: string;
    currentQueueNumber: number | null;
    status: CounterStatus;
    staffName?: string;
};

export type DisplaySettings = {
    title: string;
    subtitle?: string;
    sessionInfo?: string;
    refreshInterval: number;
    showClock: boolean;
    columns: number;
};
