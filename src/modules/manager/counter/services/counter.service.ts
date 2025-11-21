import { counterApi } from '../api/counter.api';
import type { Counter, CounterServiceGroup, CreateCounterRequest, ServiceGroupOption, StaffOption, AssignStaffRequest } from '../types';

const parseArray = <T>(data: { $values?: T[] } | T[] | undefined): T[] => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === 'object' && '$values' in data) {
        return (data as { $values?: T[] }).$values || [];
    }
    return [];
};

export const counterService = {
    async getById(id: string): Promise<Counter | null> {
        const response = await counterApi.getById(id);
        if (!response.data?.success || !response.data?.data) {
            return null;
        }

        const rawData = response.data.data as Record<string, unknown>;
        const serviceGroupsData = rawData.serviceGroups as Record<string, unknown>;

        return {
            id: (rawData.id as string) || '',
            counterCode: (rawData.counterCode as string) || undefined,
            counterName: (rawData.counterName as string) || undefined,
            location: (rawData.location as string) || undefined,
            counterType: (rawData.counterType as string) || undefined,
            maxCapacity: (rawData.maxCapacity as number) || undefined,
            isActive: (rawData.isActive as boolean) ?? true,
            staffId: (rawData.staffId as string) || undefined,
            staffName: (rawData.staffName as string) || undefined,
            serviceGroups: {
                $id: (serviceGroupsData?.$id as string) || undefined,
                $values: parseArray(serviceGroupsData?.$values as never).map((sg: unknown) => {
                    const sgData = sg as Record<string, unknown>;
                    return {
                        id: (sgData.id as string) || '',
                        groupName: (sgData.groupName as string) || '',
                        currentLength: (sgData.currentLength as number) || 0,
                        status: (sgData.status as string) || '',
                    } as CounterServiceGroup;
                }),
            },
        } as Counter;
    },

    async getAllActive(): Promise<Counter[]> {
        const response = await counterApi.getAllActive();
        if (!response.data?.success || !response.data?.data) {
            return [];
        }

        const rawData = response.data.data as { $values?: unknown[] } | unknown[];
        const countersData = parseArray(rawData);

        return countersData.map((counter: unknown) => {
            const counterData = counter as Record<string, unknown>;
            const serviceGroupsData = counterData.serviceGroups as Record<string, unknown>;

            return {
                id: (counterData.id as string) || '',
                counterCode: (counterData.counterCode as string) || undefined,
                counterName: (counterData.counterName as string) || undefined,
                location: (counterData.location as string) || undefined,
                counterType: (counterData.counterType as string) || undefined,
                maxCapacity: (counterData.maxCapacity as number) || undefined,
                isActive: (counterData.isActive as boolean) ?? true,
                staffId: (counterData.staffId as string) || undefined,
                staffName: (counterData.staffName as string) || undefined,
                serviceGroups: {
                    $id: (serviceGroupsData?.$id as string) || undefined,
                    $values: parseArray(serviceGroupsData?.$values as never).map((sg: unknown) => {
                        const sgData = sg as Record<string, unknown>;
                        return {
                            id: (sgData.id as string) || '',
                            groupName: (sgData.groupName as string) || '',
                            currentLength: (sgData.currentLength as number) || 0,
                            status: (sgData.status as string) || '',
                        } as CounterServiceGroup;
                    }),
                },
            } as Counter;
        });
    },

    async create(data: CreateCounterRequest): Promise<Counter | null> {
        const response = await counterApi.create(data);
        if (!response.data?.success || !response.data?.data) {
            return null;
        }
        return response.data.data as Counter;
    },

    async getAllServiceGroups(): Promise<ServiceGroupOption[]> {
        const response = await counterApi.getAllServiceGroups();
        if (!response.data?.success || !response.data?.data) {
            return [];
        }

        const rawData = response.data.data as Record<string, unknown>;
        const itemsData = rawData.items as { $values?: unknown[] } | unknown[] | undefined;
        const itemsArray = parseArray(itemsData);

        return itemsArray.map((item: unknown) => {
            const itemData = item as Record<string, unknown>;
            return {
                id: (itemData.id as string) || '',
                name: (itemData.groupName as string) || '',
            } as ServiceGroupOption;
        });
    },

    async getAllStaff(): Promise<StaffOption[]> {
        const response = await counterApi.getAllStaff();
        if (!response.data?.success || !response.data?.data) {
            return [];
        }

        const rawData = response.data.data as { $values?: unknown[] } | unknown[];
        const itemsData = parseArray(rawData);

        return itemsData.map((item: unknown) => {
            const itemData = item as Record<string, unknown>;
            return {
                id: (itemData.id as string) || '',
                name: (itemData.fullName as string) || '',
            } as StaffOption;
        });
    },

    async assignStaff(counterId: string, data: AssignStaffRequest): Promise<boolean> {
        const response = await counterApi.assignStaff(counterId, data);
        return response.data?.success ?? false;
    },
};
