export type Counter = {
    counterId: string;
    counterCode: string;
    status: 'Available' | 'Busy' | 'Offline';
};

export type ServiceGroupQueue = {
    serviceGroupId: string;
    serviceGroupName: string;
    queueLength: number;
    activeCounters: number;
    estimatedWaitTime: number;
    status: 'Empty' | 'Normal' | 'Busy' | 'Critical';
    counters: Counter[];
};

export type QueueMonitoringData = {
    serviceGroupQueues: ServiceGroupQueue[];
    totalActiveQueues: number;
    totalWaitingCustomers: number;
    totalActiveCounters: number;
    lastUpdated: string;
};

