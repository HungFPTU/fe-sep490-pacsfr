export type Services = {
  id: string;
  serviceGroupId: string;
  legalBasisId: string;
  serviceName: string;
  serviceCode: string;
  description: string;
  serviceType: string;
  processingTime: string;
  feeAmount: number;
  resultDocument: string;
  isOnlineAvailable: boolean;
  isActive: boolean;
  createdAt: Date;
  requiredDocuments?: RequiredDocuments[];
}

export class ServicesRequest {
  id?: string;
  serviceGroupId: string;
  legalBasisId: string;
  serviceName: string;
  serviceCode: string;
  description: string;
  serviceType: string;
  processingTime: string;
  feeAmount: number;
  resultDocument: string;
  isOnlineAvailable: true;
  isActive: true;

  constructor(service?: Services) {
    this.id = service?.id || '';
    this.serviceGroupId = service?.serviceGroupId || '';
    this.legalBasisId = service?.legalBasisId || '';
    this.serviceName = service?.serviceName || '';
    this.serviceCode = service?.serviceCode || '';
    this.description = service?.description || '';
    this.serviceType = service?.serviceType || '';
    this.processingTime = service?.processingTime || '';
    this.feeAmount = service?.feeAmount || 0;
    this.resultDocument = service?.resultDocument || '';
    this.isOnlineAvailable = service?.isOnlineAvailable || true;
    this.isActive = service?.isActive || true;
  }
}

export type Paged<T> = {
  size: number;
  page: number;
  total: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: { $id?: string; $values?: T[] };
};

export type ApiEnvelope<T> = {
  $id?: string;
  success: boolean;
  message?: string;
  data: T;
  timestamp?: string;
};

// Query params
export type ServiceListQuery = {
  keyword?: string;
  serviceGroupId?: string; // uuid
  legalBasisId?: string;   // uuid
  isActive?: boolean;
  page?: number;           // default 1
  size?: number;           // default 10
};

export type ServiceGroupResponse = {
  id: string;
  groupCode: string;
  departmentId: string;
  groupName: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
}

export type RequiredDocument = {
  $id?: string;
  id: string;
  serviceId: string;
  docTypeId: string;
  docTypeName: string;
  description?: string;
  isDeleted: boolean;
  createdAt: Date;
};

export type RequiredDocuments =
  | RequiredDocument[]
  | { $id?: string; $values?: RequiredDocument[] };


export type LegalBasis = {
  id: string;
  name: string;
  content: string;
  link: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
}