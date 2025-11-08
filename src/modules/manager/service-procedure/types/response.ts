/**
 * Response types for Service Procedure module
 */

export type ServiceProcedure = {
    id: string;
    templateId: string;
    serviceId: string;
    stepNumber: number;
    stepName: string;
    stepDescription?: string;
    responsibleUnit: string;
    processingTime: string;
    notes?: string;
    isActive: boolean;
    createdAt?: string | Date;
    modifiedAt?: string | Date;
    createdBy?: string;
    modifiedBy?: string;
    $id?: string;
    serviceName?: string;
    templateName?: string;
};
