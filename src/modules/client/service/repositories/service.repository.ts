/**
 * Service Repository Module
 * 
 * Repository Pattern - abstracts data access layer.
 * Provides a clean interface for data operations without exposing API details.
 */

import { serviceClientApi } from '../api/service.api';
import type { ServiceListResponse, ServiceDetailResponse, ServiceSearchRequest } from '../types';

/**
 * Service Repository Interface
 * Defines contract for service data operations
 */
export interface IServiceRepository {
    getServices(params: ServiceSearchRequest): Promise<ServiceListResponse>;
    getServiceById(id: string): Promise<ServiceDetailResponse>;
}

/**
 * Service Repository Implementation
 * Handles all data access operations for service module
 */
export class ServiceRepository implements IServiceRepository {
    /**
     * Get services with filters
     */
    async getServices(params: ServiceSearchRequest): Promise<ServiceListResponse> {
        try {
            return await serviceClientApi.getServices(params);
        } catch (error) {
            console.error('[ServiceRepository] Error fetching services:', error);
            throw error;
        }
    }

    /**
     * Get service by ID
     */
    async getServiceById(id: string): Promise<ServiceDetailResponse> {
        try {
            return await serviceClientApi.getServiceById(id);
        } catch (error) {
            console.error('[ServiceRepository] Error fetching service by ID:', error);
            throw error;
        }
    }
}

/**
 * Default repository instance
 */
export const serviceRepository = new ServiceRepository();

