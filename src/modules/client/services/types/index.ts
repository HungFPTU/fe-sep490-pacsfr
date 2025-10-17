// Export all types for Services Module
export * from "./req";
export * from "./res";

// Filter Types
export interface ServiceFilters {
  keyword: string;
  serviceGroupId: string;
  legalBasisId: string;
  isActive: boolean | null;
  page: number;
  size: number;
}

export interface ServiceGroupFilters {
  keyword: string;
  isActive: boolean | null;
  page: number;
  size: number;
}

export interface LegalBasisFilters {
  keyword: string;
  isActive: boolean | null;
  page: number;
  size: number;
}
