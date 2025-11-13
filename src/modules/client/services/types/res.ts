// Response Types for Services Module

// Service Response Types
export interface Service {
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
  requiredDocuments?: {
    $values: RequiredDocument[];
  };
  serviceProcedures?: {
    $values: ServiceProcedure[];
  };
  legalBases?: {
    $values: LegalBasisItem[];
  };
  submissionMethods?: {
    $values: SubmissionMethod[];
  };
  serviceAgencies?: {
    $values: ServiceAgency[];
  };
  createdAt: string;
  createdBy?: string;
}

export interface ServiceProcedure {
  id: string;
  serviceId: string;
  stepNumber: number;
  stepName: string;
  stepDescription?: string;
  responsibleUnit?: string;
  processingTime?: string;
  notes?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
}

export interface LegalBasisItem {
  legislationDocumentId: string;
  documentNumber: string;
  documentType: string;
  name: string;
  issueDate: string;
  issueBody: string;
  effectiveDate: string;
  status: string;
  fileUrl?: string;
}

export interface SubmissionMethod {
  id: string;
  submissionMethodName: string;
  processingTime?: string;
  fee?: number;
  description?: string;
  isActive?: boolean;
}

export interface ServiceAgency {
  id: string;
  agencyName: string;
  description?: string;
  isActive: boolean;
}

export interface RequiredDocument {
  id: string;
  serviceId: string;
  docTypeId: string;
  docTypeName: string;
  description: string;
  isDeleted: boolean;
  createdAt: string;
}

export interface ServiceListResponse {
  $id: string;
  success: boolean;
  message: string;
  data: {
    $id: string;
    size: number;
    page: number;
    total: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    items: {
      $id: string;
      $values: Service[];
    };
  };
  timestamp: string;
}

export interface ServiceDetailResponse {
  $id: string;
  success: boolean;
  message: string;
  data: Service;
  timestamp: string;
}

// Service Group Response Types
export interface ServiceGroup {
  id: string;
  groupCode: string;
  departmentId: string;
  groupName: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

export interface ServiceGroupListResponse {
  $id: string;
  success: boolean;
  message: string;
  data: {
    $id: string;
    size: number;
    page: number;
    total: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    items: {
      $id: string;
      $values: ServiceGroup[];
    };
  };
  timestamp: string;
}

export interface ServiceGroupDetailResponse {
  $id: string;
  success: boolean;
  message: string;
  data: ServiceGroup;
  timestamp: string;
}

// Legal Basis Response Types
export interface LegalBasis {
  id: string;
  name: string;
  content: string;
  link: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

export interface LegalBasisListResponse {
  $id: string;
  success: boolean;
  message: string;
  data: {
    $id: string;
    size: number;
    page: number;
    total: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    items: {
      $id: string;
      $values: LegalBasis[];
    };
  };
  timestamp: string;
}

export interface LegalBasisDetailResponse {
  $id: string;
  success: boolean;
  message: string;
  data: LegalBasis;
  timestamp: string;
}
