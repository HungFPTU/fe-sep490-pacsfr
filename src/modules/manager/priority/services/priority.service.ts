import { priorityApi } from '../api/priority.api';
import type { PriorityCaseResponse, PriorityCaseFilters, PriorityCase, UpdatePriorityRequest } from '../types';

const parseArray = <T>(data: { $values?: T[] } | T[] | undefined): T[] => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === 'object' && '$values' in data) {
        return (data as { $values?: T[] }).$values || [];
    }
    return [];
};

export const priorityService = {
    async getPriorityCases(filters: PriorityCaseFilters): Promise<PriorityCaseResponse | null> {
        const response = await priorityApi.getCaseList(filters);
        
        if (!response.data?.success || !response.data?.data) {
            return null;
        }

        const rawData = response.data.data as Record<string, unknown>;
        const dataInner = rawData.data as Record<string, unknown>;
        const itemsData = dataInner.items as Record<string, unknown>;

        const parsedData: PriorityCaseResponse = {
            page: (dataInner.page as number) || 1,
            size: (dataInner.size as number) || 20,
            total: (dataInner.total as number) || 0,
            totalPages: (dataInner.totalPages as number) || 1,
            hasPreviousPage: (dataInner.hasPreviousPage as boolean) || false,
            hasNextPage: (dataInner.hasNextPage as boolean) || false,
            items: parseArray(itemsData as never).map((item: unknown) => {
                const caseData = item as Record<string, unknown>;
                
                return {
                    id: (caseData.id as string) || '',
                    caseCode: (caseData.caseCode as string) || '',
                    guestId: (caseData.guestId as string) || '',
                    guestName: (caseData.guestName as string) || '',
                    serviceId: (caseData.serviceId as string) || '',
                    serviceName: (caseData.serviceName as string) || '',
                    priorityLevel: (caseData.priorityLevel as number) || 0,
                    submissionMethod: (caseData.submissionMethod as string) || '',
                    estimatedCompletionDate: (caseData.estimatedCompletionDate as string) || '',
                    totalFee: (caseData.totalFee as number) || 0,
                    isPayment: (caseData.isPayment as boolean) || false,
                    receivedBy: parseArray(caseData.receivedBy as never),
                    staffName: (caseData.staffName as string) || '',
                    currentStatus: (caseData.currentStatus as string) || '',
                } as PriorityCase;
            }),
        };

        return parsedData;
    },

    async updatePriority(data: UpdatePriorityRequest): Promise<boolean> {
        const response = await priorityApi.updatePriority(data);
        return response.data?.success ?? false;
    },
};

