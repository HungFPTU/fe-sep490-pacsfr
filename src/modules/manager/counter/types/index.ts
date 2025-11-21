export type CounterServiceGroup = {
    id: string;
    groupName: string;
    currentLength: number;
    status: string;
};

export type Counter = {
    id: string;
    counterCode?: string;
    counterName?: string;
    location?: string;
    counterType?: string;
    maxCapacity?: number;
    isActive: boolean;
    staffId?: string;
    staffName?: string;
    serviceGroups: {
        $id?: string;
        $values?: CounterServiceGroup[];
    };
};

export type CreateCounterRequest = {
    counterCode: string;
    counterName: string;
    location: string;
    counterType: string;
    maxCapacity: number;
};

export type ServiceGroupOption = {
    id: string;
    name: string;
};

export type StaffOption = {
    id: string;
    name: string;
};

export type AssignStaffRequest = {
    staffId: string;
};