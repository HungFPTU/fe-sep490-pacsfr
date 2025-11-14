// Services Module
export * from "./services";
export * from "./case";
export * from "./public-service-news";

// Service Group Module (explicit exports to avoid conflicts)
export type { ServiceGroup, ServiceGroupDetailResponse, ServiceGroupListResponse } from "./services-group/types";
export { ServiceGroupApi, serviceGroupApi } from "./services-group/api/service-group.api";
export { ServiceGroupService } from "./services-group/services/service-group.service";
export { useServiceGroup, useServiceGroups } from "./services-group/hooks/useServiceGroups";

// Legal Basis Module (explicit exports to avoid conflicts)
export type { LegalBasis, LegalBasisDetailResponse, LegalBasisListResponse } from "./legal-basis/types";
export { LegalBasisApi } from "./legal-basis/api/legal-basis.api";
export { LegalBasisService } from "./legal-basis/services/legal-basis.service";
export { useLegalBasis, useLegalBasisList } from "./legal-basis/hooks/useLegalBasis";
