/**
 * Response types for Client Service API
 */

export type Service = {
    id: string;
    serviceGroupId: string;
    legalBasisId?: string;
    serviceName: string;
    serviceCode: string;
    description?: string;
    serviceType?: string;
    processingTime?: string;
    feeAmount?: number;
    resultDocument?: string;
    decisionNumber?: string;
    executionLevel?: string;
    field?: string;
    isOnlineAvailable?: boolean;
    isActive: boolean;
    createdAt: string | Date;
    createdBy?: string;
    $id?: string;

    // Populated fields (optional)
    serviceGroupName?: string;
};

export type ServiceListResponse = {
    $id?: string;
    success?: boolean;
    message?: string;
    data?: {
        $id?: string;
        items?: {
            $id?: string;
            $values?: Service[];
        } | Service[];
        total?: number;
        page?: number;
        size?: number;
        totalPages?: number;
        hasPreviousPage?: boolean;
        hasNextPage?: boolean;
    };
    timestamp?: string;
    [key: string]: unknown;
};

export type ServiceDetailResponse = {
    $id?: string;
    success?: boolean;
    message?: string;
    data?: Service;
    [key: string]: unknown;
};

