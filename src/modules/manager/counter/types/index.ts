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

export type UpdateCounterRequest = {
    counterCode: string;
    counterName: string;
    location: string;
    counterType: string;
    maxCapacity: number;
    isActive: boolean;
};

// Common form values type (fields that are editable in the form)
export type CounterFormValues = {
    counterCode: string;
    counterName: string;
    location: string;
    counterType: string;
    maxCapacity: number;
};

export type ServiceGroupOption = {
    id: string;
    groupCode?: string;
    groupName: string;
    description?: string;
    iconUrl?: string;
    displayOrder?: number;
    isActive?: boolean;
    createdAt?: string;
    createdBy?: string;
};

export type AssignServiceGroupRequest = {
    serviceGroupId: string;
    serviceType?: string;
    priorityLevel?: number;
};