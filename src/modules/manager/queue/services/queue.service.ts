import { queueApi } from '../api/queue.api';
import type { QueueMonitoringData } from '../types';

const parseArray = <T>(data: { $values?: T[] } | T[] | undefined): T[] => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === 'object' && '$values' in data) {
        return (data as { $values?: T[] }).$values || [];
    }
    return [];
};

export const queueService = {
    async getQueueMonitoring(): Promise<QueueMonitoringData | null> {
        const response = await queueApi.getQueueMonitoring();
        
        if (!response.data?.success || !response.data?.data) {
            return null;
        }

        const rawData = response.data.data as Record<string, unknown>;
        const serviceGroupQueuesData = rawData.serviceGroupQueues as Record<string, unknown>;

        const parsedData: QueueMonitoringData = {
            serviceGroupQueues: parseArray(serviceGroupQueuesData as never).map((queue: unknown) => {
                const queueData = queue as Record<string, unknown>;
                const countersData = queueData.counters as Record<string, unknown>;
                
                return {
                    serviceGroupId: (queueData.serviceGroupId as string) || '',
                    serviceGroupName: (queueData.serviceGroupName as string) || '',
                    queueLength: (queueData.queueLength as number) || 0,
                    activeCounters: (queueData.activeCounters as number) || 0,
                    estimatedWaitTime: (queueData.estimatedWaitTime as number) || 0,
                    status: (queueData.status as 'Empty' | 'Normal' | 'Busy' | 'Critical') || 'Empty',
                    counters: parseArray(countersData as never).map((counter: unknown) => {
                        const counterData = counter as Record<string, unknown>;
                        return {
                            counterId: (counterData.counterId as string) || '',
                            counterCode: (counterData.counterCode as string) || '',
                            status: (counterData.status as 'Available' | 'Busy' | 'Offline') || 'Available',
                        };
                    }),
                };
            }),
            totalActiveQueues: (rawData.totalActiveQueues as number) || 0,
            totalWaitingCustomers: (rawData.totalWaitingCustomers as number) || 0,
            totalActiveCounters: (rawData.totalActiveCounters as number) || 0,
            lastUpdated: (rawData.lastUpdated as string) || '',
        };

        return parsedData;
    },
};

