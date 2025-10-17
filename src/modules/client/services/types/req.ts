// Request Types for Services Module

// Service Search Request
export interface ServiceSearchRequest {
  keyword?: string;
  serviceGroupId?: string;
  legalBasisId?: string;
  isActive?: boolean;
  page?: number;
  size?: number;
}

// Service Group Search Request
export interface ServiceGroupSearchRequest {
  keyword?: string;
  isActive?: boolean;
  page?: number;
  size?: number;
}

// Legal Basis Search Request
export interface LegalBasisSearchRequest {
  keyword?: string;
  isActive?: boolean;
  page?: number;
  size?: number;
}
