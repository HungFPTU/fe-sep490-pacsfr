/**
 * Request types for Client Service API
 */

import type { ServiceType } from '../enums';

export type ServiceSearchRequest = {
    keyword?: string;
    serviceGroupId?: string;
    legalBasisId?: string;
    serviceType?: ServiceType | string;
    isActive?: boolean;
    page?: number;
    size?: number;
};

export type ServiceFilters = {
    keyword?: string;
    serviceGroupId?: string;
    legalBasisId?: string;
    serviceType?: ServiceType | string;
    isActive?: boolean;
    page: number;
    size: number;
};

