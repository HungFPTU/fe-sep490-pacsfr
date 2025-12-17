type DotNetCollection<T> = {
    $id?: string;
    $values?: T[];
};

export type ServiceRequiredDocument = {
    id: string;
    serviceId: string;
    docTypeId: string;
    docTypeName?: string;
    description?: string;
    isDeleted?: boolean;
    isActive?: boolean;
    createdAt?: string | Date;
    modifiedAt?: string | Date;
};

export type ServiceProcedureStep = {
    id: string;
    stepNumber: number;
    stepName: string;
    stepDescription?: string;
    responsibleUnit?: string;
    processingTime?: string;
    notes?: string;
    isActive?: boolean;
    createdAt?: string | Date;
};

export type ServiceLegalBasis = {
    legislationDocumentId: string;
    documentNumber: string;
    documentType: string;
    name: string;
    issueDate?: string | Date;
    issueBody?: string;
    effectiveDate?: string | Date;
    status?: string;
    fileUrl?: string;
};

export type ServiceSubmissionMethodSummary = {
    id: string;
    submissionMethodName: string;
    processingTime?: string;
    description?: string;
    fee?: number;
    isActive?: boolean;
};

export type ServiceAgency = {
    id: string;
    agencyName: string;
    description?: string;
    isActive?: boolean;
};

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
    condition?: string;
    requiredDocuments?: DotNetCollection<ServiceRequiredDocument>;
    serviceProcedures?: DotNetCollection<ServiceProcedureStep>;
    legalBases?: DotNetCollection<ServiceLegalBasis>;
    submissionMethods?: DotNetCollection<ServiceSubmissionMethodSummary>;
    serviceAgencies?: DotNetCollection<ServiceAgency>;
};

export type CreateServiceRequest = {
    serviceGroupId: string;
    serviceName: string;
    serviceCode: string;
    description: string;
    condition?: string;
    serviceType: string;
    resultDocument: string;
    isOnlineAvailable: boolean;
    isActive: boolean;
    decisionNumber: string;
    executionLevel: string;
    field: string;
    legislationDocumentIds?: string[];
};

export type UpdateServiceRequest = {
    id: string;
    serviceGroupId: string;
    serviceName: string;
    serviceCode: string;
    description: string;
    condition?: string;
    serviceType: string;
    resultDocument: string;
    isOnlineAvailable: boolean;
    isActive: boolean;
    decisionNumber: string;
    executionLevel: string;
    field: string;
    legislationDocumentIds?: string[];
};

export type ServiceFilters = {
    keyword: string;
    serviceGroupId: string;
    legalBasisId: string;
    isActive: boolean;
    page: number;
    size: number;
};

// Re-export from submission-method module
export type { AssignSubmissionMethodsRequest } from '@/modules/manager/submission-method/types';

export type AssignAudienceRequest = {
    serviceId: string;
    audienceIds: string[];
};

