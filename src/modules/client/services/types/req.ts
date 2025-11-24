// Request Types for Services Module

// Service Search Request - Based on Swagger API
export interface ServiceSearchRequest {
  keyword?: string;
  serviceGroupId?: string;
  legalBasisId?: string;
  isActive?: boolean;
  page?: number;
  size?: number;
}

// Service Filters for UI - Extended with advanced search options
export interface ServiceFilters {
  // Basic search
  keyword: string;

  // Advanced filters (from Swagger)
  serviceGroupId: string;
  legalBasisId: string;
  isActive: boolean | null;

  // Pagination
  page: number;
  size: number;

  // Additional UI filters
  serviceType?: string;
  field?: string;
  executionLevel?: string;
  onlineAvailable?: boolean | null;
  searchBy?: 'department' | 'province';
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
