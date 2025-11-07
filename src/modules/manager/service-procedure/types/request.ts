/**
 * Request types for Service Procedure module
 */

export type CreateServiceProcedureRequest = {
    templateId: string;
    serviceId: string;
    stepNumber: number;
    stepName: string;
    stepDescription?: string;
    responsibleUnit: string;
    processingTime: string;
    notes?: string;
    isActive: boolean;
};

export type UpdateServiceProcedureRequest = {
    id: string;
} & CreateServiceProcedureRequest;

export type ServiceProcedureFilters = {
    keyword?: string;
    serviceId?: string;
    isActive?: boolean;
    page: number;
    size: number;
};

export type ServiceProcedureFormValues = {
    templateId: string;
    serviceId: string;
    stepNumber: number;
    stepName: string;
    stepDescription?: string;
    responsibleUnit: string;
    processingTime: string;
    notes?: string;
    isActive: boolean;
};
