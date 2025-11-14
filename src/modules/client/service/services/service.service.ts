/**
 * Service Service Layer
 * 
 * Business logic layer for service operations.
 * Follows Service Layer pattern - encapsulates business logic and coordinates between Repository and Domain.
 * 
 * Responsibilities:
 * - Input validation
 * - Business rule enforcement
 * - Error handling and transformation
 * - Orchestrating data flow (Repository -> Domain)
 */

import { serviceRepository } from '../repositories';
import { getValuesPage } from '@/types/rest';
import type { ServiceSearchRequest, ServiceListResponse, ServiceDetailResponse, Service } from '../types';

/**
 * Service Client Service
 * Main service class following Service Layer pattern
 */
export class ServiceClientService {
    /**
     * Get services list with filters
     * Validates filters and normalizes response
     */
    async getServices(params: ServiceSearchRequest): Promise<ReturnType<typeof getValuesPage<Service>>> {
        try {
            const response = await serviceRepository.getServices(params);

            // Normalize response to match RestPaged format
            // Response structure: { success, data: { items: { $values: [] }, page, size, total, totalPages } }
            const data = response.data || {};
            const page = data.page || 1;
            const size = data.size || 10;
            const total = data.total || 0;
            const totalPages = data.totalPages || Math.ceil(total / size);

            const normalizedResponse: {
                success: boolean;
                message?: string;
                data: {
                    items: { $values?: Service[] } | Service[];
                    total: number;
                    page: number;
                    size: number;
                    totalPages: number;
                    hasPreviousPage: boolean;
                    hasNextPage: boolean;
                };
            } = {
                success: response.success ?? true,
                message: response.message,
                data: {
                    items: data.items || { $values: [] },
                    total,
                    page,
                    size,
                    totalPages,
                    hasPreviousPage: data.hasPreviousPage ?? (page > 1),
                    hasNextPage: data.hasNextPage ?? (page < totalPages),
                },
            };

            return getValuesPage(normalizedResponse);
        } catch (error) {
            console.error('[ServiceService] Error getting services:', error);
            throw error;
        }
    }

    /**
     * Get service by ID
     */
    async getServiceById(id: string): Promise<Service | null> {
        if (!id || typeof id !== 'string' || id.trim().length === 0) {
            throw new Error('ID dịch vụ không hợp lệ.');
        }

        try {
            const response = await serviceRepository.getServiceById(id.trim());

            if (!response?.success || !response?.data) {
                return null;
            }

            return response.data as Service;
        } catch (error) {
            console.error('[ServiceService] Error getting service by ID:', error);
            throw error;
        }
    }
}

/**
 * Default service instance (Singleton pattern)
 */
export const serviceClientService = new ServiceClientService();

