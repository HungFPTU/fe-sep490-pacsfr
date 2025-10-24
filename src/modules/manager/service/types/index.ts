export type Service = {
    id: string;
    serviceGroupId: string;
    serviceName: string;
    serviceCode: string;
    description: string;
    serviceType: string;
    resultDocument: string;
    isOnlineAvailable: boolean;
    isActive: boolean;
    decisionNumber: string;
    executionLevel: string;
    field: string;
    createdAt: string | Date;
    modifiedAt?: string | Date;
    $id?: string;

    // Populated fields (optional)
    serviceGroupName?: string;
};

export type CreateServiceRequest = {
    serviceGroupId: string;
    serviceName: string;
    serviceCode: string;
    description: string;
    serviceType: string;
    resultDocument: string;
    isOnlineAvailable: boolean;
    isActive: boolean;
    decisionNumber: string;
    executionLevel: string;
    field: string;
};

export type UpdateServiceRequest = {
    id: string;
    serviceGroupId: string;
    serviceName: string;
    serviceCode: string;
    description: string;
    serviceType: string;
    resultDocument: string;
    isOnlineAvailable: boolean;
    isActive: boolean;
    decisionNumber: string;
    executionLevel: string;
    field: string;
};

export type ServiceFilters = {
    keyword: string;
    serviceGroupId: string;
    legalBasisId: string;
    isActive: boolean;
    page: number;
    size: number;
};

