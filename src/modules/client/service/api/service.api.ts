/**
 * Service API Layer for Client
 * Raw HTTP calls using httpNoLoading
 */

import { httpNoLoading } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { ServiceListResponse, ServiceDetailResponse, ServiceSearchRequest } from '../types';

export const serviceClientApi = {
    /**
     * Get all services with search and filter
     */
    getServices: async (params: ServiceSearchRequest = {}): Promise<ServiceListResponse> => {
        const searchParams = new URLSearchParams();

        if (params.keyword) searchParams.append('Keyword', params.keyword);
        if (params.serviceGroupId) searchParams.append('ServiceGroupId', params.serviceGroupId);
        if (params.legalBasisId) searchParams.append('LegalBasisId', params.legalBasisId);
        if (params.serviceType) searchParams.append('ServiceType', params.serviceType);
        if (params.isActive !== undefined) searchParams.append('IsActive', params.isActive.toString());
        if (params.page) searchParams.append('Page', params.page.toString());
        if (params.size) searchParams.append('Size', params.size.toString());

        const queryString = searchParams.toString();
        const url = `${API_PATH.CLIENT.SERVICES.ALL}${queryString ? `?${queryString}` : ''}`;

        const response = await httpNoLoading.get<ServiceListResponse>(url);
        return response.data;
    },

    /**
     * Get service by ID
     */
    getServiceById: async (id: string): Promise<ServiceDetailResponse> => {
        const url = API_PATH.CLIENT.SERVICES.BY_ID(id);
        const response = await httpNoLoading.get<ServiceDetailResponse>(url);
        return response.data;
    },
};

