/**
 * Service Group Mapper
 * Maps service groups with services to classify by ServiceType
 */

import type { Service } from '../types';
import type { ServiceGroupWithType } from '../types/service-group';
import { ServiceType } from '../enums';

/**
 * Classify service groups based on their services
 */
export const classifyServiceGroups = (
    serviceGroups: Array<{
        id: string;
        groupCode: string;
        groupName: string;
        description?: string;
        isActive: boolean;
        createdAt: string;
        createdBy?: string;
    }>,
    services: Service[]
): ServiceGroupWithType[] => {
    // Create a map of serviceGroupId -> services
    const servicesByGroupId = new Map<string, Service[]>();
    
    services.forEach((service) => {
        if (service.serviceGroupId) {
            const existing = servicesByGroupId.get(service.serviceGroupId) || [];
            existing.push(service);
            servicesByGroupId.set(service.serviceGroupId, existing);
        }
    });

    // Classify each service group
    return serviceGroups.map((group) => {
        const groupServices = servicesByGroupId.get(group.id) || [];
        
        // Determine service type based on services
        let serviceType: 'Công dân' | 'Doanh nghiệp' | 'both' = 'both';
        
        if (groupServices.length > 0) {
            const hasCitizen = groupServices.some((s) => {
                const field = s.field?.toLowerCase() || '';
                const serviceType = s.serviceType?.toLowerCase() || '';
                return !(
                    field.includes('doanh nghiệp') ||
                    field.includes('kinh doanh') ||
                    field.includes('thương mại') ||
                    serviceType.includes('business')
                );
            });
            
            const hasBusiness = groupServices.some((s) => {
                const field = s.field?.toLowerCase() || '';
                const serviceType = s.serviceType?.toLowerCase() || '';
                return (
                    field.includes('doanh nghiệp') ||
                    field.includes('kinh doanh') ||
                    field.includes('thương mại') ||
                    serviceType.includes('business')
                );
            });
            
            if (hasCitizen && hasBusiness) {
                serviceType = 'both';
            } else if (hasCitizen) {
                serviceType = ServiceType.CITIZEN;
            } else if (hasBusiness) {
                serviceType = ServiceType.BUSINESS;
            }
        }

        return {
            ...group,
            serviceType,
            serviceCount: groupServices.length,
        };
    });
};

/**
 * Filter service groups by service type
 */
export const filterServiceGroupsByType = (
    serviceGroups: ServiceGroupWithType[],
    serviceType: ServiceType | null
): ServiceGroupWithType[] => {
    if (serviceType === null) {
        return serviceGroups;
    }

    return serviceGroups.filter((group) => {
        if (group.serviceType === 'both') return true;
        return group.serviceType === serviceType;
    });
};

